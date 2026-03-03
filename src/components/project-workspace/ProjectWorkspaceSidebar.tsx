import React from "react";
import { ArrowUpRight } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import type { WorkspaceTab } from "./types";

type ProjectWorkspaceImpactCardProps = {
  impactKwh: string;
  impactCO2: string;
};

export const ProjectWorkspaceImpactCard: React.FC<ProjectWorkspaceImpactCardProps> = ({ impactKwh, impactCO2 }) => (
  <div className="space-y-3 rounded-[20px] card-surface p-5">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Impact</h3>
    <div className="space-y-2 text-sm text-slate-700 dark:text-emerald-100/80">
      <p>
        Estimated production: <span className="font-semibold text-emerald-700 dark:text-emerald-100">{impactKwh} kWh/yr</span>
      </p>
      <p>
        CO2 avoided: <span className="font-semibold text-emerald-700 dark:text-emerald-100">{impactCO2} tons/yr</span>
      </p>
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-emerald-200/80">Target install: Q3 2025</p>
    </div>
    <div className="rounded-2xl border border-white/20 bg-white/70 p-3 text-sm text-slate-800 shadow-inner dark:border-white/10 dark:bg-white/5 dark:text-emerald-50">
      Helpers are community members, not employees of Solara. Always follow local safety regulations.
    </div>
  </div>
);

type ProjectWorkspaceSidebarProps = {
  tab: WorkspaceTab;
  impactKwh: string;
  impactCO2: string;
  onRequestHelp: () => void;
};

const ProjectWorkspaceSidebar: React.FC<ProjectWorkspaceSidebarProps> = ({ tab, impactKwh, impactCO2, onRequestHelp }) => (
  <aside className="space-y-4">
    {tab !== "impact" && <ProjectWorkspaceImpactCard impactKwh={impactKwh} impactCO2={impactCO2} />}

    <div className="space-y-3 rounded-[20px] card-surface p-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Need more help?</h3>
      <p className="text-sm text-slate-700 dark:text-emerald-100/80">View helpers near this project or log a request for a specific skill.</p>
      <div className="flex flex-col gap-2">
        <AnimatedButton href="/connect" className="w-full justify-center px-4 py-2">
          Find helpers
          <ArrowUpRight className="h-4 w-4" />
        </AnimatedButton>
        <AnimatedButton variant="outline" onClick={onRequestHelp} className="w-full justify-center px-4 py-2">
          Request help
        </AnimatedButton>
      </div>
    </div>
  </aside>
);

export default ProjectWorkspaceSidebar;

