import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ShieldCheck, UserCheck } from "lucide-react";
import SurfacePanel from "@/components/ui/surface-panel";
import PageIntro from "@/components/ui/page-intro";
import PreviewFrame from "@/components/ui/preview-frame";
import InlineAction from "@/components/ui/inline-action";
import type { Helper } from "@/data/helpers";
import ConnectHelperPreviewStack from "./ConnectHelperPreviewStack";

type Props = {
  helpers: Helper[];
  verifiedCount: number;
  availableCount: number;
  areasCoveredCount: number;
  onRequestSupport: () => void;
};

const ConnectScreeningDesk: React.FC<Props> = ({ helpers, verifiedCount, availableCount, areasCoveredCount, onRequestSupport }) => {
  const lead = helpers[0];

  return (
    <SurfacePanel variant="product" layout="hero" density="comfortable" className="overflow-hidden">
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
        <div className="space-y-5">
          <PageIntro
            variant="product"
            layout="hero"
            eyebrow="Connect"
            title="Review verified helpers in one calm screening pass."
            body="Screen by fit, then open the full directory only when the shortlist is already clear. Saved helpers, certification, and response speed stay visible."
            actions={
              <div className="flex flex-wrap gap-3">
                <InlineAction to="/connect/helpers" emphasis="strong">
                  Open helpers
                </InlineAction>
                <button type="button" onClick={onRequestSupport} className="solara-inline-action solara-inline-action--default">
                  Request support
                </button>
                <Link to="/safety" className="solara-inline-action solara-inline-action--quiet">
                  Safety
                </Link>
              </div>
            }
            trailing={
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                  Screening desk
                </span>
                <span className="rounded-full border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                  Certified work first
                </span>
                <span className="rounded-full border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                  Saved helpers stay visible
                </span>
              </div>
            }
          />

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Verified now", value: verifiedCount, meta: "Trusted helpers on this pass", icon: ShieldCheck },
              { label: "Available now", value: availableCount, meta: "Ready for a first reply", icon: UserCheck },
              { label: "Areas covered", value: areasCoveredCount, meta: "Across active local zones", icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-1)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">{item.label}</p>
                    <Icon className="h-4 w-4 text-[var(--solara-accent-strong)]" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--solara-text-strong)]">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--solara-text-muted)]">{item.meta}</p>
                </div>
              );
            })}
          </div>
        </div>

        <PreviewFrame
          chromeLabel="Screening desk"
          eyebrow={lead?.verified ? "Verified helper pass" : "Current helper pass"}
          title={lead ? `${lead.name} is the current lead fit.` : "No helpers match yet."}
          body="Use this preview to scan the current shortlist before you open the full browse workspace."
          viewportClassName="pt-0"
        >
          <ConnectHelperPreviewStack
            helpers={helpers}
            note={`${helpers.length} helpers are visible in the current pass. Open the full directory when you need more filters.`}
          />
        </PreviewFrame>
      </div>
    </SurfacePanel>
  );
};

export default ConnectScreeningDesk;
