import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clock3, ShieldCheck, Star } from "lucide-react";
import HelperAvatar from "./HelperAvatar";
const levelLabel = {
    community: "Community volunteer",
    trained: "Trained volunteer",
    certified: "Certified installer",
};
const availabilityLabel = {
    available: "Available now",
    limited: "Limited availability",
    unavailable: "Unavailable",
};
const getSpecialtyLine = (helper) => helper.skills.slice(0, 2).join(" / ");
const HelperDirectoryRow = ({ helper, onOpenProfile, onRequest, saved, onSaveToggle, variant = "standard", rank, }) => {
    return (_jsxs("article", { className: `solara-helper-row ${variant === "priority" ? "is-priority" : "is-standard"}`, children: [variant === "priority" ? (_jsx("p", { className: "solara-helper-row__rank", "aria-label": `Priority match ${rank ?? 0}`, children: String(rank ?? 0).padStart(2, "0") })) : null, _jsxs("div", { className: "solara-helper-row__identity", children: [_jsx(HelperAvatar, { name: helper.name, src: helper.avatar, className: "solara-helper-row__avatar" }), _jsxs("div", { className: "solara-helper-row__identity-copy", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("h3", { className: "solara-helper-row__name", children: helper.name }), helper.verified ? _jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-[var(--solara-accent)]", "aria-label": "Verified helper" }) : null, _jsx("span", { className: "solara-helper-row__level", children: levelLabel[helper.level] })] }), variant === "priority" ? _jsx("p", { className: "solara-helper-row__specialty", children: getSpecialtyLine(helper) }) : null] })] }), _jsxs("div", { className: "solara-helper-row__support", children: [_jsx("p", { className: "solara-helper-row__availability", children: availabilityLabel[helper.availabilityStatus] }), _jsx("p", { children: helper.skills.slice(0, 2).join(" / ") })] }), _jsxs("div", { className: "solara-helper-row__meta", children: [_jsxs("div", { className: "solara-helper-row__meta-block", children: [_jsx("p", { children: helper.coarseLocationLabel }), _jsxs("p", { className: "inline-flex items-center gap-1", children: [_jsx(Clock3, { className: "h-3.5 w-3.5" }), helper.responseTimeLabel] })] }), _jsxs("div", { className: "solara-helper-row__meta-block", children: [_jsxs("p", { className: "inline-flex items-center gap-1", children: [_jsx(Star, { className: "h-3.5 w-3.5 text-[var(--solara-accent)]" }), helper.rating.toFixed(1), " rating"] }), _jsxs("p", { children: [helper.completedProjectsCount, " completed projects"] })] })] }), _jsxs("div", { className: "solara-helper-row__actions", children: [_jsx("button", { type: "button", onClick: () => onRequest(helper), className: "solara-inline-action solara-inline-action--strong", children: "Request support" }), _jsx("button", { type: "button", onClick: () => onOpenProfile(helper), className: "solara-inline-action solara-inline-action--default", children: "View profile" }), _jsx("button", { type: "button", onClick: () => onSaveToggle(helper.id), "aria-pressed": saved, className: `solara-helper-row__save ${saved ? "is-saved" : ""}`, children: saved ? "Saved" : "Save" })] })] }));
};
export default HelperDirectoryRow;
