import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { helpers } from "@/data/helpers";
import { projects } from "@/data/projects";
import { guides } from "@/data/learnContent";
const stats = [
    {
        label: "Verified helpers",
        value: String(helpers.filter((helper) => helper.verified).length),
    },
    {
        label: "Active projects",
        value: String(projects.filter((project) => project.status === "Recruiting" || project.status === "In Progress").length),
    },
    {
        label: "Guides available",
        value: String(guides.length),
    },
];
const FooterStats = ({ className = "" }) => {
    return (_jsx("div", { className: `solara-footer__stats grid grid-cols-3 gap-4 ${className}`, children: stats.map((stat) => (_jsxs("div", { className: "solara-footer__stat-item flex flex-col gap-1 px-2 py-3 text-center", children: [_jsx("span", { className: "text-2xl font-semibold sm:text-[1.7rem]", children: stat.value }), _jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.14em]", children: stat.label })] }, stat.label))) }));
};
export default FooterStats;
