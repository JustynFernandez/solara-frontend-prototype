import React, { useMemo } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Clock3, MapPinned, ShieldCheck, Users2 } from "lucide-react";
import PageFrame from "@/components/ui/page-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import PageReveal from "@/components/ui/page-reveal";
import TrustSafetyStrip from "../components/connect/TrustSafetyStrip";
import { helpers as helperData } from "../data/helpers";
import HelperAvatar from "../components/connect/HelperAvatar";

const legacyDirectoryParams = ["requestHelp", "helperId", "filter", "view", "search", "sort"];

const responseRank = {
  "Under 8h": 0,
  "Under 12h": 1,
  "Same day": 2,
  "Under 18h": 3,
  "Under 24h": 4,
  "Within 1 day": 5,
  "1 day": 6,
  "24-48h": 7,
  "2-3 days": 8,
};

const intakeBriefs = [
  {
    title: "Battery sizing check",
    detail: "Need trained or certified review before parts are ordered.",
    lane: "Remote first",
  },
  {
    title: "Roof access and safety check",
    detail: "Useful when the job needs local presence and a calm first pass.",
    lane: "Trained support",
  },
  {
    title: "Inspection-ready wiring plan",
    detail: "Use the certified lane first when sign-off is part of the work.",
    lane: "Certified route",
  },
];

const roleLanes = [
  {
    title: "Community",
    note: "Useful for referrals, plain-language guidance, and starter help.",
    guardrail: "Do not use for regulated electrical decisions.",
    filter: "Community volunteers",
  },
  {
    title: "Trained",
    note: "Best for layout review, battery checks, safety walkthroughs, and practical second opinions.",
    guardrail: "Good default lane when the job is real but not yet regulated.",
    filter: "Trained helpers",
  },
  {
    title: "Certified",
    note: "Use for mains work, inspection prep, commissioning, and sign-off.",
    guardrail: "Start here if the work touches wiring, panels, or certification.",
    filter: "Certified installers",
  },
];

const connectNotes = [
  "Local fit matters more than browsing every profile.",
  "Write the request after the shortlist is clean, not before.",
  "Keep response speed, role level, and location visible together.",
];

const rankResponse = (label = "") => responseRank[label] ?? 99;

