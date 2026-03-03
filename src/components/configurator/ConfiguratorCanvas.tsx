import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useEcoMode } from "../../hooks/useEcoMode";
import { useConfiguratorStore } from "./hooks/useConfiguratorStore";
import SceneEnvironment from "./three/SceneEnvironment";
import RoofModel from "./three/RoofModel";
import PanelGrid from "./three/PanelGrid";
import ObstacleGrid from "./three/ObstacleGrid";
import BatteryUnit from "./three/BatteryUnit";
import { PANEL_SPECS } from "../../data/configuratorDefaults";
import { Sun, MousePointer, Trash2, Move, Cone } from "lucide-react";

const SimplifiedFallbackView: React.FC = () => {
  const { roof, panels, sun } = useConfiguratorStore();

  const scale = 30;
  const viewWidth = roof.width * scale;
  const viewDepth = roof.depth * scale;

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
      <div className="absolute right-4 top-4 rounded-lg bg-amber-100 px-3 py-2 text-xs text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
        2D view (eco mode active)
      </div>

      <svg
        width={viewWidth + 80}
        height={viewDepth + 80}
        viewBox={`0 0 ${viewWidth + 80} ${viewDepth + 80}`}
        className="max-h-full max-w-full"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        <g transform={`translate(40, 40)`}>
          <rect
            x="0"
            y="0"
            width={viewWidth}
            height={viewDepth}
            fill="#64748b"
            stroke="#475569"
            strokeWidth="2"
            rx="4"
          />

          {roof.type === "gabled" && (
            <line
              x1={viewWidth / 2}
              y1="0"
              x2={viewWidth / 2}
              y2={viewDepth}
              stroke="#334155"
              strokeWidth="3"
              strokeDasharray="8 4"
            />
          )}

          {panels.map((panel) => {
            const panelWidth = PANEL_SPECS.width * scale;
            const panelHeight = PANEL_SPECS.height * scale;
            const x = (panel.position[0] + roof.width / 2) * scale - panelWidth / 2;
            const y = (panel.position[2] + roof.depth / 2) * scale - panelHeight / 2;

            return (
              <rect
                key={panel.id}
                x={x}
                y={y}
                width={panelWidth}
                height={panelHeight}
                fill="#1e3a5f"
                stroke="#0f172a"
                strokeWidth="1"
                rx="2"
              />
            );
          })}

          <g transform={`translate(${viewWidth + 20}, ${viewDepth / 2})`}>
            <circle r="12" fill="#fbbf24" />
            <text
              x="0"
              y="30"
              textAnchor="middle"
              fontSize="10"
              fill="#64748b"
            >
              {sun.hour}:00
            </text>
          </g>
        </g>
      </svg>

      <div className="absolute bottom-4 left-4 text-xs text-slate-500 dark:text-slate-400">
        {panels.length} panel{panels.length !== 1 ? "s" : ""} placed
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      <span className="text-sm text-slate-600 dark:text-slate-300">
        Loading 3D scene...
      </span>
    </div>
  </div>
);

const ToolIndicator: React.FC = () => {
  const { toolMode, obstacleType } = useConfiguratorStore();

  const config: Record<string, { icon: typeof Sun; label: string; color: string }> = {
    view: { icon: Sun, label: "View mode", color: "text-slate-500" },
    add: { icon: MousePointer, label: "Click to place panels", color: "text-blue-600" },
    remove: { icon: Trash2, label: "Click to remove", color: "text-red-600" },
    move: { icon: Move, label: "Drag panels to move", color: "text-amber-600" },
    obstacle: { icon: Cone, label: `Place ${obstacleType || "obstacle"}`, color: "text-purple-600" },
  };

  const { icon: Icon, label, color } = config[toolMode] || config.view;

  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-sm shadow-lg backdrop-blur dark:bg-slate-800/90">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className="text-slate-700 dark:text-slate-200">{label}</span>
    </div>
  );
};

const ConfiguratorCanvas: React.FC = () => {
  const { ecoModeEnabled } = useEcoMode();

  if (ecoModeEnabled) {
    return <SimplifiedFallbackView />;
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const shadowMapSize = isMobile ? 1024 : 2048;
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          shadows
          dpr={dpr}
          camera={{
            position: [10, 8, 10],
            fov: 45,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
        >
          <SceneEnvironment shadowMapSize={shadowMapSize}>
            <RoofModel />
            <PanelGrid />
            <ObstacleGrid />
            <BatteryUnit />
          </SceneEnvironment>
        </Canvas>
      </Suspense>

      <ToolIndicator />
    </div>
  );
};

export default ConfiguratorCanvas;
