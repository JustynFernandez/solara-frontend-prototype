import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, Clock3, Leaf } from "lucide-react";
const TaskBadge = ({ task, onToggle }) => {
    const tone = task.status === "done"
        ? "bg-emerald-500/12 text-emerald-700 ring-emerald-400/40 dark:text-emerald-100"
        : task.status === "in-progress"
            ? "bg-amber-500/12 text-amber-700 ring-amber-400/30 dark:text-amber-100"
            : "bg-slate-200/70 text-slate-700 ring-slate-300/60 dark:bg-white/10 dark:text-emerald-50";
    const icon = task.status === "done" ? (_jsx(CheckCircle2, { className: "h-4 w-4" })) : task.status === "in-progress" ? (_jsx(Clock3, { className: "h-4 w-4" })) : (_jsx(Leaf, { className: "h-4 w-4" }));
    return (_jsxs("button", { type: "button", onClick: () => onToggle(task.id), className: `flex items-center justify-between gap-2 rounded-2xl border border-white/40 px-3 py-2 text-left text-sm ring-1 transition hover:-translate-y-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${tone}`, children: [_jsxs("span", { className: "flex items-center gap-2", children: [icon, _jsx("span", { className: "font-semibold", children: task.title })] }), _jsx("span", { className: "text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:text-emerald-100/80", children: task.status.replace("-", " ") })] }));
};
const ProjectWorkspaceTasks = ({ tasks, onToggleTaskStatus }) => (_jsxs("section", { className: "space-y-3 rounded-[20px] card-surface p-5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Tasks" }), _jsx("span", { className: "text-xs uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-200", children: "Tap to update" })] }), _jsx("div", { className: "space-y-2", children: tasks.map((task) => (_jsx(TaskBadge, { task: task, onToggle: onToggleTaskStatus }, task.id))) })] }));
export default ProjectWorkspaceTasks;
