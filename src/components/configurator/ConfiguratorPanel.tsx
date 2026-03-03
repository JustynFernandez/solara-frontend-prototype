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

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solar-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = async () => {
    setPdfLoading(true);
    try {
      const { generateConfiguratorPdf } = await import("./utils/pdfGenerator");
      await generateConfiguratorPdf({
        roof,
        panels,
        obstacles,
        battery,
        estimate,
      });
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <section className="rounded-xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Your System
        </h3>

        <div className="mb-4 flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
          <div>
            <p className="text-2xl font-bold">{estimate.panelCount}</p>
            <p className="text-sm opacity-90">Solar Panels</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{estimate.systemSizeKw} kW</p>
            <p className="text-sm opacity-90">System Size</p>
          </div>
        </div>

        {battery.count > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <Battery className="h-6 w-6" />
              <div>
                <p className="text-lg font-bold">{battery.count} Battery{battery.count > 1 ? " Units" : ""}</p>
                <p className="text-sm opacity-90">{estimate.batteryCapacityKwh} kWh Storage</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{estimate.selfConsumptionRate}%</p>
              <p className="text-sm opacity-90">Self-use Rate</p>
            </div>
          </div>
        )}

        {panels.length === 0 && (
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
            <p className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Click on the roof to place your first panel
            </p>
          </div>
        )}
      </section>

      {panels.length > 0 && (
        <section className="rounded-xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
            Estimated Performance
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
              <div className="mb-1 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Zap className="h-4 w-4" />
                <span className="text-xs font-medium">Annual Generation</span>
              </div>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {estimate.annualKwh.toLocaleString()} kWh
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
              <div className="mb-1 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <PoundSterling className="h-4 w-4" />
                <span className="text-xs font-medium">Annual Savings</span>
              </div>
              <p className="text-lg font-bold text-amber-700 dark:text-amber-300">
                £{estimate.annualSavingsGbp.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <div className="mb-1 flex items-center gap-2 text-green-600 dark:text-green-400">
                <Leaf className="h-4 w-4" />
                <span className="text-xs font-medium">CO2 Saved</span>
              </div>
              <p className="text-lg font-bold text-green-700 dark:text-green-300">
                {(estimate.annualCo2Kg / 1000).toFixed(1)} tonnes
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <div className="mb-1 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Payback Period</span>
              </div>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                ~{estimate.paybackYears} years
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Self-consumed ({estimate.selfConsumptionRate}%)</span>
              <span className="font-mono">{estimate.selfConsumedKwh.toLocaleString()} kWh</span>
            </div>
            <div className="flex justify-between">
              <span>Exported to grid</span>
              <span className="font-mono">{estimate.exportedKwh.toLocaleString()} kWh</span>
            </div>
            {battery.count > 0 && (
              <div className="flex justify-between text-purple-600 dark:text-purple-400">
                <span>Battery storage</span>
                <span className="font-mono">{estimate.batteryCapacityKwh} kWh</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2 dark:border-slate-700">
              <span>25-year savings</span>
              <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                £{estimate.lifetimeSavingsGbp.toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      )}

      <section className="rounded-xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Next Steps
        </h3>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExportPdf}
              disabled={panels.length === 0 || pdfLoading}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
            >
              {pdfLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {pdfLoading ? "Generating..." : "PDF Report"}
            </button>
            <button
              onClick={handleExportJson}
              disabled={panels.length === 0}
              className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <Download className="h-4 w-4" />
              JSON Data
            </button>
          </div>

          <Link
            to="/solar-navigator"
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
          >
            <Sun className="h-4 w-4" />
            Continue to Solar Navigator
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/connect"
            className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            Find Local Helpers
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
        <p className="flex items-start gap-2">
          <Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
          <span>
            Estimates based on typical UK conditions for London region. Actual
            performance depends on shading, weather, and installation quality.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ConfiguratorPanel;
