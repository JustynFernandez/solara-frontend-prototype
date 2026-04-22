import * as THREE from "three";
import { BlendFunction, BloomEffect, EffectComposer, EffectPass, NoiseEffect, RenderPass, VignetteEffect, } from "postprocessing";
import WaveGeometryWorker from "./SolaraWaveGeometry.worker?worker";
import fragmentShader from "./shaders/wave.frag.glsl?raw";
import vertexShader from "./shaders/wave.vert.glsl?raw";
import { getWaveSceneConfig, resolveWaveBreakpoint } from "./SolaraWaveConfig";
const DEFAULT_POINTER_X = 0.84;
const DEFAULT_POINTER_Y = 0.34;
const debugEnabled = import.meta.env.DEV && typeof window !== "undefined" && new URLSearchParams(window.location.search).has("__waveDebug");
const loadTexture = (url) => new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(url, resolve, undefined, (error) => reject(error instanceof Error ? error : new Error(String(error))));
});
const buildBufferGeometry = (geometryPayload) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(geometryPayload.positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(geometryPayload.uvs, 2));
    geometry.setAttribute("normal", new THREE.BufferAttribute(geometryPayload.normals, 3));
    geometry.setIndex(new THREE.BufferAttribute(geometryPayload.indices, 1));
    try {
        geometry.computeTangents();
    }
    catch {
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
    options;
    container;
    canvas;
    interactive;
    renderer = null;
    scene = null;
    camera = null;
    material = null;
    mesh = null;
    uniforms = null;
    composer = null;
    renderPass = null;
    effectPass = null;
    bloomEffect = null;
    noiseEffect = null;
    vignetteEffect = null;
    resizeObserver = null;
    startPromise = null;
    disposed = false;
    initialized = false;
    paused = true;
    firstFrameDrawn = false;
    currentBucket = "desktop";
    currentConfig = null;
    configVersion = 0;
    textures = null;
    elapsed = 0;
    intro = 0;
    lastFrame = 0;
    pointerActive = false;
    pointerTarget = new THREE.Vector2(DEFAULT_POINTER_X, DEFAULT_POINTER_Y);
    pointerCurrent = new THREE.Vector2(DEFAULT_POINTER_X, DEFAULT_POINTER_Y);
    pointerNext = new THREE.Vector2(DEFAULT_POINTER_X, DEFAULT_POINTER_Y);
    onWindowPointerMove = (event) => {
        if (!this.interactive)
            return;
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
    onDocumentPointerLeave = () => {
        this.pointerActive = false;
    };
    onVisibilityChange = () => {
        if (document.hidden) {
            this.pause();
            return;
        }
        this.resume();
    };
    onAnimationFrame = (timestamp) => {
        if (this.paused || this.disposed)
            return;
        const renderer = this.renderer;
        const scene = this.scene;
        const camera = this.camera;
        const uniforms = this.uniforms;
        const config = this.currentConfig;
        if (!renderer || !scene || !camera || !uniforms || !config)
            return;
        const delta = this.lastFrame > 0 ? Math.min(0.05, Math.max(0.001, (timestamp - this.lastFrame) / 1000)) : 1 / 60;
        this.lastFrame = timestamp;
        this.elapsed += delta;
        this.intro = Math.min(1, this.intro + delta * 0.72);
        const pointer = config.pointer;
        const driftX = DEFAULT_POINTER_X + Math.sin(this.elapsed * pointer.driftSpeedX) * pointer.driftAmountX;
        const driftY = DEFAULT_POINTER_Y + Math.cos(this.elapsed * pointer.driftSpeedY) * pointer.driftAmountY;
        const influence = this.pointerActive ? pointer.maxInfluence : 0;
        this.pointerNext.set(driftX + (this.pointerTarget.x - 0.5) * influence, driftY + (this.pointerTarget.y - 0.5) * influence);
        this.pointerCurrent.lerp(this.pointerNext, pointer.lerp);
        uniforms.uTime.value = this.elapsed;
        uniforms.uIntro.value = this.intro;
        uniforms.uMouse.value.copy(this.pointerCurrent);
        this.renderFrame(delta);
        if (!this.firstFrameDrawn) {
            this.firstFrameDrawn = true;
            this.options.onFirstFrame?.();
        }
    };
    constructor(options) {
        this.options = options;
        this.container = options.container;
        this.canvas = options.canvas;
        this.interactive = options.interactive ?? true;
    }
    start() {
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
    pause() {
        if (!this.renderer || this.paused)
            return;
        this.paused = true;
        this.renderer.setAnimationLoop(null);
    }
    resume() {
        if (this.disposed || !this.renderer || document.hidden)
            return;
        if (!this.initialized)
            return;
        if (!this.paused)
            return;
        this.paused = false;
        this.lastFrame = performance.now();
        this.renderer.setAnimationLoop(this.onAnimationFrame);
    }
    dispose() {
        if (this.disposed)
            return;
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
        if (this.composer) {
            this.composer.dispose();
            this.composer = null;
        }
        this.renderPass = null;
        this.effectPass = null;
        this.bloomEffect = null;
        this.noiseEffect = null;
        this.vignetteEffect = null;
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
        }
    }
    async initialize() {
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
        this.createPostProcessing();
        this.syncRendererSize();
        await this.applySceneConfig(this.currentConfig, true);
        this.renderInitialFrame();
        this.initialized = true;
        this.paused = true;
        this.resume();
    }
    createRenderer() {
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
        // ACES + modest exposure avoids a flat look and gives highlights a softer, more physical rolloff.
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(22, 1, 0.1, 32);
    }
    bindListeners() {
        window.addEventListener("pointermove", this.onWindowPointerMove, { passive: true });
        document.addEventListener("pointerleave", this.onDocumentPointerLeave, { passive: true });
        document.addEventListener("visibilitychange", this.onVisibilityChange);
        this.resizeObserver = new ResizeObserver(() => {
            this.syncRendererSize();
            void this.handleResize();
        });
        this.resizeObserver.observe(this.container);
    }
    async loadTextures() {
        const config = this.currentConfig;
        if (!config)
            return;
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
    createSceneGraph() {
        if (!this.scene || !this.camera || !this.textures)
            return;
        const uniforms = {
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
    shouldUsePostProcessing() {
        return this.options.quality === "medium" || this.options.quality === "high";
    }
    createPostProcessing() {
        const renderer = this.renderer;
        const scene = this.scene;
        const camera = this.camera;
        if (!renderer || !scene || !camera)
            return;
        if (!this.shouldUsePostProcessing()) {
            this.composer = null;
            this.renderPass = null;
            this.effectPass = null;
            this.bloomEffect = null;
            this.noiseEffect = null;
            this.vignetteEffect = null;
            return;
        }
        const composer = new EffectComposer(renderer, {
            depthBuffer: false,
            stencilBuffer: false,
            multisampling: 0,
        });
        const renderPass = new RenderPass(scene, camera);
        // Minimal finishing stack: preserve the ribbon as primary while adding gentle polish.
        const bloomEffect = new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            intensity: 0.16,
            luminanceThreshold: 0.78,
            luminanceSmoothing: 0.22,
            mipmapBlur: true,
        });
        const noiseEffect = new NoiseEffect({
            blendFunction: BlendFunction.SOFT_LIGHT,
            premultiply: true,
        });
        noiseEffect.blendMode.opacity.value = 0.018;
        const vignetteEffect = new VignetteEffect({
            blendFunction: BlendFunction.NORMAL,
            offset: 0.36,
            darkness: 0.18,
        });
        vignetteEffect.blendMode.opacity.value = 0.12;
        const effectPass = new EffectPass(camera, bloomEffect, noiseEffect, vignetteEffect);
        composer.addPass(renderPass);
        composer.addPass(effectPass);
        this.composer = composer;
        this.renderPass = renderPass;
        this.effectPass = effectPass;
        this.bloomEffect = bloomEffect;
        this.noiseEffect = noiseEffect;
        this.vignetteEffect = vignetteEffect;
    }
    renderFrame(delta) {
        if (!this.renderer || !this.scene || !this.camera)
            return;
        if (this.composer) {
            this.composer.render(delta);
            return;
        }
        this.renderer.render(this.scene, this.camera);
    }
    syncRendererSize() {
        const renderer = this.renderer;
        const uniforms = this.uniforms;
        const camera = this.camera;
        if (!renderer || !camera)
            return;
        const width = Math.max(1, Math.round(this.container.clientWidth || 1));
        const height = Math.max(1, Math.round(this.container.clientHeight || 1));
        renderer.setSize(width, height, false);
        this.composer?.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (uniforms) {
            uniforms.uResolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
        }
    }
    async handleResize() {
        if (!this.initialized || this.disposed)
            return;
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
    async applySceneConfig(config, replaceGeometry) {
        if (!this.camera || !this.mesh || !this.material || !this.uniforms)
            return;
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
        if (!replaceGeometry)
            return;
        const requestId = ++this.configVersion;
        const geometryPayload = await this.requestGeometry(config);
        if (this.disposed || requestId !== this.configVersion)
            return;
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
    renderInitialFrame() {
        if (!this.renderer || !this.scene || !this.camera || !this.uniforms)
            return;
        this.uniforms.uTime.value = this.elapsed;
        this.uniforms.uIntro.value = Math.max(this.intro, 0.08);
        this.uniforms.uMouse.value.copy(this.pointerCurrent);
        this.renderFrame(0);
        if (!this.firstFrameDrawn) {
            this.firstFrameDrawn = true;
            this.options.onFirstFrame?.();
        }
    }
    requestGeometry(config) {
        return new Promise((resolve, reject) => {
            const worker = new WaveGeometryWorker();
            worker.onmessage = (event) => {
                worker.terminate();
                resolve(event.data);
            };
            worker.onerror = (event) => {
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
    handleError(error) {
        const normalized = error instanceof Error ? error : new Error(String(error));
        this.options.onError?.(normalized);
    }
}
