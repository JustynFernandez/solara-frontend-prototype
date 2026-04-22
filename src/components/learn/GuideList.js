import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { ChevronDown, Clock, ShieldAlert, Bookmark, BookmarkCheck, CheckCircle2, Star, } from "lucide-react";
import { useLearnStore } from "../../store/useLearnStore";
import FilterRail from "@/components/ui/filter-rail";
import InlineAction from "@/components/ui/inline-action";
const GuideList = ({ guides }) => {
    const [expanded, setExpanded] = useState(null);
    const [sort, setSort] = useState("relevant");
    const [filter, setFilter] = useState("all");
    const { bookmarkedGuides, toggleBookmark, completedGuides } = useLearnStore();
    const filtered = useMemo(() => {
        switch (filter) {
            case "bookmarked":
                return guides.filter((guide) => bookmarkedGuides.includes(guide.slug));
            case "incomplete":
                return guides.filter((guide) => !completedGuides.includes(guide.slug));
            default:
                return guides;
        }
    }, [guides, filter, bookmarkedGuides, completedGuides]);
    const sorted = useMemo(() => {
        const items = [...filtered];
        switch (sort) {
            case "newest":
                return items.sort((a, b) => (b.published || "").localeCompare(a.published || ""));
            case "shortest":
                return items.sort((a, b) => a.durationMins - b.durationMins);
            case "safety":
                return items.sort((a, b) => Number(b.safetyCritical ?? false) - Number(a.safetyCritical ?? false));
            default:
                return items;
        }
    }, [filtered, sort]);
    return (_jsxs("div", { className: "space-y-4", id: "guides", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]", children: "Guide library" }), _jsx("h3", { className: "text-2xl font-semibold text-[var(--solara-text-strong)]", children: "Featured guides with expandable previews." }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Review key takeaways before you open the full article, then continue into the guide only when you need the full detail." })] }), _jsx(FilterRail, { label: "Browse guides", summary: _jsxs("p", { className: "text-sm text-[var(--solara-text-muted)]", children: [sorted.length, " visible / ", completedGuides.length, " completed"] }), controls: _jsxs("div", { className: "flex flex-wrap gap-2", children: [[
                            { value: "relevant", label: "Most relevant" },
                            { value: "newest", label: "Newest" },
                            { value: "shortest", label: "Shortest" },
                            { value: "safety", label: "Safety first" },
                        ].map((option) => (_jsx("button", { type: "button", onClick: () => setSort(option.value), className: `rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${sort === option.value
                                ? "border-[var(--solara-accent)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)]"
                                : "border-[var(--solara-rule)] bg-transparent text-[var(--solara-text-muted)] hover:border-[var(--solara-rule)]/80"}`, "aria-pressed": sort === option.value, children: option.label }, option.value))), [
                            { value: "all", label: `All (${guides.length})` },
                            { value: "bookmarked", label: `Saved (${bookmarkedGuides.length})` },
                            { value: "incomplete", label: "Not completed" },
                        ].map((option) => (_jsx("button", { type: "button", onClick: () => setFilter(option.value), className: `rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${filter === option.value
                                ? "border-[var(--solara-accent)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)]"
                                : "border-[var(--solara-rule)] bg-transparent text-[var(--solara-text-muted)] hover:border-[var(--solara-rule)]/80"}`, "aria-pressed": filter === option.value, children: option.label }, option.value)))] }) }), _jsxs("div", { className: "space-y-3", children: [sorted.length === 0 ? (_jsx("div", { className: "rounded-md border border-dashed border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-8 text-center text-[var(--solara-text-muted)]", children: filter === "bookmarked"
                            ? "No saved guides yet. Use the bookmark control on any guide to keep it close."
                            : "No guides match this filter." })) : null, sorted.map((guide) => {
                        const isOpen = expanded === guide.slug;
                        const isBookmarked = bookmarkedGuides.includes(guide.slug);
                        const isCompleted = completedGuides.includes(guide.slug);
                        return (_jsxs("article", { className: "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] px-4 py-4 shadow-[var(--solara-shadow-soft)]", children: [_jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]", children: [_jsx("span", { className: "rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]", children: guide.format }), _jsx("span", { className: "rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]", children: guide.difficulty }), _jsx("span", { className: "rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-accent-strong)]", children: guide.pillar }), _jsxs("span", { className: "inline-flex items-center gap-1 text-[var(--solara-text-muted)]", children: [_jsx(Clock, { className: "h-3.5 w-3.5" }), guide.durationMins, " min"] }), guide.safetyCritical ? (_jsxs("span", { className: "inline-flex items-center gap-1 text-amber-300", children: [_jsx(ShieldAlert, { className: "h-3.5 w-3.5" }), "Safety critical"] })) : null, isCompleted ? (_jsxs("span", { className: "inline-flex items-center gap-1 text-emerald-400", children: [_jsx(CheckCircle2, { className: "h-3.5 w-3.5" }), "Completed"] })) : null] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--solara-text-strong)]", children: guide.title }), _jsx("p", { className: "max-w-3xl text-sm leading-6 text-[var(--solara-text-muted)]", children: guide.summary })] }), _jsx("div", { className: "flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]", children: guide.tags.slice(0, 4).map((tag) => (_jsx("span", { className: "rounded-md border border-[var(--solara-rule)] px-2 py-1", children: tag }, tag))) })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 lg:justify-end", children: [_jsx("button", { type: "button", onClick: () => toggleBookmark(guide.slug), className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--solara-rule)] text-[var(--solara-text-muted)] transition hover:border-[var(--solara-accent)] hover:text-[var(--solara-accent-strong)]", "aria-label": isBookmarked ? "Remove bookmark" : "Bookmark guide", "aria-pressed": isBookmarked, children: isBookmarked ? _jsx(BookmarkCheck, { className: "h-4 w-4" }) : _jsx(Bookmark, { className: "h-4 w-4" }) }), _jsx(InlineAction, { to: `/learn/${guide.slug}`, emphasis: "strong", children: isCompleted ? "Review guide" : "Read guide" }), _jsxs("button", { type: "button", onClick: () => setExpanded(isOpen ? null : guide.slug), className: "inline-flex items-center gap-2 rounded-md border border-[var(--solara-rule)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)] transition hover:border-[var(--solara-accent)] hover:text-[var(--solara-text-strong)]", "aria-expanded": isOpen, children: [isOpen ? "Hide preview" : "Preview", _jsx(ChevronDown, { className: `h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}` })] })] })] }), isOpen ? (_jsxs("div", { className: "mt-4 grid gap-4 border-t border-[var(--solara-rule)] pt-4 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-2 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3", children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Outline" }), _jsx("ul", { className: "space-y-1 text-sm leading-6 text-[var(--solara-text-muted)]", children: guide.toc.map((item) => (_jsxs("li", { className: "flex items-center gap-2", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--solara-accent)]" }), item] }, item))) })] }), _jsxs("div", { className: "space-y-2 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3", children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Key takeaways" }), _jsx("ul", { className: "space-y-2 text-sm leading-6 text-[var(--solara-text-muted)]", children: guide.takeaways.map((item) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx(Star, { className: "mt-1 h-3.5 w-3.5 text-[var(--solara-accent)]" }), _jsx("span", { children: item })] }, item))) })] })] })) : null] }, guide.slug));
                    })] })] }));
};
export default GuideList;
