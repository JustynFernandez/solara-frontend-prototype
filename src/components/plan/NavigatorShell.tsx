import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { useEcoMode } from "../../hooks/useEcoMode";

type NavigatorShellProps = {
  children: React.ReactNode;
};

// Full-screen glass shell for the wizard, with brand top bar.
const NavigatorShell: React.FC<NavigatorShellProps> = ({ children }) => {
  const { ecoModeEnabled } = useEcoMode();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f9ff] via-[#eef3ff] to-[#fdf5e9] text-slate-900 dark:from-[#0a0f1e] dark:via-[#0b1b3a] dark:to-[#0a0f1e] dark:text-white">
      {!ecoModeEnabled && (
        <MeshGradient
          speed={0.4}
          colors={["#003366", "#0b4fbf", "#007bff", "#ffd70060"]}
          distortion={0.7}
          swirl={0.12}
          grainMixer={0.1}
          grainOverlay={0.05}
          className="pointer-events-none absolute inset-0 opacity-70"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(0,123,255,0.2),transparent_38%),radial-gradient(circle_at_82%_12%,rgba(255,204,0,0.18),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(0,123,255,0.1),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 learn-grid opacity-10 mix-blend-soft-light dark:opacity-15" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <header className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/85 px-4 py-3 text-slate-900 backdrop-blur-lg dark:border-white/10 dark:bg-white/5 dark:text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003366] text-[#ffd700] shadow-[0_12px_36px_rgba(0,51,102,0.35)] ring-1 ring-[#0b4fbf]">
              <span className="text-base font-semibold">SN</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Solar Navigator</p>
              <p className="text-sm text-slate-900 dark:text-white">Project OS planning</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-solara-navy dark:text-indigo-200">
            <span className="h-2 w-2 rounded-full bg-[#ffd700] shadow-[0_0_0_6px_rgba(255,215,0,0.22)]" aria-hidden />
            Live draft autosave
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default NavigatorShell;
