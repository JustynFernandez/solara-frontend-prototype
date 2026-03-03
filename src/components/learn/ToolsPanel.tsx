import React, { useEffect, useMemo, useState } from "react";
import { Gauge, ListChecks, AlertTriangle } from "lucide-react";

type ReadinessState = Record<string, boolean>;

type Orientation = "south" | "southEast" | "southWest" | "east" | "west";
type BatteryChemistry = "lifepo4" | "leadAcid";

type EstimatorState = {
  dailyKWh: number;
  sunHours: number;
  losses: number;
  orientation: Orientation;
  batteryChemistry: BatteryChemistry;
};

const orientationFactors: Record<Orientation, { factor: number; label: string }> = {
  south: { factor: 1.0, label: "South (100%)" },
  southEast: { factor: 0.95, label: "South-East (95%)" },
  southWest: { factor: 0.95, label: "South-West (95%)" },
  east: { factor: 0.85, label: "East (85%)" },
  west: { factor: 0.85, label: "West (85%)" },
};

const batteryChemistryInfo: Record<BatteryChemistry, { dod: number; label: string; description: string }> = {
  lifepo4: { dod: 0.85, label: "LiFePO4", description: "85% usable, 3000+ cycles" },
  leadAcid: { dod: 0.5, label: "Lead-Acid", description: "50% usable, 500-1000 cycles" },
};

const readinessItems = [
  { id: "site", label: "I have clear photos of my roof/balcony", weight: 1 },
  { id: "shade", label: "I know my main shade sources", weight: 1 },
  { id: "goal", label: "I have a target: offset % or backup runtime", weight: 1 },
  { id: "budget", label: "I have a budget range noted", weight: 1 },
  { id: "safety", label: "I know how to power down safely or will ask for help", weight: 2 },
  { id: "permit", label: "I checked if permits/approvals apply", weight: 1 },
];

const STORAGE_READINESS = "solara:learn:readiness";
const STORAGE_ESTIMATOR = "solara:learn:estimator";

const defaultEstimator: EstimatorState = {
  dailyKWh: 4.2,
  sunHours: 3.4,
  losses: 18,
  orientation: "south",
  batteryChemistry: "lifepo4",
};

