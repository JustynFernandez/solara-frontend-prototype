import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedButton from "../ui/animated-button";
import SectionContainer from "../ui/section-container";
import SketchNote from "../ui/SketchNote";

const ServicesHero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f7f9ff] via-[#eef3ff] to-[#fdf5e9] py-14 text-slate-900 dark:from-[#0a0f1e] dark:via-[#0b1b3a] dark:to-[#0a0f1e] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(0,123,255,0.18),transparent_40%),radial-gradient(circle_at_82%_10%,rgba(255,215,0,0.18),transparent_38%),radial-gradient(circle_at_48%_90%,rgba(0,123,255,0.12),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 learn-grid opacity-10 mix-blend-soft-light dark:opacity-20" aria-hidden />
      <SectionContainer className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.55 }}
          className="space-y-5 rounded-[30px] border border-white/60 bg-white/85 p-8 shadow-[0_24px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c7d2fe]">
            The Project OS for small-scale solar
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl dark:text-white">The Project OS for small-scale solar</h1>
          <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">
            Plan with clarity, coordinate helpers, and sustain safe systems. Built for homeowners, tenants, and community leads.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <SketchNote text="Quick start" tone="gold" className="hidden sm:inline-flex" />
              <AnimatedButton href="/plan/navigator" className="px-5 py-3">
                Start Solar Navigator
              </AnimatedButton>
            </div>
            <AnimatedButton variant="outline" href="/projects" className="px-5 py-3">
              Explore Project Workspaces
            </AnimatedButton>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200/80">Safety-first. Certified help for mains wiring, clear guidance for DC and planning.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.5, delay: 0.05 }}
          className="rounded-[28px] border border-white/60 bg-white/85 p-6 text-slate-900 shadow-[0_24px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Plan / Projects / Connect / Sustain</p>
            <p className="text-sm text-slate-700 dark:text-slate-200/85">
              Every service connects the end-to-end flow: Navigator drafts become Project Workspaces, with helpers ready when you request support.
            </p>
            <div className="grid gap-2 text-sm text-slate-800 dark:text-slate-100">
              {[
                "Save and resume Navigator drafts any time.",
                "Copy-paste tasks and safety checkpoints into Workspaces.",
                "Request certified help for mains wiring; volunteers for guidance.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#ffd700]" aria-hidden />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </div>
  );
};

export default ServicesHero;

