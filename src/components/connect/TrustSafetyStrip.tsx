import React from "react";
import AnimatedButton from "../ui/animated-button";

const TrustSafetyStrip: React.FC = () => (
  <div className="grid gap-3 rounded-3xl border border-white/60 bg-white/85 p-4 text-slate-900 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white sm:grid-cols-4">
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Role levels</p>
      <p className="text-sm text-slate-700 dark:text-slate-200">Community Volunteer</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">Guidance, photos, checklists.</p>
    </div>
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Trained Volunteer</p>
      <p className="text-sm text-slate-700 dark:text-slate-200">Peer review, site walkthroughs.</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">Tool coaching and remote support.</p>
    </div>
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Certified Installer</p>
      <p className="text-sm text-slate-700 dark:text-slate-200">Mains wiring, commissioning.</p>
      <p className="text-xs text-slate-600 dark:text-slate-300">Required for any mains work.</p>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-xs text-slate-600 dark:text-slate-300">Any work involving mains wiring requires a certified professional.</p>
      <div className="flex flex-wrap gap-2">
        <AnimatedButton variant="outline" href="/safety" className="px-3 py-2">
          Safety
        </AnimatedButton>
        <AnimatedButton variant="outline" href="/community-guidelines" className="px-3 py-2">
          Guidelines
        </AnimatedButton>
      </div>
    </div>
  </div>
);

export default TrustSafetyStrip;
