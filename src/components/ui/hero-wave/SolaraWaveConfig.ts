import type { WaveQuality } from "./capability";

export type WaveTheme = "light" | "dark";
export type WaveBreakpoint = "mobile" | "tablet" | "desktop";

type WaveVector3 = [number, number, number];

export type WaveCameraConfig = {
  fov: number;
  near: number;
  far: number;
  position: WaveVector3;
  target: WaveVector3;
};

export type WaveMaterialConfig = {
  ribbonTexture: string;
  blueNoiseTexture: string;
  colorSaturation: number;
  colorContrast: number;
  colorHueShift: number;
  lineAmount: number;
  lineThickness: number;
  lineDerivativePower: number;
  glowAmount: number;
  glowPower: number;
  glowRamp: number;
  displaceFrequencyX: number;
  displaceFrequencyZ: number;
  displaceAmount: number;
  twistFrequencyX: number;
  twistFrequencyY: number;
  twistFrequencyZ: number;
  twistPowerX: number;
  twistPowerY: number;
  twistPowerZ: number;
};

type WaveGeometryConfig = {
  width: number;
  height: number;
  subdivisionsX: number;
  subdivisionsY: number;
  foldStart: number;
  foldDepth: number;
  arcDepth: number;
  skewX: number;
  dropY: number;
  rotation: number;
};

type WavePointerConfig = {
  maxInfluence: number;
  lerp: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmountX: number;
  driftAmountY: number;
};

type WavePerformanceConfig = {
  warmupSeconds: number;
  lowFpsThreshold: number;
  lowFpsWindowSeconds: number;
  antialias: boolean;
};

export type WaveSceneConfig = {
  theme: WaveTheme;
  breakpoint: WaveBreakpoint;
  camera: WaveCameraConfig;
  meshPosition: WaveVector3;
  meshRotation: WaveVector3;
  meshScale: WaveVector3;
  geometry: WaveGeometryConfig;
  material: WaveMaterialConfig;
  pointer: WavePointerConfig;
  performance: WavePerformanceConfig;
};

const BLUE_NOISE_TEXTURE = "/hero-wave-blue-noise.png";

const CAMERA_CONFIGS: Record<WaveBreakpoint, WaveCameraConfig> = {
  mobile: {
    fov: 26,
    near: 0.1,
    far: 30,
    position: [0, 0, 10.4],
    target: [0.1, -0.05, 0],
  },
  tablet: {
    fov: 24,
    near: 0.1,
    far: 30,
    position: [0, 0, 10.1],
    target: [0.15, -0.02, 0],
  },
  desktop: {
    fov: 22,
    near: 0.1,
    far: 32,
    position: [0, 0, 9.6],
    target: [0.2, 0, 0],
  },
};

const GEOMETRY_CONFIGS: Record<WaveBreakpoint, WaveGeometryConfig> = {
  mobile: {
    width: 10.6,
    height: 16.2,
    subdivisionsX: 56,
    subdivisionsY: 112,
    foldStart: 0.56,
    foldDepth: 1.42,
    arcDepth: 1.96,
    skewX: 0.42,
    dropY: 1.38,
    rotation: -0.22,
  },
  tablet: {
    width: 12.8,
    height: 15.6,
    subdivisionsX: 96,
    subdivisionsY: 192,
    foldStart: 0.54,
    foldDepth: 1.54,
    arcDepth: 2.08,
    skewX: 0.46,
    dropY: 1.52,
    rotation: -0.2,
  },
  desktop: {
    width: 13.8,
    height: 15.1,
    subdivisionsX: 128,
    subdivisionsY: 256,
    foldStart: 0.52,
    foldDepth: 1.66,
    arcDepth: 2.16,
    skewX: 0.5,
    dropY: 1.64,
    rotation: -0.18,
  },
};

const MESH_CONFIGS: Record<WaveBreakpoint, Pick<WaveSceneConfig, "meshPosition" | "meshRotation" | "meshScale">> = {
  mobile: {
    meshPosition: [1.94, 1.28, -1.12],
    meshRotation: [-0.96, 0.33, 1.28],
    meshScale: [1.46, 1.56, 1],
  },
  tablet: {
    meshPosition: [2.92, 1.62, -1.06],
    meshRotation: [-1.02, 0.31, 1.35],
    meshScale: [1.9, 1.98, 1],
  },
  desktop: {
    meshPosition: [3.54, 1.82, -1.04],
    meshRotation: [-1.08, 0.32, 1.44],
    meshScale: [2.22, 2.3, 1],
  },
};

