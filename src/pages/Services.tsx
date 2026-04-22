import React from "react";
import { ArrowRight, Boxes, BookOpenCheck, HandHelping, UsersRound } from "lucide-react";
import ServicesFAQ from "../components/services/ServicesFAQ";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageIntro from "@/components/ui/page-intro";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";

const services = [
  {
    title: "Skill sharing",
    description: "Hands-on helpers for installs, wiring, and safety checks.",
    items: ["Site surveys and shade checks", "Racking, mounting, and cable routing", "Safety walk-throughs and tool setup"],
    badge: "Live crews",
    icon: HandHelping,
  },
  {
    title: "Resource sharing",
    description: "Shared tools, checklists, and templates that reduce repeated setup work.",
    items: ["Tool library and ladders", "Torque and crimp tool kits", "Monitoring dashboards and alerts"],
    badge: "Tool pools",
    icon: Boxes,
  },
  {
    title: "Advice and learning",
    description: "Lightweight coaching, design review, and self-paced guidance.",
    items: ["Beginner-friendly lessons", "Remote design reviews", "Office hours for quick questions"],
    badge: "Coaches",
    icon: BookOpenCheck,
  },
  {
    title: "Community projects",
    description: "Shared build days, fundraising, and neighborhood coordination.",
    items: ["Weekend build coordination", "Fundraising playbooks", "Volunteer onboarding"],
    badge: "Build hubs",
    icon: UsersRound,
  },
];

const operatingModes = [
  {
    title: "Find the right people",
    body: "Helpers, organizers, and trained volunteers are surfaced by fit and trust level instead of hidden behind generic contact forms.",
  },
  {
    title: "Reuse tools and playbooks",
    body: "Templates, checklists, and shared resources are structured to repeat work safely rather than reinventing every install.",
  },
  {
    title: "Move from learning into action",
    body: "Guides, project workspaces, and support requests stay wired together so people do not lose context when the job changes.",
  },
];

const Services = () => {
  return (
    <PageFrame family="editorial" width="wide" density="comfortable">
      <PageReveal mode="mount">
        <PageHeroStage
          family="editorial"
          className="solara-route-hero solara-route-hero--services"
          eyebrow="Operating model"
          title="Support designed to turn first questions into local solar work."
          body="Solara is not just a marketplace and not just a guide library. It is a support model that connects helpers, resources, guidance, and shared community delivery inside one product."
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/connect" emphasis="strong">
                Open Connect
              </InlineAction>
              <InlineAction to="/projects">Browse projects</InlineAction>
              <InlineAction to="/learn">Open learning hub</InlineAction>
            </div>
          }
          metrics={[
            { label: "Response speed", value: "Under 24h", meta: "Typical reply from vetted helpers" },
            { label: "Coverage", value: "UK-wide", meta: "By specialty, location, or availability" },
            { label: "Continuity", value: "One system", meta: "Helpers, guides, and projects stay linked" },
          ]}
          preview={
            <PreviewFrame
              className="solara-route-preview solara-route-preview--services"
              chromeLabel="Support lanes"
              eyebrow="Four service modes"
              title="Each lane exists to move the work, not to decorate the site."
              body="Pick the route that matches the job, then move into helpers, projects, or learning without losing context."
            >
              <div className="solara-service-overview">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <article key={service.title} className="solara-service-overview__card">
                      <div className="solara-service-overview__top">
                        <span className="solara-service-overview__icon">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="solara-service-overview__badge">{service.badge}</span>
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </article>
                  );
                })}
              </div>
            </PreviewFrame>
          }
          rail={<ActionRail items={operatingModes} />}
        />
      </PageReveal>

      <PageReveal mode="in-view">
        <div className="solara-route-grid solara-route-grid--services">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <SurfacePanel key={service.title} as="article" variant="editorial" layout="preview" density="comfortable" className="solara-route-card solara-route-card--service">
                <div className="solara-route-card__header">
                  <div className="solara-route-card__icon-shell">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="solara-route-card__eyebrow">{service.badge}</p>
                  <h2 className="solara-route-card__title">{service.title}</h2>
                  <p className="solara-route-card__body">{service.description}</p>
                </div>
                <div className="solara-route-list">
                  {service.items.map((item) => (
                    <div key={item} className="solara-route-list__row">
                      {item}
                    </div>
                  ))}
                </div>
              </SurfacePanel>
            );
          })}
        </div>
      </PageReveal>

      <PageReveal mode="in-view">
        <SurfacePanel variant="editorial" layout="split" density="comfortable" className="solara-route-card solara-route-card--services-model">
          <div className="space-y-4">
            <PageIntro
              variant="editorial"
              layout="preview"
              eyebrow="How Solara operates"
              title="One operating system for help, tools, learning, and shared neighborhood work."
              body="The product is designed so people can start with a blocker, take the right route, and keep moving without switching between disconnected systems."
              actions={
                <div className="flex flex-wrap gap-3">
                  <InlineAction to="/connect" emphasis="strong">
                    Find helpers
                  </InlineAction>
                  <InlineAction to="/plan">Plan your route</InlineAction>
                </div>
              }
              className="max-w-none"
            />

            <PreviewFrame
              chromeLabel="Route handoff"
              eyebrow="System flow"
              title="Every route points to the next practical move."
              body="A user can start with services, then move directly into helper discovery, planning, or shared project work."
            >
              <div className="solara-route-flow">
                {["Question", "Route", "Action"].map((step, index) => (
                  <div key={step} className="solara-route-flow__item">
                    <p className="solara-route-flow__index">0{index + 1}</p>
                    <p className="solara-route-flow__title">{step}</p>
                    <p className="solara-route-flow__body">
                      {index === 0
                        ? "Start from the real blocker."
                        : index === 1
                          ? "Use the right support lane immediately."
                          : "Continue into the route that actually moves the work forward."}
                    </p>
                  </div>
                ))}
              </div>
            </PreviewFrame>
          </div>

          <ActionRail items={operatingModes.map((mode) => ({ ...mode, action: <InlineAction to="/connect">Open route</InlineAction> }))} />
        </SurfacePanel>
      </PageReveal>

      <ServicesFAQ />

      <PageReveal mode="in-view">
        <SurfacePanel variant="editorial" layout="closeout" density="comfortable" className="solara-route-card solara-route-card--closeout">
          <PageIntro
            variant="quiet"
            layout="closeout"
            eyebrow="Next step"
            title="If you already know what you need, go straight to the route that gets the work moving."
            body="Support should shorten the distance between the first question and local action."
            className="max-w-none"
          />

          <div className="flex flex-wrap gap-3">
            <InlineAction to="/connect" emphasis="strong">
              Open helpers
            </InlineAction>
            <InlineAction to="/learn">
              Open learning hub
            </InlineAction>
            <InlineAction to="/projects" emphasis="quiet">
              Open projects
              <ArrowRight className="h-4 w-4" />
            </InlineAction>
          </div>
        </SurfacePanel>
      </PageReveal>
    </PageFrame>
  );
};

export default Services;
