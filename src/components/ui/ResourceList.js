import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, Play, Link as LinkIcon, FileSpreadsheet } from "lucide-react";
const iconFor = (type) => ({
    pdf: _jsx(FileText, { className: "h-4 w-4" }),
    video: _jsx(Play, { className: "h-4 w-4" }),
    link: _jsx(LinkIcon, { className: "h-4 w-4" }),
    template: _jsx(FileSpreadsheet, { className: "h-4 w-4" }),
}[type]);
const ResourceList = ({ resources }) => (_jsxs("div", { className: "space-y-2 rounded-2xl card-surface p-4 text-slate-900 dark:text-white", children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200", children: "Resources" }), _jsx("ul", { className: "space-y-2 text-sm text-slate-700 dark:text-slate-200", children: resources.map((res) => (_jsxs("li", { className: "flex items-center gap-3 rounded-xl border border-white/50 bg-white/80 px-3 py-2 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,51,102,0.18)] dark:border-white/10 dark:bg-white/5", children: [_jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f62c7]/10 text-[#0f62c7] ring-1 ring-[#0f62c7]/30 dark:text-white", children: iconFor(res.type) }), _jsx("a", { href: res.url, target: "_blank", rel: "noreferrer", className: "flex-1 font-semibold text-slate-800 transition hover:text-[#0f62c7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7] dark:text-white", children: res.title }), _jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200", children: res.type })] }, res.title))) })] }));
export default ResourceList;
