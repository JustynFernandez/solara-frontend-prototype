import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, BookOpen, Route, Clock, Bookmark, ArrowRight } from "lucide-react";
import { useLearnStore } from "../../store/useLearnStore";
import { guides, paths } from "../../data/learnContent";

/**
 * Collapsible dashboard showing user's learning progress.
 */
const ProgressDashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { completedGuides, bookmarkedGuides, lastViewedGuide } = useLearnStore();

  // Calculate stats
  const totalGuides = guides.length;
  const completedCount = completedGuides.length;
  const totalPaths = paths.length;

  // Calculate time learned (sum of completed guide durations)
  const timeLearnedMins = useMemo(() => {
    return guides
      .filter((g) => completedGuides.includes(g.slug))
      .reduce((sum, g) => sum + g.durationMins, 0);
  }, [completedGuides]);

  // Get last viewed guide info
  const lastGuide = lastViewedGuide
    ? guides.find((g) => g.slug === lastViewedGuide)
    : null;

  // Get bookmarked guide details
  const bookmarkedDetails = useMemo(() => {
    return guides.filter((g) => bookmarkedGuides.includes(g.slug)).slice(0, 3);
  }, [bookmarkedGuides]);

  // If no progress at all, show minimal state
  const hasProgress = completedCount > 0 || bookmarkedGuides.length > 0 || lastGuide;

  if (!hasProgress) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-white/70 bg-white/85 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/50 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Your Progress</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {completedCount} of {totalGuides} guides completed
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform dark:text-slate-400 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-white/50 px-6 py-4 dark:border-white/10">
          {/* Stats grid */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              icon={<BookOpen className="h-4 w-4" />}
              value={`${completedCount}/${totalGuides}`}
              label="Guides"
              color="blue"
            />
            <StatCard
              icon={<Route className="h-4 w-4" />}
              value={`0/${totalPaths}`}
              label="Paths"
              color="gold"
            />
            <StatCard
              icon={<Clock className="h-4 w-4" />}
              value={`${timeLearnedMins}min`}
              label="Learned"
              color="emerald"
            />
            <StatCard
              icon={<Bookmark className="h-4 w-4" />}
              value={bookmarkedGuides.length.toString()}
              label="Bookmarked"
              color="purple"
            />
          </div>

          {/* Continue learning CTA */}
          {lastGuide && (
            <div className="mb-4 rounded-2xl border border-white/50 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
                Continue learning
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{lastGuide.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {lastGuide.pillar} · {lastGuide.durationMins} min
                  </p>
                </div>
                <Link
                  to={`/learn/${lastGuide.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-button-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Bookmarked guides quick access */}
          {bookmarkedDetails.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
                Bookmarked
              </p>
              <div className="flex flex-wrap gap-2">
                {bookmarkedDetails.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/learn/${guide.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                  >
                    <Bookmark className="h-3.5 w-3.5 text-solara-gold" />
                    {guide.title}
                  </Link>
                ))}
                {bookmarkedGuides.length > 3 && (
                  <span className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400">
                    +{bookmarkedGuides.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: "blue" | "gold" | "emerald" | "purple";
};

const colorStyles = {
  blue: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  gold: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  purple: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color }) => (
  <div className="rounded-xl border border-white/50 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
    <div className={`mb-1 inline-flex rounded-lg p-1.5 ${colorStyles[color]}`}>{icon}</div>
    <div className="text-xl font-bold text-slate-900 dark:text-white">{value}</div>
    <div className="text-xs text-slate-600 dark:text-slate-400">{label}</div>
  </div>
);

export default ProgressDashboard;
