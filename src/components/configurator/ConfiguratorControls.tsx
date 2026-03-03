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
  OBSTACLE_SPECS,
  BATTERY_SPECS,
} from "../../data/configuratorDefaults";

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
      {/* Tool Mode */}
      <section className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Tool Mode
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {toolOptions.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setToolMode(mode)}
              className={`flex flex-1 min-w-[60px] flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium transition-all ${
                toolMode === mode
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Obstacle type selector */}
        {toolMode === "obstacle" && (
          <div className="mt-2 flex gap-1">
            {obstacleTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setObstacleType(type)}
                className={`flex-1 rounded px-2 py-1.5 text-[10px] font-medium transition-all ${
                  obstacleType === type
                    ? "bg-amber-500 text-white"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Panel Presets */}
      <section className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          <Grid3X3 className="h-3.5 w-3.5" />
          Quick Layouts
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {presetOptions.map((preset) => (
            <button
              key={preset}
              onClick={() => applyPreset(preset)}
              className="rounded bg-slate-100 px-2.5 py-1.5 text-[10px] font-medium text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
            >
              {PANEL_PRESETS[preset].label}
            </button>
          ))}
        </div>
      </section>

      {/* Roof Type */}
      <section className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Roof Type
        </h3>
        <div className="grid grid-cols-3 gap-1.5">
          {roofTypes.map(({ type, icon: Icon }) => {
            const preset = ROOF_PRESETS[type];
            return (
              <button
                key={type}
                onClick={() => setRoof({ type, pitchAngle: preset.pitchAngle })}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 text-center transition-all ${
                  roof.type === type
                    ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-400 ring-offset-1 dark:ring-offset-slate-900"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{preset.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Roof Dimensions */}
      <section className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Dimensions
        </h3>
        <div className="space-y-2">
          <div>
            <label className="mb-0.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>Width</span>
              <span className="font-mono">{roof.width}m</span>
            </label>
            <input
              type="range"
              min="4"
              max="16"
              step="0.5"
              value={roof.width}
              onChange={(e) => setRoof({ width: parseFloat(e.target.value) })}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600 dark:bg-slate-600"
            />
          </div>
          <div>
            <label className="mb-0.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>Depth</span>
              <span className="font-mono">{roof.depth}m</span>
            </label>
            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={roof.depth}
              onChange={(e) => setRoof({ depth: parseFloat(e.target.value) })}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600 dark:bg-slate-600"
            />
          </div>
          {(roof.type === "gabled" || roof.type === "hip") && (
            <div>
              <label className="mb-0.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                <span>Pitch</span>
                <span className="font-mono">{roof.pitchAngle}°</span>
              </label>
              <input
                type="range"
                min="15"
                max="45"
                step="5"
                value={roof.pitchAngle}
                onChange={(e) => setRoof({ pitchAngle: parseFloat(e.target.value) })}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600 dark:bg-slate-600"
              />
            </div>
          )}
        </div>
      </section>

      {/* Sun Position with Playback */}
      <section className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Sun Position
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSunPlayback({ isPlaying: !sunPlayback.isPlaying })}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                sunPlayback.isPlaying
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-slate-200 text-slate-600 hover:bg-amber-100 dark:bg-slate-600 dark:text-slate-300"
              }`}
            >
              {sunPlayback.isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>
            <div className="flex-1">
              <label className="mb-0.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                <span>Time</span>
                <span className="font-mono">{sun.hour}:00</span>
              </label>
              <input
                type="range"
                min="5"
                max="21"
                step="0.5"
                value={sun.hour}
                onChange={(e) => setSun({ hour: parseFloat(e.target.value) })}
                disabled={sunPlayback.isPlaying}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-amber-500 disabled:opacity-50 dark:bg-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Speed:</span>
            {[1, 2, 4].map((speed) => (
              <button
                key={speed}
                onClick={() => setSunPlayback({ speed })}
                className={`rounded px-2 py-0.5 text-[10px] font-medium transition-all ${
                  sunPlayback.speed === speed
                    ? "bg-amber-500 text-white"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-300"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <select
            value={sun.month}
            onChange={(e) => setSun({ month: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
          >
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Battery Storage */}
      <section className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          <Battery className="h-3.5 w-3.5" />
          Battery Storage
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBattery({ count: Math.max(0, battery.count - 1) })}
            disabled={battery.count === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-600 transition-colors hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-600 dark:text-slate-300"
          >
            -
          </button>
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-slate-800 dark:text-white">
              {battery.count}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {battery.count * BATTERY_SPECS.capacityKwh} kWh total
            </p>
          </div>
          <button
            onClick={() => setBattery({ count: Math.min(3, battery.count + 1) })}
            disabled={battery.count >= 3}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-600 transition-colors hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-600 dark:text-slate-300"
          >
            +
          </button>
        </div>
      </section>

      {/* Actions */}
      <section className="rounded-xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Actions
        </h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={clearPanels}
            disabled={panels.length === 0}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Panels ({panels.length})
          </button>
          {obstacles.length > 0 && (
            <button
              onClick={clearObstacles}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <CircleDot className="h-3.5 w-3.5" />
              Clear Obstacles ({obstacles.length})
            </button>
          )}
          <button
            onClick={reset}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConfiguratorControls;