const POINTER_CONFIGS: Record<WaveBreakpoint, WavePointerConfig> = {
  mobile: {
    maxInfluence: 0.03,
    lerp: 0.05,
    driftSpeedX: 0.05,
    driftSpeedY: 0.042,
    driftAmountX: 0.02,
    driftAmountY: 0.016,
  },
  tablet: {
    maxInfluence: 0.04,
    lerp: 0.055,
    driftSpeedX: 0.052,
    driftSpeedY: 0.044,
    driftAmountX: 0.024,
    driftAmountY: 0.018,
  },
  desktop: {
    maxInfluence: 0.04,
    lerp: 0.06,
    driftSpeedX: 0.055,
    driftSpeedY: 0.046,
    driftAmountX: 0.028,
    driftAmountY: 0.02,
  },
};

const LIGHT_MATERIALS: Record<WaveBreakpoint, WaveMaterialConfig> = {
  mobile: {
    ribbonTexture: "/hero-wave-ribbon-light.png",
    blueNoiseTexture: BLUE_NOISE_TEXTURE,
    colorSaturation: 1.18,
    colorContrast: 1.16,
    colorHueShift: -0.012,
    lineAmount: 148,
    lineThickness: 0.19,
    lineDerivativePower: 1.34,
    glowAmount: 0.92,
    glowPower: 1.16,
    glowRamp: 1.22,
    displaceFrequencyX: 1.34,
    displaceFrequencyZ: 0.96,
    displaceAmount: 0.082,
    twistFrequencyX: 0.42,
    twistFrequencyY: 0.34,
    twistFrequencyZ: 0.28,
    twistPowerX: 0.048,
    twistPowerY: 0.038,
    twistPowerZ: 0.028,
  },
  tablet: {
    ribbonTexture: "/hero-wave-ribbon-light.png",
    blueNoiseTexture: BLUE_NOISE_TEXTURE,
    colorSaturation: 1.22,
    colorContrast: 1.18,
    colorHueShift: -0.014,
    lineAmount: 182,
    lineThickness: 0.19,
    lineDerivativePower: 1.38,
    glowAmount: 1.0,
    glowPower: 1.14,
    glowRamp: 1.24,
    displaceFrequencyX: 1.4,
    displaceFrequencyZ: 0.98,
    displaceAmount: 0.094,
    twistFrequencyX: 0.44,
    twistFrequencyY: 0.36,
    twistFrequencyZ: 0.3,
    twistPowerX: 0.052,
    twistPowerY: 0.04,
    twistPowerZ: 0.03,
  },
  desktop: {
    ribbonTexture: "/hero-wave-ribbon-light.png",
    blueNoiseTexture: BLUE_NOISE_TEXTURE,
    colorSaturation: 1.24,
    colorContrast: 1.22,
    colorHueShift: -0.016,
    lineAmount: 214,
    lineThickness: 0.18,
    lineDerivativePower: 1.42,
    glowAmount: 1.02,
    glowPower: 1.12,
    glowRamp: 1.24,
    displaceFrequencyX: 1.46,
    displaceFrequencyZ: 1,
    displaceAmount: 0.102,
    twistFrequencyX: 0.46,
    twistFrequencyY: 0.38,
    twistFrequencyZ: 0.32,
    twistPowerX: 0.056,
    twistPowerY: 0.044,
    twistPowerZ: 0.034,
  },
};

