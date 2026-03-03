import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type LearningProgressProps = {
  completedCount: number;
  bookmarkedCount: number;
  totalGuides?: number;
  lastViewedGuide?: string | null;
};

const LearningProgress: React.FC<LearningProgressProps> = ({
  completedCount,
  bookmarkedCount,
  totalGuides = 12,
  lastViewedGuide,
}) => {
  const progressPercent = Math.round((completedCount / totalGuides) * 100);

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-slate-700/50 dark:bg-slate-800/50">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Learning Progress</h2>
        <Link
          to="/learn"
          className="text-sm font-medium text-solara-blue hover:underline dark:text-solara-sky"
        >
          Browse guides
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">
            {completedCount} of {totalGuides} guides completed
          </span>
          <span className="font-semibold text-solara-blue dark:text-solara-sky">
            {progressPercent}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-solara-blue to-solara-sky"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-100/80 p-3 dark:bg-slate-700/50">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{completedCount}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Completed</p>
        </div>
        <div className="rounded-xl bg-slate-100/80 p-3 dark:bg-slate-700/50">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-solara-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{bookmarkedCount}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Bookmarked</p>
        </div>
      </div>

      {/* Continue learning CTA */}
      {lastViewedGuide && (
        <Link
          to={`/learn/${lastViewedGuide}`}
          className="mt-4 flex items-center justify-between rounded-xl border border-solara-blue/20 bg-solara-blue/5 p-3 transition hover:bg-solara-blue/10 dark:border-solara-blue/30 dark:bg-solara-blue/10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-solara-blue/20 text-solara-blue">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Continue learning
            </span>
          </div>
          <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      )}

      {!lastViewedGuide && completedCount === 0 && (
        <Link
          to="/learn"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-solara-blue to-solara-sky px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
        >
          Start Learning
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default LearningProgress;
