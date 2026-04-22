import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { detectWaveCapability } from "./capability";
import { resolveWaveBreakpoint } from "./SolaraWaveConfig";
import { SolaraWaveEngine } from "./SolaraWaveEngine";
const DEFAULT_CAPABILITY = {
    enabled: false,
    reason: "no-window",
    quality: "none",
    coarsePointer: false,
    prefersReducedMotion: false,
};
const useResolvedTheme = (theme) => {
    const [resolvedTheme, setResolvedTheme] = React.useState(() => {
        if (theme !== "auto")
            return theme;
        if (typeof document === "undefined")
            return "light";
        return document.documentElement.classList.contains("dark") ? "dark" : "light";
    });
    React.useEffect(() => {
        if (theme !== "auto") {
            setResolvedTheme(theme);
            return;
        }
        const root = document.documentElement;
        const update = () => setResolvedTheme(root.classList.contains("dark") ? "dark" : "light");
        update();
        const observer = new MutationObserver(update);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, [theme]);
    return resolvedTheme;
};
const getDevFlag = (flag) => {
    if (!import.meta.env.DEV || typeof window === "undefined")
        return false;
    return new URLSearchParams(window.location.search).has(flag);
};
const getDevNumberFlag = (flag) => {
    if (!import.meta.env.DEV || typeof window === "undefined")
        return null;
    const rawValue = new URLSearchParams(window.location.search).get(flag);
    if (!rawValue)
        return null;
    const parsed = Number(rawValue);
    if (!Number.isFinite(parsed))
        return null;
    return Math.min(1, Math.max(0, parsed));
};
const HeroWaveAnimation = ({ className = "", theme = "auto", interactive = true }) => {
    const rootRef = React.useRef(null);
    const contentsRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const engineRef = React.useRef(null);
    const warnedRef = React.useRef(false);
    const engineKeyRef = React.useRef("");
    const resolvedTheme = useResolvedTheme(theme);
    const waveDebugEnabled = getDevFlag("__waveDebug");
    const waveCaptureEnabled = getDevFlag("__waveCapture");
    const waveNoArtEnabled = getDevFlag("__waveNoArt");
    const waveCanvasOpacity = getDevNumberFlag("__waveCanvasOpacity");
    const [hasMounted, setHasMounted] = React.useState(false);
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const [hasDrawn, setHasDrawn] = React.useState(false);
    const [initFailed, setInitFailed] = React.useState(false);
    const [capability, setCapability] = React.useState(() => typeof window === "undefined" ? DEFAULT_CAPABILITY : detectWaveCapability());
    const [selectedBucket, setSelectedBucket] = React.useState(() => typeof window === "undefined" ? "desktop" : resolveWaveBreakpoint(window.innerWidth));
    React.useEffect(() => {
        setHasMounted(true);
    }, []);
    React.useEffect(() => {
        if (typeof window === "undefined")
            return undefined;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const coarsePointer = window.matchMedia("(pointer: coarse)");
        const update = () => {
            setCapability(detectWaveCapability());
            setSelectedBucket(resolveWaveBreakpoint(window.innerWidth));
        };
        update();
        window.addEventListener("resize", update, { passive: true });
        if (typeof reducedMotion.addEventListener === "function") {
            reducedMotion.addEventListener("change", update);
            coarsePointer.addEventListener("change", update);
        }
        else {
            // @ts-expect-error Safari fallback.
            reducedMotion.addListener(update);
            // @ts-expect-error Safari fallback.
            coarsePointer.addListener(update);
        }
        return () => {
            window.removeEventListener("resize", update);
            if (typeof reducedMotion.removeEventListener === "function") {
                reducedMotion.removeEventListener("change", update);
                coarsePointer.removeEventListener("change", update);
            }
            else {
                // @ts-expect-error Safari fallback.
                reducedMotion.removeListener(update);
                // @ts-expect-error Safari fallback.
                coarsePointer.removeListener(update);
            }
        };
    }, []);
    React.useEffect(() => {
        const root = rootRef.current;
        if (!root || typeof IntersectionObserver === "undefined") {
            setIsIntersecting(true);
            return undefined;
        }
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, {
            threshold: 0,
            rootMargin: "20px 0px",
        });
        observer.observe(root);
        return () => observer.disconnect();
    }, []);
    const allowInteraction = interactive && !waveCaptureEnabled;
    const allowLive = hasMounted && capability.enabled && !initFailed;
    React.useEffect(() => {
        const engineKey = `${resolvedTheme}:${capability.quality}:${allowInteraction}:${waveCaptureEnabled}`;
        if (engineKeyRef.current === engineKey)
            return;
        engineKeyRef.current = engineKey;
        engineRef.current?.dispose();
        engineRef.current = null;
        warnedRef.current = false;
        setHasDrawn(false);
        setInitFailed(false);
    }, [allowInteraction, capability.quality, resolvedTheme, waveCaptureEnabled]);
    React.useEffect(() => {
        if (allowLive)
            return;
        engineRef.current?.dispose();
        engineRef.current = null;
        setHasDrawn(false);
    }, [allowLive]);
    React.useEffect(() => {
        if (!allowLive || !isIntersecting || !contentsRef.current || !canvasRef.current) {
            engineRef.current?.pause();
            return undefined;
        }
        let cancelled = false;
        const startEngine = async () => {
            if (!engineRef.current) {
                engineRef.current = new SolaraWaveEngine({
                    container: contentsRef.current,
                    canvas: canvasRef.current,
                    theme: resolvedTheme,
                    quality: capability.quality,
                    interactive: allowInteraction,
                    allowMajorPerformanceCaveat: capability.allowMajorPerformanceCaveat,
                    onFirstFrame: () => {
                        if (!cancelled) {
                            setHasDrawn(true);
                        }
                    },
                    onError: () => {
                        if (!cancelled) {
                            setInitFailed(true);
                            engineRef.current?.dispose();
                            engineRef.current = null;
                        }
                    },
                    onConfigResolved: ({ bucket }) => {
                        if (!cancelled) {
                            setSelectedBucket(bucket);
                        }
                    },
                });
            }
            try {
                await engineRef.current.start();
            }
            catch (error) {
                if (!cancelled) {
                    setInitFailed(true);
                    engineRef.current?.dispose();
                    engineRef.current = null;
                    if (import.meta.env.DEV && !warnedRef.current) {
                        warnedRef.current = true;
                        console.warn("[hero-wave] Live wave initialization failed.", error);
                    }
                }
            }
        };
        void startEngine();
        return () => {
            cancelled = true;
            engineRef.current?.pause();
        };
    }, [allowInteraction, allowLive, capability.quality, isIntersecting, resolvedTheme]);
    React.useEffect(() => {
        return () => {
            engineRef.current?.dispose();
            engineRef.current = null;
        };
    }, []);
    React.useEffect(() => {
        if (!waveDebugEnabled)
            return;
        console.info("[hero-wave] capability", capability);
    }, [capability, waveDebugEnabled]);
    React.useEffect(() => {
        if (!waveDebugEnabled)
            return;
        console.info("[hero-wave] config", {
            theme: resolvedTheme,
            bucket: selectedBucket,
            quality: capability.quality,
            liveEnabled: allowLive,
            captureMode: waveCaptureEnabled,
            forceWebGL: capability.forced,
            allowMajorPerformanceCaveat: capability.allowMajorPerformanceCaveat,
        });
    }, [allowLive, capability.quality, resolvedTheme, selectedBucket, waveCaptureEnabled, waveDebugEnabled]);
    React.useEffect(() => {
        if (!waveDebugEnabled || allowLive || !initFailed)
            return;
        console.info("[hero-wave] fallback", initFailed ? "init-error" : `capability:${capability.reason ?? "unknown"}`);
    }, [allowLive, capability.reason, initFailed, waveDebugEnabled]);
    const rootClassName = ["hero-wave-animation", className].filter(Boolean).join(" ");
    const contentsClassName = ["hero-wave-animation__contents", hasDrawn ? "hero-wave-animation--drawn" : ""].filter(Boolean).join(" ");
    const artSrc = resolvedTheme === "dark" ? "/hero-wave-art-dark.png" : "/hero-wave-art-light.png";
    const hideArt = allowLive && (hasDrawn || waveNoArtEnabled);
    const artStyle = { opacity: hideArt ? 0 : 0.98, transition: "opacity 280ms ease" };
    const canvasStyle = waveCanvasOpacity == null ? undefined : { opacity: waveCanvasOpacity };
    return (_jsx("div", { ref: rootRef, className: rootClassName, "aria-hidden": "true", children: _jsx("div", { className: "hero-wave-animation__layout", children: _jsxs("div", { ref: contentsRef, className: contentsClassName, children: [_jsx("img", { src: artSrc, className: "hero-wave-animation__art", alt: "", "aria-hidden": "true", style: artStyle }), allowLive ? _jsx("canvas", { ref: canvasRef, className: "hero-wave-animation__canvas", "aria-hidden": "true", style: canvasStyle }) : null] }) }) }));
};
export default HeroWaveAnimation;
