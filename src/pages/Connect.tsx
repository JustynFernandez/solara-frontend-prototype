import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import SectionContainer from "../components/ui/section-container";
import { useEcoMode } from "../hooks/useEcoMode";
import { helpers as helperData, Helper } from "../data/helpers";
import ConnectHero from "../components/connect/ConnectHero";
import TrustSafetyStrip from "../components/connect/TrustSafetyStrip";
import HelperFilters, { HelperFilterState } from "../components/connect/HelperFilters";
import HelperCard from "../components/connect/HelperCard";
import SkeletonHelperCard from "../components/connect/SkeletonHelperCard";
import HelperProfileDrawer from "../components/connect/HelperProfileDrawer";
import MatchingHowItWorks from "../components/connect/MatchingHowItWorks";
import ConnectFAQ from "../components/connect/ConnectFAQ";
import RequestHelpDialog from "../components/shared/RequestHelpDialog";
import { useSavedHelpersStore } from "../store/useSavedHelpersStore";

const Connect: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchFromQuery = searchParams.get("search") || "";
  const helperIdFromQuery = searchParams.get("helperId");
  const requestFromQuery = searchParams.get("requestHelp") === "1";
  const savedOnly = searchParams.get("filter") === "saved";
  const { ecoModeEnabled } = useEcoMode();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<HelperFilterState>(() => ({
    search: searchFromQuery,
    level: "all",
    availability: "all",
    support: "all",
    minRating: 0,
  }));
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"relevance" | "rating" | "projects" | "response">("relevance");
  const [profile, setProfile] = useState<Helper | null>(null);
  const savedHelpers = useSavedHelpersStore((state) => state.savedHelpers);
  const toggleSavedHelper = useSavedHelpersStore((state) => state.toggleSavedHelper);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestContext, setRequestContext] = useState<{ helper?: Helper }>({});
  const isExpanded = searchParams.get("view") === "full";
  const directoryBadge = savedOnly ? "Saved helpers" : "Expanded directory";

  const sourceHelpers = useMemo(
    () => (savedOnly ? helperData.filter((helper) => savedHelpers.includes(helper.id)) : helperData),
    [savedOnly, savedHelpers]
  );

  // Simulate initial data loading for better perceived performance
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (helperIdFromQuery) {
      const matchedHelper = helperData.find((helper) => helper.id === helperIdFromQuery);
      if (matchedHelper) {
        setProfile(matchedHelper);
        if (requestFromQuery) {
          setRequestContext({ helper: matchedHelper });
          setRequestOpen(true);
        }
        return;
      }
    }

    if (requestFromQuery) {
      setRequestContext({});
      setRequestOpen(true);
    }
  }, [helperIdFromQuery, isLoading, requestFromQuery]);

  const skillPool = useMemo(() => {
    const all = sourceHelpers.flatMap((h) => h.skills);
    return Array.from(new Set(all)).slice(0, 12);
  }, [sourceHelpers]);

  const filteredHelpers = useMemo(() => {
    const list = sourceHelpers.filter((helper) => {
      const matchSearch =
        filters.search.trim().length === 0 ||
        helper.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        helper.skills.some((s) => s.toLowerCase().includes(filters.search.toLowerCase()));
      const matchLevel = filters.level === "all" || helper.level === filters.level;
      const matchAvail = filters.availability === "all" || helper.availabilityStatus === filters.availability;
      const matchSupport = filters.support === "all" || helper.supportTypes.includes(filters.support as any);
      const matchRating = helper.rating >= filters.minRating;
      const matchSkill = selectedSkill === "all" || helper.skills.map((s) => s.toLowerCase()).includes(selectedSkill.toLowerCase());
      return matchSearch && matchLevel && matchAvail && matchSupport && matchRating && matchSkill;
    });

    if (sortBy === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "projects") return [...list].sort((a, b) => b.completedProjectsCount - a.completedProjectsCount);
    if (sortBy === "response") return [...list].sort((a, b) => a.responseTimeLabel.localeCompare(b.responseTimeLabel));
    return list;
  }, [filters, selectedSkill, sortBy, sourceHelpers]);

  return (
    <div className="relative min-h-screen overflow-hidden py-14 text-slate-900 dark:text-slate-50">
      <SectionContainer className={`relative space-y-10 ${isExpanded ? "max-w-none" : ""}`}>
        <div className="space-y-8">
          <ConnectHero
            search={filters.search}
            onSearchChange={(v) => setFilters({ ...filters, search: v })}
            onRequestSupport={() => {
              setRequestContext({});
              setRequestOpen(true);
            }}
          />
          <TrustSafetyStrip />
          <div className="grid gap-6 lg:grid-cols-[0.32fr_1fr]">
            <HelperFilters value={filters} onChange={setFilters} />
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/70 bg-white/85 px-3 py-2 text-xs font-semibold text-slate-800 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
                <span className="uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Skills</span>
                <button
                  type="button"
                  className={`rounded-full px-3 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${selectedSkill === "all" ? "bg-button-primary text-white shadow-md" : "border border-white/70 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"}`}
                  onClick={() => setSelectedSkill("all")}
                >
                  All
                </button>
                {skillPool.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className={`rounded-full px-3 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
                      selectedSkill === skill ? "bg-button-primary text-white shadow-md" : "border border-white/70 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm text-slate-800 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
                  <span>{filteredHelpers.length} helpers</span>
                  <span className="rounded-full border border-white/70 bg-white/80 px-2 py-1 text-[11px] font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                    {directoryBadge}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Sort</span>
                  {[
                    ["relevance", "Relevance"],
                    ["rating", "Rating"],
                    ["projects", "Projects"],
                    ["response", "Fast response"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSortBy(key as any)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
                        sortBy === key ? "bg-button-primary text-white shadow-md" : "border border-white/70 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`grid gap-4 ${isExpanded ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2"}`}>
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <SkeletonHelperCard key={`skeleton-${i}`} />
                    ))
                  : filteredHelpers.map((helper, idx) => (
                      <motion.div
                        key={helper.id}
                        initial={ecoModeEnabled ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: ecoModeEnabled ? 0 : idx * 0.05, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <HelperCard
                          helper={helper}
                          saved={savedHelpers.includes(helper.id)}
                          onSaveToggle={toggleSavedHelper}
                          onOpenProfile={(h) => setProfile(h)}
                          onRequest={(h) => {
                            setRequestContext({ helper: h });
                            setRequestOpen(true);
                          }}
                        />
                      </motion.div>
                    ))}
              </div>
              {!isLoading && filteredHelpers.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300/70 bg-white/80 p-8 text-center text-slate-600 shadow-md dark:border-slate-600/50 dark:bg-white/5 dark:text-slate-200">
                  {savedOnly
                    ? "You have no saved helpers yet. Save a profile to see it here."
                    : "No helpers match that filter yet. Try clearing search or another category."}
                </div>
              )}
            </div>
          </div>
        </div>
        <MatchingHowItWorks />
        <ConnectFAQ />
      </SectionContainer>
      <HelperProfileDrawer
        helper={profile}
        open={Boolean(profile)}
        onOpenChange={(open) => {
          if (!open) setProfile(null);
        }}
        onRequest={(h) => {
          setRequestContext({ helper: h });
          setRequestOpen(true);
        }}
      />
      <RequestHelpDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        helperId={requestContext.helper?.id}
        helperName={requestContext.helper?.name}
      />
    </div>
  );
};

export default Connect;
