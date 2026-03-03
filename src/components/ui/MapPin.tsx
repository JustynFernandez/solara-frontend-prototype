import { ProjectStatus } from "../../data/projects";

export const statusPinClass: Record<ProjectStatus, string> = {
  Planning: "bg-amber-500",
  "In Progress": "bg-emerald-500",
  Recruiting: "bg-sky-500",
  Scoping: "bg-indigo-500",
  Completed: "bg-lime-500",
};

export const statusBadgeClass = (status: ProjectStatus) =>
  ({
    Planning: "bg-amber-500/15 text-amber-100 ring-amber-400/30",
    "In Progress": "bg-emerald-500/15 text-emerald-100 ring-emerald-400/30",
    Recruiting: "bg-sky-500/15 text-sky-100 ring-sky-400/30",
    Scoping: "bg-indigo-500/15 text-indigo-100 ring-indigo-400/30",
    Completed: "bg-lime-500/15 text-lime-100 ring-lime-400/30",
  }[status]);
