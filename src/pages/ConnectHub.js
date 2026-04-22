import React, { useMemo } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Clock3, MapPinned, Search, Send, ShieldCheck } from "lucide-react";
import PageFrame from "@/components/ui/page-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PreviewFrame from "@/components/ui/preview-frame";
import ActionRail from "@/components/ui/action-rail";
import PageReveal from "@/components/ui/page-reveal";
import TrustSafetyStrip from "../components/connect/TrustSafetyStrip";
import ConnectHelperSlate from "../components/connect/ConnectHelperSlate";
import ConnectCuratedRoster from "../components/connect/ConnectCuratedRoster";
import { helpers as helperData } from "../data/helpers";

const legacyDirectoryParams = ["requestHelp", "helperId", "filter", "view", "search", "sort"];

const dispatchNotes = [
  {
    icon: Search,
    title: "Screen first",
    body: "Check fit by location, role level, and response speed before opening profiles one by one.",
  },
  {
    icon: ShieldCheck,
    title: "Use trust signals properly",
    body: "Certified roles are for licensed work. Community volunteers are for support, setup, and shared labor.",
  },
  {
    icon: Send,
    title: "Write the request after the shortlist exists",
    body: "A clearer brief gets better replies from the same network.",
  },
];

const ConnectHub = () => {
  const [searchParams] = useSearchParams();
  const shouldOpenDirectory = legacyDirectoryParams.some((param) => searchParams.has(param));
  const queryString = searchParams.toString();

  if (shouldOpenDirectory) {
    return <Navigate replace to={`/connect/helpers${queryString ? `?${queryString}` : ""}`} />;
  }

  const heroHelpers = useMemo(
    () =>
      [...helperData]
        .filter((helper) => helper.verified && helper.availabilityStatus === "available")
        .sort((left, right) => {
          const ratingScore = right.rating - left.rating;
          if (ratingScore !== 0) return ratingScore;
          return right.completedProjectsCount - left.completedProjectsCount;
        })
        .slice(0, 5),
    [],
  );

  const rankedHelpers = useMemo(
    () =>
      [...helperData]
        .filter((helper) => helper.verified && helper.availabilityStatus === "available")
        .sort((left, right) => {
          const ratingScore = right.rating - left.rating;
          if (ratingScore !== 0) return ratingScore;
          return right.completedProjectsCount - left.completedProjectsCount;
        })
        .slice(0, 3),
    [],
  );

  const verifiedCount = helperData.filter((helper) => helper.verified).length;
  const availableCount = helperData.filter((helper) => helper.verified && helper.availabilityStatus === "available").length;
  const certifiedCount = helperData.filter((helper) => helper.verified && helper.level === "certified").length;
  const areasCoveredCount = new Set(helperData.filter((helper) => helper.verified).map((helper) => helper.coarseLocationLabel)).size;

  return (
    <PageFrame family="hub" width="wide" density="comfortable">
      <PageReveal>
        <PageHeroStage
          family="hub"
          className="solara-route-hero solara-route-hero--dispatch"
          eyebrow="Connect dispatch"
          title="Find the right local help before the job slows down."
          body="Connect is a screening desk, not a request wall. Narrow the roster by trust, fit, and availability first, then open the request once the shortlist makes sense."
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/connect/helpers" emphasis="strong">
                Open helper desk
              </InlineAction>
              <InlineAction to="/request-help">Request support</InlineAction>
              <InlineAction to="/projects" emphasis="quiet">
                Open projects
              </InlineAction>
            </div>
          }
          metrics={[
            { label: "Verified helpers", value: verifiedCount, meta: "Current trusted roster" },
            { label: "Available now", value: availableCount, meta: "Ready for new requests" },
            { label: "Certified roles", value: certifiedCount, meta: "For regulated work only" },
            { label: "Coverage", value: `${areasCoveredCount} zones`, meta: "Across active local areas" },
          ]}
          preview={
            <PreviewFrame
              className="solara-route-preview solara-route-preview--dispatch"
              chromeLabel="Dispatch board"
              eyebrow="Current roster"
              title="Start with people who can actually take the work."
              body="The desk below prioritizes current availability, trust level, and project history before you commit time to the full directory."
              viewportClassName="bg-transparent p-0"
            >
              <ConnectHelperSlate helpers={heroHelpers} availableCount={availableCount} areasCoveredCount={areasCoveredCount} />
            </PreviewFrame>
          }
          rail={
            <ActionRail
              compact
              items={[
                {
                  eyebrow: "Directory",
                  title: "Use the full helper desk when the brief is already clear",
                  body: "Filter by skill, availability, and response speed. Save strong matches locally as you screen.",
                  action: <InlineAction to="/connect/helpers">Open helpers</InlineAction>,
                },
                {
                  eyebrow: "Requests",
                  title: "Open the request only after the shortlist exists",
                  body: "That keeps the request sharper and makes it easier for the right people to answer quickly.",
                  action: <InlineAction to="/request-help">Write request</InlineAction>,
                },
              ]}
            />
          }
        >
          <div className="solara-route-notes solara-route-notes--dispatch">
            {dispatchNotes.map((note) => {
              const Icon = note.icon;
              return (
                <article key={note.title} className="solara-route-note-card">
                  <span className="solara-route-note-card__icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="solara-route-note-card__title">{note.title}</p>
                    <p className="solara-route-note-card__body">{note.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </PageHeroStage>
      </PageReveal>

      <PageReveal delay={0.04}>
        <section className="solara-route-grid solara-route-grid--dispatch">
          <SurfacePanel as="section" variant="editorial" layout="preview" density="comfortable" className="solara-route-card">
            <div className="solara-route-card__header">
              <p className="solara-route-card__eyebrow">Top available now</p>
              <h2 className="solara-route-card__title">Three helpers worth checking first.</h2>
              <p className="solara-route-card__body">
                These are ranked by current availability, rating, and completed project work.
              </p>
            </div>
            <ConnectCuratedRoster helpers={rankedHelpers} />
          </SurfacePanel>

          <SurfacePanel as="section" variant="editorial" layout="preview" density="comfortable" className="solara-route-card solara-route-card--stacked">
            <div className="solara-route-card__header">
              <p className="solara-route-card__eyebrow">How to use Connect well</p>
              <h2 className="solara-route-card__title">Treat it like dispatch, not browse-and-hope.</h2>
            </div>
            <div className="solara-inline-checklist">
              <article className="solara-inline-checklist__item">
                <MapPinned className="h-4 w-4" />
                <div>
                  <p>Start with location and role level.</p>
                  <span>That removes noise faster than reading every profile intro.</span>
                </div>
              </article>
              <article className="solara-inline-checklist__item">
                <Clock3 className="h-4 w-4" />
                <div>
                  <p>Response speed matters when the job is already blocked.</p>
                  <span>Use fast-response helpers first for urgent surveys, checks, or coordination.</span>
                </div>
              </article>
              <article className="solara-inline-checklist__item">
                <ShieldCheck className="h-4 w-4" />
                <div>
                  <p>Use certified roles for licensed work only.</p>
                  <span>Volunteers and trained helpers still matter, but they are not a substitute for regulated tasks.</span>
                </div>
              </article>
            </div>
          </SurfacePanel>
        </section>
      </PageReveal>

      <PageReveal delay={0.08}>
        <SurfacePanel variant="editorial" layout="split" density="compact" className="solara-route-card solara-route-card--trust">
          <TrustSafetyStrip />
        </SurfacePanel>
      </PageReveal>
    </PageFrame>
  );
};

export default ConnectHub;
