import React from "react";
import { Helper } from "../../data/helpers";
import { ShieldCheck, Clock3, Star } from "lucide-react";

type Props = {
  helper: Helper;
  onOpenProfile: (helper: Helper) => void;
  onRequest: (helper: Helper) => void;
  saved: boolean;
  onSaveToggle: (id: string) => void;
};

const levelLabel: Record<Helper["level"], string> = {
  community: "Community volunteer",
  trained: "Trained volunteer",
  certified: "Certified installer",
};

const HelperCard: React.FC<Props> = React.memo(
  ({ helper, onOpenProfile, onRequest, saved, onSaveToggle }) => {
    const initials = helper.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <article className="flex h-full flex-col gap-4 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-4 text-[var(--solara-text-strong)] shadow-[var(--solara-shadow-soft)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-sm font-semibold">
              {helper.avatar ? <img src={helper.avatar} alt={`${helper.name} avatar`} className="h-full w-full object-cover" /> : initials}
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">{helper.name}</h3>
                {helper.verified ? <ShieldCheck className="h-4 w-4 text-[var(--solara-accent)]" aria-label="Verified" /> : null}
              </div>
              <p className="text-xs text-[var(--solara-text-muted)]">{levelLabel[helper.level]}</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--solara-text-muted)]">
            <Star className="h-3.5 w-3.5 text-[var(--solara-accent)]" />
            {helper.rating.toFixed(1)} / {helper.reviewsCount}
          </div>
        </div>

        <div className="grid gap-2 text-sm text-[var(--solara-text-muted)] sm:grid-cols-2">
          <p>{helper.coarseLocationLabel}</p>
          <p className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            {helper.responseTimeLabel}
          </p>
          <p>{helper.completedProjectsCount} completed projects</p>
          <p className="capitalize">{helper.availabilityStatus}</p>
        </div>

        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">{helper.bio}</p>

        <div className="flex flex-wrap gap-2">
          {helper.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="rounded-md border border-[var(--solara-rule-soft)] px-2.5 py-1 text-xs text-[var(--solara-text-muted)]">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-[var(--solara-rule-soft)] pt-3">
          <button type="button" onClick={() => onOpenProfile(helper)} className="solara-inline-action solara-inline-action--default">
            View profile
          </button>
          <button type="button" onClick={() => onRequest(helper)} className="solara-inline-action solara-inline-action--strong">
            Request support
          </button>
          <button
            type="button"
            onClick={() => onSaveToggle(helper.id)}
            aria-pressed={saved}
            className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${
              saved
                ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                : "border-[var(--solara-rule)] text-[var(--solara-text-muted)] hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)]"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </article>
    );
  },
  (prevProps, nextProps) => prevProps.helper.id === nextProps.helper.id && prevProps.saved === nextProps.saved
);

HelperCard.displayName = "HelperCard";

export default HelperCard;
