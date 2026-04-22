import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, PoundSterling, Leaf, Clock, Sun, ArrowRight, Download, Info, Battery, Loader2, } from "lucide-react";
import { useConfiguratorStore } from "./hooks/useConfiguratorStore";
import { useEnergyEstimate } from "./hooks/useEnergyEstimate";
const sectionClassName = "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4 shadow-[var(--solara-shadow-soft)]";
const metricCardClassName = "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3";
const ConfiguratorPanel = () => {
    const { roof, panels, obstacles, battery } = useConfiguratorStore();
    const [pdfLoading, setPdfLoading] = useState(false);
    const estimate = useEnergyEstimate({
        panelCount: panels.length,
        orientation: roof.orientation,
        pitchAngle: roof.pitchAngle,
        region: "london",
        batteryCount: battery.count,
    });
    const handleExportJson = () => {
        const config = {
            roof,
            panels,
            obstacles,
            battery,
            estimate,
            exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `solar-config-${Date.now()}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
    };
    const handleExportPdf = async () => {
        setPdfLoading(true);
        try {
            const { generateConfiguratorPdf } = await import("./utils/pdfGenerator");
            await generateConfiguratorPdf({ roof, panels, obstacles, battery, estimate });
        }
        finally {
            setPdfLoading(false);
        }
    };
    return (_jsxs("div", { className: "flex h-full flex-col gap-4 overflow-y-auto", children: [_jsxs("section", { className: sectionClassName, children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Your system" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--solara-text-strong)]", children: "Current layout snapshot" })] }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [_jsxs("div", { className: metricCardClassName, children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]", children: "Panels" }), _jsx("p", { className: "mt-1 text-2xl font-semibold text-[var(--solara-text-strong)]", children: estimate.panelCount })] }), _jsxs("div", { className: metricCardClassName, children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]", children: "System size" }), _jsxs("p", { className: "mt-1 text-2xl font-semibold text-[var(--solara-text-strong)]", children: [estimate.systemSizeKw, " kW"] })] })] }), battery.count > 0 ? (_jsxs("div", { className: "mt-3 flex items-center justify-between rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Battery, { className: "h-5 w-5 text-[var(--solara-accent-strong)]" }), _jsxs("div", { children: [_jsxs("p", { className: "font-semibold text-[var(--solara-text-strong)]", children: [battery.count, " battery", battery.count > 1 ? " units" : ""] }), _jsxs("p", { className: "text-sm text-[var(--solara-text-muted)]", children: [estimate.batteryCapacityKwh, " kWh storage"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: [estimate.selfConsumptionRate, "%"] }), _jsx("p", { className: "text-xs uppercase tracking-[0.14em] text-[var(--solara-text-muted)]", children: "Self-use" })] })] })) : null, panels.length === 0 ? (_jsx("div", { className: "mt-3 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3 text-sm text-[var(--solara-text-muted)]", children: "Click on the roof to place your first panel." })) : null] }), panels.length > 0 ? (_jsxs("section", { className: sectionClassName, children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Estimated performance" }), _jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [_jsxs("div", { className: metricCardClassName, children: [_jsxs("div", { className: "mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]", children: [_jsx(Zap, { className: "h-4 w-4 text-[var(--solara-accent-strong)]" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.14em]", children: "Generation" })] }), _jsxs("p", { className: "text-lg font-semibold text-[var(--solara-text-strong)]", children: [estimate.annualKwh.toLocaleString(), " kWh"] })] }), _jsxs("div", { className: metricCardClassName, children: [_jsxs("div", { className: "mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]", children: [_jsx(PoundSterling, { className: "h-4 w-4 text-[var(--solara-accent-strong)]" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.14em]", children: "Savings" })] }), _jsxs("p", { className: "text-lg font-semibold text-[var(--solara-text-strong)]", children: ["GBP ", estimate.annualSavingsGbp.toLocaleString()] })] }), _jsxs("div", { className: metricCardClassName, children: [_jsxs("div", { className: "mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]", children: [_jsx(Leaf, { className: "h-4 w-4 text-[var(--solara-accent-strong)]" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.14em]", children: "CO2 saved" })] }), _jsxs("p", { className: "text-lg font-semibold text-[var(--solara-text-strong)]", children: [(estimate.annualCo2Kg / 1000).toFixed(1), " tonnes"] })] }), _jsxs("div", { className: metricCardClassName, children: [_jsxs("div", { className: "mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]", children: [_jsx(Clock, { className: "h-4 w-4 text-[var(--solara-accent-strong)]" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.14em]", children: "Payback" })] }), _jsxs("p", { className: "text-lg font-semibold text-[var(--solara-text-strong)]", children: ["~", estimate.paybackYears, " years"] })] })] }), _jsxs("div", { className: "mt-4 space-y-2 border-t border-[var(--solara-rule-soft)] pt-3 text-sm text-[var(--solara-text-muted)]", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: ["Self-consumed (", estimate.selfConsumptionRate, "%)"] }), _jsxs("span", { className: "font-medium", children: [estimate.selfConsumedKwh.toLocaleString(), " kWh"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Exported to grid" }), _jsxs("span", { className: "font-medium", children: [estimate.exportedKwh.toLocaleString(), " kWh"] })] }), battery.count > 0 ? (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Battery capacity" }), _jsxs("span", { className: "font-medium", children: [estimate.batteryCapacityKwh, " kWh"] })] })) : null, _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "25-year savings" }), _jsxs("span", { className: "font-semibold text-[var(--solara-text-strong)]", children: ["GBP ", estimate.lifetimeSavingsGbp.toLocaleString()] })] })] })] })) : null, _jsxs("section", { className: sectionClassName, children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Next steps" }), _jsxs("div", { className: "mt-3 grid gap-2", children: [_jsxs("button", { onClick: handleExportPdf, disabled: panels.length === 0 || pdfLoading, className: "solara-inline-action solara-inline-action--default justify-center disabled:cursor-not-allowed disabled:opacity-50", children: [pdfLoading ? _jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : _jsx(Download, { className: "h-4 w-4" }), pdfLoading ? "Generating..." : "Export PDF"] }), _jsxs("button", { onClick: handleExportJson, disabled: panels.length === 0, className: "solara-inline-action solara-inline-action--quiet justify-center disabled:cursor-not-allowed disabled:opacity-50", children: [_jsx(Download, { className: "h-4 w-4" }), "Export JSON"] }), _jsxs(Link, { to: "/solar-navigator", className: "solara-inline-action solara-inline-action--strong justify-center", children: [_jsx(Sun, { className: "h-4 w-4" }), "Continue to Solar Navigator", _jsx(ArrowRight, { className: "h-4 w-4" })] }), _jsxs(Link, { to: "/connect", className: "solara-inline-action solara-inline-action--default justify-center", children: ["Find local helpers", _jsx(ArrowRight, { className: "h-4 w-4" })] })] })] }), _jsx("div", { className: "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3 text-xs text-[var(--solara-text-muted)]", children: _jsxs("p", { className: "flex items-start gap-2", children: [_jsx(Info, { className: "mt-0.5 h-3 w-3 flex-shrink-0" }), _jsx("span", { children: "Estimates use typical UK conditions for the London region. Real performance depends on shading, weather, and installation quality." })] }) })] }));
};
export default ConfiguratorPanel;
