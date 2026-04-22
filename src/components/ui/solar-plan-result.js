import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Compass, PlugZap, Users, BookOpen } from "lucide-react";
import AnimatedButton from "./animated-button";
const SolarPlanResult = ({ plan }) => (_jsxs("div", { className: "space-y-4 rounded-3xl card-surface p-4 text-slate-900 dark:text-white backdrop-blur-2xl border border-white/50", children: [_jsx("div", { className: "flex items-center justify-between gap-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-100", children: "Solar starting points" }), _jsx("h3", { className: "text-2xl font-semibold", children: plan.title }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200", children: plan.summary })] }) }), _jsx("div", { className: "grid gap-3 md:grid-cols-2", children: plan.recommendations.map((rec, idx) => {
                const Icon = rec.icon;
                return (_jsxs(motion.div, { initial: { opacity: 0, y: 14, filter: "blur(6px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.45, delay: idx * 0.05, ease: [0.23, 0.82, 0.13, 1] }, className: "rounded-2xl border border-white/40 bg-white/20 p-4 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-white/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,123,255,0.12)] text-solara-navy ring-1 ring-[rgba(0,123,255,0.25)] dark:text-indigo-100", children: _jsx(Icon, { className: "h-5 w-5" }) }), _jsx("h4", { className: "text-lg font-semibold", children: rec.title })] }), _jsx("p", { className: "mt-2 text-sm text-slate-700 dark:text-slate-200", children: rec.description }), _jsx("div", { className: "pt-3", children: _jsx(AnimatedButton, { as: "a", href: rec.href, className: "px-4 py-2", children: rec.cta }) })] }, rec.title));
            }) }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(AnimatedButton, { href: "/projects", variant: "outline", className: "px-4 py-2", children: "Browse projects" }), _jsx(AnimatedButton, { href: "/connect", variant: "outline", className: "px-4 py-2", children: "Find helpers" }), _jsx(AnimatedButton, { href: "/learn", variant: "outline", className: "px-4 py-2", children: "Read guides" })] })] }));
export const buildPlan = (answers) => {
    const dwelling = answers.dwelling;
    const budget = answers.budget;
    const space = answers.space;
    let title = "Your solar path";
    let summary = "A tailored starting point based on your answers.";
    const recs = [];
    if (dwelling === "renter" || space === "flat") {
        title = "Community Solar Explorer";
        summary = "You’re a renter or shared-space user. Start with community solar or portable kits.";
        recs.push({ title: "Join community solar", description: "Subscribe to a local solar farm to offset your usage.", cta: "See community options", href: "/connect", icon: Users }, { title: "Try a portable kit", description: "Start small with a balcony or camping kit to learn safely.", cta: "View starter projects", href: "/projects", icon: PlugZap });
    }
    else if (dwelling === "owner" && space === "roof") {
        title = "Rooftop Starter";
        summary = "You have roof access. Begin with a small rooftop array and local helpers.";
        recs.push({ title: "Request a roof check", description: "Get a mock shade and load survey from helpers.", cta: "Find a helper", href: "/connect", icon: Compass }, { title: "Join a similar project", description: "Learn from active rooftop projects before you install.", cta: "Browse projects", href: "/projects", icon: Users });
    }
    else if (dwelling === "org") {
        title = "Community Workspace Lead";
        summary = "You represent a group. Start a workspace and coordinate volunteers.";
        recs.push({ title: "Create a workspace", description: "Spin up a mock workspace to track tasks and roles.", cta: "Open a workspace", href: "/projects", icon: Compass }, { title: "Find pro helpers", description: "Connect with verified helpers for scope definition.", cta: "Find helpers", href: "/connect", icon: Users });
    }
    else {
        recs.push({ title: "Learn the basics", description: "Start with the beginner guide to get confident.", cta: "Read guides", href: "/learn", icon: BookOpen }, { title: "Talk to a helper", description: "Ask for advice from a nearby helper.", cta: "Find helpers", href: "/connect", icon: Users });
    }
    if (budget === "free" || budget === "lt200") {
        recs.push({ title: "Budget-friendly kit", description: "Portable kit options and pay-as-you-go ideas.", cta: "View options", href: "/projects", icon: PlugZap });
    }
    return { title, summary, recommendations: recs };
};
export default SolarPlanResult;
