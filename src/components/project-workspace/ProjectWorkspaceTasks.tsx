import React from "react";
import { CheckCircle2, Clock3, Leaf } from "lucide-react";
import type { ProjectTask } from "@/data/projects";
import type { ProjectWorkspaceTasksProps } from "./types";

const TaskBadge = ({ task, onToggle }: { task: ProjectTask; onToggle: (id: string) => void }) => {
  const tone =
    task.status === "done"
      ? "bg-emerald-500/12 text-emerald-700 ring-emerald-400/40 dark:text-emerald-100"
      : task.status === "in-progress"
        ? "bg-amber-500/12 text-amber-700 ring-amber-400/30 dark:text-amber-100"
        : "bg-slate-200/70 text-slate-700 ring-slate-300/60 dark:bg-white/10 dark:text-emerald-50";

  const icon =
    task.status === "done" ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : task.status === "in-progress" ? (
      <Clock3 className="h-4 w-4" />
    ) : (
      <Leaf className="h-4 w-4" />
    );

  return (
    <button
      type="button"
      onClick={() => onToggle(task.id)}
      className={`flex items-center justify-between gap-2 rounded-2xl border border-white/40 px-3 py-2 text-left text-sm ring-1 transition hover:-translate-y-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${tone}`}
    >
      <span className="flex items-center gap-2">
        {icon}
        <span className="font-semibold">{task.title}</span>
      </span>
      <span className="text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-emerald-100/80">{task.status.replace("-", " ")}</span>
    </button>
  );
};

const ProjectWorkspaceTasks: React.FC<ProjectWorkspaceTasksProps> = ({ tasks, onToggleTaskStatus }) => (
  <section className="space-y-3 rounded-[20px] card-surface p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tasks</h3>
      <span className="text-xs uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-200">Tap to update</span>
    </div>
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskBadge key={task.id} task={task} onToggle={onToggleTaskStatus} />
      ))}
    </div>
  </section>
);

export default ProjectWorkspaceTasks;

