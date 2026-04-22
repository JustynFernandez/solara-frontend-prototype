import React from "react";
import { ArrowRight, BookOpen, FolderKanban } from "lucide-react";
import type { GuideContent } from "../../data/learnContent";
import type { Project } from "../../data/projects";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";

type GuideDetailLayoutProps = {
  guide: GuideContent;
  currentProject?: Project | null;
};

const nextActions: Record<string, { label: string; href: string }[]> = {
  "navigator-warmup": [
    { label: "Open Solar Navigator", href: "/solar-navigator" },
    { label: "Browse helpers", href: "/connect" },
  ],
  "workspace-playbook": [
    { label: "Open projects", href: "/projects" },
    { label: "Find collaborators", href: "/connect" },
  ],
  "maintenance-basics": [
    { label: "Browse maintenance help", href: "/connect" },
    { label: "View active projects", href: "/projects" },
  ],
};

const GuideDetailLayout: React.FC<GuideDetailLayoutProps> = ({ guide, currentProject }) => {
  const actions = nextActions[guide.slug] || [
    { label: "Run Navigator", href: "/solar-navigator" },
    { label: "Browse helpers", href: "/connect" },
  ];

  const tocItems = guide.toc.map((item) => ({
    id: item.toLowerCase().replace(/\s+/g, "-"),
    label: item,
  }));

  React.useEffect(() => {
    localStorage.setItem("solara:learn:last-guide", guide.slug);
  }, [guide.slug]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-6">
        <SurfacePanel variant="guide" layout="preview" density="compact" className="space-y-4">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
            <span className="rounded-full border border-[var(--solara-rule)] px-3 py-1">{guide.format}</span>
            <span className="rounded-full border border-[var(--solara-rule)] px-3 py-1">{guide.difficulty}</span>
            <span className="rounded-full border border-[var(--solara-rule)] px-3 py-1">{guide.pillar}</span>
            <span className="rounded-full border border-[var(--solara-rule)] px-3 py-1">{guide.durationMins} min</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--solara-text-muted)]">
            {guide.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--solara-rule-soft)] px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </SurfacePanel>

        <SurfacePanel as="article" variant="guide" layout="split" density="comfortable" className="space-y-6">
          <div
            className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-[var(--solara-text-strong)] prose-p:text-[var(--solara-text-muted)] prose-li:text-[var(--solara-text-muted)] prose-strong:text-[var(--solara-text-strong)] dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />

          <div className="space-y-3 border-t border-[var(--solara-rule-soft)] pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Key takeaways</p>
            <ul className="space-y-2 text-sm leading-6 text-[var(--solara-text-muted)]">
              {guide.takeaways.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--solara-accent)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </SurfacePanel>

        <SurfacePanel variant="guide" layout="preview" density="compact" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Resources</p>
          <div className="divide-y divide-[var(--solara-rule-soft)] border-y border-[var(--solara-rule-soft)]">
            {guide.resources.map((resource) => (
              <a
                key={`${resource.type}-${resource.title}`}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 py-3 text-sm text-[var(--solara-text-muted)] transition hover:text-[var(--solara-text-strong)]"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--solara-accent-strong)]" />
                  <span className="font-medium text-[var(--solara-text-strong)]">{resource.title}</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">{resource.type}</span>
              </a>
            ))}
          </div>
        </SurfacePanel>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <SurfacePanel variant="guide" layout="rail" density="compact" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Contents</p>
          <nav aria-label="Guide contents">
            <ul className="space-y-2 text-sm">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex text-[var(--solara-text-muted)] transition hover:text-[var(--solara-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--solara-accent)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </SurfacePanel>

        <SurfacePanel variant="guide" layout="rail" density="compact" className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Do this next</p>
            <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
              Move from reading into a concrete Solara route without duplicating the full workspace chrome here.
            </p>
          </div>
          <div className="space-y-2">
            {actions.map((action, index) => (
              <InlineAction key={action.href} to={action.href} emphasis={index === 0 ? "strong" : "default"}>
                {action.label}
              </InlineAction>
            ))}
          </div>
          {currentProject ? (
            <div className="space-y-2 border-t border-[var(--solara-rule-soft)] pt-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                <FolderKanban className="h-3.5 w-3.5" />
                Linked workspace
              </div>
              <p className="text-sm font-semibold text-[var(--solara-text-strong)]">{currentProject.name}</p>
              <p className="text-sm text-[var(--solara-text-muted)]">
                Keep this guide attached to the active project so tasks, resources, and requests stay connected.
              </p>
              <InlineAction to={`/projects/${currentProject.id}`}>
                Open workspace
                <ArrowRight className="h-4 w-4" />
              </InlineAction>
            </div>
          ) : null}
        </SurfacePanel>
      </aside>
    </div>
  );
};

export default GuideDetailLayout;
