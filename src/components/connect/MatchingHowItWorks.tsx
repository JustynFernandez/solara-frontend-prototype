import React from "react";
import SectionContainer from "../ui/section-container";

const steps = [
  { title: "Describe your task", detail: "Share site context, timelines, and safety needs." },
  { title: "Choose support level", detail: "Community, trained, or certified help for mains wiring." },
  { title: "Confirm contact method", detail: "Set expectations on response time and availability." },
  { title: "Move into a workspace", detail: "Track tasks, files, and helpers in one place." },
];

const MatchingHowItWorks: React.FC = () => (
  <SectionContainer className="space-y-4 py-10">
    <div className="space-y-1 text-slate-900 dark:text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">How matching works</p>
      <h2 className="text-2xl font-semibold">Request, match, and get to work</h2>
      <span className="handmade-underline h-3 w-28" aria-hidden />
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, idx) => (
        <div
          key={step.title}
          className="motion-purpose rounded-2xl border border-white/60 bg-white/85 p-4 text-slate-900 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-solara-navy text-solara-gold shadow-glow">
            {idx + 1}
          </div>
          <p className="mt-2 text-sm font-semibold">{step.title}</p>
          <p className="text-sm text-slate-700 dark:text-slate-200">{step.detail}</p>
        </div>
      ))}
    </div>
  </SectionContainer>
);

export default MatchingHowItWorks;
