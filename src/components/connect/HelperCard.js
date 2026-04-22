import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ShieldCheck, Clock3, Star } from "lucide-react";
const levelLabel = {
    community: "Community volunteer",
    trained: "Trained volunteer",
    certified: "Certified installer",
};
const HelperCard = React.memo(({ helper, onOpenProfile, onRequest, saved, onSaveToggle }) => {
    const initials = helper.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    return (_jsxs("article", { className: "flex h-full flex-col gap-4 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4 text-[var(--solara-text-strong)] shadow-[var(--solara-shadow-soft)]", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-sm font-semibold", children: helper.avatar ? _jsx("img", { src: helper.avatar, alt: `${helper.name} avatar`, className: "h-full w-full object-cover" }) : initials }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-base font-semibold", children: helper.name }), helper.verified ? _jsx(ShieldCheck, { className: "h-4 w-4 text-[var(--solara-accent)]", "aria-label": "Verified" }) : null] }), _jsx("p", { className: "text-xs text-[var(--solara-text-muted)]", children: levelLabel[helper.level] })] })] }), _jsxs("div", { className: "inline-flex items-center gap-1 text-xs font-semibold text-[var(--solara-text-muted)]", children: [_jsx(Star, { className: "h-3.5 w-3.5 text-[var(--solara-accent)]" }), helper.rating.toFixed(1), " / ", helper.reviewsCount] })] }), _jsxs("div", { className: "grid gap-2 text-sm text-[var(--solara-text-muted)] sm:grid-cols-2", children: [_jsx("p", { children: helper.coarseLocationLabel }), _jsxs("p", { className: "inline-flex items-center gap-1", children: [_jsx(Clock3, { className: "h-3.5 w-3.5" }), helper.responseTimeLabel] }), _jsxs("p", { children: [helper.completedProjectsCount, " completed projects"] }), _jsx("p", { className: "capitalize", children: helper.availabilityStatus })] }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: helper.bio }), _jsx("div", { className: "flex flex-wrap gap-2", children: helper.skills.slice(0, 4).map((skill) => (_jsx("span", { className: "rounded-md border border-[var(--solara-rule-soft)] px-2.5 py-1 text-xs text-[var(--solara-text-muted)]", children: skill }, skill))) }), _jsxs("div", { className: "mt-auto flex flex-wrap items-center gap-3 border-t border-[var(--solara-rule-soft)] pt-3", children: [_jsx("button", { type: "button", onClick: () => onOpenProfile(helper), className: "solara-inline-action solara-inline-action--default", children: "View profile" }), _jsx("button", { type: "button", onClick: () => onRequest(helper), className: "solara-inline-action solara-inline-action--strong", children: "Request support" }), _jsx("button", { type: "button", onClick: () => onSaveToggle(helper.id), "aria-pressed": saved, className: `rounded-md border px-3 py-2 text-xs font-semibold transition ${saved
                            ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                            : "border-[var(--solara-rule)] text-[var(--solara-text-muted)] hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)]"}`, children: saved ? "Saved" : "Save" })] })] }));
}, (prevProps, nextProps) => prevProps.helper.id === nextProps.helper.id && prevProps.saved === nextProps.saved);
HelperCard.displayName = "HelperCard";
export default HelperCard;