const ToolsPanel: React.FC = () => {
  const [readiness, setReadiness] = useState<ReadinessState>({});
  const [estimator, setEstimator] = useState<EstimatorState>(defaultEstimator);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_READINESS);
    if (stored) {
      try {
        setReadiness(JSON.parse(stored));
      } catch {
        setReadiness({});
      }
    }
    const storedEstimator = localStorage.getItem(STORAGE_ESTIMATOR);
    if (storedEstimator) {
      try {
        const parsed = JSON.parse(storedEstimator);
        setEstimator({ ...defaultEstimator, ...parsed });
      } catch {
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
    const totalWeight = readinessItems.reduce((acc, item) => acc + item.weight, 0);
    const done = readinessItems.reduce((acc, item) => acc + (readiness[item.id] ? item.weight : 0), 0);
    return Math.round((done / totalWeight) * 100);
  }, [readiness]);

  const sizeEstimate = useMemo(() => {
    const usableSun = Math.max(estimator.sunHours, 1);
    const losses = Math.min(Math.max(estimator.losses, 0), 40) / 100;
    const orientationFactor = orientationFactors[estimator.orientation].factor;
    const dailyWh = estimator.dailyKWh * 1000;

    const arrayWatts = Math.max(Math.round((dailyWh / usableSun) / (1 - losses) / orientationFactor), 0);

    const batteryDod = batteryChemistryInfo[estimator.batteryChemistry].dod;
    const rawBatteryNeed = estimator.dailyKWh * 0.6;
    const batteryKWh = Math.max(Math.round((rawBatteryNeed / batteryDod) * 10) / 10, 0.5);

    return { arrayWatts, batteryKWh, orientationFactor, batteryDod };
  }, [estimator.dailyKWh, estimator.losses, estimator.sunHours, estimator.orientation, estimator.batteryChemistry]);

  return (
    <div className="space-y-4 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 sm:p-6" id="tools">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Hands-on tools</p>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Try mini tools without leaving this page</h3>
        <p className="text-sm text-slate-700 dark:text-slate-200">Lightweight, front-end only. Results are directional and not a substitute for professional advice.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="flex items-center gap-2 text-sm font-semibold text-solara-navy dark:text-white">
            <ListChecks className="h-4 w-4" />
            Solar readiness checklist
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200">Check the basics before you run Navigator or talk to a helper.</p>
          <ul className="space-y-2 text-sm">
            {readinessItems.map((item) => (
              <li key={item.id} className="flex items-start gap-3 rounded-xl border border-white/70 bg-white/85 p-3 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
                <input
                  id={item.id}
                  type="checkbox"
                  checked={!!readiness[item.id]}
                  onChange={(e) => setReadiness((prev) => ({ ...prev, [item.id]: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded border-white/60 text-solara-blue focus:ring-solara-blue dark:border-white/20 dark:bg-white/10"
                  aria-label={item.label}
                />
                <label htmlFor={item.id} className="flex-1 text-slate-800 dark:text-slate-100">
                  {item.label}
                </label>
              </li>
            ))}
          </ul>
          <div className="space-y-1 rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-sm font-semibold text-solara-navy shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white">
            <div className="flex items-center justify-between">
              <span>Readiness score</span>
              <span>{score}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-white/70 bg-white/85 dark:border-white/10 dark:bg-white/10">
              <div className="h-full bg-button-primary" style={{ width: `${score}%` }} />
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
              {score >= 80 ? "You're set. Open Navigator and share with a helper." : "Fill the gaps before you commit hardware."}
            </p>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="flex items-center gap-2 text-sm font-semibold text-solara-navy dark:text-white">
            <Gauge className="h-4 w-4" />
            Rough sizing estimator
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200">Directional only. Verify with a qualified installer and local rules.</p>
          <div className="space-y-3">
            <label className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-800 dark:text-slate-100">Daily energy target (kWh)</span>
                <span className="text-xs text-slate-500 dark:text-slate-300">{estimator.dailyKWh.toFixed(1)} kWh</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.1}
                value={estimator.dailyKWh}
                onChange={(e) => setEstimator((prev) => ({ ...prev, dailyKWh: parseFloat(e.target.value) }))}
                className="w-full accent-solara-blue"
              />
            </label>
            <label className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-800 dark:text-slate-100">Average sun hours</span>
                <span className="text-xs text-slate-500 dark:text-slate-300">{estimator.sunHours.toFixed(1)} hrs</span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                step={0.1}
                value={estimator.sunHours}
                onChange={(e) => setEstimator((prev) => ({ ...prev, sunHours: parseFloat(e.target.value) }))}
                className="w-full accent-solara-blue"
              />
            </label>
            <label className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-800 dark:text-slate-100">Losses (cables, heat, inverter) %</span>
                <span className="text-xs text-slate-500 dark:text-slate-300">{estimator.losses}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={35}
                step={1}
                value={estimator.losses}
                onChange={(e) => setEstimator((prev) => ({ ...prev, losses: parseInt(e.target.value, 10) }))}
                className="w-full accent-solara-blue"
              />
            </label>

            <div className="space-y-1 text-sm">
              <span className="text-slate-800 dark:text-slate-100">Roof orientation</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(Object.keys(orientationFactors) as Orientation[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEstimator((prev) => ({ ...prev, orientation: key }))}
                    className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition ${
                      estimator.orientation === key
                        ? "border-solara-blue bg-solara-blue/10 text-solara-blue dark:bg-solara-blue/20 dark:text-white"
                        : "border-white/70 bg-white/60 text-slate-700 hover:border-solara-blue/50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    }`}
                  >
                    {orientationFactors[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <span className="text-slate-800 dark:text-slate-100">Battery chemistry</span>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(batteryChemistryInfo) as BatteryChemistry[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEstimator((prev) => ({ ...prev, batteryChemistry: key }))}
                    className={`rounded-lg border px-3 py-2 text-left transition ${
                      estimator.batteryChemistry === key
                        ? "border-solara-blue bg-solara-blue/10 dark:bg-solara-blue/20"
                        : "border-white/70 bg-white/60 hover:border-solara-blue/50 dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    <div className="font-medium text-slate-800 dark:text-white">{batteryChemistryInfo[key].label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-300">{batteryChemistryInfo[key].description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2 rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-sm text-solara-navy shadow-md backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
            <div className="flex items-center justify-between font-semibold">
              <span>Suggested array size</span>
              <span>{sizeEstimate.arrayWatts} W</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span>Approx battery (total)</span>
              <span>{sizeEstimate.batteryKWh.toFixed(1)} kWh</span>
            </div>
            <div className="border-t border-white/50 pt-2 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
              <p className="flex items-center justify-between">
                <span>Orientation factor:</span>
                <span>{Math.round(sizeEstimate.orientationFactor * 100)}%</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Battery usable (DoD):</span>
                <span>{Math.round(sizeEstimate.batteryDod * 100)}%</span>
              </p>
            </div>
            <p className="flex items-center gap-2 border-t border-white/50 pt-2 text-xs font-medium text-slate-700 dark:border-white/10 dark:text-slate-200">
              <AlertTriangle className="h-4 w-4 shrink-0 text-solara-gold" />
              Directional only. Check roof space, structural limits, wiring rules, and local regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPanel;
