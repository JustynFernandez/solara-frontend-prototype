import React from "react";
import { Link } from "react-router-dom";
import { helpers as allHelpers, Helper } from "../../data/helpers";

type SavedHelpersPreviewProps = {
  savedHelperIds: string[];
  maxDisplay?: number;
};

const SavedHelpersPreview: React.FC<SavedHelpersPreviewProps> = ({
  savedHelperIds,
  maxDisplay = 3,
}) => {
  const savedHelpers = allHelpers.filter((h) => savedHelperIds.includes(h.id));
  const displayHelpers = savedHelpers.slice(0, maxDisplay);
  const remainingCount = savedHelpers.length - maxDisplay;

  if (savedHelpers.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-slate-700/50 dark:bg-slate-800/50">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Saved Helpers</h2>
        <div className="mt-4 flex flex-col items-center justify-center py-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-700">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">No saved helpers yet</p>
          <Link
            to="/connect"
            className="mt-3 text-sm font-semibold text-solara-blue hover:underline dark:text-solara-sky"
          >
            Browse helpers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-slate-700/50 dark:bg-slate-800/50">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Saved Helpers</h2>
        <Link
          to="/connect?filter=saved"
          className="text-sm font-medium text-solara-blue hover:underline dark:text-solara-sky"
        >
          View all ({savedHelpers.length})
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {displayHelpers.map((helper) => (
          <HelperPreviewCard key={helper.id} helper={helper} />
        ))}
      </div>

      {remainingCount > 0 && (
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          +{remainingCount} more saved
        </p>
      )}
    </div>
  );
};

const HelperPreviewCard: React.FC<{ helper: Helper }> = ({ helper }) => {
  const availabilityColors = {
    available: "bg-emerald-500",
    limited: "bg-amber-500",
    unavailable: "bg-slate-400",
  };

  return (
    <Link
      to={`/profile/${helper.id}`}
      className="flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white/60 p-3 transition hover:border-solara-blue/30 hover:bg-white dark:border-slate-600/50 dark:bg-slate-700/50 dark:hover:border-solara-blue/40 dark:hover:bg-slate-700"
    >
      <div className="relative">
        {helper.avatar ? (
          <img
            src={helper.avatar}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-solara-blue to-solara-navy text-sm font-bold text-white">
            {helper.name.charAt(0)}
          </div>
        )}
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-700 ${availabilityColors[helper.availabilityStatus]}`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {helper.name}
          </span>
          {helper.verified && (
            <svg className="h-4 w-4 flex-shrink-0 text-solara-blue" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
          {helper.skills.slice(0, 2).join(", ")}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs">
        <svg className="h-3.5 w-3.5 text-solara-gold" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="font-medium text-slate-700 dark:text-slate-300">{helper.rating}</span>
      </div>
    </Link>
  );
};

export default SavedHelpersPreview;
