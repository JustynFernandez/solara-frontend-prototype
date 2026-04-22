import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, Search, SlidersHorizontal, Star } from "lucide-react";
import PageFrame from "@/components/ui/page-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PreviewFrame from "@/components/ui/preview-frame";
import ActionRail from "@/components/ui/action-rail";
import PageReveal from "@/components/ui/page-reveal";
import { useEcoMode } from "../hooks/useEcoMode";
import { helpers as helperData } from "../data/helpers";
import HelperFilters from "../components/connect/HelperFilters";
import HelperDirectoryRow from "../components/connect/HelperDirectoryRow";
import SkeletonHelperRow from "../components/connect/SkeletonHelperRow";
import HelperProfileDrawer from "../components/connect/HelperProfileDrawer";
import RequestHelpDialog from "../components/shared/RequestHelpDialog";
import HelperRosterRibbon from "../components/connect/HelperRosterRibbon";
import { useSavedHelpersStore } from "../store/useSavedHelpersStore";

const deskNotes = [
  {
    icon: Search,
    title: "Search by problem, not by person",
    body: "Start with the job, then narrow toward the helpers who can actually move it.",
  },
  {
    icon: SlidersHorizontal,
    title: "Let the filter stack do the early work",
    body: "A smaller, cleaner shortlist is better than reading the whole roster.",
  },
  {
    icon: Bookmark,
    title: "Save strong candidates locally",
    body: "That gives you a recall loop when the request changes later.",
  },
];

