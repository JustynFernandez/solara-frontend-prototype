import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const STORAGE_KEY = "solara.connectFilters.v1";
const fieldClassName = "mt-1 w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-2 text-[0.95rem] text-[var(--solara-text-strong)] outline-none transition focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";
const resetValue = {
    search: "",
    level: "all",
    availability: "all",
    support: "all",
    minRating: 0,
};
const HelperFilters = ({ value, onChange, showClearButton = true }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                onChange(JSON.parse(raw));
            }
            catch {
                // ignore invalid local state
            }
        }
        setMounted(true);
    }, [onChange]);
    useEffect(() => {
        if (!mounted)
            return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }, [mounted, value]);
    return (_jsxs("div", { className: "space-y-3.5", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Filters" }), _jsx("p", { className: "text-sm text-[var(--solara-text-muted)]", children: "Set the first pass by role, availability, support type, and rating." })] }), _jsxs("div", { className: "space-y-2.5", children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--solara-text-strong)]", children: ["Search", _jsx("input", { value: value.search, onChange: (event) => onChange({ ...value, search: event.target.value }), placeholder: "Skills, tasks, or people", className: fieldClassName })] }), _jsxs("div", { className: "grid gap-2.5 sm:grid-cols-2", children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--solara-text-strong)]", children: ["Role level", _jsxs("select", { value: value.level, onChange: (event) => onChange({ ...value, level: event.target.value }), className: fieldClassName, children: [_jsx("option", { value: "all", children: "All" }), _jsx("option", { value: "community", children: "Community" }), _jsx("option", { value: "trained", children: "Trained" }), _jsx("option", { value: "certified", children: "Certified" })] })] }), _jsxs("label", { className: "block text-sm font-medium text-[var(--solara-text-strong)]", children: ["Availability", _jsxs("select", { value: value.availability, onChange: (event) => onChange({ ...value, availability: event.target.value }), className: fieldClassName, children: [_jsx("option", { value: "all", children: "All" }), _jsx("option", { value: "available", children: "Available" }), _jsx("option", { value: "limited", children: "Limited" }), _jsx("option", { value: "unavailable", children: "Unavailable" })] })] }), _jsxs("label", { className: "block text-sm font-medium text-[var(--solara-text-strong)]", children: ["Support type", _jsxs("select", { value: value.support, onChange: (event) => onChange({ ...value, support: event.target.value }), className: fieldClassName, children: [_jsx("option", { value: "all", children: "All" }), _jsx("option", { value: "remote", children: "Remote" }), _jsx("option", { value: "visit", children: "Visit" })] })] }), _jsxs("label", { className: "block text-sm font-medium text-[var(--solara-text-strong)]", children: ["Minimum rating", _jsx("select", { value: value.minRating, onChange: (event) => onChange({ ...value, minRating: Number(event.target.value) }), className: fieldClassName, children: [0, 3, 4, 4.5].map((rating) => (_jsxs("option", { value: rating, children: [rating, "+"] }, rating))) })] })] })] }), showClearButton ? (_jsx("button", { type: "button", onClick: () => onChange(resetValue), className: "solara-inline-action solara-inline-action--default", children: "Clear filters" })) : null] }));
};
export default HelperFilters;
