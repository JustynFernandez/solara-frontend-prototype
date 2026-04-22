import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Command, Search, X } from "lucide-react";
import FilterChips from "./FilterChips";
const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];
const formatOptions = ["Guide", "Checklist", "Template", "Calculator"];
const pillarOptions = ["Plan", "Coordinate", "Sustain"];
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const highlight = (text, query) => {
    if (!query.trim())
        return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, "ig");
    const parts = text.split(regex);
    const lowerQuery = query.toLowerCase();
    return parts.map((part, idx) => part.toLowerCase() === lowerQuery ? (_jsx("mark", { className: "rounded bg-solara-blue/12 px-0.5 text-solara-blue-alt dark:bg-solara-blue/24 dark:text-solara-sky", children: part }, idx)) : (_jsx(React.Fragment, { children: part }, idx)));
};
// Inline search + Cmd/Ctrl+K command palette style search.
const LearnSearch = ({ guides }) => {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({ difficulty: null, format: null, pillar: null });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);
    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return guides
            .filter((guide) => {
            if (filters.difficulty && guide.difficulty !== filters.difficulty)
                return false;
            if (filters.format && guide.format !== filters.format)
                return false;
            if (filters.pillar && guide.pillar !== filters.pillar)
                return false;
            if (!normalizedQuery)
                return true;
            const haystack = `${guide.title} ${guide.summary} ${guide.tags.join(" ")} ${guide.takeaways.join(" ")}`.toLowerCase();
            return normalizedQuery.split(" ").every((term) => haystack.includes(term));
        })
            .slice(0, 8);
    }, [filters.difficulty, filters.format, filters.pillar, guides, query]);
    const renderResults = (compact = false) => (_jsxs("div", { className: "space-y-2", role: "list", "aria-live": "polite", children: [filtered.length === 0 && (_jsx("p", { className: "rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-sm text-slate-600 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-slate-200", children: "No matches yet. Try a different phrase or adjust filters." })), filtered.map((guide) => (_jsxs("div", { className: `rounded-2xl border border-white/70 bg-white/85 p-3 text-sm text-slate-900 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white ${compact ? "" : "space-y-1"}`, children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200", children: [_jsx("span", { className: "rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10", children: guide.format }), _jsx("span", { className: "rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10", children: guide.difficulty }), _jsx("span", { className: "rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10", children: guide.pillar }), _jsxs("span", { className: "rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10", children: [guide.durationMins, " min"] })] }), _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-base font-semibold text-slate-900 dark:text-white", children: highlight(guide.title, query) }), !compact && (_jsx("p", { className: "text-slate-700 dark:text-slate-200", children: highlight(guide.summary, query) })), _jsx("div", { className: "flex flex-wrap gap-2", children: guide.tags.slice(0, 4).map((tag) => (_jsx("span", { className: "rounded-full border border-white/70 bg-white/85 px-2 py-1 text-[11px] font-semibold text-solara-navy shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white", children: highlight(tag, query) }, tag))) })] }), _jsx(Link, { to: `/learn/${guide.slug}`, className: "inline-flex items-center gap-2 rounded-full bg-button-primary px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue", children: "Read" })] })] }, guide.slug)))] }));
    return (_jsxs("div", { className: "space-y-4 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 sm:p-6 text-slate-900 dark:text-white", role: "search", "aria-label": "Search learn content", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200", children: "Search" }), _jsx("h3", { className: "text-xl font-semibold text-slate-900 dark:text-white", children: "Find a guide or template" }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200", children: "Type a topic, press Cmd/Ctrl+K for quick search, or filter by pillar." })] }), _jsxs("button", { type: "button", onClick: () => setOpen(true), className: "hidden items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-xs font-semibold text-solara-navy shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white lg:inline-flex", children: [_jsx(Command, { className: "h-4 w-4" }), "Cmd/Ctrl + K"] })] }), _jsxs("div", { className: "flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Search, { className: "h-5 w-5 text-solara-blue dark:text-sky-300" }), _jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search titles, tags, or summaries", className: "w-full bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-slate-400", "aria-label": "Search learn content" }), query && (_jsx("button", { type: "button", onClick: () => setQuery(""), className: "rounded-full p-2 text-slate-500 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:text-slate-300 dark:hover:bg-white/10", "aria-label": "Clear search", children: _jsx(X, { className: "h-4 w-4" }) }))] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(FilterChips, { label: "Difficulty", options: difficultyOptions.map((d) => ({ value: d, label: d })), active: filters.difficulty, onChange: (v) => setFilters((f) => ({ ...f, difficulty: v })) }), _jsx(FilterChips, { label: "Format", options: formatOptions.map((d) => ({ value: d, label: d })), active: filters.format, onChange: (v) => setFilters((f) => ({ ...f, format: v })) }), _jsx(FilterChips, { label: "Pillar", options: pillarOptions.map((d) => ({ value: d, label: d })), active: filters.pillar, onChange: (v) => setFilters((f) => ({ ...f, pillar: v })) })] })] })] }), renderResults(), open && (_jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 py-10 backdrop-blur-sm", role: "dialog", "aria-modal": "true", "aria-label": "Search learn content", children: _jsxs("div", { className: "w-full max-w-3xl rounded-3xl border border-white/10 bg-[#050a16]/95 p-4 shadow-xl backdrop-blur", children: [_jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2", children: [_jsx(Command, { className: "h-5 w-5 text-sky-300" }), _jsx("input", { value: query, autoFocus: true, onChange: (e) => setQuery(e.target.value), placeholder: "Type to search guides, checklists, or templates", className: "w-full bg-transparent text-base text-white placeholder:text-slate-400 focus:outline-none", "aria-label": "Command search learn content" }), _jsx("button", { type: "button", onClick: () => setOpen(false), className: "rounded-full p-2 text-slate-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300", "aria-label": "Close search", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1", children: renderResults(true) })] }) }))] }));
};
export default LearnSearch;