const LaunchBoard = ({ helpers }: { helpers: typeof helperData }) => {
  const bestAvailable = helpers
    .filter((helper) => helper.verified && helper.availabilityStatus === "available")
    .sort((left, right) => {
      const responseDelta = rankResponse(left.responseTimeLabel) - rankResponse(right.responseTimeLabel);
      if (responseDelta !== 0) return responseDelta;
      return right.rating - left.rating;
    })
    .slice(0, 4);

  return (
    <section className="solara-connect-reboot-board" aria-label="Connect dispatch board">
      <div className="solara-connect-reboot-board__top">
        <div>
          <p className="solara-connect-reboot-board__eyebrow">Dispatch board</p>
          <h2 className="solara-connect-reboot-board__title">Start with the job shape, then screen the right lane.</h2>
        </div>
        <span className="solara-connect-reboot-board__chip">Live roster</span>
      </div>

      <div className="solara-connect-reboot-board__columns">
        <div className="solara-connect-reboot-board__stack">
          <p className="solara-connect-reboot-board__label">Typical starting asks</p>
          {intakeBriefs.map((brief) => (
            <article key={brief.title} className="solara-connect-reboot-board__brief">
              <div>
                <p className="solara-connect-reboot-board__brief-title">{brief.title}</p>
                <p className="solara-connect-reboot-board__brief-detail">{brief.detail}</p>
              </div>
              <span className="solara-connect-reboot-board__brief-lane">{brief.lane}</span>
            </article>
          ))}
        </div>

        <div className="solara-connect-reboot-board__stack">
          <p className="solara-connect-reboot-board__label">Fast current shortlist</p>
          {bestAvailable.map((helper, index) => (
            <article key={helper.id} className="solara-connect-reboot-board__helper">
              <span className="solara-connect-reboot-board__helper-index">{String(index + 1).padStart(2, "0")}</span>
              <HelperAvatar name={helper.name} src={helper.avatar} className="solara-connect-reboot-board__avatar" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="solara-connect-reboot-board__helper-name">{helper.name}</p>
                  {helper.verified ? <ShieldCheck className="h-3 w-3 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
                </div>
                <p className="solara-connect-reboot-board__helper-meta">{helper.skills[0]} / {helper.coarseLocationLabel}</p>
              </div>
              <div className="solara-connect-reboot-board__helper-proof">
                <p>{helper.responseTimeLabel}</p>
                <p>{helper.rating.toFixed(1)} rating</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConnectHub = () => {
  const [searchParams] = useSearchParams();
  const shouldOpenDirectory = legacyDirectoryParams.some((param) => searchParams.has(param));
  const queryString = searchParams.toString();

  if (shouldOpenDirectory) {
    return <Navigate replace to={`/connect/helpers${queryString ? `?${queryString}` : ""}`} />;
  }

  const topHelpers = useMemo(
    () =>
      [...helperData]
        .filter((helper) => helper.verified)
        .sort((left, right) => {
          const availabilityScore = left.availabilityStatus === "available" ? -1 : 1;
          const availabilityDelta = availabilityScore - (right.availabilityStatus === "available" ? -1 : 1);
          if (availabilityDelta !== 0) return availabilityDelta;
          return right.rating - left.rating;
        })
        .slice(0, 4),
    [],
  );

  const verifiedCount = helperData.filter((helper) => helper.verified).length;
  const fastResponseCount = helperData.filter((helper) => rankResponse(helper.responseTimeLabel) <= 2).length;
  const certifiedCount = helperData.filter((helper) => helper.level === "certified" && helper.verified).length;
  const coverageCount = new Set(helperData.filter((helper) => helper.verified).map((helper) => helper.coarseLocationLabel)).size;

  return (
    <PageFrame family="hub" width="wide" density="comfortable">
      <PageReveal>
        <section className="solara-connect-reboot-hero">
          <div className="solara-connect-reboot-hero__intro">
            <p className="solara-connect-reboot-hero__eyebrow">Dispatch mode</p>
            <h1 className="solara-connect-reboot-hero__title">Know which helper lane the job belongs in before you contact anyone.</h1>
            <p className="solara-connect-reboot-hero__body">
              Connect is strongest when it behaves like screening, not browsing. Sort by role, response speed, and location first. Open profiles only once the shortlist has a reason to exist.
            </p>

            <div className="solara-connect-reboot-hero__actions">
              <InlineAction to="/connect/helpers" emphasis="strong">Open helper desk</InlineAction>
              <InlineAction to="/request-help">Request support</InlineAction>
              <InlineAction to="/projects" emphasis="quiet">Open projects</InlineAction>
            </div>

            <div className="solara-connect-reboot-hero__metrics">
              <article>
                <span>Verified roster</span>
                <strong>{verifiedCount}</strong>
              </article>
              <article>
                <span>Fast reply</span>
                <strong>{fastResponseCount}</strong>
              </article>
              <article>
                <span>Certified</span>
                <strong>{certifiedCount}</strong>
              </article>
              <article>
                <span>Coverage</span>
                <strong>{coverageCount} zones</strong>
              </article>
            </div>
          </div>

          <LaunchBoard helpers={helperData} />
        </section>
      </PageReveal>

      <PageReveal delay={0.04}>
        <div className="solara-connect-reboot-grid">
          <SurfacePanel as="section" variant="editorial" layout="preview" density="comfortable" className="solara-connect-reboot-card">
            <div className="solara-route-card__header">
              <p className="solara-route-card__eyebrow">Role lanes</p>
              <h2 className="solara-route-card__title">Three lanes. Different jobs. Different trust rules.</h2>
              <p className="solara-route-card__body">
                The page should answer one question quickly: who is appropriate to contact for this exact piece of work?
              </p>
            </div>

            <div className="solara-connect-reboot-lanes">
              {roleLanes.map((lane) => (
                <article key={lane.title} className="solara-connect-reboot-lane">
                  <div className="solara-connect-reboot-lane__top">
                    <p className="solara-connect-reboot-lane__title">{lane.title}</p>
                    <span className="solara-connect-reboot-lane__filter">{lane.filter}</span>
                  </div>
                  <p className="solara-connect-reboot-lane__note">{lane.note}</p>
                  <p className="solara-connect-reboot-lane__guardrail">{lane.guardrail}</p>
                </article>
              ))}
            </div>
          </SurfacePanel>

          <SurfacePanel as="section" variant="editorial" layout="preview" density="comfortable" className="solara-connect-reboot-card">
            <div className="solara-route-card__header">
              <p className="solara-route-card__eyebrow">Current handoff</p>
              <h2 className="solara-route-card__title">Use Connect to tighten the shortlist, then move out fast.</h2>
              <p className="solara-route-card__body">
                The route works when it makes the next move obvious: save helpers, send one clear request, or hand off into a live project.
              </p>
            </div>

            <div className="solara-connect-reboot-shortlist">
              {topHelpers.map((helper) => (
                <article key={helper.id} className="solara-connect-reboot-shortlist__card">
                  <div className="solara-connect-reboot-shortlist__identity">
                    <HelperAvatar name={helper.name} src={helper.avatar} className="solara-connect-reboot-shortlist__avatar" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="solara-connect-reboot-shortlist__name">{helper.name}</p>
                        {helper.verified ? <ShieldCheck className="h-3 w-3 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
                      </div>
                      <p className="solara-connect-reboot-shortlist__meta">{helper.bio}</p>
                    </div>
                  </div>
                  <div className="solara-connect-reboot-shortlist__facts">
                    <span>{helper.coarseLocationLabel}</span>
                    <span>{helper.responseTimeLabel}</span>
                    <span>{helper.skills[0]}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="solara-connect-reboot-notes">
              {connectNotes.map((note) => (
                <article key={note} className="solara-connect-reboot-notes__item">
                  <Users2 className="h-4 w-4" />
                  <span>{note}</span>
                </article>
              ))}
            </div>

            <div className="solara-connect-reboot-card__actions">
              <InlineAction to="/connect/helpers" emphasis="strong">Go to screening desk</InlineAction>
              <InlineAction to="/community-guidelines" emphasis="quiet">Guidelines</InlineAction>
            </div>
          </SurfacePanel>
        </div>
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
