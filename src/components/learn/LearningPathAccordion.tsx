import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Check, ArrowRight, Sparkles } from "lucide-react";
import { LearningPath, PathStep } from "../../data/learnContent";

type Props = {
  paths: LearningPath[];
};

type ProgressState = Record<string, string[]>;

const STORAGE_KEY = "solara:learn:path-progress";

const nextActionCopy: Record<PathStep["recommendedNextAction"], { label: string; href: string }> = {
  navigator: { label: "Open Solar Navigator", href: "/solar-navigator" },
  projects: { label: "Open Project Workspaces", href: "/projects" },
  connect: { label: "Find a helper", href: "/connect" },
  learn: { label: "Open guide", href: "/learn" },
};

// Path accordion with persisted step completion.
const LearningPathAccordion: React.FC<Props> = ({ paths }) => {
  const [openId, setOpenId] = useState<string | null>(paths[0]?.id ?? null);
  const [progress, setProgress] = useState<ProgressState>({});
  const [celebrating, setCelebrating] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        setProgress({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleStep = useCallback((pathId: string, stepId: string) => {
    setProgress((prev) => {
      const existing = new Set(prev[pathId] || []);
      const wasChecked = existing.has(stepId);
      if (wasChecked) {
        existing.delete(stepId);
      } else {
        existing.add(stepId);
        // Trigger celebration animation
        setCelebrating(stepId);
        setTimeout(() => setCelebrating(null), 600);
      }
      return { ...prev, [pathId]: Array.from(existing) };
    });
  }, []);

  const completion = useMemo(
    () =>
      paths.reduce<Record<string, number>>((acc, path) => {
        const done = progress[path.id]?.length || 0;
        acc[path.id] = Math.round((done / path.steps.length) * 100);
        return acc;
      }, {}),
    [paths, progress]
  );

  return (
    <div className="space-y-3 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 sm:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Recommended paths</p>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Workflows you can finish today</h3>
        <p className="text-sm text-slate-700 dark:text-slate-200">Track progress and jump into Navigator, Workspaces, or Connect from each step.</p>
      </div>
      <div className="space-y-3">
        {paths.map((path) => {
          const isOpen = openId === path.id;
          const percent = completion[path.id] ?? 0;
          const panelId = `${path.id}-panel`;
          return (
            <div key={path.id} className="overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : path.id)}
                className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
                    <span className="rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">{path.pillar}</span>
                    <span className="rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">{path.difficulty}</span>
                    <span className="rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">{path.durationMins} min</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{path.title}</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{path.summary}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Outcome: {path.outcome}</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Completion count badge */}
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    percent === 100
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                  }`}>
                    {progress[path.id]?.length || 0}/{path.steps.length}
                  </span>
                  {/* Progress bar with milestone markers */}
                  <div className="relative">
                    <div className="h-2 w-24 overflow-hidden rounded-full border border-white/70 bg-white/85 dark:border-white/10 dark:bg-white/10" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                      <div
                        className={`h-full transition-all ${
                          percent === 100
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                            : "bg-gradient-to-r from-solara-blue to-blue-400"
                        }`}
                        style={{ width: `${percent}%` }}
                        aria-hidden
                      />
                    </div>
                    {/* Milestone dots */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-0.5">
                      {path.steps.map((_, idx) => {
                        const position = ((idx + 1) / path.steps.length) * 100;
                        const isCompleted = (progress[path.id]?.length || 0) > idx;
                        return (
                          <div
                            key={idx}
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                              isCompleted
                                ? "bg-white shadow-sm"
                                : "bg-slate-300 dark:bg-slate-600"
                            }`}
                            style={{ marginLeft: idx === 0 ? `${position - 4}%` : undefined }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>
              {isOpen && (
                <div id={panelId} className="space-y-3 border-t border-white/70 px-4 py-4 text-sm text-slate-800 dark:border-white/10 dark:text-white">
                  {/* Path completion celebration */}
                  {percent === 100 && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/30 dark:bg-emerald-500/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-800 dark:text-emerald-300">Path completed!</p>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">You've finished all steps in this learning path.</p>
                      </div>
                    </div>
                  )}
                  <ul className="space-y-2">
                    {path.steps.map((step) => {
                      const checked = progress[path.id]?.includes(step.id);
                      const action = nextActionCopy[step.recommendedNextAction];
                      return (
                        <li key={step.id} className="flex flex-col gap-2 rounded-xl border border-white/70 bg-white/85 p-3 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
                          <div className="flex items-start gap-3">
                            <div className="relative mt-0.5">
                              <button
                                type="button"
                                aria-pressed={checked}
                                onClick={() => toggleStep(path.id, step.id)}
                                className={`flex h-5 w-5 items-center justify-center rounded-full border border-white/70 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/20 ${
                                  checked ? "bg-button-primary text-white" : "bg-white/70 dark:bg-white/10"
                                } ${celebrating === step.id ? "scale-110" : ""}`}
                                aria-label={`Mark step ${step.title} as ${checked ? "incomplete" : "complete"}`}
                              >
                                {checked && <Check className="h-3 w-3" />}
                              </button>
                              {/* Celebration burst */}
                              {celebrating === step.id && (
                                <div className="pointer-events-none absolute -inset-2 animate-ping">
                                  <Sparkles className="h-9 w-9 text-solara-gold opacity-75" />
                                </div>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-slate-900 dark:text-white">{step.title}</p>
                              <p className="text-slate-700 dark:text-slate-200">{step.description}</p>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[11px] font-semibold text-solara-navy shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                                  {action.label}
                                </span>
                                <Link
                                  to={step.optionalSlugOrProjectId ? `/learn/${step.optionalSlugOrProjectId}` : action.href}
                                  className="inline-flex items-center gap-2 rounded-full bg-button-primary px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
                                >
                                  Do this next
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPathAccordion;
