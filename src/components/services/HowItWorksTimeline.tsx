import React from "react";
import SectionContainer from "../ui/section-container";

const steps = [
  { title: "Start Navigator", detail: "Save a draft and pick your path." },
  { title: "Create Workspace", detail: "Add tasks, docs, and invite helpers." },
  { title: "Request support", detail: "Choose community or certified help." },
  { title: "Maintain and improve", detail: "Track safety checks and upgrades." },
];

const HowItWorksTimeline: React.FC = () => (
  <SectionContainer className="py-10">
    <div className="space-y-2 text-slate-900 dark:text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">How it works</p>
      <h2 className="text-3xl font-semibold">From plan to sustained uptime</h2>
      <p className="text-sm text-slate-700 dark:text-slate-200/80">Clear steps you can repeat for the next project.</p>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-4">
      {steps.map((step, idx) => (
        <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-white/50 bg-white/80 p-4 text-slate-900 shadow-[0_18px_70px_rgba(0,51,102,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#003366] text-[#ffd700] shadow-[0_10px_30px_rgba(0,51,102,0.35)]">{idx + 1}</div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200/85">{step.detail}</p>
          </div>
        </div>
      ))}
    </div>
  </SectionContainer>
);

export default HowItWorksTimeline;