const DARK_MATERIALS: Record<WaveBreakpoint, WaveMaterialConfig> = {
  mobile: {
    ribbonTexture: "/hero-wave-ribbon-dark.png",
    blueNoiseTexture: BLUE_NOISE_TEXTURE,
    colorSaturation: 0.82,
    colorContrast: 1.02,
    colorHueShift: -0.008,
    lineAmount: 112,
    lineThickness: 0.22,
    lineDerivativePower: 1.18,
    glowAmount: 0.5,
    glowPower: 1.16,
    glowRamp: 1.18,
    displaceFrequencyX: 1.28,
    displaceFrequencyZ: 0.92,
    displaceAmount: 0.078,
    twistFrequencyX: 0.4,
    twistFrequencyY: 0.32,
    twistFrequencyZ: 0.26,
    twistPowerX: 0.044,
    twistPowerY: 0.034,
    twistPowerZ: 0.026,
  },
  tablet: {
    ribbonTexture: "/hero-wave-ribbon-dark.png",
    blueNoiseTexture: BLUE_NOISE_TEXTURE,
    colorSaturation: 0.86,
    colorContrast: 1.04,
    colorHueShift: -0.01,
    lineAmount: 126,
    lineThickness: 0.22,
    lineDerivativePower: 1.2,
    glowAmount: 0.56,
    glowPower: 1.14,
    glowRamp: 1.18,
    displaceFrequencyX: 1.34,
    displaceFrequencyZ: 0.96,
    displaceAmount: 0.088,
    twistFrequencyX: 0.42,
    twistFrequencyY: 0.34,
    twistFrequencyZ: 0.28,
    twistPowerX: 0.05,
    twistPowerY: 0.038,
    twistPowerZ: 0.028,
  },
  desktop: {
    ribbonTexture: "/hero-wave-ribbon-dark.png",
    blueNoiseTexture: BLUE_NOISE_TEXTURE,
    colorSaturation: 0.9,
    colorContrast: 1.06,
    colorHueShift: -0.012,
    lineAmount: 146,
    lineThickness: 0.21,
    lineDerivativePower: 1.22,
    glowAmount: 0.64,
    glowPower: 1.12,
    glowRamp: 1.2,
    displaceFrequencyX: 1.38,
    displaceFrequencyZ: 0.98,
    displaceAmount: 0.098,
    twistFrequencyX: 0.44,
    twistFrequencyY: 0.36,
    twistFrequencyZ: 0.3,
    twistPowerX: 0.056,
    twistPowerY: 0.042,
    twistPowerZ: 0.03,
  },
};

const cloneVector3 = (value: WaveVector3): WaveVector3 => [value[0], value[1], value[2]];

const cloneSceneConfig = (config: WaveSceneConfig): WaveSceneConfig => ({
  ...config,
  camera: {
    ...config.camera,
    position: cloneVector3(config.camera.position),
    target: cloneVector3(config.camera.target),
  },
  meshPosition: cloneVector3(config.meshPosition),
  meshRotation: cloneVector3(config.meshRotation),
  meshScale: cloneVector3(config.meshScale),
  geometry: { ...config.geometry },
  material: { ...config.material },
  pointer: { ...config.pointer },
  performance: { ...config.performance },
});

const getPerformanceConfig = (quality: WaveQuality): WavePerformanceConfig => ({
  warmupSeconds: 10,
  lowFpsThreshold: quality === "low" ? 38 : 45,
  lowFpsWindowSeconds: 8,
  antialias: quality !== "low",
});

const applyQualityAdjustments = (scene: WaveSceneConfig, quality: WaveQuality): WaveSceneConfig => {
  if (quality === "high") {
    return scene;
  }

  if (quality === "medium") {
    scene.material.lineAmount *= 0.96;
    scene.material.glowAmount *= 0.95;
    scene.material.displaceAmount *= 0.95;
    return scene;
  }

  if (quality === "low") {
    scene.material.lineAmount *= 0.86;
    scene.material.glowAmount *= 0.82;
    scene.material.displaceAmount *= 0.84;
    scene.material.lineThickness *= 0.9;
  }

  return scene;
};

export const resolveWaveBreakpoint = (width: number): WaveBreakpoint => {
  if (width < 640) return "mobile";
  if (width < 1264) return "tablet";
  return "desktop";
};

export const getWaveSceneConfig = (params: {
  theme: WaveTheme;
  breakpoint: WaveBreakpoint;
  quality: WaveQuality;
}): WaveSceneConfig => {
  const { theme, breakpoint, quality } = params;
  const materialSource = theme === "dark" ? DARK_MATERIALS : LIGHT_MATERIALS;

  const scene = cloneSceneConfig({
    theme,
    breakpoint,
    camera: CAMERA_CONFIGS[breakpoint],
    meshPosition: MESH_CONFIGS[breakpoint].meshPosition,
    meshRotation: MESH_CONFIGS[breakpoint].meshRotation,
    meshScale: MESH_CONFIGS[breakpoint].meshScale,
    geometry: GEOMETRY_CONFIGS[breakpoint],
    material: materialSource[breakpoint],
    pointer: POINTER_CONFIGS[breakpoint],
    performance: getPerformanceConfig(quality),
  });

  return applyQualityAdjustments(scene, quality);
};
