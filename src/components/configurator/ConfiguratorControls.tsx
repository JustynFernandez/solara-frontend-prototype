import React from "react";
import {
  Eye,
  MousePointer,
  Trash2,
  RotateCcw,
  Home,
  Triangle,
  Move,
  Cone,
  Play,
  Pause,
  Grid3X3,
  Battery,
  Square,
  CircleDot,
} from "lucide-react";
import {
  useConfiguratorStore,
  type RoofType,
  type ToolMode,
  type ObstacleType,
  type PresetType,
} from "./hooks/useConfiguratorStore";
import {
  ROOF_PRESETS,
  MONTHS,
  PANEL_PRESETS,
  BATTERY_SPECS,
} from "../../data/configuratorDefaults";

const sectionClassName =
  "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-3 shadow-[var(--solara-shadow-soft)]";
const titleClassName =
  "mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]";
const quietButtonClassName =
  "rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-2 text-xs font-medium text-[var(--solara-text-muted)] transition hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)] disabled:cursor-not-allowed disabled:opacity-50";
const activeButtonClassName =
  "rounded-md border border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] px-3 py-2 text-xs font-semibold text-[var(--solara-accent-strong)] transition";
const fieldClassName =
  "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-2 text-xs text-[var(--solara-text-strong)] outline-none transition focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";
const rangeClassName = "h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[var(--solara-surface-2)] accent-[var(--solara-accent)]";

