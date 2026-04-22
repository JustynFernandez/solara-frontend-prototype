import React from "react";
import { ShieldCheck, TriangleAlert } from "lucide-react";
import InlineAction from "@/components/ui/inline-action";

const TrustSafetyStrip: React.FC = () => (
  <section className="relative isolate overflow-hidden rounded-[1.75rem] border border-[var(--solara-rule)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(246,240,229,0.95))] p-5 shadow-[var(--solara-shadow-soft)]">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,96,90,0.08),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(237,183,61,0.1),transparent_30%)]"
    />
    <div className="relative space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Before you contact anyone</p>
        <h2 className="max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-[var(--solara-text-strong)]">
          Know when a helper is safe and appropriate to contact.
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-[var(--solara-text-muted)]">
          The route stays simple: check the helper tier, confirm the work type, and keep the request specific enough to be useful.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <article className="rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-5 shadow-[var(--solara-shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Helper tiers</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 rounded-[0.9rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--solara-accent)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Community volunteer</p>
                <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Best for guidance, referrals, and light support.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[0.9rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--solara-accent)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Trained volunteer</p>
                <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Best for practical help where some experience matters.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-[0.9rem] border border-[var(--solara-accent-soft)] bg-[color-mix(in_srgb,var(--solara-accent-soft)_35%,var(--solara-surface-2))] px-3 py-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--solara-accent-strong)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Certified installer</p>
                <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Required for mains work and any task that needs formal certification.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-5 shadow-[var(--solara-shadow-soft)]">
          <div className="flex items-start gap-3 rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] p-4">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[var(--solara-accent-strong)]" />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Non-negotiable</p>
              <p className="text-sm leading-6 text-[var(--solara-text-strong)]">
                Any mains work requires a certified professional. If the job touches wiring, panels, or another regulated area, use the certified filter first.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[0.9rem] border border-[var(--solara-rule-soft)] px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">Readiness</p>
              <p className="mt-2 text-sm leading-6 text-[var(--solara-text-muted)]">Share location, job type, and urgency before opening the directory.</p>
            </div>
            <div className="rounded-[0.9rem] border border-[var(--solara-rule-soft)] px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">Scope</p>
              <p className="mt-2 text-sm leading-6 text-[var(--solara-text-muted)]">Keep the ask narrow enough that a helper can answer in one pass.</p>
            </div>
            <div className="rounded-[0.9rem] border border-[var(--solara-rule-soft)] px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">Safety</p>
              <p className="mt-2 text-sm leading-6 text-[var(--solara-text-muted)]">Use the safety and guidelines pages when the work or access pattern is uncertain.</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <InlineAction to="/connect/helpers" emphasis="strong">
              Find helpers
            </InlineAction>
            <InlineAction to="/request-help" emphasis="default">
              Request support
            </InlineAction>
            <InlineAction to="/safety" emphasis="quiet">
              Safety
            </InlineAction>
            <InlineAction to="/community-guidelines" emphasis="quiet">
              Guidelines
            </InlineAction>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export default TrustSafetyStrip;
