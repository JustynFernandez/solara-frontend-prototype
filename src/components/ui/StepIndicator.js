import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { motion } from "framer-motion";
import { useEcoMode } from "../../hooks/useEcoMode";
const StepIndicator = ({ steps, currentStep = 0, compact = false, current, total, className = "", }) => {
    const { ecoModeEnabled } = useEcoMode();
    // Legacy mode: simple progress bar
    if (typeof current === "number" && typeof total === "number" && !steps) {
        const percent = Math.round(((current + 1) / total) * 100);
        return (_jsxs("div", { className: `flex items-center gap-3 ${className}`, children: [_jsx("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-[rgba(0,123,255,0.18)]", children: _jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-[#003366] via-[#0b4fbf] to-[#d4af37] transition-all", style: { width: `${percent}%` } }) }), _jsxs("span", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-100", children: [percent, "%"] })] }));
    }
    // New mode: stepped visual indicator
    if (!steps || steps.length === 0)
        return null;
    return (_jsx("div", { className: `flex items-center ${compact ? "gap-2" : "justify-between"} ${className}`, children: steps.map((step, idx) => {
            const isComplete = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: `flex ${compact ? "items-center gap-2" : "flex-col items-center"}`, children: [_jsx(motion.div, { initial: false, animate: ecoModeEnabled
                                    ? {}
                                    : {
                                        scale: isCurrent ? 1.05 : 1,
                                    }, transition: { duration: 0.2 }, className: `flex items-center justify-center rounded-full border-2 transition-colors ${compact ? "h-8 w-8" : "h-10 w-10"} ${isComplete
                                    ? "border-solara-blue bg-solara-blue text-white"
                                    : isCurrent
                                        ? "border-solara-blue bg-solara-blue text-white"
                                        : "border-slate-300 bg-transparent text-slate-400 dark:border-slate-600"}`, children: isComplete ? (_jsx("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: _jsx("path", { d: "M20 6 9 17l-5-5", strokeLinecap: "round", strokeLinejoin: "round" }) })) : (_jsx("span", { className: `font-semibold ${compact ? "text-xs" : "text-sm"}`, children: idx + 1 })) }), !compact && (_jsx("span", { className: `mt-2 text-center text-xs font-medium ${isCurrent ? "text-solara-blue dark:text-solara-sky" : "text-slate-500 dark:text-slate-400"}`, children: step.label })), compact && isCurrent && (_jsx("span", { className: "text-xs font-medium text-solara-blue dark:text-solara-sky", children: step.label }))] }), idx < steps.length - 1 && (_jsx("div", { className: `${compact ? "w-8" : "mx-2 flex-1"} h-0.5 bg-slate-200 dark:bg-slate-700`, children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: isComplete ? "100%" : "0%" }, className: "h-full bg-solara-blue", transition: ecoModeEnabled ? { duration: 0 } : { duration: 0.3 } }) }))] }, step.label + idx));
        }) }));
};
export default StepIndicator;
