import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const FilterDropdown = ({ categories, value, onChange }) => (_jsxs("label", { className: "flex items-center gap-3 text-sm font-semibold text-slate-700", children: ["Category", _jsx("select", { value: value, onChange: (event) => onChange(event.target.value), className: "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none", children: categories.map((category) => (_jsx("option", { value: category, children: category }, category))) })] }));
export default FilterDropdown;
