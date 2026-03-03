import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PANEL_SPECS } from "../../../data/configuratorDefaults";

export type RoofType = "flat" | "gabled" | "hip";
export type ToolMode = "view" | "add" | "remove" | "move" | "obstacle";
export type RoofFace = "top" | "front" | "back" | "left" | "right";
export type ObstacleType = "chimney" | "skylight" | "vent";

export interface Panel {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  roofFace: RoofFace;
}

export interface Obstacle {
  id: string;
  type: ObstacleType;
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface RoofConfig {
  type: RoofType;
  width: number;
  depth: number;
  pitchAngle: number;
  orientation: number;
}

export interface SunConfig {
  hour: number;
  month: number;
  latitude: number;
}

export interface SunPlayback {
  isPlaying: boolean;
  speed: number;
}

export interface BatteryConfig {
  count: number;
  capacityKwh: number;
}

export type PresetType = "3x4" | "2x6" | "4x4" | "l-shape" | "fill";

interface ConfiguratorState {
  roof: RoofConfig;
  panels: Panel[];
  obstacles: Obstacle[];
  sun: SunConfig;
  sunPlayback: SunPlayback;
  battery: BatteryConfig;
  toolMode: ToolMode;
  obstacleType: ObstacleType;
  selectedPanelId: string | null;

  setRoof: (config: Partial<RoofConfig>) => void;
  addPanel: (panel: Panel) => void;
  removePanel: (id: string) => void;
  updatePanelPosition: (id: string, position: [number, number, number]) => void;
  clearPanels: () => void;
  applyPreset: (preset: PresetType) => void;
  addObstacle: (obstacle: Obstacle) => void;
  removeObstacle: (id: string) => void;
  clearObstacles: () => void;
  setSun: (config: Partial<SunConfig>) => void;
  setSunPlayback: (config: Partial<SunPlayback>) => void;
  setBattery: (config: Partial<BatteryConfig>) => void;
  setToolMode: (mode: ToolMode) => void;
  setObstacleType: (type: ObstacleType) => void;
  setSelectedPanel: (id: string | null) => void;
  reset: () => void;
}

const defaultRoof: RoofConfig = {
  type: "gabled",
  width: 8,
  depth: 6,
  pitchAngle: 30,
  orientation: 180,
};

const defaultSun: SunConfig = {
  hour: 12,
  month: 6,
  latitude: 51.5,
};

const defaultSunPlayback: SunPlayback = {
  isPlaying: false,
  speed: 1,
};

const defaultBattery: BatteryConfig = {
  count: 0,
  capacityKwh: 10,
};

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generatePresetPanels(
  preset: PresetType,
  roof: RoofConfig
): Panel[] {
  const panels: Panel[] = [];
  const spacing = 0.1;
  const panelW = PANEL_SPECS.width + spacing;
  const panelH = PANEL_SPECS.height + spacing;

  let rows = 0;
  let cols = 0;

  switch (preset) {
    case "3x4":
      rows = 3;
      cols = 4;
      break;
    case "2x6":
      rows = 2;
      cols = 6;
      break;
    case "4x4":
      rows = 4;
      cols = 4;
      break;
    case "fill":
      cols = Math.floor((roof.width - 0.4) / panelW);
      rows = Math.floor((roof.depth - 0.4) / panelH);
      break;
    case "l-shape":
      // L-shape: 3 cols on bottom, 2 cols on top-left
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (r < 2 || c < 2) {
            const x = (c - 1) * panelW;
            const z = (r - 1) * panelH;
            panels.push({
              id: generateId("panel"),
              position: [x, 0.2, z],
              rotation: [0, 0, 0],
              roofFace: "top",
            });
          }
        }
      }
      return panels;
  }

  // Grid layout
  const startX = -((cols - 1) * panelW) / 2;
  const startZ = -((rows - 1) * panelH) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * panelW;
      const z = startZ + r * panelH;
      panels.push({
        id: generateId("panel"),
        position: [x, 0.2, z],
        rotation: [0, 0, 0],
        roofFace: "top",
      });
    }
  }

  return panels;
}

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      roof: defaultRoof,
      panels: [],
      obstacles: [],
      sun: defaultSun,
      sunPlayback: defaultSunPlayback,
      battery: defaultBattery,
      toolMode: "add",
      obstacleType: "chimney",
      selectedPanelId: null,

      setRoof: (config) =>
        set((state) => ({
          roof: { ...state.roof, ...config },
          panels: [],
          obstacles: [],
        })),

      addPanel: (panel) =>
        set((state) => ({
          panels: [...state.panels, panel],
        })),

      removePanel: (id) =>
        set((state) => ({
          panels: state.panels.filter((p) => p.id !== id),
          selectedPanelId:
            state.selectedPanelId === id ? null : state.selectedPanelId,
        })),

      updatePanelPosition: (id, position) =>
        set((state) => ({
          panels: state.panels.map((p) =>
            p.id === id ? { ...p, position } : p
          ),
        })),

      clearPanels: () =>
        set({
          panels: [],
          selectedPanelId: null,
        }),

      applyPreset: (preset) => {
        const { roof } = get();
        const panels = generatePresetPanels(preset, roof);
        set({ panels, selectedPanelId: null });
      },

      addObstacle: (obstacle) =>
        set((state) => ({
          obstacles: [...state.obstacles, obstacle],
        })),

      removeObstacle: (id) =>
        set((state) => ({
          obstacles: state.obstacles.filter((o) => o.id !== id),
        })),

      clearObstacles: () =>
        set({
          obstacles: [],
        }),

      setSun: (config) =>
        set((state) => ({
          sun: { ...state.sun, ...config },
        })),

      setSunPlayback: (config) =>
        set((state) => ({
          sunPlayback: { ...state.sunPlayback, ...config },
        })),

      setBattery: (config) =>
        set((state) => ({
          battery: { ...state.battery, ...config },
        })),

      setToolMode: (mode) =>
        set({
          toolMode: mode,
          selectedPanelId: null,
        }),

      setObstacleType: (type) =>
        set({
          obstacleType: type,
        }),

      setSelectedPanel: (id) =>
        set({
          selectedPanelId: id,
        }),

      reset: () =>
        set({
          roof: defaultRoof,
          panels: [],
          obstacles: [],
          sun: defaultSun,
          sunPlayback: defaultSunPlayback,
          battery: defaultBattery,
          toolMode: "add",
          obstacleType: "chimney",
          selectedPanelId: null,
        }),
    }),
    { name: "solara.configurator.v2" }
  )
);
