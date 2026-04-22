import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { List } from "lucide-react";
import SurfacePanel from "@/components/ui/surface-panel";
import { useScrollSpy } from "../../hooks/useScrollSpy";
// Sticky desktop TOC + mobile collapsible menu for the Learn hub.
const LearnTOC = ({ items }) => {
    const [open, setOpen] = useState(false);
    // Get section IDs for scroll spy
    const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
    const activeSection = useScrollSpy(sectionIds);
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "sticky top-28 hidden lg:block", children: _jsxs(SurfacePanel, { variant: "guide", layout: "rail", density: "compact", as: "nav", className: "text-sm text-slate-800 dark:text-slate-100", "aria-label": "On this page", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200", children: "On this page" }), _jsx("ul", { className: "mt-3 space-y-2", children: items.map((item) => {
                                const isActive = activeSection === item.id;
                                return (_jsx("li", { children: _jsx("a", { href: `#${item.id}`, className: `block rounded-lg px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${isActive
                                            ? "bg-solara-blue/10 font-semibold text-solara-blue dark:bg-solara-blue/20 dark:text-white"
                                            : "text-slate-700 hover:text-solara-blue dark:text-slate-200 dark:hover:text-white"}`, "aria-current": isActive ? "location" : undefined, children: item.label }) }, item.id));
                            }) })] }) }), _jsxs("div", { className: "lg:hidden", children: [_jsxs("button", { type: "button", onClick: () => setOpen((v) => !v), className: "flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm font-semibold text-solara-navy shadow-md backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white", "aria-expanded": open, children: [_jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(List, { className: "h-4 w-4" }), "On this page"] }), _jsx("span", { className: "text-xs uppercase tracking-[0.16em]", children: open ? "Hide" : "Show" })] }), open && (_jsx(SurfacePanel, { variant: "guide", layout: "rail", density: "compact", as: "nav", className: "mt-2 space-y-2 text-sm text-slate-800 dark:text-white", "aria-label": "On this page", children: items.map((item) => (_jsx("a", { href: `#${item.id}`, className: "block rounded-xl px-3 py-2 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:hover:bg-white/10", onClick: () => setOpen(false), children: item.label }, item.id))) }))] })] }));
};
export default LearnTOC;
