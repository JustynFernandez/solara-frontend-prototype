import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import InlineAction from "@/components/ui/inline-action";
const STORAGE_KEY = "solara:learn:path-progress";
const nextActionCopy = {
    navigator: { label: "Open Solar Navigator", href: "/solar-navigator" },
    projects: { label: "Open Project Workspaces", href: "/projects" },
    connect: { label: "Find a helper", href: "/connect" },
    learn: { label: "Open guide", href: "/learn" },
};
const LearningPathAccordion = ({ paths }) => {
    const [openId, setOpenId] = useState(paths[0]?.id ?? null);
    const [progress, setProgress] = useState({});
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved)
            return;
        try {
            setProgress(JSON.parse(saved));
        }
        catch {
            setProgress({});
        }
    }, []);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);
    const toggleStep = useCallback((pathId, stepId) => {
        setProgress((previous) => {
            const current = new Set(previous[pathId] || []);
            if (current.has(stepId))
                current.delete(stepId);
            else
                current.add(stepId);
            return { ...previous, [pathId]: Array.from(current) };
        });
    }, []);
    const completion = useMemo(() => paths.reduce((accumulator, path) => {
        const done = progress[path.id]?.length || 0;
        accumulator[path.id] = Math.round((done / path.steps.length) * 100);
        return accumulator;
    }, {}), [paths, progress]);
    return (_jsx("div", { className: "space-y-3", children: paths.map((path) => {
            const isOpen = openId === path.id;
            const percent = completion[path.id] ?? 0;
            const completeCount = progress[path.id]?.length || 0;
            const panelId = `${path.id}-panel`;
            return (_jsxs("section", { className: "overflow-hidden rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] shadow-[var(--solara-shadow-soft)]", children: [_jsxs("button", { type: "button", onClick: () => setOpenId(isOpen ? null : path.id), className: "flex w-full flex-col gap-4 px-4 py-4 text-left md:flex-row md:items-start md:justify-between", "aria-expanded": isOpen, "aria-controls": panelId, children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]", children: [_jsx("span", { className: "rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-accent-strong)]", children: path.pillar }), _jsx("span", { className: "rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]", children: path.difficulty }), _jsxs("span", { className: "rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]", children: [path.durationMins, " min"] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "text-xl font-semibold text-[var(--solara-text-strong)]", children: path.title }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: path.summary }), _jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: ["Outcome / ", path.outcome] })] })] }), _jsxs("div", { className: "flex items-center gap-3 md:pt-1", children: [_jsxs("span", { className: `rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${percent === 100
                                            ? "border-emerald-500/40 text-emerald-400"
                                            : "border-[var(--solara-rule)] text-[var(--solara-text-muted)]"}`, children: [completeCount, "/", path.steps.length] }), _jsx("div", { className: "w-24", children: _jsx("div", { className: "h-2 overflow-hidden rounded-full border border-[var(--solara-rule)] bg-[var(--solara-surface-2)]", role: "progressbar", "aria-valuenow": percent, "aria-valuemin": 0, "aria-valuemax": 100, children: _jsx("div", { className: `h-full transition-all ${percent === 100 ? "bg-emerald-500" : "bg-[var(--solara-accent)]"}`, style: { width: `${percent}%` }, "aria-hidden": true }) }) }), _jsx(ChevronDown, { className: `h-4 w-4 text-[var(--solara-text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}` })] })] }), isOpen ? (_jsxs("div", { id: panelId, className: "space-y-3 border-t border-[var(--solara-rule)] px-4 py-4", children: [percent === 100 ? (_jsx("div", { className: "rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-300", children: "Path completed. Move into the next route when you are ready." })) : null, _jsx("ul", { className: "space-y-2", children: path.steps.map((step) => {
                                    const checked = progress[path.id]?.includes(step.id);
                                    const action = nextActionCopy[step.recommendedNextAction];
                                    const nextHref = step.optionalSlugOrProjectId ? `/learn/${step.optionalSlugOrProjectId}` : action.href;
                                    return (_jsx("li", { className: "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("button", { type: "button", "aria-pressed": checked, onClick: () => toggleStep(path.id, step.id), className: `mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-sm border transition ${checked
                                                        ? "border-[var(--solara-accent)] bg-[var(--solara-accent)] text-[#131313]"
                                                        : "border-[var(--solara-rule)] bg-transparent text-[var(--solara-text-muted)]"}`, "aria-label": `Mark ${step.title} as ${checked ? "incomplete" : "complete"}`, children: checked ? _jsx(Check, { className: "h-3 w-3" }) : null }), _jsxs("div", { className: "min-w-0 flex-1 space-y-2", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "font-semibold text-[var(--solara-text-strong)]", children: step.title }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: step.description })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]", children: action.label }), _jsxs(Link, { to: nextHref, className: "solara-inline-action solara-inline-action--default inline-flex items-center gap-2", children: ["Do this next", _jsx(ArrowRight, { className: "h-4 w-4" })] })] })] })] }) }, step.id));
                                }) }), _jsx("div", { className: "border-t border-[var(--solara-rule)] pt-3", children: _jsx(InlineAction, { to: nextActionCopy[path.steps[0].recommendedNextAction].href, emphasis: "strong", children: "Move into the next workspace" }) })] })) : null] }, path.id));
        }) }));
};
export default LearningPathAccordion;
