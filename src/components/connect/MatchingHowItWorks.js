import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionContainer from "../ui/section-container";
const steps = [
    { title: "Describe your task", detail: "Share site context, timelines, and safety needs." },
    { title: "Choose support level", detail: "Community, trained, or certified help for mains wiring." },
    { title: "Confirm contact method", detail: "Set expectations on response time and availability." },
    { title: "Move into a workspace", detail: "Track tasks, files, and helpers in one place." },
];
const MatchingHowItWorks = () => (_jsxs(SectionContainer, { className: "space-y-4 py-10", children: [_jsxs("div", { className: "space-y-1 text-slate-900 dark:text-white", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200", children: "How matching works" }), _jsx("h2", { className: "text-2xl font-semibold", children: "Request, match, and get to work" }), _jsx("span", { className: "handmade-underline h-3 w-28", "aria-hidden": true })] }), _jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: steps.map((step, idx) => (_jsxs("div", { className: "motion-purpose rounded-2xl border border-white/60 bg-white/85 p-4 text-slate-900 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-solara-navy text-solara-gold shadow-glow", children: idx + 1 }), _jsx("p", { className: "mt-2 text-sm font-semibold", children: step.title }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200", children: step.detail })] }, step.title))) })] }));
export default MatchingHowItWorks;
