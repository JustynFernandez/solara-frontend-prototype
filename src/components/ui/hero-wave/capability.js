const REQUIRED_EXTENSIONS = ["OES_standard_derivatives"];
const isFeatureFlagDisabled = () => {
    const featureFlag = import.meta.env.VITE_HERO_WAVE;
    return typeof featureFlag === "string" && featureFlag.toLowerCase() === "off";
};
const resolveQuality = (coarsePointer) => {
    if (typeof navigator === "undefined")
        return "medium";
    const cores = navigator.hardwareConcurrency || 0;
    const memory = navigator.deviceMemory || 0;
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (viewportWidth < 640 || coarsePointer || cores <= 4 || (memory > 0 && memory <= 4)) {
        return "low";
    }
    if (viewportWidth >= 1280 && cores >= 8 && (memory === 0 || memory >= 8)) {
        return "high";
    }
    return "medium";
};
const hasWebGLSupport = () => {
    if (typeof window === "undefined")
        return { ok: false, reason: "no-window" };
    const canvas = document.createElement("canvas");
    const createAttributes = (strict) => ({
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        failIfMajorPerformanceCaveat: strict,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
    });
    const getStrictContext = (strict) => {
        const attributes = createAttributes(strict);
        const gl2 = canvas.getContext("webgl2", attributes);
        if (gl2)
            return { context: gl2, allowMajorPerformanceCaveat: !strict };
        const gl = canvas.getContext("webgl", attributes);
        if (!gl)
            return { context: null, allowMajorPerformanceCaveat: !strict };
        const missing = REQUIRED_EXTENSIONS.filter((name) => !gl.getExtension(name));
        if (missing.length > 0) {
            return {
                context: null,
                allowMajorPerformanceCaveat: !strict,
                reason: `missing-extension:${missing.join(",")}`,
            };
        }
        return { context: gl, allowMajorPerformanceCaveat: !strict };
    };
    const strictContext = getStrictContext(true);
    if (strictContext.context)
        return { ok: true };
    if (strictContext.reason?.startsWith("missing-extension:")) {
        return { ok: false, reason: strictContext.reason };
    }
    const relaxedContext = getStrictContext(false);
    if (relaxedContext.context) {
        return {
            ok: false,
            reason: "major-performance-caveat",
            allowMajorPerformanceCaveat: true,
        };
    }
    return { ok: false, reason: relaxedContext.reason ?? "webgl-unavailable" };
};
export const detectWaveCapability = () => {
    if (typeof window === "undefined") {
        return {
            enabled: false,
            reason: "no-window",
            quality: "none",
            coarsePointer: false,
            prefersReducedMotion: false,
            allowMajorPerformanceCaveat: false,
            forced: false,
        };
    }
    if (isFeatureFlagDisabled()) {
        return {
            enabled: false,
            reason: "feature-flag-off",
            quality: "none",
            coarsePointer: false,
            prefersReducedMotion: false,
            allowMajorPerformanceCaveat: false,
            forced: false,
        };
    }
    const params = new URLSearchParams(window.location.search);
    const forceWebGL = import.meta.env.DEV && params.has("__forceWebGL");
    if (params.has("__disableWebGL")) {
        return {
            enabled: false,
            reason: "query-param-disabled",
            quality: "none",
            coarsePointer: false,
            prefersReducedMotion: false,
            allowMajorPerformanceCaveat: false,
            forced: false,
        };
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const webgl = hasWebGLSupport();
    if (!webgl.ok) {
        if (webgl.reason === "major-performance-caveat") {
            return {
                enabled: true,
                quality: resolveQuality(coarsePointer),
                coarsePointer,
                prefersReducedMotion,
                allowMajorPerformanceCaveat: true,
                forced: forceWebGL,
            };
        }
        return {
            enabled: false,
            reason: webgl.reason,
            quality: "none",
            coarsePointer,
            prefersReducedMotion,
            allowMajorPerformanceCaveat: Boolean(webgl.allowMajorPerformanceCaveat),
            forced: false,
        };
    }
    return {
        enabled: true,
        quality: resolveQuality(coarsePointer),
        coarsePointer,
        prefersReducedMotion,
        allowMajorPerformanceCaveat: false,
        forced: forceWebGL,
    };
};
