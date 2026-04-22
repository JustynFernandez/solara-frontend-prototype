import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  PoundSterling,
  Leaf,
  Clock,
  Sun,
  ArrowRight,
  Download,
  Info,
  Battery,
  Loader2,
} from "lucide-react";
import { useConfiguratorStore } from "./hooks/useConfiguratorStore";
import { useEnergyEstimate } from "./hooks/useEnergyEstimate";

const sectionClassName =
  "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4 shadow-[var(--solara-shadow-soft)]";

const metricCardClassName =
  "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3";

const ConfiguratorPanel: React.FC = () => {
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
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <section className={sectionClassName}>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Your system</p>
          <h3 className="text-lg font-semibold text-[var(--solara-text-strong)]">Current layout snapshot</h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className={metricCardClassName}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">Panels</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--solara-text-strong)]">{estimate.panelCount}</p>
          </div>
          <div className={metricCardClassName}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">System size</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--solara-text-strong)]">{estimate.systemSizeKw} kW</p>
          </div>
        </div>

        {battery.count > 0 ? (
          <div className="mt-3 flex items-center justify-between rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3">
            <div className="flex items-center gap-3">
              <Battery className="h-5 w-5 text-[var(--solara-accent-strong)]" />
              <div>
                <p className="font-semibold text-[var(--solara-text-strong)]">
                  {battery.count} battery{battery.count > 1 ? " units" : ""}
                </p>
                <p className="text-sm text-[var(--solara-text-muted)]">{estimate.batteryCapacityKwh} kWh storage</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[var(--solara-text-strong)]">{estimate.selfConsumptionRate}%</p>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">Self-use</p>
            </div>
          </div>
        ) : null}

        {panels.length === 0 ? (
          <div className="mt-3 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3 text-sm text-[var(--solara-text-muted)]">
            Click on the roof to place your first panel.
          </div>
        ) : null}
      </section>

      {panels.length > 0 ? (
        <section className={sectionClassName}>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
            Estimated performance
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className={metricCardClassName}>
              <div className="mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]">
                <Zap className="h-4 w-4 text-[var(--solara-accent-strong)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">Generation</span>
              </div>
              <p className="text-lg font-semibold text-[var(--solara-text-strong)]">{estimate.annualKwh.toLocaleString()} kWh</p>
            </div>
            <div className={metricCardClassName}>
              <div className="mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]">
                <PoundSterling className="h-4 w-4 text-[var(--solara-accent-strong)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">Savings</span>
              </div>
              <p className="text-lg font-semibold text-[var(--solara-text-strong)]">GBP {estimate.annualSavingsGbp.toLocaleString()}</p>
            </div>
            <div className={metricCardClassName}>
              <div className="mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]">
                <Leaf className="h-4 w-4 text-[var(--solara-accent-strong)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">CO2 saved</span>
              </div>
              <p className="text-lg font-semibold text-[var(--solara-text-strong)]">{(estimate.annualCo2Kg / 1000).toFixed(1)} tonnes</p>
            </div>
            <div className={metricCardClassName}>
              <div className="mb-1 flex items-center gap-2 text-[var(--solara-text-muted)]">
                <Clock className="h-4 w-4 text-[var(--solara-accent-strong)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">Payback</span>
              </div>
              <p className="text-lg font-semibold text-[var(--solara-text-strong)]">~{estimate.paybackYears} years</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 border-t border-[var(--solara-rule-soft)] pt-3 text-sm text-[var(--solara-text-muted)]">
            <div className="flex justify-between">
              <span>Self-consumed ({estimate.selfConsumptionRate}%)</span>
              <span className="font-medium">{estimate.selfConsumedKwh.toLocaleString()} kWh</span>
            </div>
            <div className="flex justify-between">
              <span>Exported to grid</span>
              <span className="font-medium">{estimate.exportedKwh.toLocaleString()} kWh</span>
            </div>
            {battery.count > 0 ? (
              <div className="flex justify-between">
                <span>Battery capacity</span>
                <span className="font-medium">{estimate.batteryCapacityKwh} kWh</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>25-year savings</span>
              <span className="font-semibold text-[var(--solara-text-strong)]">GBP {estimate.lifetimeSavingsGbp.toLocaleString()}</span>
            </div>
          </div>
        </section>
      ) : null}

      <section className={sectionClassName}>
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
          Next steps
        </h3>

        <div className="mt-3 grid gap-2">
          <button
            onClick={handleExportPdf}
            disabled={panels.length === 0 || pdfLoading}
            className="solara-inline-action solara-inline-action--default justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pdfLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {pdfLoading ? "Generating..." : "Export PDF"}
          </button>
          <button
            onClick={handleExportJson}
            disabled={panels.length === 0}
            className="solara-inline-action solara-inline-action--quiet justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <Link to="/solar-navigator" className="solara-inline-action solara-inline-action--strong justify-center">
            <Sun className="h-4 w-4" />
            Continue to Solar Navigator
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/connect" className="solara-inline-action solara-inline-action--default justify-center">
            Find local helpers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3 text-xs text-[var(--solara-text-muted)]">
        <p className="flex items-start gap-2">
          <Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
          <span>
            Estimates use typical UK conditions for the London region. Real performance depends on shading, weather, and installation quality.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ConfiguratorPanel;
