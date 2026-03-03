import React from "react";
import SectionContainer from "../ui/section-container";
import AnimatedButton from "../ui/animated-button";

const FinalCTA: React.FC = () => (
  <SectionContainer className="py-12">
    <div className="rounded-[28px] border border-white/50 bg-white/80 p-8 text-slate-900 shadow-[0_26px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Ready to start</p>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Launch your solar plan today</h2>
        <p className="text-sm text-slate-700 dark:text-slate-200/85">Run Navigator, create a Workspace, and request help in one flow.</p>
        <div className="flex flex-wrap gap-3">
          <AnimatedButton href="/plan/navigator" className="px-5 py-3">
            Start Solar Navigator
          </AnimatedButton>
          <AnimatedButton variant="outline" href="/projects" className="px-5 py-3">
            Open Workspaces
          </AnimatedButton>
        </div>
      </div>
    </div>
  </SectionContainer>
);

export default FinalCTA;
