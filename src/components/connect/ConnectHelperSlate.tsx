import React from "react";
import { ShieldCheck } from "lucide-react";
import PageIntro from "@/components/ui/page-intro";
import MetricBand from "@/components/ui/metric-band";
import PreviewFrame from "@/components/ui/preview-frame";
import InlineAction from "@/components/ui/inline-action";
import { Helper } from "@/data/helpers";
import HelperAvatar from "./HelperAvatar";

type Props = {
  helpers: Helper[];
  availableCount: number;
  areasCoveredCount: number;
  verifiedCount?: number;
  certifiedCount?: number;
};

const levelLabel: Record<Helper["level"], string> = {
  community: "Community volunteer",
  trained: "Trained volunteer",
  certified: "Certified installer",
};

const ConnectHelperSlate: React.FC<Props> = ({ helpers, availableCount, areasCoveredCount, verifiedCount, certifiedCount }) => {
  const [lead, ...supporting] = helpers;

  if (!lead) return null;

  const visibleVerifiedCount = verifiedCount ?? helpers.filter((helper) => helper.verified).length;
  const visibleCertifiedCount = certifiedCount ?? helpers.filter((helper) => helper.level === "certified").length;

  return (
    <section className="relative isolate overflow-hidden rounded-[1.75rem] border border-[var(--solara-rule)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,242,232,0.92))] p-5 shadow-[var(--solara-shadow-soft)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(237,183,61,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(51,96,90,0.08),transparent_30%)]"
      />
      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
        <div className="grid gap-4">
          <PageIntro
            eyebrow="Connect"
            title="Find verified local help before the work stalls."
            body="Screen helpers by location, response speed, and certification. Keep the brief light until the fit is clear."
            actions={
              <div className="flex flex-wrap gap-3">
                <InlineAction to="/connect/helpers" emphasis="strong">
                  Find helpers
                </InlineAction>
                <InlineAction to="/request-help" emphasis="default">
                  Request support
                </InlineAction>
              </div>
            }
            trailing={
              <div className="text-sm leading-6 text-[var(--solara-text-muted)]">
                {availableCount} available across {areasCoveredCount} areas. Start with the strongest verified matches, then narrow only if needed.
              </div>
            }
            variant="hub"
            layout="hero"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4 shadow-[var(--solara-shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Screening</p>
              <p className="mt-2 text-sm leading-6 text-[var(--solara-text-muted)]">
                Use the full helper directory when you want filters, saved lists, and profile-level detail.
              </p>
            </article>
            <article className="rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4 shadow-[var(--solara-shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Readiness</p>
              <p className="mt-2 text-sm leading-6 text-[var(--solara-text-muted)]">
                Open a request only when the scope, location, and helper level are clear enough to make contact worthwhile.
              </p>
            </article>
          </div>

          <MetricBand
            compact
            items={[
              { label: "Verified helpers", value: visibleVerifiedCount, meta: "Current trusted roster" },
              { label: "Available now", value: availableCount, meta: "Ready for new requests" },
              { label: "Certified roles", value: visibleCertifiedCount, meta: "For licensed work only" },
            ]}
          />
        </div>

        <PreviewFrame
          chromeLabel="Helper desk"
          eyebrow="Current screening pass"
          title="One live shortlist, not another card stack."
          body="The preview stays small enough to scan, but concrete enough to trust."
          footer={
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
              Location and response stay visible so the shortlist reads like a decision surface, not a directory sample.
            </div>
          }
        >
          <div className="space-y-3">
            <article className="rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-1)] p-4 shadow-[var(--solara-shadow-soft)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <HelperAvatar name={lead.name} src={lead.avatar} className="h-12 w-12 rounded-[0.95rem] border border-[var(--solara-rule)]" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold text-[var(--solara-text-strong)]">{lead.name}</p>
                      {lead.verified ? <ShieldCheck className="h-3.5 w-3.5 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
                    </div>
                    <p className="text-sm text-[var(--solara-text-muted)]">{levelLabel[lead.level]}</p>
                  </div>
                </div>
                <InlineAction to={`/connect/helpers?helperId=${lead.id}`} emphasis="default">
                  View helper
                </InlineAction>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[0.85rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">Location</p>
                  <p className="mt-1 text-sm text-[var(--solara-text-strong)]">{lead.coarseLocationLabel}</p>
                </div>
                <div className="rounded-[0.85rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">Response</p>
                  <p className="mt-1 text-sm text-[var(--solara-text-strong)]">{lead.responseTimeLabel}</p>
                </div>
              </div>
            </article>

            <div className="grid gap-2">
              {supporting.map((helper, index) => (
                <article
                  key={helper.id}
                  className="flex items-center gap-3 rounded-[0.9rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-1)] px-3 py-2.5 shadow-[var(--solara-shadow-soft)]"
                >
                  <p className="w-8 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">
                    {String(index + 2).padStart(2, "0")}
                  </p>
                  <HelperAvatar name={helper.name} src={helper.avatar} className="h-10 w-10 rounded-[0.8rem] border border-[var(--solara-rule)]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-[var(--solara-text-strong)]">{helper.name}</p>
                      {helper.verified ? <ShieldCheck className="h-3 w-3 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
                    </div>
                    <p className="text-xs text-[var(--solara-text-muted)]">{levelLabel[helper.level]}</p>
                  </div>
                  <div className="hidden shrink-0 text-right text-xs text-[var(--solara-text-muted)] sm:block">
                    <p>{helper.coarseLocationLabel}</p>
                    <p>{helper.responseTimeLabel}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </PreviewFrame>
      </div>
    </section>
  );
};

export default ConnectHelperSlate;
