import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import { LearningPath, PathStep } from "../../data/learnContent";
import InlineAction from "@/components/ui/inline-action";

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

const LearningPathAccordion: React.FC<Props> = ({ paths }) => {
  const [openId, setOpenId] = useState<string | null>(paths[0]?.id ?? null);
  const [progress, setProgress] = useState<ProgressState>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      setProgress(JSON.parse(saved));
    } catch {
      setProgress({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleStep = useCallback((pathId: string, stepId: string) => {
    setProgress((previous) => {
      const current = new Set(previous[pathId] || []);
      if (current.has(stepId)) current.delete(stepId);
      else current.add(stepId);
      return { ...previous, [pathId]: Array.from(current) };
    });
  }, []);

  const completion = useMemo(
    () =>
      paths.reduce<Record<string, number>>((accumulator, path) => {
        const done = progress[path.id]?.length || 0;
        accumulator[path.id] = Math.round((done / path.steps.length) * 100);
        return accumulator;
      }, {}),
    [paths, progress]
  );

  return (
    <div className="space-y-3">
      {paths.map((path) => {
        const isOpen = openId === path.id;
        const percent = completion[path.id] ?? 0;
        const completeCount = progress[path.id]?.length || 0;
        const panelId = `${path.id}-panel`;

        return (
          <section
            key={path.id}
            className="overflow-hidden rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] shadow-[var(--solara-shadow-soft)]"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : path.id)}
              className="flex w-full flex-col gap-4 px-4 py-4 text-left md:flex-row md:items-start md:justify-between"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <span className="rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-accent-strong)]">
                    {path.pillar}
                  </span>
                  <span className="rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]">
                    {path.difficulty}
                  </span>
                  <span className="rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]">
                    {path.durationMins} min
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold text-[var(--solara-text-strong)]">{path.title}</h4>
                  <p className="text-sm leading-6 text-[var(--solara-text-muted)]">{path.summary}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                    Outcome / {path.outcome}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:pt-1">
                <span
                  className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    percent === 100
                      ? "border-emerald-500/40 text-emerald-400"
                      : "border-[var(--solara-rule)] text-[var(--solara-text-muted)]"
                  }`}
                >
                  {completeCount}/{path.steps.length}
                </span>
                <div className="w-24">
                  <div
                    className="h-2 overflow-hidden rounded-full border border-[var(--solara-rule)] bg-[var(--solara-surface-2)]"
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`h-full transition-all ${percent === 100 ? "bg-emerald-500" : "bg-[var(--solara-accent)]"}`}
                      style={{ width: `${percent}%` }}
                      aria-hidden
                    />
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-[var(--solara-text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {isOpen ? (
              <div id={panelId} className="space-y-3 border-t border-[var(--solara-rule)] px-4 py-4">
                {percent === 100 ? (
                  <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-300">
                    Path completed. Move into the next route when you are ready.
                  </div>
                ) : null}

                <ul className="space-y-2">
                  {path.steps.map((step) => {
                    const checked = progress[path.id]?.includes(step.id);
                    const action = nextActionCopy[step.recommendedNextAction];
                    const nextHref = step.optionalSlugOrProjectId ? `/learn/${step.optionalSlugOrProjectId}` : action.href;

                    return (
                      <li
                        key={step.id}
                        className="rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-3"
                      >
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            aria-pressed={checked}
                            onClick={() => toggleStep(path.id, step.id)}
                            className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-sm border transition ${
                              checked
                                ? "border-[var(--solara-accent)] bg-[var(--solara-accent)] text-[#131313]"
                                : "border-[var(--solara-rule)] bg-transparent text-[var(--solara-text-muted)]"
                            }`}
                            aria-label={`Mark ${step.title} as ${checked ? "incomplete" : "complete"}`}
                          >
                            {checked ? <Check className="h-3 w-3" /> : null}
                          </button>

                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="space-y-1">
                              <p className="font-semibold text-[var(--solara-text-strong)]">{step.title}</p>
                              <p className="text-sm leading-6 text-[var(--solara-text-muted)]">{step.description}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">
                                {action.label}
                              </span>
                              <Link
                                to={nextHref}
                                className="solara-inline-action solara-inline-action--default inline-flex items-center gap-2"
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

                <div className="border-t border-[var(--solara-rule)] pt-3">
                  <InlineAction to={nextActionCopy[path.steps[0].recommendedNextAction].href} emphasis="strong">
                    Move into the next workspace
                  </InlineAction>
                </div>
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
};

export default LearningPathAccordion;
