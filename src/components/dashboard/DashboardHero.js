import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const DashboardHero = ({ user, profileCompleteness = 60 }) => {
    const displayName = user.displayName || user.email.split("@")[0];
    const greeting = getGreeting();
    return (_jsx("div", { className: "relative overflow-hidden rounded-[1.4rem] border border-[var(--solara-rule-soft)] bg-[color-mix(in_srgb,var(--solara-surface-1)_88%,transparent)] p-5 shadow-[var(--solara-shadow-soft)] sm:p-6", children: _jsxs("div", { className: "relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsxs("svg", { className: "h-20 w-20 -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "currentColor", strokeWidth: "6", className: "text-slate-200 dark:text-slate-700" }), _jsx(motion.circle, { cx: "50", cy: "50", r: "45", fill: "none", stroke: "url(#progressGradient)", strokeWidth: "6", strokeLinecap: "round", strokeDasharray: `${profileCompleteness * 2.83} 283`, initial: { strokeDasharray: "0 283" }, animate: { strokeDasharray: `${profileCompleteness * 2.83} 283` }, transition: { duration: 1, delay: 0.3 } }), _jsx("defs", { children: _jsxs("linearGradient", { id: "progressGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#007bff" }), _jsx("stop", { offset: "100%", stopColor: "#d4af37" })] }) })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: user.avatarUrl ? (_jsx("img", { src: user.avatarUrl, alt: "", className: "h-14 w-14 rounded-full object-cover" })) : (_jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-solara-blue to-solara-blue-alt text-xl font-bold text-white", children: displayName.charAt(0).toUpperCase() })) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: greeting }), _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl", children: displayName }), _jsxs("p", { className: "mt-1 text-sm text-slate-500 dark:text-slate-400", children: ["Profile ", profileCompleteness, "% complete"] })] })] }), profileCompleteness < 100 && (_jsxs(Link, { to: "/account/create", className: "inline-flex items-center gap-2 rounded-full border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-5 py-2.5 text-sm font-semibold text-[var(--solara-accent-strong)] transition hover:border-[var(--solara-accent-soft)]", children: ["Complete Profile", _jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("path", { d: "m9 18 6-6-6-6" }) })] }))] }) }));
};
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12)
        return "Good morning";
    if (hour < 17)
        return "Good afternoon";
    return "Good evening";
}
export default DashboardHero;
