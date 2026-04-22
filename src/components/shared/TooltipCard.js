import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const TooltipCard = ({ title, description }) => (_jsxs("div", { className: "pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 opacity-0 shadow-xl transition duration-200 peer-hover:opacity-100", children: [_jsx("div", { className: "font-semibold text-slate-900", children: title }), _jsx("div", { className: "mt-1 leading-relaxed", children: description })] }));
export default TooltipCard;
