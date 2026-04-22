import React from "react";
import { Clock3, ShieldCheck, Star } from "lucide-react";
import type { Helper } from "@/data/helpers";
import HelperAvatar from "./HelperAvatar";

type Props = {
  helpers: Helper[];
  note: string;
};

const levelLabel: Record<Helper["level"], string> = {
  community: "Community volunteer",
  trained: "Trained volunteer",
  certified: "Certified installer",
};

const ConnectHelperPreviewStack: React.FC<Props> = ({ helpers, note }) => {
  const [lead, ...supporting] = helpers;

  if (!lead) return null;

  return (
    <div className="space-y-3">
      <article className="rounded-[1.35rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-1)] p-4 shadow-[var(--solara-shadow-soft)]">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Best fit now</p>
            <div className="flex items-center gap-3">
              <HelperAvatar name={lead.name} src={lead.avatar} className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-sm font-semibold text-[var(--solara-text-strong)]" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-semibold text-[var(--solara-text-strong)]">{lead.name}</p>
                  {lead.verified ? <ShieldCheck className="h-3.5 w-3.5 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
                </div>
                <p className="text-sm text-[var(--solara-text-muted)]">{levelLabel[lead.level]}</p>
              </div>
            </div>
          </div>
          <span className="rounded-full border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
            Lead
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[color-mix(in_srgb,var(--solara-surface-2)_82%,transparent)] px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">Location</p>
            <p className="mt-1 text-sm text-[var(--solara-text-strong)]">{lead.coarseLocationLabel}</p>
          </div>
          <div className="rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[color-mix(in_srgb,var(--solara-surface-2)_82%,transparent)] px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">Response</p>
            <p className="mt-1 text-sm text-[var(--solara-text-strong)]">{lead.responseTimeLabel}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {lead.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="rounded-full border border-[var(--solara-rule-soft)] px-3 py-1 text-[11px] font-semibold text-[var(--solara-text-muted)]">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--solara-rule-soft)] pt-3 text-sm">
          <p className="text-[var(--solara-text-muted)]">{lead.rating.toFixed(1)} rating from {lead.reviewsCount} reviews</p>
          <p className="text-[var(--solara-text-muted)]">{lead.completedProjectsCount} projects</p>
        </div>
      </article>

      <div className="grid gap-2">
        {supporting.map((helper, index) => (
          <article key={helper.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[1.05rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-1)] px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-3">
              <p className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] text-[11px] font-semibold text-[var(--solara-text-muted)]">
                {String(index + 2).padStart(2, "0")}
              </p>
              <HelperAvatar name={helper.name} src={helper.avatar} className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[0.9rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-xs font-semibold text-[var(--solara-text-strong)]" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold text-[var(--solara-text-strong)]">{helper.name}</p>
                  {helper.verified ? <ShieldCheck className="h-3 w-3 text-[var(--solara-accent)]" aria-label="Verified helper" /> : null}
                </div>
                <p className="text-xs text-[var(--solara-text-muted)]">{levelLabel[helper.level]}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--solara-text-muted)]">
              <span className="rounded-full border border-[var(--solara-rule-soft)] px-2.5 py-1">{helper.coarseLocationLabel}</span>
              <span className="rounded-full border border-[var(--solara-rule-soft)] px-2.5 py-1">{helper.responseTimeLabel}</span>
              <span className="rounded-full border border-[var(--solara-rule-soft)] px-2.5 py-1 inline-flex items-center gap-1">
                <Star className="h-3 w-3 text-[var(--solara-accent)]" />
                {helper.rating.toFixed(1)}
              </span>
            </div>
          </article>
        ))}
      </div>

      <p className="text-xs leading-6 text-[var(--solara-text-muted)]">{note}</p>
    </div>
  );
};

export default ConnectHelperPreviewStack;
