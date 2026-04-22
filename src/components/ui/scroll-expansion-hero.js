import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
/**
 * ScrollExpandMedia (Vite/React adaptation)
 * - Removes Next.js dependency (next/image) and uses <img>.
 * - Keeps original behavior: scroll/touch drives expansion, locks scroll until expanded.
 */
const ScrollExpandMedia = ({ mediaType = "video", mediaSrc, posterSrc, bgImageSrc, title, date, scrollToExpand, textBlend, children, }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
    const [touchStartY, setTouchStartY] = useState(0);
    const [isMobileState, setIsMobileState] = useState(false);
    const [viewportSize, setViewportSize] = useState(() => ({
        width: typeof window !== "undefined" ? window.innerWidth : 1440,
        height: typeof window !== "undefined" ? window.innerHeight : 900,
    }));
    const sectionRef = useRef(null);
    useEffect(() => {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
    }, [mediaType]);
    useEffect(() => {
        const handleWheel = (event) => {
            if (mediaFullyExpanded && event.deltaY < 0 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                event.preventDefault();
            }
            else if (!mediaFullyExpanded) {
                event.preventDefault();
                const scrollDelta = event.deltaY * 0.0009;
                const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
                setScrollProgress(newProgress);
                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                }
                else if (newProgress < 0.75) {
                    setShowContent(false);
                }
            }
        };
        const handleTouchStart = (event) => {
            setTouchStartY(event.touches[0].clientY);
        };
        const handleTouchMove = (event) => {
            if (!touchStartY)
                return;
            const touchY = event.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                event.preventDefault();
            }
            else if (!mediaFullyExpanded) {
                event.preventDefault();
                // Increased sensitivity on mobile, especially when scrolling back.
                const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
                const scrollDelta = deltaY * scrollFactor;
                const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
                setScrollProgress(newProgress);
                if (newProgress >= 1) {
                    setMediaFullyExpanded(true);
                    setShowContent(true);
                }
                else if (newProgress < 0.75) {
                    setShowContent(false);
                }
                setTouchStartY(touchY);
            }
        };
        const handleTouchEnd = () => {
            setTouchStartY(0);
        };
        const handleScroll = () => {
            if (!mediaFullyExpanded) {
                window.scrollTo(0, 0);
            }
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("scroll", handleScroll, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [scrollProgress, mediaFullyExpanded, touchStartY]);
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobileState(window.innerWidth < 768);
            setViewportSize({ width: window.innerWidth, height: window.innerHeight });
        };
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);
    const collapsedWidth = isMobileState ? Math.min(320, viewportSize.width * 0.84) : Math.min(560, viewportSize.width * 0.44);
    const collapsedHeight = isMobileState ? Math.min(420, viewportSize.height * 0.58) : Math.min(520, viewportSize.height * 0.62);
    const mediaWidth = collapsedWidth + scrollProgress * (viewportSize.width - collapsedWidth);
    const mediaHeight = collapsedHeight + scrollProgress * (viewportSize.height - collapsedHeight);
    const mediaRadius = Math.max(0, 22 - scrollProgress * 22);
    const mediaShadowAlpha = Math.max(0, 0.3 - scrollProgress * 0.25);
    const mediaShadowBlur = Math.max(0, 50 - scrollProgress * 42);
    const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
    const firstWord = title ? title.split(" ")[0] : "";
    const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";
    return (_jsx("div", { ref: sectionRef, className: "overflow-x-hidden transition-colors duration-700 ease-in-out", children: _jsx("section", { className: "relative flex min-h-[100dvh] flex-col items-center justify-start", children: _jsxs("div", { className: "relative flex min-h-[100dvh] w-full flex-col items-center", children: [_jsxs(motion.div, { className: "absolute inset-0 z-0 h-full", initial: { opacity: 0 }, animate: { opacity: 1 - scrollProgress }, transition: { duration: 0.1 }, children: [_jsx("img", { src: bgImageSrc, alt: "Background", className: "h-screen w-screen object-cover object-center", loading: "eager" }), _jsx("div", { className: "absolute inset-0 bg-black/10" })] }), _jsxs("div", { className: "relative z-10 flex w-full flex-col items-center justify-start", children: [_jsxs("div", { className: "relative flex h-[100dvh] w-full flex-col items-center justify-center", children: [_jsxs("div", { className: "absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-none", style: {
                                            width: `${mediaWidth}px`,
                                            height: `${mediaHeight}px`,
                                            maxWidth: "100vw",
                                            maxHeight: "100dvh",
                                            borderRadius: `${mediaRadius}px`,
                                            boxShadow: `0px 0px ${mediaShadowBlur}px rgba(0, 0, 0, ${mediaShadowAlpha})`,
                                        }, children: [mediaType === "video" ? (mediaSrc.includes("youtube.com") ? (_jsxs("div", { className: "relative h-full w-full pointer-events-none", children: [_jsx("iframe", { width: "100%", height: "100%", src: mediaSrc.includes("embed")
                                                            ? mediaSrc + (mediaSrc.includes("?") ? "&" : "?") + "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                                                            : mediaSrc.replace("watch?v=", "embed/") +
                                                                "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                                                                mediaSrc.split("v=")[1], className: "h-full w-full", frameBorder: 0, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, style: { borderRadius: `${mediaRadius}px` } }), _jsx("div", { className: "pointer-events-none absolute inset-0 z-10" }), _jsx(motion.div, { className: "absolute inset-0 bg-black/30", initial: { opacity: 0.7 }, animate: { opacity: 0.5 - scrollProgress * 0.3 }, transition: { duration: 0.2 }, style: { borderRadius: `${mediaRadius}px` } })] })) : (_jsxs("div", { className: "relative h-full w-full pointer-events-none", children: [_jsx("video", { src: mediaSrc, poster: posterSrc, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", className: "h-full w-full object-cover", controls: false, disablePictureInPicture: true, disableRemotePlayback: true, style: { borderRadius: `${mediaRadius}px` } }), _jsx("div", { className: "pointer-events-none absolute inset-0 z-10" }), _jsx(motion.div, { className: "absolute inset-0 bg-black/30", initial: { opacity: 0.7 }, animate: { opacity: 0.5 - scrollProgress * 0.3 }, transition: { duration: 0.2 }, style: { borderRadius: `${mediaRadius}px` } })] }))) : (_jsxs("div", { className: "relative h-full w-full", children: [_jsx("img", { src: mediaSrc, alt: title || "Media content", className: "h-full w-full object-cover", loading: "eager", style: { borderRadius: `${mediaRadius}px` } }), _jsx(motion.div, { className: "absolute inset-0 bg-black/50", initial: { opacity: 0.7 }, animate: { opacity: 0.7 - scrollProgress * 0.3 }, transition: { duration: 0.2 }, style: { borderRadius: `${mediaRadius}px` } })] })), _jsxs("div", { className: "relative z-10 mt-4 flex flex-col items-center text-center transition-none", children: [date && (_jsx("p", { className: "text-2xl text-white/80", style: { transform: `translateX(-${textTranslateX}vw)` }, children: date })), scrollToExpand && (_jsx("p", { className: "text-center text-white/80", style: { transform: `translateX(${textTranslateX}vw)` }, children: scrollToExpand }))] })] }), _jsxs("div", { className: [
                                            "relative z-10 flex w-full flex-col items-center justify-center gap-4 text-center transition-none",
                                            textBlend ? "mix-blend-difference" : "mix-blend-normal",
                                        ].join(" "), children: [_jsx(motion.h2, { className: "text-4xl font-semibold text-white/90 transition-none md:text-5xl lg:text-6xl", style: { transform: `translateX(-${textTranslateX}vw)` }, children: firstWord }), _jsx(motion.h2, { className: "text-center text-4xl font-semibold text-white/90 transition-none md:text-5xl lg:text-6xl", style: { transform: `translateX(${textTranslateX}vw)` }, children: restOfTitle })] })] }), _jsx(motion.section, { className: "flex w-full flex-col px-8 py-10 md:px-16 lg:py-20", initial: { opacity: 0 }, animate: { opacity: showContent ? 1 : 0 }, transition: { duration: 0.7 }, children: children })] })] }) }) }));
};
export default ScrollExpandMedia;
