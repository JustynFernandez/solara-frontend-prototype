import React from "react";
import { ShieldCheck } from "lucide-react";
import type { ProjectRole } from "@/data/projects";

type ProjectWorkspaceRolesProps = {
  roles: ProjectRole[];
};

const ProjectWorkspaceRoles: React.FC<ProjectWorkspaceRolesProps> = ({ roles }) => (
  <section className="space-y-3 rounded-[20px] card-surface p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">People</h3>
      <span className="text-xs uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-200">Roles</span>
    </div>
    <div className="space-y-2">
      {roles.map((role) => (
        <div
          key={role.id}
          className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/70 px-3 py-2 text-sm text-slate-800 transition hover:-translate-y-[1px] dark:border-white/10 dark:bg-white/5 dark:text-emerald-50"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-200" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{role.userName}</p>
              <p className="text-xs text-slate-600 dark:text-emerald-100/80">{role.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {role.isHelper && <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-100">Helper</span>}
            {role.verified && <span className="rounded-full bg-sky-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-100">Verified</span>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProjectWorkspaceRoles;

