import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Lightweight pill filters for the Learn hub.
const FilterChips = ({ label, options, active, onChange }) => (_jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-200", children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200", children: label }), _jsx("div", { className: "flex flex-wrap gap-2", children: options.map((option) => {
                const selected = active === option.value;
                return (_jsx("button", { type: "button", onClick: () => onChange(selected ? null : option.value), className: `inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${selected
                        ? "bg-button-primary text-white shadow-md"
                        : "border border-white/70 bg-white/85 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white"}`, "aria-pressed": selected, children: option.label }, option.value));
            }) })] }));
export default FilterChips;
