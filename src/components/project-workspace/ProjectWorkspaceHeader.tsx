import React from "react";
import { BadgeCheck, MapPin, Sparkles, Users } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import type { Project } from "@/data/projects";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

type ProjectWorkspaceHeaderProps = {
  project: Project;
  volunteerPercent: number;
  fundingPercent: number | null;
  showOverviewStats: boolean;
  onPledgeHelp: () => void;
  onRequestHelp: () => void;
  onOpenResourceCenter: () => void;
};

const statusTone: Record<Project["status"], string> = {
  Planning: "bg-amber-500/15 text-amber-700 ring-amber-400/30 dark:text-amber-100",
  "In Progress": "bg-emerald-500/15 text-emerald-700 ring-emerald-400/30 dark:text-emerald-100",
  Recruiting: "bg-sky-500/15 text-sky-700 ring-sky-400/30 dark:text-sky-100",
  Scoping: "bg-indigo-500/15 text-indigo-700 ring-indigo-400/30 dark:text-indigo-100",
  Completed: "bg-lime-500/15 text-lime-700 ring-lime-400/30 dark:text-lime-100",
};

const ProjectWorkspaceHeader: React.FC<ProjectWorkspaceHeaderProps> = ({
  project,
  volunteerPercent,
  fundingPercent,
  showOverviewStats,
  onPledgeHelp,
  onRequestHelp,
  onOpenResourceCenter,
}) => (
  <>
    <section className="relative overflow-hidden rounded-[28px] card-surface p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(14,207,138,0.08),transparent_36%),radial-gradient(circle_at_80%_12%,rgba(28,181,224,0.08),transparent_32%)]" />
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-200">Workspace</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{project.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-emerald-50/85">
            <MapPin className="h-4 w-4" />
            {project.location} - {project.coordinates[0].toFixed(3)}, {project.coordinates[1].toFixed(3)}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ring-1 ${statusTone[project.status]}`}>
              <BadgeCheck className="h-4 w-4" />
              {project.status}
            </span>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-emerald-50">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 sm:flex-row">
          <AnimatedButton onClick={onPledgeHelp} className="px-5 py-2">
            Pledge to help
          </AnimatedButton>
          <AnimatedButton variant="outline" onClick={onRequestHelp} className="px-5 py-2">
            Request help
          </AnimatedButton>
          <AnimatedButton variant="outline" onClick={onOpenResourceCenter} className="px-5 py-2">
            Resource center
          </AnimatedButton>
        </div>
      </div>
      <p className="relative mt-4 text-sm text-slate-700 dark:text-emerald-50/85">{project.fullDescription}</p>
    </section>

    {showOverviewStats && (
      <section className="rounded-[24px] card-surface p-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-white/30 bg-white/70 p-4 text-slate-900 shadow-inner dark:border-white/10 dark:bg-white/5 dark:text-white">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-200">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Users className="h-4 w-4" /> Volunteers
              </span>
              <span className="font-semibold">{volunteerPercent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/60 dark:bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-400 to-amber-300" style={{ width: `${volunteerPercent}%` }} />
            </div>
            <p className="text-xs text-slate-700 dark:text-emerald-100/80">
              {project.currentVolunteers} / {project.goalVolunteers} pledged
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-white/30 bg-white/70 p-4 text-slate-900 shadow-inner dark:border-white/10 dark:bg-white/5 dark:text-white">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-200">
              <span className="inline-flex items-center gap-2 font-semibold">
                <Sparkles className="h-4 w-4" /> Funding
              </span>
              <span className="font-semibold">{fundingPercent !== null ? `${fundingPercent}%` : "Community-led"}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/60 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-300"
                style={{ width: fundingPercent !== null ? `${fundingPercent}%` : "100%" }}
              />
            </div>
            <p className="text-xs text-slate-700 dark:text-emerald-100/80">
              {project.goalFunding
                ? `${gbpFormatter.format(project.currentFunding || 0)} / ${gbpFormatter.format(project.goalFunding)}`
                : "Mutual aid / in-kind"}
            </p>
          </div>
        </div>
      </section>
    )}
  </>
);

export default ProjectWorkspaceHeader;
