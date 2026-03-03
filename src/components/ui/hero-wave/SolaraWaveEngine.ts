import * as THREE from "three";
import WaveGeometryWorker from "./SolaraWaveGeometry.worker?worker";
import fragmentShader from "./shaders/wave.frag.glsl?raw";
import vertexShader from "./shaders/wave.vert.glsl?raw";
import { getWaveSceneConfig, resolveWaveBreakpoint, type WaveBreakpoint, type WaveSceneConfig, type WaveTheme } from "./SolaraWaveConfig";
import type { WaveQuality } from "./capability";

type EngineOptions = {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  theme: WaveTheme;
  quality: WaveQuality;
  interactive?: boolean;
  allowMajorPerformanceCaveat?: boolean;
  onFirstFrame?: () => void;
  onError?: (error: Error) => void;
  onConfigResolved?: (payload: { theme: WaveTheme; bucket: WaveBreakpoint; quality: WaveQuality }) => void;
};

type GeometryPayload = {
  positions: Float32Array;
  uvs: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
};

type ShaderUniforms = {
  uTime: { value: number };
  uIntro: { value: number };
  uResolution: { value: THREE.Vector2 };
  uMouse: { value: THREE.Vector2 };
  uRibbonTexture: { value: THREE.Texture | null };
  uBlueNoiseTexture: { value: THREE.Texture | null };
  uColorSaturation: { value: number };
  uColorContrast: { value: number };
  uColorHueShift: { value: number };
  uLineAmount: { value: number };
  uLineThickness: { value: number };
  uLineDerivativePower: { value: number };
  uGlowAmount: { value: number };
  uGlowPower: { value: number };
  uGlowRamp: { value: number };
  uDisplaceFrequencyX: { value: number };
  uDisplaceFrequencyZ: { value: number };
  uDisplaceAmount: { value: number };
  uTwistFrequencyX: { value: number };
  uTwistFrequencyY: { value: number };
  uTwistFrequencyZ: { value: number };
  uTwistPowerX: { value: number };
  uTwistPowerY: { value: number };
  uTwistPowerZ: { value: number };
};

const DEFAULT_POINTER_X = 0.84;
const DEFAULT_POINTER_Y = 0.34;
const debugEnabled = import.meta.env.DEV && typeof window !== "undefined" && new URLSearchParams(window.location.search).has("__waveDebug");

const loadTexture = (url: string) =>
  new Promise<THREE.Texture>((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(url, resolve, undefined, (error) => reject(error instanceof Error ? error : new Error(String(error))));
  });

const buildBufferGeometry = (geometryPayload: GeometryPayload): THREE.BufferGeometry => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(geometryPayload.positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(geometryPayload.uvs, 2));
  geometry.setAttribute("normal", new THREE.BufferAttribute(geometryPayload.normals, 3));
  geometry.setIndex(new THREE.BufferAttribute(geometryPayload.indices, 1));
  try {
    geometry.computeTangents();
  } catch {
    // Use a fallback tangent basis if tangent generation is unavailable.
  }

  if (!geometry.getAttribute("tangent")) {
    const positionAttribute = geometry.getAttribute("position");
    const tangents = new Float32Array(positionAttribute.count * 4);
    for (let index = 0; index < positionAttribute.count; index += 1) {
      const offset = index * 4;
      tangents[offset] = 1;
      tangents[offset + 1] = 0;
      tangents[offset + 2] = 0;
      tangents[offset + 3] = 1;
    }
    geometry.setAttribute("tangent", new THREE.BufferAttribute(tangents, 4));
  }
  geometry.computeBoundingSphere();
  return geometry;
};

export class SolaraWaveEngine {
  private readonly options: EngineOptions;
  private readonly container: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly interactive: boolean;

  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private mesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null;
  private uniforms: ShaderUniforms | null = null;

  private resizeObserver: ResizeObserver | null = null;
  private startPromise: Promise<void> | null = null;
  private disposed = false;
  private initialized = false;
  private paused = true;
  private firstFrameDrawn = false;

  private currentBucket: WaveBreakpoint = "desktop";
  private currentConfig: WaveSceneConfig | null = null;
  private configVersion = 0;
  private textures: { ribbonTexture: THREE.Texture; blueNoiseTexture: THREE.Texture } | null = null;

  private elapsed = 0;
  private intro = 0;
  private lastFrame = 0;

