import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const NavigatorProgress = ({ current, total }) => {
    const pct = Math.round(((current + 1) / total) * 100);
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#c7d2fe]", children: [_jsxs("span", { children: ["Question ", current + 1, " of ", total] }), _jsxs("span", { children: [pct, "%"] })] }), _jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-white/10", children: _jsx("div", { className: "h-full bg-gradient-to-r from-[#003366] via-[#0b4fbf] to-[#ffd700] transition-all", style: { width: `${pct}%` }, "aria-hidden": true }) })] }));
};
export default NavigatorProgress;
