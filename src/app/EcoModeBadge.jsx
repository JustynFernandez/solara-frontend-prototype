import React from "react";
import { useEcoMode } from "@/hooks/useEcoMode";

const EcoModeBadge = () => {
  const { ecoModeEnabled, toggleEcoMode, lowBattery, isLowEndDevice, prefersReducedMotion } = useEcoMode();
  const reasons = [lowBattery && "Low battery", isLowEndDevice && "Optimized device", prefersReducedMotion && "Reduced motion"].filter(Boolean);

  return (
    <button
      type="button"
      onClick={toggleEcoMode}
      aria-pressed={ecoModeEnabled}
      className="group relative inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy shadow-lg backdrop-blur transition hover:scale-[1.02] focus-visible:outline-none focus-glow dark:border-white/10 dark:bg-white/10 dark:text-solara-gold"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-solara-navy/16 via-solara-blue/15 to-solara-gold/13 opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden />
      <span className="relative inline-flex h-2 w-2 animate-pulse rounded-full bg-solara-gold shadow-[0_0_0_8px_rgba(212,175,55,0.2)]" aria-hidden />
      {ecoModeEnabled ? "Eco mode" : "Hyper visuals"}
      {reasons.length > 0 && (
        <span className="relative rounded-full bg-amber-50 px-2 py-1 text-[10px] text-amber-700 shadow-sm dark:bg-solara-gold/20 dark:text-amber-100">
          {reasons.join(" / ")}
        </span>
      )}
    </button>
  );
};

export default EcoModeBadge;

