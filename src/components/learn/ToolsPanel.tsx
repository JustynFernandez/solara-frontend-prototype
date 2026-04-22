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
  south: { factor: 1.0, label: "South" },
  southEast: { factor: 0.95, label: "South-East" },
  southWest: { factor: 0.95, label: "South-West" },
  east: { factor: 0.85, label: "East" },
  west: { factor: 0.85, label: "West" },
};

const batteryChemistryInfo: Record<BatteryChemistry, { dod: number; label: string; description: string }> = {
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
        setEstimator({ ...defaultEstimator, ...JSON.parse(storedEstimator) });
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

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]">Hands-on tools</p>
        <h3 className="text-xl font-semibold text-[var(--solara-text-strong)]">Try two lightweight planning tools on the page.</h3>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
          These stay local to the browser and are directional only. Use them to frame a conversation, not to replace professional advice.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--solara-text-strong)]">
            <ListChecks className="h-4 w-4 text-[var(--solara-accent-strong)]" />
            Readiness checklist
          </div>
          <p className="mt-1 text-sm leading-6 text-[var(--solara-text-muted)]">
            Check the basics before you run Navigator or contact a helper.
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            {readinessItems.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-3 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3"
              >
                <input
                  id={item.id}
                  type="checkbox"
                  checked={!!readiness[item.id]}
                  onChange={(event) => setReadiness((previous) => ({ ...previous, [item.id]: event.target.checked }))}
                  className="mt-1 h-4 w-4 rounded border-[var(--solara-rule)] bg-transparent accent-[var(--solara-accent)]"
                  aria-label={item.label}
                />
                <label htmlFor={item.id} className="flex-1 leading-6 text-[var(--solara-text-muted)]">
                  {item.label}
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3">
            <div className="flex items-center justify-between text-sm font-semibold text-[var(--solara-text-strong)]">
              <span>Readiness score</span>
              <span>{score}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full border border-[var(--solara-rule)] bg-[var(--solara-surface-1)]">
              <div className="h-full bg-[var(--solara-accent)]" style={{ width: `${score}%` }} />
            </div>
            <p className="mt-2 text-xs text-[var(--solara-text-muted)]">
              {score >= 80 ? "Enough context to move into Navigator or helper support." : "Fill the biggest gaps before you commit hardware."}
            </p>
          </div>
        </section>

        <section className="rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--solara-text-strong)]">
            <Gauge className="h-4 w-4 text-[var(--solara-accent-strong)]" />
            Rough sizing estimator
          </div>
          <p className="mt-1 text-sm leading-6 text-[var(--solara-text-muted)]">
            Directional only. Confirm with a qualified installer and local rules.
          </p>

          <div className="mt-4 space-y-3">
            <RangeField
              label="Daily energy target"
              suffix={`${estimator.dailyKWh.toFixed(1)} kWh`}
              min={1}
              max={15}
              step={0.1}
              value={estimator.dailyKWh}
              onChange={(value) => setEstimator((previous) => ({ ...previous, dailyKWh: value }))}
            />
            <RangeField
              label="Average sun hours"
              suffix={`${estimator.sunHours.toFixed(1)} hrs`}
              min={2}
              max={6}
              step={0.1}
              value={estimator.sunHours}
              onChange={(value) => setEstimator((previous) => ({ ...previous, sunHours: value }))}
            />
            <RangeField
              label="Losses"
              suffix={`${estimator.losses}%`}
              min={10}
              max={35}
              step={1}
              value={estimator.losses}
              onChange={(value) => setEstimator((previous) => ({ ...previous, losses: value }))}
            />

            <OptionGroup
              label="Roof orientation"
              options={(Object.keys(orientationFactors) as Orientation[]).map((key) => ({
                key,
                label: orientationFactors[key].label,
              }))}
              activeKey={estimator.orientation}
              onSelect={(key) => setEstimator((previous) => ({ ...previous, orientation: key as Orientation }))}
            />

            <OptionGroup
              label="Battery chemistry"
              options={(Object.keys(batteryChemistryInfo) as BatteryChemistry[]).map((key) => ({
                key,
                label: batteryChemistryInfo[key].label,
                description: batteryChemistryInfo[key].description,
              }))}
              activeKey={estimator.batteryChemistry}
              onSelect={(key) => setEstimator((previous) => ({ ...previous, batteryChemistry: key as BatteryChemistry }))}
            />
          </div>

          <div className="mt-4 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3 text-sm">
            <MetricRow label="Suggested array size" value={`${sizeEstimate.arrayWatts} W`} />
            <MetricRow label="Approx battery total" value={`${sizeEstimate.batteryKWh.toFixed(1)} kWh`} />
            <div className="mt-3 border-t border-[var(--solara-rule)] pt-3 text-xs text-[var(--solara-text-muted)]">
              <MetricRow label="Orientation factor" value={`${Math.round(sizeEstimate.orientationFactor * 100)}%`} />
              <MetricRow label="Battery usable" value={`${Math.round(sizeEstimate.batteryDod * 100)}%`} />
            </div>
            <p className="mt-3 flex items-start gap-2 border-t border-[var(--solara-rule)] pt-3 text-xs leading-5 text-[var(--solara-text-muted)]">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--solara-accent-strong)]" />
              Check roof space, structural limits, wiring rules, and local regulations before acting on these numbers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

type RangeFieldProps = {
  label: string;
  suffix: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

const RangeField: React.FC<RangeFieldProps> = ({ label, suffix, min, max, step, value, onChange }) => (
  <label className="space-y-1 text-sm">
    <div className="flex items-center justify-between">
      <span className="text-[var(--solara-text-strong)]">{label}</span>
      <span className="text-xs text-[var(--solara-text-muted)]">{suffix}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(parseFloat(event.target.value))}
      className="w-full accent-[var(--solara-accent)]"
    />
  </label>
);

type OptionGroupProps = {
  label: string;
  options: { key: string; label: string; description?: string }[];
  activeKey: string;
  onSelect: (key: string) => void;
};

const OptionGroup: React.FC<OptionGroupProps> = ({ label, options, activeKey, onSelect }) => (
  <div className="space-y-2 text-sm">
    <span className="text-[var(--solara-text-strong)]">{label}</span>
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onSelect(option.key)}
          className={`rounded-md border px-3 py-2 text-left transition ${
            activeKey === option.key
              ? "border-[var(--solara-accent)] bg-[var(--solara-surface-2)]"
              : "border-[var(--solara-rule)] bg-transparent hover:border-[var(--solara-rule)]/80"
          }`}
        >
          <div className="font-medium text-[var(--solara-text-strong)]">{option.label}</div>
          {option.description ? <div className="text-xs text-[var(--solara-text-muted)]">{option.description}</div> : null}
        </button>
      ))}
    </div>
  </div>
);

const MetricRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-0.5">
    <span className="text-[var(--solara-text-muted)]">{label}</span>
    <span className="font-semibold text-[var(--solara-text-strong)]">{value}</span>
  </div>
);

export default ToolsPanel;