  private pointerActive = false;
  private pointerTarget = new THREE.Vector2(DEFAULT_POINTER_X, DEFAULT_POINTER_Y);
  private pointerCurrent = new THREE.Vector2(DEFAULT_POINTER_X, DEFAULT_POINTER_Y);
  private pointerNext = new THREE.Vector2(DEFAULT_POINTER_X, DEFAULT_POINTER_Y);

  private readonly onWindowPointerMove = (event: PointerEvent) => {
    if (!this.interactive) return;
    const rect = this.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      this.pointerActive = false;
      return;
    }

    const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
    const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!insideX || !insideY) {
      this.pointerActive = false;
      return;
    }

    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    this.pointerTarget.set(Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y)));
    this.pointerActive = true;
  };

  private readonly onDocumentPointerLeave = () => {
    this.pointerActive = false;
  };

  private readonly onVisibilityChange = () => {
    if (document.hidden) {
      this.pause();
      return;
    }

    this.resume();
  };

  private readonly onAnimationFrame = (timestamp: number) => {
    if (this.paused || this.disposed) return;

    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;
    const uniforms = this.uniforms;
    const config = this.currentConfig;

    if (!renderer || !scene || !camera || !uniforms || !config) return;

    const delta = this.lastFrame > 0 ? Math.min(0.05, Math.max(0.001, (timestamp - this.lastFrame) / 1000)) : 1 / 60;
    this.lastFrame = timestamp;
    this.elapsed += delta;
    this.intro = Math.min(1, this.intro + delta * 0.72);

    const pointer = config.pointer;
    const driftX = DEFAULT_POINTER_X + Math.sin(this.elapsed * pointer.driftSpeedX) * pointer.driftAmountX;
    const driftY = DEFAULT_POINTER_Y + Math.cos(this.elapsed * pointer.driftSpeedY) * pointer.driftAmountY;
    const influence = this.pointerActive ? pointer.maxInfluence : 0;
    this.pointerNext.set(
      driftX + (this.pointerTarget.x - 0.5) * influence,
      driftY + (this.pointerTarget.y - 0.5) * influence
    );

    this.pointerCurrent.lerp(this.pointerNext, pointer.lerp);
    uniforms.uTime.value = this.elapsed;
    uniforms.uIntro.value = this.intro;
    uniforms.uMouse.value.copy(this.pointerCurrent);

    renderer.render(scene, camera);

    if (!this.firstFrameDrawn) {
      this.firstFrameDrawn = true;
      this.options.onFirstFrame?.();
    }
  };

  constructor(options: EngineOptions) {
    this.options = options;
    this.container = options.container;
    this.canvas = options.canvas;
    this.interactive = options.interactive ?? true;
  }

  public start(): Promise<void> {
    if (this.disposed) {
      return Promise.resolve();
    }

    if (this.initialized) {
      this.resume();
      return Promise.resolve();
    }

    if (!this.startPromise) {
      this.startPromise = this.initialize().catch((error) => {
        this.handleError(error);
        this.dispose();
        throw error;
      });
    }

    return this.startPromise;
  }

  public pause(): void {
    if (!this.renderer || this.paused) return;
    this.paused = true;
    this.renderer.setAnimationLoop(null);
  }

  public resume(): void {
    if (this.disposed || !this.renderer || document.hidden) return;
    if (!this.initialized) return;
    if (!this.paused) return;

    this.paused = false;
    this.lastFrame = performance.now();
    this.renderer.setAnimationLoop(this.onAnimationFrame);
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.pause();

    window.removeEventListener("pointermove", this.onWindowPointerMove);
    document.removeEventListener("pointerleave", this.onDocumentPointerLeave);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;

    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.scene?.remove(this.mesh);
      this.mesh = null;
    }

    this.material?.dispose();
    this.material = null;
    this.uniforms = null;

    if (this.textures) {
      this.textures.ribbonTexture.dispose();
      this.textures.blueNoiseTexture.dispose();
      this.textures = null;
    }

    this.scene = null;
    this.camera = null;

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }

  private async initialize(): Promise<void> {
    this.createRenderer();
    this.bindListeners();

    const bucket = resolveWaveBreakpoint(this.container.clientWidth || window.innerWidth || 1280);
    this.currentBucket = bucket;
    this.currentConfig = getWaveSceneConfig({
      theme: this.options.theme,
      breakpoint: bucket,
      quality: this.options.quality,
    });
    this.options.onConfigResolved?.({
      theme: this.options.theme,
      bucket,
      quality: this.options.quality,
    });

    await this.loadTextures();
    this.createSceneGraph();
    this.syncRendererSize();
    await this.applySceneConfig(this.currentConfig, true);
    this.renderInitialFrame();

    this.initialized = true;
    this.paused = true;
    this.resume();
  }

  private createRenderer(): void {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: this.options.quality !== "low",
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: !this.options.allowMajorPerformanceCaveat,
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(22, 1, 0.1, 32);
  }

  private bindListeners(): void {
    window.addEventListener("pointermove", this.onWindowPointerMove, { passive: true });
    document.addEventListener("pointerleave", this.onDocumentPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", this.onVisibilityChange);

    this.resizeObserver = new ResizeObserver(() => {
      this.syncRendererSize();
      void this.handleResize();
    });
    this.resizeObserver.observe(this.container);
  }

  private async loadTextures(): Promise<void> {
    const config = this.currentConfig;
    if (!config) return;

    const [ribbonTexture, blueNoiseTexture] = await Promise.all([
      loadTexture(config.material.ribbonTexture),
      loadTexture(config.material.blueNoiseTexture),
    ]);

    ribbonTexture.colorSpace = THREE.SRGBColorSpace;
    ribbonTexture.minFilter = THREE.LinearFilter;
    ribbonTexture.magFilter = THREE.LinearFilter;
    ribbonTexture.generateMipmaps = false;
    ribbonTexture.wrapS = THREE.ClampToEdgeWrapping;
    ribbonTexture.wrapT = THREE.ClampToEdgeWrapping;
    ribbonTexture.needsUpdate = true;

    blueNoiseTexture.minFilter = THREE.LinearFilter;
    blueNoiseTexture.magFilter = THREE.LinearFilter;
    blueNoiseTexture.generateMipmaps = false;
    blueNoiseTexture.wrapS = THREE.RepeatWrapping;
    blueNoiseTexture.wrapT = THREE.RepeatWrapping;
    blueNoiseTexture.needsUpdate = true;

    this.textures = { ribbonTexture, blueNoiseTexture };

    if (debugEnabled) {
      console.info("[hero-wave] ribbon-texture-loaded", {
        texture: config.material.ribbonTexture,
        theme: this.options.theme,
        bucket: this.currentBucket,
      });
    }
  }

  private createSceneGraph(): void {
    if (!this.scene || !this.camera || !this.textures) return;

    const uniforms: ShaderUniforms = {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: this.pointerCurrent.clone() },
      uRibbonTexture: { value: this.textures.ribbonTexture },
      uBlueNoiseTexture: { value: this.textures.blueNoiseTexture },
      uColorSaturation: { value: 1 },
      uColorContrast: { value: 1 },
      uColorHueShift: { value: 0 },
      uLineAmount: { value: 0 },
      uLineThickness: { value: 0 },
      uLineDerivativePower: { value: 1 },
      uGlowAmount: { value: 0 },
      uGlowPower: { value: 1 },
      uGlowRamp: { value: 1 },
      uDisplaceFrequencyX: { value: 0 },
      uDisplaceFrequencyZ: { value: 0 },
      uDisplaceAmount: { value: 0 },
      uTwistFrequencyX: { value: 0 },
      uTwistFrequencyY: { value: 0 },
      uTwistFrequencyZ: { value: 0 },
      uTwistPowerX: { value: 0 },
      uTwistPowerY: { value: 0 },
      uTwistPowerZ: { value: 0 },
    };

    this.uniforms = uniforms;
    this.material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
      extensions: {
        derivatives: true,
      },
    });

    this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material);
    this.mesh.frustumCulled = false;
    this.mesh.matrixAutoUpdate = false;
    this.scene.add(this.mesh);

    if (debugEnabled) {
      console.info("[hero-wave] shader-material-ready", {
        theme: this.options.theme,
        quality: this.options.quality,
      });
    }
  }

  private syncRendererSize(): void {
    const renderer = this.renderer;
    const uniforms = this.uniforms;
    const camera = this.camera;
    if (!renderer || !camera) return;

    const width = Math.max(1, Math.round(this.container.clientWidth || 1));
    const height = Math.max(1, Math.round(this.container.clientHeight || 1));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    if (uniforms) {
      uniforms.uResolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
    }
  }

  private async handleResize(): Promise<void> {
    if (!this.initialized || this.disposed) return;

    const nextBucket = resolveWaveBreakpoint(this.container.clientWidth || window.innerWidth || 1280);
    if (nextBucket === this.currentBucket) {
      return;
    }

    this.currentBucket = nextBucket;
    const nextConfig = getWaveSceneConfig({
      theme: this.options.theme,
      breakpoint: nextBucket,
      quality: this.options.quality,
    });

    this.currentConfig = nextConfig;
    this.options.onConfigResolved?.({
      theme: this.options.theme,
      bucket: nextBucket,
      quality: this.options.quality,
    });

    await this.applySceneConfig(nextConfig, true);
  }

  private async applySceneConfig(config: WaveSceneConfig, replaceGeometry: boolean): Promise<void> {
    if (!this.camera || !this.mesh || !this.material || !this.uniforms) return;

    this.camera.fov = config.camera.fov;
    this.camera.near = config.camera.near;
    this.camera.far = config.camera.far;
    this.camera.position.set(...config.camera.position);
    this.camera.lookAt(new THREE.Vector3(...config.camera.target));
    this.camera.updateProjectionMatrix();

    this.mesh.position.set(...config.meshPosition);
    this.mesh.rotation.set(...config.meshRotation);
    this.mesh.scale.set(...config.meshScale);
    this.mesh.updateMatrix();

    this.uniforms.uColorSaturation.value = config.material.colorSaturation;
    this.uniforms.uColorContrast.value = config.material.colorContrast;
    this.uniforms.uColorHueShift.value = config.material.colorHueShift;
    this.uniforms.uLineAmount.value = config.material.lineAmount;
    this.uniforms.uLineThickness.value = config.material.lineThickness;
    this.uniforms.uLineDerivativePower.value = config.material.lineDerivativePower;
    this.uniforms.uGlowAmount.value = config.material.glowAmount;
    this.uniforms.uGlowPower.value = config.material.glowPower;
    this.uniforms.uGlowRamp.value = config.material.glowRamp;
    this.uniforms.uDisplaceFrequencyX.value = config.material.displaceFrequencyX;
    this.uniforms.uDisplaceFrequencyZ.value = config.material.displaceFrequencyZ;
    this.uniforms.uDisplaceAmount.value = config.material.displaceAmount;
    this.uniforms.uTwistFrequencyX.value = config.material.twistFrequencyX;
    this.uniforms.uTwistFrequencyY.value = config.material.twistFrequencyY;
    this.uniforms.uTwistFrequencyZ.value = config.material.twistFrequencyZ;
    this.uniforms.uTwistPowerX.value = config.material.twistPowerX;
    this.uniforms.uTwistPowerY.value = config.material.twistPowerY;
    this.uniforms.uTwistPowerZ.value = config.material.twistPowerZ;

    if (!replaceGeometry) return;

    const requestId = ++this.configVersion;
    const geometryPayload = await this.requestGeometry(config);
    if (this.disposed || requestId !== this.configVersion) return;

    const nextGeometry = buildBufferGeometry(geometryPayload);
    const previousGeometry = this.mesh.geometry;
    this.mesh.geometry = nextGeometry;
    previousGeometry.dispose();

    if (debugEnabled) {
      console.info("[hero-wave] geometry-applied", {
        bucket: config.breakpoint,
        configVersion: this.configVersion,
        vertices: geometryPayload.positions.length / 3,
      });
    }
  }

  private renderInitialFrame(): void {
    if (!this.renderer || !this.scene || !this.camera || !this.uniforms) return;

    this.uniforms.uTime.value = this.elapsed;
    this.uniforms.uIntro.value = Math.max(this.intro, 0.08);
    this.uniforms.uMouse.value.copy(this.pointerCurrent);
    this.renderer.render(this.scene, this.camera);

    if (!this.firstFrameDrawn) {
      this.firstFrameDrawn = true;
      this.options.onFirstFrame?.();
    }
  }

  private requestGeometry(config: WaveSceneConfig): Promise<GeometryPayload> {
    return new Promise((resolve, reject) => {
      const worker = new WaveGeometryWorker();
      worker.onmessage = (event: MessageEvent<GeometryPayload>) => {
        worker.terminate();
        resolve(event.data);
      };
      worker.onerror = (event: ErrorEvent) => {
        worker.terminate();
        reject(new Error(event.message || "Failed to generate hero wave geometry."));
      };
      worker.postMessage({
        width: config.geometry.width,
        height: config.geometry.height,
        subdivisionsX: config.geometry.subdivisionsX,
        subdivisionsY: config.geometry.subdivisionsY,
        foldStart: config.geometry.foldStart,
        foldDepth: config.geometry.foldDepth,
        arcDepth: config.geometry.arcDepth,
        skewX: config.geometry.skewX,
        dropY: config.geometry.dropY,
        rotation: config.geometry.rotation,
      });
    });
  }

  private handleError(error: unknown): void {
    const normalized = error instanceof Error ? error : new Error(String(error));
    this.options.onError?.(normalized);
  }
}
