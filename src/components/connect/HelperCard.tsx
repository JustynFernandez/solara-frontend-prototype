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

const HelperCard: React.FC<Props> = React.memo(({ helper, onOpenProfile, onRequest, saved, onSaveToggle }) => (
  <div className="flex h-full flex-col gap-3 rounded-3xl border border-white/70 bg-white/85 p-4 text-slate-900 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="relative inline-flex h-12 w-12 overflow-hidden rounded-full border border-white/70 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/10">
          {helper.avatar && <img src={helper.avatar} alt={`${helper.name} avatar`} className="h-full w-full object-cover" />}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{helper.name}</h3>
            {helper.verified && <ShieldCheck className="h-4 w-4 text-solara-gold" aria-label="Verified" />}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200">{levelLabel[helper.level]}</p>
        </div>
      </div>
      <div className="text-right text-xs text-slate-600 dark:text-slate-300">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-2 py-1 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
          <Star className="h-3.5 w-3.5 text-solara-gold" />
          {helper.rating.toFixed(1)} · {helper.reviewsCount}
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-200">
      <span className="rounded-full border border-white/70 bg-white/80 px-2 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">Projects: {helper.completedProjectsCount}</span>
      <span className="rounded-full border border-white/70 bg-white/80 px-2 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">Location: {helper.coarseLocationLabel}</span>
      <span className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-2 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
        <Clock3 className="h-3.5 w-3.5" />
        {helper.responseTimeLabel}
      </span>
      <span className="rounded-full border border-white/70 bg-white/80 px-2 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">{helper.availabilityStatus}</span>
    </div>
    <p className="text-sm text-slate-700 dark:text-slate-200">{helper.bio}</p>
    <div className="flex flex-wrap gap-2">
      {helper.skills.map((skill) => (
        <span key={skill} className="rounded-full border border-white/70 bg-white/80 px-2 py-1 text-xs font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
          {skill}
        </span>
      ))}
    </div>
    <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
      <button
        type="button"
        onClick={() => onOpenProfile(helper)}
        className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-solara-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
      >
        View profile
      </button>
      <button
        type="button"
        onClick={() => onRequest(helper)}
        className="inline-flex items-center gap-2 rounded-full bg-button-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
      >
        Request support
      </button>
      <button
        type="button"
        onClick={() => onSaveToggle(helper.id)}
        aria-pressed={saved}
        className={`rounded-full border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
          saved ? "border-solara-gold bg-solara-gold/10 text-amber-700 dark:text-amber-200" : "border-white/70 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
        }`}
      >
        {saved ? "Saved" : "Save helper"}
      </button>
    </div>
  </div>
), (prevProps, nextProps) => {
  // Custom comparison for performance - only re-render if these change
  return (
    prevProps.helper.id === nextProps.helper.id &&
    prevProps.saved === nextProps.saved
  );
});

HelperCard.displayName = "HelperCard";

export default HelperCard;
