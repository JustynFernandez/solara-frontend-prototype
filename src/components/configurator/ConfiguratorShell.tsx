import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useEcoMode } from "../../hooks/useEcoMode";
import { Sun, Zap } from "lucide-react";

type ConfiguratorShellProps = {
  children: React.ReactNode;
};

const ConfiguratorShell: React.FC<ConfiguratorShellProps> = ({ children }) => {
  const { ecoModeEnabled } = useEcoMode();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f9ff] via-[#eef3ff] to-[#fdf5e9] text-slate-900 dark:from-[#0a0f1e] dark:via-[#0b1b3a] dark:to-[#0a0f1e] dark:text-white">
      {!ecoModeEnabled && (
        <MeshGradient
          speed={0.3}
          colors={["#003366", "#0b4fbf", "#007bff", "#ffd70060"]}
          distortion={0.5}
          swirl={0.1}
          grainMixer={0.08}
          grainOverlay={0.04}
          className="pointer-events-none absolute inset-0 opacity-60"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(0,123,255,0.18),transparent_38%),radial-gradient(circle_at_82%_12%,rgba(255,204,0,0.15),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(0,123,255,0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 learn-grid opacity-10 mix-blend-soft-light dark:opacity-15" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/85 px-4 py-3 text-slate-900 backdrop-blur-lg dark:border-white/10 dark:bg-white/5 dark:text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#003366] to-[#0b4fbf] text-[#ffd700] shadow-[0_12px_36px_rgba(0,51,102,0.35)] ring-1 ring-[#0b4fbf]">
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-solara-navy dark:text-indigo-200">
                3D Configurator
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Design your solar setup
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {ecoModeEnabled && (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <Zap className="h-3 w-3" />
                Eco mode
              </span>
            )}
            <div className="flex items-center gap-2 text-xs text-solara-navy dark:text-indigo-200">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.22)]"
                aria-hidden
              />
              Auto-saving
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};

export default ConfiguratorShell;
