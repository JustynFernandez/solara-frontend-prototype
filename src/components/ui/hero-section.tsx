import React from "react";
import { motion } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import AnimatedButton from "./animated-button";
import SolarParticles from "./solar-particles";
import EnergyOrb from "./energy-orb";
import { useEcoMode } from "../../hooks/useEcoMode";
import SketchNote from "./SketchNote";

type CTA = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
};

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctas: CTA[];
};

const HeroSection: React.FC<HeroSectionProps> = ({ eyebrow, title, subtitle, ctas }) => {
  const { ecoModeEnabled } = useEcoMode();
  const motionEnabled = !ecoModeEnabled;
  const primaryCta = ctas[0];
  const secondaryCtas = ctas.slice(1);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/50 bg-gradient-to-br from-white via-[#eff4ff] to-[#fdf5e9] p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-[#050a16] dark:via-[#071226] dark:to-[#0b1d3c] sm:p-10">
      {motionEnabled && (
        <MeshGradient
          speed={0.6}
          colors={["#003366", "#0b4fbf", "#007bff", "#d4af3780"]}
          distortion={0.9}
          swirl={0.18}
          grainMixer={0.12}
          grainOverlay={0.08}
          className="pointer-events-none absolute inset-0 opacity-80"
        />
      )}
      {motionEnabled && <SolarParticles className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen" />}
      {motionEnabled && <EnergyOrb className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 opacity-60" />}
      <div className="pointer-events-none absolute inset-0 solara-ray-mask mix-blend-screen dark:mix-blend-soft-light" />
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionEnabled ? 0.45 : 0.2 }}
      className="relative z-10 space-y-6 text-slate-900 dark:text-slate-50"
    >
        <HeroPill eyebrow={eyebrow} />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 lg:max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              <span className="bio-underline">{title}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-700/90 dark:text-slate-200/90">{subtitle}</p>
            <div className="flex flex-wrap items-center gap-3">
              {primaryCta && (
                <div className="flex items-center gap-2">
                  <SketchNote text="Start here" tone="gold" className="hidden sm:inline-flex" />
                  <AnimatedButton
                    key={primaryCta.label}
                    variant={primaryCta.variant || "primary"}
                    onClick={primaryCta.onClick}
                    href={primaryCta.href}
                  >
                    {primaryCta.label}
                  </AnimatedButton>
                </div>
              )}
              {secondaryCtas.map((cta) => (
                <AnimatedButton key={cta.label} variant={cta.variant || "primary"} onClick={cta.onClick} href={cta.href}>
                  {cta.label}
                </AnimatedButton>
              ))}
            </div>
            <HeroEcoBar />
          </div>
          <HeroFacts motionEnabled={motionEnabled} />
        </div>
    </motion.div>

    <span className="handmade-scribble pointer-events-none absolute bottom-6 left-8 h-10 w-32 rotate-[-4deg]" aria-hidden />
    <span className="handmade-corner pointer-events-none absolute right-8 top-8 h-10 w-10 rotate-[6deg]" aria-hidden />
    <div
      className={`pointer-events-none absolute -left-16 top-6 h-52 w-52 rounded-full bg-[rgba(0,123,255,0.14)] blur-3xl ${
        motionEnabled ? "animate-float" : ""
        }`}
      />
      <div
        className={`pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[rgba(212,175,55,0.14)] blur-3xl ${
          motionEnabled ? "animate-float-slow" : ""
        }`}
      />
    </div>
  );
};

export default HeroSection;

const HeroPill: React.FC<{ eyebrow?: string }> = ({ eyebrow }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-indigo-100">
    <span className="relative h-2 w-2 rounded-full bg-solara-gold shadow-[0_0_0_8px_rgba(212,175,55,0.22)] after:absolute after:inset-[-10px] after:rounded-full after:border after:border-solara-gold/35 after:animate-pulse-ring" />
    {eyebrow || "Solara Community"}
  </div>
);

const HeroFacts: React.FC<{ motionEnabled?: boolean }> = ({ motionEnabled = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: motionEnabled ? 0.5 : 0.2, delay: motionEnabled ? 0.05 : 0 }}
    className="mt-4 grid w-full max-w-sm gap-3 rounded-2xl border border-white/60 bg-white/80 p-4 text-sm text-slate-700 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
  >
    {["Verified neighbors", "Tool & knowledge library", "Climate-positive by design"].map((item, index) => (
      <motion.div
        key={item}
        animate={motionEnabled ? { y: [0, -6, 0] } : { y: 0 }}
        transition={motionEnabled ? { duration: 5 + index, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
        className="flex items-center gap-3 rounded-xl bg-white/85 px-3 py-2 shadow-sm ring-1 ring-white/60 backdrop-blur-sm dark:bg-white/5 dark:ring-white/10"
      >
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-solara-foam to-[#fdf5e9] text-solara-navy shadow-glow dark:from-solara-panel dark:to-[#1b2b44] dark:text-indigo-100">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <span className="font-semibold">{item}</span>
      </motion.div>
    ))}
  </motion.div>
);

const HeroEcoBar = () => {
  const { ecoModeEnabled, toggleEcoMode, lowBattery, isLowEndDevice, prefersReducedMotion } = useEcoMode();
  const reasons = [
    lowBattery && "Low battery detected",
    isLowEndDevice && "Performance-limited device",
    prefersReducedMotion && "Prefers reduced motion",
  ].filter(Boolean);

  return (
    <div className="mt-3 grid gap-3 rounded-2xl border border-white/60 bg-white/85 p-3 text-xs shadow-inner backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-100">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-solara-gold" />
          Eco Motion Guard
        </p>
        <button
          type="button"
          onClick={toggleEcoMode}
          aria-pressed={ecoModeEnabled}
          className="aurora-border relative inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-800 transition hover:scale-[1.01] dark:bg-white/5 dark:text-slate-100"
        >
          <span className="h-2 w-2 rounded-full bg-solara-gold shadow-[0_0_0_8px_rgba(212,175,55,0.28)]" />
          {ecoModeEnabled ? "Eco mode on" : "Hyper mode"}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-slate-700/80 dark:text-slate-200/80">
        <span className="rounded-full bg-solara-foam px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-solara-navy shadow-sm dark:bg-solara-panel dark:text-indigo-100">
          Live
        </span>
        <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-700 shadow-sm dark:bg-solara-panel dark:text-amber-100">
          Adaptive animations
        </span>
        {reasons.length > 0 && (
          <span className="text-[11px] text-slate-600 dark:text-slate-200">Detected: {reasons.join(" / ")}</span>
        )}
      </div>
    </div>
  );
};
