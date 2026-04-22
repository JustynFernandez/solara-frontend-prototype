import React from "react";
import { guides, paths, faqs } from "../../data/learnContent";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import LearnSearch from "../../components/learn/LearnSearch";
import LearningPathAccordion from "../../components/learn/LearningPathAccordion";
import QuickAnswersFAQ from "../../components/learn/QuickAnswersFAQ";
import ToolsPanel from "../../components/learn/ToolsPanel";
import GuideList from "../../components/learn/GuideList";
import LearnTOC from "../../components/learn/LearnTOC";
import ProgressDashboard from "../../components/learn/ProgressDashboard";

const libraryNotes = [
  "Use a path when you want sequence and momentum.",
  "Use the guide library when you already know the topic.",
  "Use quick answers when the blocker is small but urgent.",
];

const LearnIndex = () => {
  const tocItems = [
    { id: "progress", label: "Your progress" },
    { id: "paths", label: "Recommended paths" },
    { id: "guides", label: "Guides" },
    { id: "support", label: "Quick answers and tools" },
  ];

  return (
    <PageFrame family="editorial" width="wide" density="comfortable">
      <PageReveal mode="mount">
        <PageHeroStage
          family="editorial"
          className="solara-route-hero solara-route-hero--learn"
          eyebrow="Learning library"
          title="Guides, tools, and pathways that hand off into real solar work."
          body="The learning layer is built around Solara’s operating modes: plan with Navigator, coordinate through projects, and keep delivery grounded in safety-first guidance."
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/plan" emphasis="strong">
                Start planning
              </InlineAction>
              <InlineAction to="/projects">Browse projects</InlineAction>
              <InlineAction to="/safety">Safety guidance</InlineAction>
            </div>
          }
          metrics={[
            { label: "Guides", value: guides.length, meta: "Across planning, projects, and maintenance" },
            { label: "Pathways", value: paths.length, meta: "Structured routes by goal" },
            { label: "Quick answers", value: faqs.length, meta: "Small blockers answered fast" },
          ]}
          preview={
            <PreviewFrame
              className="solara-route-preview solara-route-preview--learn"
              chromeLabel="Learning pathways"
              eyebrow="Current lanes"
              title="Move from context into the right route."
              body="Each path keeps a clear next action so reading turns into planning, project work, or helper support."
            >
              <div className="solara-library-paths">
                {paths.slice(0, 3).map((path) => (
                  <article key={path.id} className="solara-library-paths__card">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="solara-library-paths__meta">
                        {path.pillar} / {path.difficulty}
                      </p>
                      <span>{path.durationMins} min</span>
                    </div>
                    <h3>{path.title}</h3>
                    <p>{path.summary}</p>
                  </article>
                ))}
              </div>
            </PreviewFrame>
          }
        >
          <div className="solara-route-notes solara-route-notes--learn">
            {libraryNotes.map((item, index) => (
              <article key={item} className="solara-route-note-card">
                <span className="solara-route-note-card__icon">0{index + 1}</span>
                <div>
                  <p className="solara-route-note-card__title">Use the library well</p>
                  <p className="solara-route-note-card__body">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </PageHeroStage>
      </PageReveal>

      <div className="grid gap-6 lg:grid-cols-[2.2fr_0.8fr]">
        <div className="space-y-6">
          <PageReveal mode="in-view">
            <SurfacePanel variant="guide" layout="split" density="comfortable" className="solara-route-card solara-route-card--learn-search lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-5">
              <LearnSearch guides={guides} />
              <div id="progress" className="min-w-0">
                <ProgressDashboard />
              </div>
            </SurfacePanel>
          </PageReveal>

          <PageReveal mode="in-view">
            <SurfacePanel as="section" id="paths" variant="guide" layout="preview" density="comfortable" className="solara-route-card">
              <div className="solara-route-card__header">
                <p className="solara-route-card__eyebrow">Featured learning flow</p>
                <h2 className="solara-route-card__title">Recommended paths with a clear next step.</h2>
                <p className="solara-route-card__body">
                  Start with a sequence that matches your goal, then move directly into Navigator, project workspaces, or helper support without losing context.
                </p>
              </div>
              <LearningPathAccordion paths={paths} />
            </SurfacePanel>
          </PageReveal>

          <PageReveal mode="in-view">
            <SurfacePanel as="section" id="guides" variant="guide" layout="preview" density="comfortable" className="solara-route-card">
              <GuideList guides={guides} />
            </SurfacePanel>
          </PageReveal>

          <PageReveal mode="in-view">
            <SurfacePanel as="section" id="support" variant="guide" layout="split" density="comfortable" className="solara-route-card grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
              <QuickAnswersFAQ faqs={faqs} />
              <div className="space-y-4">
                <ToolsPanel />
                <div className="solara-learn-safety-card">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                      Safety and trust
                    </p>
                    <h2 className="text-lg font-semibold text-[var(--solara-text-strong)]">
                      Safety-first culture, visible role badges
                    </h2>
                    <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
                      Review safety guidance before climbing, wiring, or organizing volunteers. The same standards carry into helpers and project workspaces.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                    <span className="rounded-full border border-[var(--solara-rule)] px-3 py-1">Community volunteer</span>
                    <span className="rounded-full border border-[var(--solara-rule)] px-3 py-1">Trained volunteer</span>
                    <span className="rounded-full border border-[var(--solara-rule)] px-3 py-1">Certified installer</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <InlineAction to="/safety" emphasis="strong">
                      View safety guidance
                    </InlineAction>
                    <InlineAction to="/community-guidelines">Community guidelines</InlineAction>
                  </div>
                </div>
              </div>
            </SurfacePanel>
          </PageReveal>
        </div>

        <LearnTOC items={tocItems} />
      </div>
    </PageFrame>
  );
};

export default LearnIndex;
