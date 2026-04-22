import React from "react";
import { Activity, ArrowUpRight, BellRing, RefreshCcw, Users } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import type { ProjectWorkspaceDashboardProps } from "./types";

function formatPercent(value?: number | string | null) {
  if (value == null || value === "") {
    return "N/A";
  }
  return `${value}%`;
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }
  return new Date(value).toLocaleString();
}

const ProjectWorkspaceDashboard: React.FC<ProjectWorkspaceDashboardProps> = ({
  project,
  dashboardData,
  dashboardLoading,
  dashboardError,
  onRefreshDashboard,
}) => {
  if (!project.backendId) {
    return (
      <section className="space-y-3 rounded-[20px] card-surface p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Backend dashboard</h3>
          <span className="rounded-full border border-white/25 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-emerald-100">
            mock project
          </span>
        </div>
        <p className="text-sm text-slate-700 dark:text-emerald-100/80">
          This dashboard tab is wired to the Spring Boot project dashboard endpoint, so it only shows live data on backend projects.
        </p>
      </section>
    );
  }

  if (dashboardLoading && !dashboardData) {
    return (
      <section className="space-y-3 rounded-[20px] card-surface p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Backend dashboard</h3>
        <p className="text-sm text-slate-700 dark:text-emerald-100/80">Loading the live project dashboard from the backend.</p>
      </section>
    );
  }

  if (!dashboardData) {
    return (
      <section className="space-y-3 rounded-[20px] card-surface p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Backend dashboard</h3>
          <AnimatedButton variant="outline" onClick={onRefreshDashboard} className="px-4 py-2">
            Retry
          </AnimatedButton>
        </div>
        <p className="text-sm text-slate-700 dark:text-emerald-100/80">
          {dashboardError || "The backend dashboard is unavailable right now."}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-[20px] card-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Backend dashboard</h3>
          <p className="mt-1 text-sm text-slate-700 dark:text-emerald-100/80">
            This panel is coming from the project dashboard endpoint, not local mock state.
          </p>
        </div>
        <AnimatedButton variant="outline" onClick={onRefreshDashboard} className="px-4 py-2">
          Refresh
          <RefreshCcw className="h-4 w-4" />
        </AnimatedButton>
      </div>

      {dashboardError ? (
        <div className="rounded-2xl border border-amber-400/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
          {dashboardError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/25 bg-white/70 p-4 shadow-inner dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-200">Members</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{dashboardData.membershipCount ?? 0}</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-emerald-100/80">Active people in this workspace.</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/70 p-4 shadow-inner dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-200">Resources</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{dashboardData.linkedGuideCount ?? 0}</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-emerald-100/80">Guides currently linked to the project.</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/70 p-4 shadow-inner dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-200">Open help</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{dashboardData.openHelpRequestCount ?? 0}</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-emerald-100/80">Help requests still open on this project.</p>
        </div>
        <div className="rounded-2xl border border-white/25 bg-white/70 p-4 shadow-inner dark:border-white/10 dark:bg-white/5">
          <p className="text-xs uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-200">Updated</p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{formatDate(dashboardData.updatedAt)}</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-emerald-100/80">Last backend update on this aggregate view.</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4 rounded-[24px] border border-white/25 bg-white/70 p-5 shadow-inner dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
            Progress signals
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-2xl border border-white/20 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-emerald-200">
                <span>Volunteer progress</span>
                <span>{formatPercent(dashboardData.volunteerProgressPercent)}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-400 to-amber-300"
                  style={{ width: `${dashboardData.volunteerProgressPercent ?? 0}%` }}
                />
              </div>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/20 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-emerald-200">
                <span>Funding progress</span>
                <span>{formatPercent(dashboardData.fundingProgressPercent)}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-400 to-lime-300"
                  style={{ width: `${typeof dashboardData.fundingProgressPercent === "number" ? dashboardData.fundingProgressPercent : Number(dashboardData.fundingProgressPercent || 0)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Users className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                Owner view
              </div>
              <div className="space-y-2">
                {dashboardData.owners.map((owner) => (
                  <div key={`${owner.userId}-${owner.role}`} className="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                    <p className="font-semibold text-slate-900 dark:text-white">{owner.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-600 dark:text-emerald-200">{owner.role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <BellRing className="h-4 w-4 text-amber-500 dark:text-amber-300" />
                Recent help requests
              </div>
              <div className="space-y-2">
                {dashboardData.recentHelpRequests.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/25 bg-white/80 px-4 py-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-emerald-100/80">
                    No recent help requests for this project.
                  </div>
                ) : (
                  dashboardData.recentHelpRequests.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900 dark:text-white">{item.whatNeeded}</p>
                        <span className="rounded-full border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-600 dark:text-emerald-200">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-700 dark:text-emerald-100/80">{item.requesterName}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-emerald-200/70">{formatDate(item.createdAt)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-[24px] border border-white/25 bg-white/70 p-5 shadow-inner dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Recent resource links</h4>
              <p className="mt-1 text-sm text-slate-700 dark:text-emerald-100/80">Latest guides attached through the backend.</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-500 dark:text-emerald-200" />
          </div>
          <div className="space-y-2">
            {dashboardData.recentResources.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/25 bg-white/80 px-4 py-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-emerald-100/80">
                No linked guides yet.
              </div>
            ) : (
              dashboardData.recentResources.map((resource) => (
                <div key={resource.id} className="rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900 dark:text-white">{resource.guideTitle}</p>
                    {resource.pinned ? (
                      <span className="rounded-full border border-amber-400/40 bg-amber-500/12 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-amber-800 dark:text-amber-200">
                        pinned
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-slate-700 dark:text-emerald-100/80">Added by {resource.addedByName}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-emerald-200/70">{formatDate(resource.addedAt)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectWorkspaceDashboard;
