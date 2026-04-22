import React from "react";
import { ArrowRight, BookOpen, Box, ClipboardList, DraftingCompass, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageFrame from "@/components/ui/page-frame";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";

const planningPaths = [
  {
    title: "Solar Navigator",
    tagline: "A guided planning pass when you need the product to structure the thinking.",
    bullets: [
      "Five-step readiness questionnaire",
      "Blocker check before you spend",
      "Save and resume without losing the thread",
    ],
    to: "/plan/navigator",
    icon: ClipboardList,
    eyebrow: "Guided path",
    recommendation: "Best when the starting point is still fuzzy",
  },
  {
    title: "3D roof designer",
    tagline: "A direct workspace when you already want to test placement and trade-offs.",
    bullets: [
      "Drag and place panels directly",
      "See energy estimates as you work",
      "Review scenarios without leaving the layout",
    ],
    to: "/configurator",
    icon: Box,
    eyebrow: "Hands-on path",
    recommendation: "Best when you already think spatially",
  },
];

const preflightChecks = [
  "Do you need structured questions or direct manipulation?",
  "Are you still defining the problem or already testing a layout?",
  "Will this plan hand off to helpers, guides, or an active project next?",
];

const PlanHub = () => {
  return (
    <PageFrame family="hub" width="wide" density="compact">
      <PageReveal mode="mount">
        <PageHeroStage
          family="hub"
          className="solara-route-hero solara-route-hero--plan"
          eyebrow="Planning studio"
          title="Choose the planning mode that matches how your brain is working."
          body="Navigator is for structured thinking. The configurator is for direct layout work. Both routes stay inside the same product, so planning can hand off cleanly into helpers, projects, and learning."
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/plan/navigator" emphasis="strong">
                Start Navigator
              </InlineAction>
              <InlineAction to="/configurator">Open configurator</InlineAction>
              <InlineAction to="/learn">Browse guides</InlineAction>
            </div>
          }
          metrics={[
            { label: "Navigator flow", value: "5 steps", meta: "From first question to route" },
            { label: "Design mode", value: "3D roof", meta: "Direct placement and iteration" },
            { label: "Continuity", value: "One workflow", meta: "Hands off into support and delivery" },
          ]}
          preview={
            <PreviewFrame
              className="solara-route-preview solara-route-preview--plan"
              chromeLabel="Mode split"
              eyebrow="Two valid ways in"
              title="The product should adapt to the user’s planning style."
              body="Some people need guided questions before they commit. Others need to start drawing. Solara supports both without making either path feel second class."
            >
              <div className="solara-plan-compare">
                {planningPaths.map((path) => (
                  <article key={path.title} className="solara-plan-compare__card">
                    <p className="solara-plan-compare__eyebrow">{path.eyebrow}</p>
                    <h3>{path.title}</h3>
                    <p>{path.tagline}</p>
                  </article>
                ))}
              </div>
            </PreviewFrame>
          }
        >
          <div className="solara-route-notes solara-route-notes--plan">
            {preflightChecks.map((item, index) => (
              <article key={item} className="solara-route-note-card">
                <span className="solara-route-note-card__icon">0{index + 1}</span>
                <div>
                  <p className="solara-route-note-card__title">Preflight check</p>
                  <p className="solara-route-note-card__body">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </PageHeroStage>
      </PageReveal>

      <PageReveal mode="in-view">
        <section className="solara-route-grid solara-route-grid--plan">
          {planningPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <SurfacePanel
                key={path.title}
                as="article"
                variant={index === 0 ? "editorial" : "product"}
                layout="split"
                density="comfortable"
                className="solara-route-card solara-route-card--plan"
              >
                <div className="solara-route-card__header">
                  <div className="solara-route-card__icon-shell">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="solara-route-card__eyebrow">{path.eyebrow}</p>
                  <h2 className="solara-route-card__title">{path.title}</h2>
                  <p className="solara-route-card__body">{path.tagline}</p>
                </div>

                <PreviewFrame chromeLabel={index === 0 ? "Guided preview" : "Workspace preview"} viewportClassName="pt-4">
                  <div className="solara-route-list">
                    {path.bullets.map((item) => (
                      <div key={item} className="solara-route-list__row">
                        {item}
                      </div>
                    ))}
                  </div>
                </PreviewFrame>

                <div className="solara-route-card__support">
                  <p className="solara-route-card__note">{path.recommendation}</p>
                  <InlineAction to={path.to} emphasis={index === 0 ? "strong" : "default"}>
                    Continue
                  </InlineAction>
                </div>
              </SurfacePanel>
            );
          })}
        </section>
      </PageReveal>

      <PageReveal mode="in-view">
        <SurfacePanel as="section" variant="editorial" layout="split" density="comfortable" className="solara-route-card solara-route-card--plan-support">
          <div className="solara-route-card__header">
            <p className="solara-route-card__eyebrow">Planning handoffs</p>
            <h2 className="solara-route-card__title">A plan is only useful if it moves into the next route cleanly.</h2>
            <p className="solara-route-card__body">
              Solara keeps the likely next move visible: open helpers if you need execution help, open guides if you need context, or open projects if you want to work inside something already underway.
            </p>
          </div>

          <div className="solara-plan-handoff">
            <article className="solara-plan-handoff__item">
              <Layers3 className="h-4 w-4" />
              <div>
                <p>Need structure first</p>
                <span>Start Navigator, then carry the result into helpers or guides.</span>
              </div>
            </article>
            <article className="solara-plan-handoff__item">
              <DraftingCompass className="h-4 w-4" />
              <div>
                <p>Need layout proof first</p>
                <span>Use the configurator when the question is spatial and visual.</span>
              </div>
            </article>
            <article className="solara-plan-handoff__item">
              <BookOpen className="h-4 w-4" />
              <div>
                <p>Need more context first</p>
                <span>Use the learning hub before you commit budget or volunteer time.</span>
              </div>
            </article>
          </div>
        </SurfacePanel>
      </PageReveal>

      <PageReveal mode="in-view">
        <SurfacePanel as="section" variant="editorial" layout="closeout" density="comfortable" className="solara-route-card solara-route-card--closeout">
          <div className="solara-route-card__header">
            <p className="solara-route-card__eyebrow">Next move</p>
            <h2 className="solara-route-card__title">Need context before you choose a planning mode?</h2>
            <p className="solara-route-card__body">
              The learning hub covers solar basics, safety, and project-readiness guidance so your planning work starts from solid assumptions.
            </p>
          </div>
          <Link to="/learn" className="solara-inline-action solara-inline-action--default inline-flex items-center gap-2">
            Browse guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </SurfacePanel>
      </PageReveal>
    </PageFrame>
  );
};

export default PlanHub;