const ConfiguratorControls: React.FC = () => {
  const {
    roof,
    sun,
    sunPlayback,
    battery,
    toolMode,
    obstacleType,
    panels,
    obstacles,
    setRoof,
    setSun,
    setSunPlayback,
    setBattery,
    setToolMode,
    setObstacleType,
    clearPanels,
    clearObstacles,
    applyPreset,
    reset,
  } = useConfiguratorStore();

  const toolOptions: { mode: ToolMode; icon: React.ElementType; label: string }[] = [
    { mode: "view", icon: Eye, label: "View" },
    { mode: "add", icon: MousePointer, label: "Add" },
    { mode: "remove", icon: Trash2, label: "Remove" },
    { mode: "move", icon: Move, label: "Move" },
    { mode: "obstacle", icon: Cone, label: "Obstacle" },
  ];

  const roofTypes: { type: RoofType; icon: React.ElementType }[] = [
    { type: "flat", icon: Square },
    { type: "gabled", icon: Triangle },
    { type: "hip", icon: Home },
  ];

  const obstacleTypes: { type: ObstacleType; label: string }[] = [
    { type: "chimney", label: "Chimney" },
    { type: "skylight", label: "Skylight" },
    { type: "vent", label: "Vent" },
  ];

  const presetOptions: PresetType[] = ["3x4", "2x6", "4x4", "l-shape", "fill"];

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto pb-4">
      <section className={sectionClassName}>
        <h3 className={titleClassName}>Tool mode</h3>
        <div className="flex flex-wrap gap-1.5">
          {toolOptions.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setToolMode(mode)}
              className={toolMode === mode ? activeButtonClassName : quietButtonClassName}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            </button>
          ))}
        </div>

        {toolMode === "obstacle" ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {obstacleTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setObstacleType(type)}
                className={obstacleType === type ? activeButtonClassName : quietButtonClassName}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className={sectionClassName}>
        <h3 className={`${titleClassName} flex items-center gap-2`}>
          <Grid3X3 className="h-3.5 w-3.5" />
          Quick layouts
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {presetOptions.map((preset) => (
            <button key={preset} onClick={() => applyPreset(preset)} className={quietButtonClassName}>
              {PANEL_PRESETS[preset].label}
            </button>
          ))}
        </div>
      </section>

      <section className={sectionClassName}>
        <h3 className={titleClassName}>Roof type</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {roofTypes.map(({ type, icon: Icon }) => {
            const preset = ROOF_PRESETS[type];
            return (
              <button
                key={type}
                onClick={() => setRoof({ type, pitchAngle: preset.pitchAngle })}
                className={roof.type === type ? activeButtonClassName : quietButtonClassName}
              >
                <span className="flex flex-col items-center gap-1">
                  <Icon className="h-4 w-4" />
                  <span>{preset.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={sectionClassName}>
        <h3 className={titleClassName}>Dimensions</h3>
        <div className="space-y-3">
          <div>
            <label className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
              <span>Width</span>
              <span>{roof.width}m</span>
            </label>
            <input type="range" min="4" max="16" step="0.5" value={roof.width} onChange={(e) => setRoof({ width: parseFloat(e.target.value) })} className={rangeClassName} />
          </div>
          <div>
            <label className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
              <span>Depth</span>
              <span>{roof.depth}m</span>
            </label>
            <input type="range" min="3" max="12" step="0.5" value={roof.depth} onChange={(e) => setRoof({ depth: parseFloat(e.target.value) })} className={rangeClassName} />
          </div>
          {roof.type === "gabled" || roof.type === "hip" ? (
            <div>
              <label className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                <span>Pitch</span>
                <span>{roof.pitchAngle} deg</span>
              </label>
              <input type="range" min="15" max="45" step="5" value={roof.pitchAngle} onChange={(e) => setRoof({ pitchAngle: parseFloat(e.target.value) })} className={rangeClassName} />
            </div>
          ) : null}
        </div>
      </section>

      <section className={sectionClassName}>
        <h3 className={titleClassName}>Sun position</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setSunPlayback({ isPlaying: !sunPlayback.isPlaying })} className={sunPlayback.isPlaying ? activeButtonClassName : quietButtonClassName}>
              {sunPlayback.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <div className="flex-1">
              <label className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                <span>Time</span>
                <span>{sun.hour}:00</span>
              </label>
              <input
                type="range"
                min="5"
                max="21"
                step="0.5"
                value={sun.hour}
                onChange={(e) => setSun({ hour: parseFloat(e.target.value) })}
                disabled={sunPlayback.isPlaying}
                className={rangeClassName}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">Speed</span>
            {[1, 2, 4].map((speed) => (
              <button key={speed} onClick={() => setSunPlayback({ speed })} className={sunPlayback.speed === speed ? activeButtonClassName : quietButtonClassName}>
                {speed}x
              </button>
            ))}
          </div>

          <select value={sun.month} onChange={(e) => setSun({ month: parseInt(e.target.value, 10) })} className={fieldClassName}>
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className={sectionClassName}>
        <h3 className={`${titleClassName} flex items-center gap-2`}>
          <Battery className="h-3.5 w-3.5" />
          Battery storage
        </h3>
        <div className="flex items-center gap-3">
          <button onClick={() => setBattery({ count: Math.max(0, battery.count - 1) })} disabled={battery.count === 0} className={quietButtonClassName}>
            -
          </button>
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-[var(--solara-text-strong)]">{battery.count}</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
              {battery.count * BATTERY_SPECS.capacityKwh} kWh total
            </p>
          </div>
          <button onClick={() => setBattery({ count: Math.min(3, battery.count + 1) })} disabled={battery.count >= 3} className={quietButtonClassName}>
            +
          </button>
        </div>
      </section>

      <section className={sectionClassName}>
        <h3 className={titleClassName}>Actions</h3>
        <div className="flex flex-col gap-1.5">
          <button onClick={clearPanels} disabled={panels.length === 0} className={quietButtonClassName}>
            <span className="flex items-center justify-center gap-1.5">
              <Trash2 className="h-3.5 w-3.5" />
              Clear panels ({panels.length})
            </span>
          </button>
          {obstacles.length > 0 ? (
            <button onClick={clearObstacles} className={quietButtonClassName}>
              <span className="flex items-center justify-center gap-1.5">
                <CircleDot className="h-3.5 w-3.5" />
                Clear obstacles ({obstacles.length})
              </span>
            </button>
          ) : null}
          <button onClick={reset} className={quietButtonClassName}>
            <span className="flex items-center justify-center gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset all
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConfiguratorControls;
