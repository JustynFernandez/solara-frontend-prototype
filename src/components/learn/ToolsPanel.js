import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { Gauge, ListChecks, AlertTriangle } from "lucide-react";
const orientationFactors = {
    south: { factor: 1.0, label: "South" },
    southEast: { factor: 0.95, label: "South-East" },
    southWest: { factor: 0.95, label: "South-West" },
    east: { factor: 0.85, label: "East" },
    west: { factor: 0.85, label: "West" },
};
const batteryChemistryInfo = {
    lifepo4: { dod: 0.85, label: "LiFePO4", description: "85% usable / 3000+ cycles" },
    leadAcid: { dod: 0.5, label: "Lead-Acid", description: "50% usable / 500-1000 cycles" },
};
const readinessItems = [
    { id: "site", label: "I have clear photos of my roof or balcony", weight: 1 },
    { id: "shade", label: "I know my main shade sources", weight: 1 },
    { id: "goal", label: "I have an offset or backup-runtime target", weight: 1 },
    { id: "budget", label: "I have a budget range noted", weight: 1 },
    { id: "safety", label: "I know how to power down safely or will ask for help", weight: 2 },
    { id: "permit", label: "I checked whether permits or approvals apply", weight: 1 },
];
const STORAGE_READINESS = "solara:learn:readiness";
const STORAGE_ESTIMATOR = "solara:learn:estimator";
const defaultEstimator = {
    dailyKWh: 4.2,
    sunHours: 3.4,
    losses: 18,
    orientation: "south",
    batteryChemistry: "lifepo4",
};
const ToolsPanel = () => {
    const [readiness, setReadiness] = useState({});
    const [estimator, setEstimator] = useState(defaultEstimator);
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_READINESS);
        if (stored) {
            try {
                setReadiness(JSON.parse(stored));
            }
            catch {
                setReadiness({});
            }
        }
        const storedEstimator = localStorage.getItem(STORAGE_ESTIMATOR);
        if (storedEstimator) {
            try {
                setEstimator({ ...defaultEstimator, ...JSON.parse(storedEstimator) });
            }
            catch {
                setEstimator(defaultEstimator);
            }
        }
    }, []);
    useEffect(() => {
        localStorage.setItem(STORAGE_READINESS, JSON.stringify(readiness));
    }, [readiness]);
    useEffect(() => {
        localStorage.setItem(STORAGE_ESTIMATOR, JSON.stringify(estimator));
    }, [estimator]);
    const score = useMemo(() => {
        const totalWeight = readinessItems.reduce((sum, item) => sum + item.weight, 0);
        const doneWeight = readinessItems.reduce((sum, item) => sum + (readiness[item.id] ? item.weight : 0), 0);
        return Math.round((doneWeight / totalWeight) * 100);
    }, [readiness]);
    const sizeEstimate = useMemo(() => {
        const usableSun = Math.max(estimator.sunHours, 1);
        const losses = Math.min(Math.max(estimator.losses, 0), 40) / 100;
        const orientationFactor = orientationFactors[estimator.orientation].factor;
        const dailyWh = estimator.dailyKWh * 1000;
        const arrayWatts = Math.max(Math.round((dailyWh / usableSun) / (1 - losses) / orientationFactor), 0);
        const batteryDod = batteryChemistryInfo[estimator.batteryChemistry].dod;
        const batteryKWh = Math.max(Math.round(((estimator.dailyKWh * 0.6) / batteryDod) * 10) / 10, 0.5);
        return { arrayWatts, batteryKWh, orientationFactor, batteryDod };
    }, [estimator]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]", children: "Hands-on tools" }), _jsx("h3", { className: "text-xl font-semibold text-[var(--solara-text-strong)]", children: "Try two lightweight planning tools on the page." }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "These stay local to the browser and are directional only. Use them to frame a conversation, not to replace professional advice." })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("section", { className: "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--solara-text-strong)]", children: [_jsx(ListChecks, { className: "h-4 w-4 text-[var(--solara-accent-strong)]" }), "Readiness checklist"] }), _jsx("p", { className: "mt-1 text-sm leading-6 text-[var(--solara-text-muted)]", children: "Check the basics before you run Navigator or contact a helper." }), _jsx("ul", { className: "mt-4 space-y-2 text-sm", children: readinessItems.map((item) => (_jsxs("li", { className: "flex items-start gap-3 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3", children: [_jsx("input", { id: item.id, type: "checkbox", checked: !!readiness[item.id], onChange: (event) => setReadiness((previous) => ({ ...previous, [item.id]: event.target.checked })), className: "mt-1 h-4 w-4 rounded border-[var(--solara-rule)] bg-transparent accent-[var(--solara-accent)]", "aria-label": item.label }), _jsx("label", { htmlFor: item.id, className: "flex-1 leading-6 text-[var(--solara-text-muted)]", children: item.label })] }, item.id))) }), _jsxs("div", { className: "mt-4 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3", children: [_jsxs("div", { className: "flex items-center justify-between text-sm font-semibold text-[var(--solara-text-strong)]", children: [_jsx("span", { children: "Readiness score" }), _jsxs("span", { children: [score, "%"] })] }), _jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full border border-[var(--solara-rule)] bg-[var(--solara-surface-1)]", children: _jsx("div", { className: "h-full bg-[var(--solara-accent)]", style: { width: `${score}%` } }) }), _jsx("p", { className: "mt-2 text-xs text-[var(--solara-text-muted)]", children: score >= 80 ? "Enough context to move into Navigator or helper support." : "Fill the biggest gaps before you commit hardware." })] })] }), _jsxs("section", { className: "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-[var(--solara-text-strong)]", children: [_jsx(Gauge, { className: "h-4 w-4 text-[var(--solara-accent-strong)]" }), "Rough sizing estimator"] }), _jsx("p", { className: "mt-1 text-sm leading-6 text-[var(--solara-text-muted)]", children: "Directional only. Confirm with a qualified installer and local rules." }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsx(RangeField, { label: "Daily energy target", suffix: `${estimator.dailyKWh.toFixed(1)} kWh`, min: 1, max: 15, step: 0.1, value: estimator.dailyKWh, onChange: (value) => setEstimator((previous) => ({ ...previous, dailyKWh: value })) }), _jsx(RangeField, { label: "Average sun hours", suffix: `${estimator.sunHours.toFixed(1)} hrs`, min: 2, max: 6, step: 0.1, value: estimator.sunHours, onChange: (value) => setEstimator((previous) => ({ ...previous, sunHours: value })) }), _jsx(RangeField, { label: "Losses", suffix: `${estimator.losses}%`, min: 10, max: 35, step: 1, value: estimator.losses, onChange: (value) => setEstimator((previous) => ({ ...previous, losses: value })) }), _jsx(OptionGroup, { label: "Roof orientation", options: Object.keys(orientationFactors).map((key) => ({
                                            key,
                                            label: orientationFactors[key].label,
                                        })), activeKey: estimator.orientation, onSelect: (key) => setEstimator((previous) => ({ ...previous, orientation: key })) }), _jsx(OptionGroup, { label: "Battery chemistry", options: Object.keys(batteryChemistryInfo).map((key) => ({
                                            key,
                                            label: batteryChemistryInfo[key].label,
                                            description: batteryChemistryInfo[key].description,
                                        })), activeKey: estimator.batteryChemistry, onSelect: (key) => setEstimator((previous) => ({ ...previous, batteryChemistry: key })) })] }), _jsxs("div", { className: "mt-4 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3 text-sm", children: [_jsx(MetricRow, { label: "Suggested array size", value: `${sizeEstimate.arrayWatts} W` }), _jsx(MetricRow, { label: "Approx battery total", value: `${sizeEstimate.batteryKWh.toFixed(1)} kWh` }), _jsxs("div", { className: "mt-3 border-t border-[var(--solara-rule)] pt-3 text-xs text-[var(--solara-text-muted)]", children: [_jsx(MetricRow, { label: "Orientation factor", value: `${Math.round(sizeEstimate.orientationFactor * 100)}%` }), _jsx(MetricRow, { label: "Battery usable", value: `${Math.round(sizeEstimate.batteryDod * 100)}%` })] }), _jsxs("p", { className: "mt-3 flex items-start gap-2 border-t border-[var(--solara-rule)] pt-3 text-xs leading-5 text-[var(--solara-text-muted)]", children: [_jsx(AlertTriangle, { className: "mt-0.5 h-4 w-4 shrink-0 text-[var(--solara-accent-strong)]" }), "Check roof space, structural limits, wiring rules, and local regulations before acting on these numbers."] })] })] })] })] }));
};
const RangeField = ({ label, suffix, min, max, step, value, onChange }) => (_jsxs("label", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[var(--solara-text-strong)]", children: label }), _jsx("span", { className: "text-xs text-[var(--solara-text-muted)]", children: suffix })] }), _jsx("input", { type: "range", min: min, max: max, step: step, value: value, onChange: (event) => onChange(parseFloat(event.target.value)), className: "w-full accent-[var(--solara-accent)]" })] }));
const OptionGroup = ({ label, options, activeKey, onSelect }) => (_jsxs("div", { className: "space-y-2 text-sm", children: [_jsx("span", { className: "text-[var(--solara-text-strong)]", children: label }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: options.map((option) => (_jsxs("button", { type: "button", onClick: () => onSelect(option.key), className: `rounded-md border px-3 py-2 text-left transition ${activeKey === option.key
                    ? "border-[var(--solara-accent)] bg-[var(--solara-surface-2)]"
                    : "border-[var(--solara-rule)] bg-transparent hover:border-[var(--solara-rule)]/80"}`, children: [_jsx("div", { className: "font-medium text-[var(--solara-text-strong)]", children: option.label }), option.description ? _jsx("div", { className: "text-xs text-[var(--solara-text-muted)]", children: option.description }) : null] }, option.key))) })] }));
const MetricRow = ({ label, value }) => (_jsxs("div", { className: "flex items-center justify-between py-0.5", children: [_jsx("span", { className: "text-[var(--solara-text-muted)]", children: label }), _jsx("span", { className: "font-semibold text-[var(--solara-text-strong)]", children: value })] }));
export default ToolsPanel;