const Connect = () => {
  const [searchParams] = useSearchParams();
  const searchFromQuery = searchParams.get("search") || "";
  const helperIdFromQuery = searchParams.get("helperId");
  const requestFromQuery = searchParams.get("requestHelp") === "1";
  const savedOnly = searchParams.get("filter") === "saved";
  const { ecoModeEnabled } = useEcoMode();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(() => ({
    search: searchFromQuery,
    level: "all",
    availability: "all",
    support: "all",
    minRating: 0,
  }));
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [profile, setProfile] = useState(null);
  const savedHelpers = useSavedHelpersStore((state) => state.savedHelpers);
  const toggleSavedHelper = useSavedHelpersStore((state) => state.toggleSavedHelper);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestContext, setRequestContext] = useState({});
  const isExpanded = searchParams.get("view") === "full";
  const directoryBadge = savedOnly ? "Saved helper desk" : "Helper desk";

  const sourceHelpers = useMemo(
    () => (savedOnly ? helperData.filter((helper) => savedHelpers.includes(helper.id)) : helperData),
    [savedOnly, savedHelpers],
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 280);
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
    const all = sourceHelpers.flatMap((helper) => helper.skills);
    return Array.from(new Set(all)).slice(0, 12);
  }, [sourceHelpers]);

  const filteredHelpers = useMemo(() => {
    const list = sourceHelpers.filter((helper) => {
      const matchSearch =
        filters.search.trim().length === 0 ||
        helper.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        helper.skills.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase()));
      const matchLevel = filters.level === "all" || helper.level === filters.level;
      const matchAvail = filters.availability === "all" || helper.availabilityStatus === filters.availability;
      const matchSupport = filters.support === "all" || helper.supportTypes.includes(filters.support);
      const matchRating = helper.rating >= filters.minRating;
      const matchSkill =
        selectedSkill === "all" || helper.skills.map((skill) => skill.toLowerCase()).includes(selectedSkill.toLowerCase());

      return matchSearch && matchLevel && matchAvail && matchSupport && matchRating && matchSkill;
    });

    if (sortBy === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "projects") return [...list].sort((a, b) => b.completedProjectsCount - a.completedProjectsCount);
    if (sortBy === "response") return [...list].sort((a, b) => a.responseTimeLabel.localeCompare(b.responseTimeLabel));
    return list;
  }, [filters, selectedSkill, sortBy, sourceHelpers]);

  const screeningRoster = useMemo(() => {
    const verified = filteredHelpers.filter((helper) => helper.verified).slice(0, 6);
    return verified.length > 0 ? verified : filteredHelpers.slice(0, 6);
  }, [filteredHelpers]);

  const priorityMatches = filteredHelpers.slice(0, 3);
  const fullDirectory = filteredHelpers.slice(3);

  const activeFilters = useMemo(() => {
    const summary = [];
    if (filters.search.trim()) summary.push(`Search: ${filters.search.trim()}`);
    if (filters.level !== "all") summary.push(`Role: ${filters.level}`);
    if (filters.availability !== "all") summary.push(`Availability: ${filters.availability}`);
    if (filters.support !== "all") summary.push(`Support: ${filters.support}`);
    if (filters.minRating > 0) summary.push(`Rating ${filters.minRating}+`);
    if (selectedSkill !== "all") summary.push(`Skill: ${selectedSkill}`);
    return summary;
  }, [filters, selectedSkill]);

  const resetFilters = () => {
    setFilters({ search: "", level: "all", availability: "all", support: "all", minRating: 0 });
    setSelectedSkill("all");
    setSortBy("relevance");
  };

  const verifiedMatches = filteredHelpers.filter((helper) => helper.verified).length;
  const savedMatches = filteredHelpers.filter((helper) => savedHelpers.includes(helper.id)).length;

  return (
    <PageFrame family="product" width={isExpanded ? "full" : "wide"} density="compact">
      <PageReveal>
        <PageHeroStage
          family="product"
          className="solara-route-hero solara-route-hero--desk"
          eyebrow={directoryBadge}
          title={`${filteredHelpers.length} helpers ready to review`}
          body="This desk is for narrowing the field fast. Filter hard, save strong options, and only open full profiles for the shortlist that still fits."
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/connect">Back to Connect</InlineAction>
              <button type="button" onClick={() => setRequestOpen(true)} className="solara-inline-action solara-inline-action--strong">
                Request support
              </button>
            </div>
          }
          preview={
            <PreviewFrame
              className="solara-route-preview solara-route-preview--desk"
              chromeLabel="Screening pass"
              eyebrow="Current shortlist"
              title="Start with the strongest current verified matches."
              body="If the shortlist feels thin, clear the stack before assuming the network cannot help."
            >
              <HelperRosterRibbon
                helpers={screeningRoster}
                note={`${screeningRoster.length} helpers currently in the screening ribbon`}
              />
            </PreviewFrame>
          }
          metrics={[
            { label: "Current matches", value: filteredHelpers.length, meta: savedOnly ? "Saved list only" : "Across the active directory" },
            { label: "Verified now", value: verifiedMatches, meta: "Trusted roles in this pass" },
            { label: "Saved matches", value: savedMatches, meta: "Already bookmarked locally" },
            {
              label: "Active filters",
              value: activeFilters.length,
              meta: activeFilters.length > 0 ? activeFilters.join(" / ") : "No active filter stack",
            },
          ]}
          rail={
            <ActionRail
              compact
              items={[
                {
                  eyebrow: "Licensed work",
                  title: "Check certification before anything else",
                  body: "Do not use availability as a substitute for the right role level when the task is regulated.",
                },
                {
                  eyebrow: "Saved view",
                  title: savedOnly ? "This desk is narrowed to saved helpers" : "Use saves to build a tighter recall loop",
                  body: savedOnly
                    ? "Switch back to the full desk any time without losing bookmarks."
                    : "Save strong candidates as you screen so later requests do not start from zero.",
                },
              ]}
            />
          }
        >
          <div className="solara-route-notes solara-route-notes--desk">
            {deskNotes.map((note) => {
              const Icon = note.icon;
              return (
                <article key={note.title} className="solara-route-note-card">
                  <span className="solara-route-note-card__icon">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="solara-route-note-card__title">{note.title}</p>
                    <p className="solara-route-note-card__body">{note.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </PageHeroStage>
      </PageReveal>

      <PageReveal delay={0.04}>
        <SurfacePanel variant="product" layout="split" density="compact" className="solara-route-card solara-route-card--desk">
          <div className="solara-route-card__header">
            <p className="solara-route-card__eyebrow">Desk controls</p>
            <h2 className="solara-route-card__title">Filter first, profile second.</h2>
            <p className="solara-route-card__body">
              Use the desk controls to trim the pass before you start reading every row in detail.
            </p>
          </div>

          <div className="solara-connect-directory__desk-summary">
            <HelperRosterRibbon helpers={screeningRoster} note={`${screeningRoster.length} helpers in the current pass`} />
          </div>

          <div className="solara-connect-directory__desk-controls">
            <label className="solara-connect-directory__field">
              <span className="solara-connect-directory__field-label">Skill</span>
              <select value={selectedSkill} onChange={(event) => setSelectedSkill(event.target.value)} className="solara-connect-directory__select">
                <option value="all">All skills</option>
                {skillPool.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </label>

            <label className="solara-connect-directory__field">
              <span className="solara-connect-directory__field-label">Sort</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="solara-connect-directory__select">
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="projects">Projects</option>
                <option value="response">Fast response</option>
              </select>
            </label>

            <div className="solara-connect-directory__desk-summaryline">
              <p className="solara-connect-directory__desk-summarylabel">Active filters</p>
              <p className="solara-connect-directory__desk-summarytext">
                {activeFilters.length > 0 ? activeFilters.join(" / ") : "No active filters. Showing the full current pass."}
              </p>
            </div>

            <button type="button" onClick={resetFilters} className="solara-inline-action solara-inline-action--default">
              Clear filters
            </button>
          </div>
        </SurfacePanel>
      </PageReveal>

      <div className="grid gap-5 lg:grid-cols-[0.32fr_1fr]">
        <SurfacePanel
          variant="product"
          layout="rail"
          density="compact"
          className="solara-connect-directory__filters solara-route-card lg:sticky lg:top-24 lg:self-start"
        >
          <HelperFilters
            value={filters}
            onChange={setFilters}
            skillPool={skillPool}
            selectedSkill={selectedSkill}
            onSelectedSkillChange={setSelectedSkill}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            activeSummary={activeFilters}
            savedOnly={savedOnly}
            onClear={resetFilters}
          />
        </SurfacePanel>

        <PageReveal delay={0.08} className="solara-connect-directory__results">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonHelperRow key={`skeleton-${index}`} />
              ))}
            </div>
          ) : filteredHelpers.length === 0 ? (
            <SurfacePanel variant="product" layout="preview" density="compact" className="solara-route-card text-center text-sm text-[var(--solara-text-muted)]">
              {savedOnly
                ? "You have no saved helpers yet. Save a profile to keep it here."
                : "No helpers match that filter yet. Clear part of the stack and widen the screen."}
            </SurfacePanel>
          ) : (
            <>
              <section className="solara-connect-directory__section">
                <div className="solara-connect-directory__section-heading">
                  <div>
                    <p className="solara-connect-directory__section-kicker">Priority matches</p>
                    <h2 className="solara-connect-directory__section-title">Start with the strongest fit in the current pass.</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {priorityMatches.map((helper, index) => (
                    <motion.div
                      key={helper.id}
                      initial={ecoModeEnabled ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: ecoModeEnabled ? 0 : Math.min(index * 0.02, 0.08), ease: [0.4, 0, 0.2, 1] }}
                    >
                      <HelperDirectoryRow
                        helper={helper}
                        variant="priority"
                        rank={index + 1}
                        saved={savedHelpers.includes(helper.id)}
                        onSaveToggle={toggleSavedHelper}
                        onOpenProfile={(value) => setProfile(value)}
                        onRequest={(value) => {
                          setRequestContext({ helper: value });
                          setRequestOpen(true);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>

              {fullDirectory.length > 0 ? (
                <section className="solara-connect-directory__section">
                  <div className="solara-connect-directory__section-heading">
                    <div>
                      <p className="solara-connect-directory__section-kicker">Full desk</p>
                      <h2 className="solara-connect-directory__section-title">Everything else that still fits the screen.</h2>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {fullDirectory.map((helper, index) => (
                      <motion.div
                        key={helper.id}
                        initial={ecoModeEnabled ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: ecoModeEnabled ? 0 : Math.min(index * 0.012, 0.12), ease: [0.4, 0, 0.2, 1] }}
                      >
                        <HelperDirectoryRow
                          helper={helper}
                          variant="standard"
                          saved={savedHelpers.includes(helper.id)}
                          onSaveToggle={toggleSavedHelper}
                          onOpenProfile={(value) => setProfile(value)}
                          onRequest={(value) => {
                            setRequestContext({ helper: value });
                            setRequestOpen(true);
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          )}
        </PageReveal>
      </div>

      <HelperProfileDrawer
        helper={profile}
        open={Boolean(profile)}
        onOpenChange={(open) => {
          if (!open) setProfile(null);
        }}
        onRequest={(helper) => {
          setRequestContext({ helper });
          setRequestOpen(true);
        }}
      />

      <RequestHelpDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        helperId={requestContext.helper?.id}
        helperName={requestContext.helper?.name}
      />
    </PageFrame>
  );
};

export default Connect;
