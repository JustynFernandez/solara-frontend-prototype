import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SectionContainer from "../ui/section-container";
const steps = [
    { title: "Start Navigator", detail: "Save a draft and pick your path." },
    { title: "Create Workspace", detail: "Add tasks, docs, and invite helpers." },
    { title: "Request support", detail: "Choose community or certified help." },
    { title: "Maintain and improve", detail: "Track safety checks and upgrades." },
];
const HowItWorksTimeline = () => (_jsxs(SectionContainer, { className: "py-10", children: [_jsxs("div", { className: "space-y-2 text-slate-900 dark:text-white", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200", children: "How it works" }), _jsx("h2", { className: "text-3xl font-semibold", children: "From plan to sustained uptime" }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200/80", children: "Clear steps you can repeat for the next project." })] }), _jsx("div", { className: "mt-6 grid gap-6 lg:grid-cols-4", children: steps.map((step, idx) => (_jsxs("div", { className: "flex items-start gap-3 rounded-2xl border border-white/50 bg-white/80 p-4 text-slate-900 shadow-[0_18px_70px_rgba(0,51,102,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white", children: [_jsx("div", { className: "flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#003366] text-[#ffd700] shadow-[0_10px_30px_rgba(0,51,102,0.35)]", children: idx + 1 }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: step.title }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200/85", children: step.detail })] })] }, step.title))) })] }));
export default HowItWorksTimeline;
