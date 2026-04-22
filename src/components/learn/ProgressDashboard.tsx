import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  ChevronDown,
  Clock,
  Compass,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLearnStore } from "../../store/useLearnStore";
import { guides, paths } from "../../data/learnContent";

const statToneClass = {
  blue: "text-[var(--solara-accent-strong)]",
  gold: "text-[#b58d45]",
  emerald: "text-emerald-600 dark:text-emerald-400",
  muted: "text-[var(--solara-text-muted)]",
} as const;

const ProgressDashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { completedGuides, bookmarkedGuides, lastViewedGuide } = useLearnStore();

  const totalGuides = guides.length;
  const completedCount = completedGuides.length;
  const totalPaths = paths.length;

  const timeLearnedMins = useMemo(
    () =>
      guides
        .filter((guide) => completedGuides.includes(guide.slug))
        .reduce((sum, guide) => sum + guide.durationMins, 0),
    [completedGuides]
  );

  const lastGuide = lastViewedGuide ? guides.find((guide) => guide.slug === lastViewedGuide) : null;
  const bookmarkedDetails = useMemo(
    () => guides.filter((guide) => bookmarkedGuides.includes(guide.slug)).slice(0, 3),
    [bookmarkedGuides]
  );

  const starterGuide = guides[0];
  const starterPath = paths[0];
  const safetyGuide = guides.find((guide) => guide.safetyCritical) || guides[0];
  const hasProgress = completedCount > 0 || bookmarkedGuides.length > 0 || lastGuide;

  if (!hasProgress) {
    return (
      <div className="rounded-[1.65rem] border border-[var(--solara-rule)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,249,255,0.92))] p-5 shadow-[var(--solara-shadow-soft)]">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] text-[var(--solara-accent-strong)] shadow-[var(--solara-shadow-soft)]">
            <Compass className="h-5 w-5" />
          </span>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]">
              Orientation board
            </p>
            <h3 className="text-[1.45rem] font-semibold leading-tight text-[var(--solara-text-strong)]">
              Start with one route, not the whole library.
            </h3>
            <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
              Pick a first guide, save one path, then let your own progress replace this starter board.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <StarterStat icon={<BookOpen className="h-4 w-4" />} label="First guide" value={`${starterGuide.durationMins} min`} />
          <StarterStat icon={<Route className="h-4 w-4" />} label="Starter path" value={starterPath.pillar} />
          <StarterStat icon={<ShieldCheck className="h-4 w-4" />} label="Safety check" value={safetyGuide.difficulty} />
        </div>

        <div className="mt-5 space-y-3">
          <StarterCard
            eyebrow="Quick start"
            title={starterGuide.title}
            body={starterGuide.summary}
            meta={`${starterGuide.pillar} / ${starterGuide.durationMins} min`}
            icon={<Sparkles className="h-4 w-4" />}
            to={`/learn/${starterGuide.slug}`}
            cta="Read first guide"
          />
          <StarterCard
            eyebrow="Recommended path"
            title={starterPath.title}
            body={starterPath.summary}
            meta={`${starterPath.pillar} / ${starterPath.durationMins} min`}
            icon={<Route className="h-4 w-4" />}
            href="#paths"
            cta="Open learning paths"
          />
          <StarterCard
            eyebrow="Safety first"
            title={safetyGuide.title}
            body="Keep one safety-critical guide close before you commit to wiring, climbing, or live equipment work."
            meta={`${safetyGuide.format} / ${safetyGuide.durationMins} min`}
            icon={<ShieldCheck className="h-4 w-4" />}
            to={`/learn/${safetyGuide.slug}`}
            cta="Open safety guide"
          />
        </div>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-text-muted)]">
          Saved guides, completed counts, and resume actions will appear here once you start.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.65rem] border border-[var(--solara-rule)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,249,255,0.92))] shadow-[var(--solara-shadow-soft)]">
      <button
        type="button"
        onClick={() => setIsExpanded((current) => !current)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[var(--solara-surface-2)]/70"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] text-[var(--solara-accent-strong)] shadow-[var(--solara-shadow-soft)]">
            <BookOpen className="h-5 w-5" />
          </span>
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
              Personal board
            </p>
            <h3 className="text-lg font-semibold text-[var(--solara-text-strong)]">Your progress</h3>
            <p className="text-sm text-[var(--solara-text-muted)]">
              {completedCount} of {totalGuides} guides completed
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-[var(--solara-text-muted)] transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      {isExpanded ? (
        <div className="border-t border-[var(--solara-rule)] px-5 py-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon={<BookOpen className="h-4 w-4" />} value={`${completedCount}/${totalGuides}`} label="Guides" tone="blue" />
            <StatCard icon={<Route className="h-4 w-4" />} value={`0/${totalPaths}`} label="Paths" tone="gold" />
            <StatCard icon={<Clock className="h-4 w-4" />} value={`${timeLearnedMins}m`} label="Learned" tone="emerald" />
            <StatCard icon={<Bookmark className="h-4 w-4" />} value={bookmarkedGuides.length.toString()} label="Saved" tone="muted" />
          </div>

          {lastGuide ? (
            <div className="mt-4 rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 shadow-[var(--solara-shadow-soft)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                Continue learning
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-0.5">
                  <p className="font-semibold text-[var(--solara-text-strong)]">{lastGuide.title}</p>
                  <p className="text-sm text-[var(--solara-text-muted)]">
                    {lastGuide.pillar} / {lastGuide.durationMins} min
                  </p>
                </div>
                <Link to={`/learn/${lastGuide.slug}`} className="solara-inline-action solara-inline-action--strong inline-flex items-center gap-2">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : null}

          {bookmarkedDetails.length > 0 ? (
            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                Saved guides
              </p>
              <div className="flex flex-wrap gap-2">
                {bookmarkedDetails.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/learn/${guide.slug}`}
                    className="inline-flex items-center gap-2 rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-1.5 text-sm font-medium text-[var(--solara-text-strong)] transition-colors hover:border-[var(--solara-accent)]"
                  >
                    <Bookmark className="h-3.5 w-3.5 text-[var(--solara-accent-strong)]" />
                    {guide.title}
                  </Link>
                ))}
                {bookmarkedGuides.length > 3 ? (
                  <span className="inline-flex items-center rounded-[1rem] px-3 py-1.5 text-sm text-[var(--solara-text-muted)]">
                    +{bookmarkedGuides.length - 3} more
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

type StarterStatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const StarterStat: React.FC<StarterStatProps> = ({ icon, label, value }) => (
  <div className="rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] px-4 py-3 shadow-[var(--solara-shadow-soft)]">
    <div className="mb-2 inline-flex items-center gap-2 text-[var(--solara-accent-strong)]">{icon}</div>
    <div className="text-base font-semibold text-[var(--solara-text-strong)]">{value}</div>
    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">{label}</div>
  </div>
);

type StarterCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
  icon: React.ReactNode;
  cta: string;
  to?: string;
  href?: string;
};

const StarterCard: React.FC<StarterCardProps> = ({ eyebrow, title, body, meta, icon, cta, to, href }) => {
  const actionClassName =
    "inline-flex items-center gap-2 text-sm font-semibold text-[var(--solara-accent-strong)] transition hover:text-[var(--solara-text-strong)]";

  return (
    <div className="rounded-[1.2rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] px-4 py-4 shadow-[var(--solara-shadow-soft)]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
            {eyebrow}
          </p>
          <h4 className="text-lg font-semibold leading-tight text-[var(--solara-text-strong)]">{title}</h4>
          <p className="text-sm leading-6 text-[var(--solara-text-muted)]">{body}</p>
        </div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-[0.9rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] text-[var(--solara-accent-strong)]">
          {icon}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--solara-rule)] pt-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">{meta}</span>
        {to ? (
          <Link to={to} className={actionClassName}>
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <a href={href} className={actionClassName}>
            {cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone: keyof typeof statToneClass;
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, tone }) => (
  <div className="rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] px-3 py-3 shadow-[var(--solara-shadow-soft)]">
    <div className={`mb-2 inline-flex items-center gap-1 ${statToneClass[tone]}`}>{icon}</div>
    <div className="text-xl font-semibold text-[var(--solara-text-strong)]">{value}</div>
    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">{label}</div>
  </div>
);

export default ProgressDashboard;
