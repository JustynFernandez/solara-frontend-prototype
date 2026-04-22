import React from "react";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";

const tiers = [
  {
    title: "Community volunteer",
    body: "Guidance, photos, checklists, and remote support.",
  },
  {
    title: "Trained volunteer",
    body: "Peer review, site walkthroughs, and tool coaching.",
  },
  {
    title: "Certified installer",
    body: "Mains wiring, commissioning, and formal sign-off.",
  },
];

const ConnectTrustReadiness: React.FC = () => (
  <SurfacePanel variant="product" layout="split" density="comfortable" className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Trust and readiness</p>
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--solara-text-strong)]">Know what belongs in a request.</h2>
        <p className="max-w-2xl text-sm leading-6 text-[var(--solara-text-muted)]">
          Keep the tier rule visible once, then move straight to the next step. Certified work should be screened before any request is sent.
        </p>
      </header>

      <div className="grid gap-3">
        {tiers.map((tier) => (
          <div key={tier.title} className="rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-1)] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">{tier.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--solara-text-muted)]">{tier.body}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <div className="rounded-[1.15rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Before you contact</p>
        <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--solara-text-muted)]">
          <p>Check whether the task is guidance, site support, or certified work.</p>
          <p>Use a helper with the right tier before you start the request flow.</p>
          <p>Share location, timing, and constraints so the first reply can be useful.</p>
        </div>
        <div className="mt-4 rounded-[0.95rem] border border-[var(--solara-rule-soft)] bg-[color-mix(in_srgb,var(--solara-surface-1)_90%,white)] px-3 py-2.5">
          <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Mains work requires a certified professional.</p>
          <p className="mt-1 text-xs leading-5 text-[var(--solara-text-muted)]">This rule should be visible before any request is sent.</p>
        </div>
      </div>

      <div className="space-y-3 rounded-[1.15rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Next step</p>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
          Open the full directory when you need more filters. Open a request when the brief is already clear.
        </p>
        <div className="flex flex-wrap gap-2">
          <InlineAction to="/connect/helpers" emphasis="strong">
            Open helpers
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
      </div>
    </div>
  </SurfacePanel>
);

export default ConnectTrustReadiness;
