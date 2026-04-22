import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const StatRail = ({ items, className }) => (_jsx("div", { className: cn("solara-stat-rail", className), children: items.map((item) => (_jsxs("div", { className: "solara-stat-rail__item", children: [_jsx("p", { className: "solara-stat-rail__label", children: item.label }), _jsx("p", { className: "solara-stat-rail__value", children: item.value }), item.meta ? _jsx("p", { className: "solara-stat-rail__meta", children: item.meta }) : null] }, item.label))) }));
export default StatRail;
