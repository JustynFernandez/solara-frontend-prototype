import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { motion } from "framer-motion";
// Large tappable card with animated glow for selections.
const OptionCard = forwardRef(({ label, description, icon, selected, onSelect }, ref) => (_jsxs(motion.button, { ref: ref, type: "button", whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, onClick: onSelect, "aria-pressed": selected, className: `group flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b1b3a] ${selected
        ? "border-[#007bff80] bg-white/80 text-slate-900 shadow-[0_14px_40px_rgba(0,123,255,0.22)] dark:bg-white/10 dark:text-white"
        : "border-slate-200 bg-white text-slate-900 hover:border-[#ffd70066] dark:border-white/10 dark:bg-white/5 dark:text-white"}`, children: [_jsx("div", { className: "flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#e8edff] text-[#003366] ring-1 ring-[#1f3b70] dark:bg-[#0b1b3a] dark:text-[#ffd700]", children: icon || _jsx("span", { className: "h-2 w-2 rounded-full bg-[#ffd700]" }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "font-semibold text-slate-900 dark:text-white", children: label }), description && _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-200/80", children: description })] }), selected && _jsx("span", { className: "ml-auto h-3 w-3 flex-none rounded-full bg-[#ffd700] shadow-[0_0_0_6px_rgba(255,215,0,0.25)]", "aria-hidden": true })] })));
OptionCard.displayName = "OptionCard";
export default OptionCard;
