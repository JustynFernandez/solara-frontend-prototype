import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const FilterRail = ({ label, summary, controls, className }) => (_jsxs("div", { className: cn("solara-filter-rail", className), children: [_jsxs("div", { className: "solara-filter-rail__copy", children: [label ? _jsx("p", { className: "solara-filter-rail__label", children: label }) : null, summary ? _jsx("div", { className: "solara-filter-rail__summary", children: summary }) : null] }), _jsx("div", { className: "solara-filter-rail__controls", children: controls })] }));
export default FilterRail;
