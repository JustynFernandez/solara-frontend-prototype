import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export const skillDetails = {
    Installation: "Site surveys, mounting, and safe panel placement.",
    Wiring: "String layouts, combiner boxes, and cable management.",
    Safety: "PPE, lockout-tagout, and scaffold awareness.",
    Tools: "Ladders, crimpers, torque wrenches, and shared gear.",
    Maintenance: "Panel cleaning, torque checks, and inverter upkeep.",
    Storage: "Battery sizing, placement, and charge controller setup.",
    "Advice & Learning": "Workshops, walkthroughs, and design reviews.",
    Design: "System sizing, shading checks, and proposal sketches.",
    "Community Projects": "Coordinating volunteers and build weekends.",
    Fundraising: "Grant writing, local sponsorships, and outreach.",
    Monitoring: "Dashboards, alerts, and performance tuning.",
};
const toneMap = {
    Installation: "bg-amber-50 text-amber-700 border-amber-200",
    Wiring: "bg-orange-50 text-orange-700 border-orange-200",
    Safety: "bg-rose-50 text-rose-700 border-rose-200",
    Tools: "bg-sky-50 text-sky-700 border-sky-200",
    Maintenance: "bg-blue-50 text-blue-700 border-blue-200",
    Storage: "bg-teal-50 text-teal-700 border-teal-200",
    "Advice & Learning": "bg-emerald-50 text-emerald-700 border-emerald-200",
    Design: "bg-lime-50 text-lime-700 border-lime-200",
    "Community Projects": "bg-indigo-50 text-indigo-700 border-indigo-200",
    Fundraising: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    Monitoring: "bg-cyan-50 text-cyan-700 border-cyan-200",
    Default: "bg-slate-50 text-slate-700 border-slate-200",
};
const iconMap = {
    Installation: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("rect", { x: "4", y: "10", width: "16", height: "7", rx: "2" }), _jsx("path", { d: "M4 13h16M9 10V7a3 3 0 0 1 6 0v3" })] })),
    Wiring: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("path", { d: "M5 7h3v5a4 4 0 1 0 8 0V7h3" }), _jsx("path", { d: "M5 17h3a4 4 0 0 0 8 0h3" })] })),
    Safety: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("path", { d: "M12 4 5 7v5c0 4 2.5 6.5 7 8 4.5-1.5 7-4 7-8V7z" }), _jsx("path", { d: "M12 9v5m0 0h3" })] })),
    Tools: (props) => (_jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: _jsx("path", { d: "m8 3-2 2 3 3-4 4 4 4-3 3 2 2 3-3 4-4-3-3 3-3z" }) })),
    Maintenance: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("circle", { cx: "12", cy: "12", r: "4" }), _jsx("path", { d: "M4 12h2m12 0h2M12 4v2m0 12v2m-5-1 1-1m8-8 1-1m0 10-1-1m-8-8-1-1" })] })),
    Storage: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2" }), _jsx("path", { d: "M9 9h6v6H9zM7 12h2m6 0h2" })] })),
    "Advice & Learning": (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("path", { d: "M12 4 5 7v9l7 4 7-4V7z" }), _jsx("path", { d: "M12 11v7m-3-4h6" })] })),
    Design: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("path", { d: "M7 7h10v10H7z" }), _jsx("path", { d: "M7 12h10M12 7v10" })] })),
    "Community Projects": (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("circle", { cx: "8", cy: "10", r: "3" }), _jsx("circle", { cx: "16", cy: "10", r: "3" }), _jsx("path", { d: "M5 20c0-2 1.5-4 3-4h8c1.5 0 3 2 3 4" })] })),
    Fundraising: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("path", { d: "M8 14a4 4 0 1 0 0-8h8a4 4 0 1 1 0 8z" }), _jsx("path", { d: "M12 6v12" })] })),
    Monitoring: (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: [_jsx("path", { d: "M4 6h16v12H4z" }), _jsx("path", { d: "M7 14l3-3 2 2 3-4 2 3" })] })),
    Default: (props) => (_jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", ...props, children: _jsx("circle", { cx: "12", cy: "12", r: "6" }) })),
};
export const SkillIcon = ({ name, className = "", iconClassName = "h-5 w-5" }) => {
    const Icon = iconMap[name] || iconMap.Default;
    const tone = toneMap[name] || toneMap.Default;
    return (_jsx("span", { className: `inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium ${tone} ${className}`, title: name, children: _jsx(Icon, { className: iconClassName }) }));
};
export default SkillIcon;
