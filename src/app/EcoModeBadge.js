import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useEcoMode } from "@/hooks/useEcoMode";
const EcoModeBadge = () => {
    const { ecoModeEnabled, toggleEcoMode, lowBattery, isLowEndDevice, prefersReducedMotion } = useEcoMode();
    const reasons = [lowBattery && "Low battery", isLowEndDevice && "Optimized device", prefersReducedMotion && "Reduced motion"].filter(Boolean);
    return (_jsxs("button", { type: "button", onClick: toggleEcoMode, "aria-pressed": ecoModeEnabled, className: "group relative inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 shadow-lg backdrop-blur transition hover:scale-[1.02] focus-visible:outline-none focus-glow dark:border-white/10 dark:bg-white/10 dark:text-slate-200", children: [_jsx("span", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-slate-500/10 via-slate-400/8 to-slate-300/10 opacity-0 transition duration-500 group-hover:opacity-100", "aria-hidden": true }), _jsx("span", { className: "relative inline-flex h-2 w-2 animate-pulse rounded-full bg-slate-500 shadow-[0_0_0_8px_rgba(100,116,139,0.18)] dark:bg-slate-300 dark:shadow-[0_0_0_8px_rgba(203,213,225,0.12)]", "aria-hidden": true }), ecoModeEnabled ? "Eco mode" : "Hyper visuals", reasons.length > 0 && (_jsx("span", { className: "relative rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-600 shadow-sm dark:bg-white/10 dark:text-slate-200", children: reasons.join(" / ") }))] }));
};
export default EcoModeBadge;
