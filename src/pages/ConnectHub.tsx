import React, { useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardPlus, Clock3, FolderKanban, ShieldCheck, Star, Users } from "lucide-react";
import SectionContainer from "../components/ui/section-container";
import TrustSafetyStrip from "../components/connect/TrustSafetyStrip";
import SketchNote from "../components/ui/SketchNote";
import { helpers as helperData } from "../data/helpers";
import { useEcoMode } from "../hooks/useEcoMode";

const quickNeeds = [
  {
    id: "helpers",
    title: "Find helpers",
    description: "Browse verified profiles by skill, location, and response time.",
    to: "/connect/helpers",
    icon: Users,
  },
  {
    id: "request",
    title: "Request support",
    description: "Post what you need and let helpers reach out with options.",
    to: "/request-help",
    icon: ClipboardPlus,
  },
  {
    id: "projects",
    title: "Join a project",
    description: "Contribute time or tools to active community solar builds.",
    to: "/projects",
    icon: FolderKanban,
  },
] as const;

const helperLevelLabel = {
  community: "Community volunteer",
  trained: "Trained volunteer",
  certified: "Certified installer",
} as const;

const legacyDirectoryParams = ["requestHelp", "helperId", "filter", "view", "search", "sort"];

const ConnectHub: React.FC = () => {
  const { ecoModeEnabled } = useEcoMode();
  const [searchParams] = useSearchParams();
  const [selectedNeed, setSelectedNeed] = useState<(typeof quickNeeds)[number]["id"]>(quickNeeds[0].id);
  const motionEnabled = !ecoModeEnabled;

  const shouldOpenDirectory = legacyDirectoryParams.some((param) => searchParams.has(param));
  const queryString = searchParams.toString();
  if (shouldOpenDirectory) {
    return <Navigate replace to={`/connect/helpers${queryString ? `?${queryString}` : ""}`} />;
  }

  const selectedAction = quickNeeds.find((need) => need.id === selectedNeed) || quickNeeds[0];
  const featuredHelpers = useMemo(
    () =>
      [...helperData]
        .filter((helper) => helper.verified)
        .sort((left, right) => right.rating - left.rating)
        .slice(0, 8),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden py-14 text-slate-900 dark:text-slate-50">
      <SectionContainer className="relative space-y-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionEnabled ? 0.4 : 0.2 }}
          className="relative overflow-hidden rounded-[30px] border border-white/70 bg-gradient-to-br from-white/90 via-[#eff5ff]/95 to-[#fdf6e9]/95 p-7 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-[#050a16]/90 dark:via-[#091429]/90 dark:to-[#101d34]/90 sm:p-9"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(0,123,255,0.14),transparent_36%),radial-gradient(circle_at_88%_8%,rgba(212,175,55,0.12),transparent_34%)]" />
          <div className="relative space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-solara-navy dark:text-indigo-200">Connect hub</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Choose your next step in one tap.
              </h1>
              <p className="max-w-2xl text-base text-slate-700 dark:text-slate-200 sm:text-lg">
                Start with helpers, post a support request, or join an active community project.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {quickNeeds.map((need) => {
                const Icon = need.icon;
                const isActive = selectedNeed === need.id;
                return (
                  <button
                    key={need.id}
                    type="button"
                    onClick={() => setSelectedNeed(need.id)}
                    className={`rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
                      isActive
                        ? "border-solara-blue/35 bg-white/90 shadow-md dark:border-solara-gold/35 dark:bg-white/10"
                        : "border-white/60 bg-white/75 hover:border-solara-blue/25 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
                    }`}
                  >
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-solara-blue/15 to-solara-gold/15 text-solara-navy dark:text-solara-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{need.title}</p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{need.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SketchNote text="Quick start" tone="gold" className="hidden sm:inline-flex" />
              <Link
                to={selectedAction.to}
                className="motion-arrow-shift inline-flex items-center gap-2 rounded-full bg-button-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
              >
                Continue to {selectedAction.title}
                <ArrowRight className="motion-arrow h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.header>

        <section className="grid gap-4 md:grid-cols-3">
          {quickNeeds.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.article
                key={action.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionEnabled ? 0.32 : 0.15, delay: motionEnabled ? index * 0.05 : 0 }}
                className="motion-purpose relative overflow-hidden rounded-3xl card-surface p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(0,123,255,0.12),transparent_36%)]" />
                <div className="relative space-y-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/85 text-solara-navy shadow-sm dark:bg-white/10 dark:text-solara-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{action.title}</h2>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{action.description}</p>
                  <Link
                    to={action.to}
                    className="motion-arrow-shift inline-flex items-center gap-2 text-sm font-semibold text-solara-navy transition hover:text-solara-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-emerald-200 dark:focus-visible:ring-offset-[#030713]"
                  >
                    Open
                    <ArrowRight className="motion-arrow h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </section>

        <TrustSafetyStrip />

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Featured helpers</p>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Top rated, currently active helpers</h2>
            </div>
            <Link
              to="/connect/helpers?view=full"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-solara-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              Browse full directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {featuredHelpers.map((helper) => (
              <article
                key={helper.id}
                className="min-w-[270px] snap-start rounded-3xl border border-white/70 bg-white/85 p-4 text-slate-900 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white sm:min-w-[290px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 overflow-hidden rounded-full border border-white/70 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/10">
                      {helper.avatar && (
                        <img src={helper.avatar} alt={`${helper.name} avatar`} className="h-full w-full object-cover" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{helper.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{helperLevelLabel[helper.level]}</p>
                    </div>
                  </div>
                  {helper.verified && <ShieldCheck className="h-4 w-4 text-solara-gold" aria-label="Verified helper" />}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-2 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
                    <Star className="h-3.5 w-3.5 text-solara-gold" />
                    {helper.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-2 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
                    <Clock3 className="h-3.5 w-3.5" />
                    {helper.responseTimeLabel}
                  </span>
                  <span className="rounded-full border border-white/70 bg-white/80 px-2 py-1 shadow-sm dark:border-white/10 dark:bg-white/10">
                    {helper.coarseLocationLabel}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {helper.skills.slice(0, 3).map((skill) => (
                    <span
                      key={`${helper.id}-${skill}`}
                      className="rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <Link
                    to={`/connect/helpers?helperId=${helper.id}`}
                    className="motion-arrow-shift inline-flex items-center gap-2 text-sm font-semibold text-solara-navy transition hover:text-solara-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-emerald-200 dark:focus-visible:ring-offset-[#030713]"
                  >
                    View helper
                    <ArrowRight className="motion-arrow h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </SectionContainer>
    </div>
  );
};

export default ConnectHub;
