import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, Clock3, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
import PageFrame from "@/components/ui/page-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
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
import HelperAvatar from "../components/connect/HelperAvatar";

const responseRank = {
  "Under 8h": 0,
  "Under 12h": 1,
  "Same day": 2,
  "Under 18h": 3,
  "Under 24h": 4,
  "Within 1 day": 5,
  "1 day": 6,
  "24-48h": 7,
  "2-3 days": 8,
};

const deskPresets = [
  {
    id: "fast",
    icon: Search,
    label: "Fast response",
    body: "Available helpers sorted by reply speed first.",
  },
  {
    id: "certified",
    icon: ShieldCheck,
    label: "Certified lane",
    body: "Use when the work needs sign-off or regulated decisions.",
  },
  {
    id: "remote",
    icon: SlidersHorizontal,
    label: "Remote first",
    body: "Good when the job still needs a narrow second opinion.",
  },
];

const sortLabels = {
  relevance: "Relevance",
  rating: "Top rated",
  projects: "Most projects",
  response: "Fastest reply",
};

const screeningRules = [
  "Use priority cards as the first outreach list.",
  "Save helpers only after the ask is specific enough to send.",
  "If the work is regulated, move certified helpers to the front immediately.",
];

const rankResponse = (label = "") => responseRank[label] ?? 99;

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
  const directoryBadge = savedOnly ? "Saved shortlist" : "Helper desk";

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
      const searchText = filters.search.toLowerCase();
      const matchSearch =
        filters.search.trim().length === 0 ||
        helper.name.toLowerCase().includes(searchText) ||
        helper.bio.toLowerCase().includes(searchText) ||
        helper.skills.some((skill) => skill.toLowerCase().includes(searchText));
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
    if (sortBy === "response") return [...list].sort((a, b) => rankResponse(a.responseTimeLabel) - rankResponse(b.responseTimeLabel));
    return [...list].sort((a, b) => {
      const availabilityDelta = (a.availabilityStatus === "available" ? 0 : 1) - (b.availabilityStatus === "available" ? 0 : 1);
      if (availabilityDelta !== 0) return availabilityDelta;
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return b.rating - a.rating;
    });
  }, [filters, selectedSkill, sortBy, sourceHelpers]);

  const screeningRoster = useMemo(() => {
    const verified = filteredHelpers.filter((helper) => helper.verified).slice(0, 6);
    return verified.length > 0 ? verified : filteredHelpers.slice(0, 6);
  }, [filteredHelpers]);

  const screeningSnapshot = useMemo(
    () =>
      [...filteredHelpers]
        .sort((left, right) => {
          const responseDelta = rankResponse(left.responseTimeLabel) - rankResponse(right.responseTimeLabel);
          if (responseDelta !== 0) return responseDelta;
          if (left.verified !== right.verified) return left.verified ? -1 : 1;
          return right.rating - left.rating;
        })
        .slice(0, 4),
    [filteredHelpers],
  );

  const priorityMatches = filteredHelpers.slice(0, 3);
  const fullDirectory = filteredHelpers.slice(3);

  const activeFilters = useMemo(() => {
    const summary = [];
    if (filters.search.trim()) summary.push(filters.search.trim());
    if (filters.level !== "all") summary.push(`role ${filters.level}`);
    if (filters.availability !== "all") summary.push(filters.availability);
    if (filters.support !== "all") summary.push(filters.support === "visit" ? "on-site" : filters.support);
    if (filters.minRating > 0) summary.push(`${filters.minRating}+ rating`);
    if (selectedSkill !== "all") summary.push(selectedSkill);
    if (sortBy !== "relevance") summary.push(sortLabels[sortBy]);
    return summary;
  }, [filters, selectedSkill, sortBy]);

  const resetFilters = () => {
    setFilters({ search: "", level: "all", availability: "all", support: "all", minRating: 0 });
    setSelectedSkill("all");
    setSortBy("relevance");
  };

  const applyPreset = (presetId) => {
    if (presetId === "fast") {
      setFilters((current) => ({ ...current, availability: "available" }));
      setSortBy("response");
      return;
    }
    if (presetId === "certified") {
      setFilters((current) => ({ ...current, level: "certified" }));
      return;
    }
    if (presetId === "remote") {
      setFilters((current) => ({ ...current, support: "remote" }));
    }
  };

  const isPresetActive = (presetId) => {
    if (presetId === "fast") return filters.availability === "available" && sortBy === "response";
    if (presetId === "certified") return filters.level === "certified";
    if (presetId === "remote") return filters.support === "remote";
    return false;
  };

  const verifiedMatches = filteredHelpers.filter((helper) => helper.verified).length;
  const certifiedMatches = filteredHelpers.filter((helper) => helper.verified && helper.level === "certified").length;
  const remoteReadyCount = filteredHelpers.filter((helper) => helper.supportTypes.includes("remote")).length;
  const fastResponseCount = filteredHelpers.filter((helper) => rankResponse(helper.responseTimeLabel) <= 2).length;
  const savedVisibleCount = savedHelpers.filter((id) => filteredHelpers.some((helper) => helper.id === id)).length;

  return (
    <PageFrame family="product" width={isExpanded ? "full" : "wide"} density="compact">
      <PageReveal>
        <section className="solara-connect-desk-hero">
          <div className="solara-connect-desk-hero__intro">
            <p className="solara-connect-desk-hero__eyebrow">{directoryBadge}</p>
            <h1 className="solara-connect-desk-hero__title">
              {savedOnly ? "Use the shortlist you already trust and move faster." : "Run the screening pass here, not in your head."}
            </h1>
            <p className="solara-connect-desk-hero__body">
              {savedOnly
                ? "Saved helpers stay in one tight list so the next request does not start from zero again."
                : "This page is for triage. Narrow the field by role, support type, and response speed, then keep only the helpers you would actually contact."}
            </p>

            <div className="solara-connect-desk-hero__actions">
              <InlineAction to="/connect">Back to Connect</InlineAction>
              <button type="button" onClick={() => setRequestOpen(true)} className="solara-inline-action solara-inline-action--strong">
                Request support
              </button>
            </div>

            <div className="solara-connect-desk-hero__preset-grid">
              {deskPresets.map((preset) => {
                const Icon = preset.icon;
                const active = isPresetActive(preset.id);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset.id)}
                    className={`solara-connect-desk-hero__preset${active ? " is-active" : ""}`}
                  >
                    <span className="solara-connect-desk-hero__preset-icon">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="solara-connect-desk-hero__preset-copy">
                      <strong>{preset.label}</strong>
                      <span>{preset.body}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="solara-connect-desk-hero__board">
            <div className="solara-connect-desk-hero__board-head">
              <div>
                <p className="solara-connect-desk-hero__board-eyebrow">Current screening pass</p>
                <h2 className="solara-connect-desk-hero__board-title">{filteredHelpers.length} helpers still fit this screen.</h2>
              </div>
              <HelperRosterRibbon helpers={screeningRoster} note={`${screeningRoster.length} helpers in the current shortlist`} />
            </div>

            <div className="solara-connect-desk-hero__metrics">
              <article><span>Verified</span><strong>{verifiedMatches}</strong></article>
              <article><span>Certified</span><strong>{certifiedMatches}</strong></article>
              <article><span>Remote-ready</span><strong>{remoteReadyCount}</strong></article>
              <article><span>Fast reply</span><strong>{fastResponseCount}</strong></article>
            </div>

            <div className="solara-connect-desk-hero__stack">
              {activeFilters.length > 0 ? (
                activeFilters.map((item) => (
                  <span key={item} className="solara-connect-desk-hero__stack-chip">{item}</span>
                ))
              ) : (
                <span className="solara-connect-desk-hero__stack-empty">No active stack. You are screening the full roster.</span>
              )}
            </div>

            <div className="solara-connect-desk-hero__snapshot">
              {screeningSnapshot.map((helper) => (
                <article key={helper.id} className="solara-connect-desk-hero__snapshot-row">
                  <HelperAvatar name={helper.name} src={helper.avatar} className="solara-connect-desk-hero__snapshot-avatar" />
                  <div className="min-w-0 flex-1">
                    <p className="solara-connect-desk-hero__snapshot-name">{helper.name}</p>
                    <p className="solara-connect-desk-hero__snapshot-meta">{helper.skills[0]} / {helper.coarseLocationLabel}</p>
                  </div>
                  <div className="solara-connect-desk-hero__snapshot-proof">
                    <p>{helper.responseTimeLabel}</p>
                    <p>{helper.rating.toFixed(1)} rating</p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </PageReveal>

      <div className="solara-connect-desk-layout">
        <PageReveal delay={0.04}>
          <SurfacePanel variant="product" layout="rail" density="compact" className="solara-connect-desk-filter-rail lg:sticky lg:top-24 lg:self-start">
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
        </PageReveal>

        <PageReveal delay={0.08} className="solara-connect-desk-workspace">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonHelperRow key={`skeleton-${index}`} />
              ))}
            </div>
          ) : filteredHelpers.length === 0 ? (
            <SurfacePanel variant="product" layout="preview" density="compact" className="solara-route-card text-center text-sm text-[var(--solara-text-muted)]">
              {savedOnly
                ? "You do not have saved helpers in this view yet."
                : "Nothing fits the current stack. Clear part of the screen and widen it again."}
            </SurfacePanel>
          ) : (
            <>
              <SurfacePanel variant="product" layout="preview" density="compact" className="solara-connect-desk-toolbar">
                <div className="solara-route-card__header">
                  <p className="solara-route-card__eyebrow">Screening note</p>
                  <h2 className="solara-route-card__title">Keep the first list strict. The second list is only for near-matches.</h2>
                  <p className="solara-route-card__body">
                    This route works when the top section is small enough to act on. The rest of the roster is still useful, but it should not compete with the first outreach list.
                  </p>
                </div>

                <div className="solara-connect-desk-toolbar__meta">
                  <article><span>Matches</span><strong>{filteredHelpers.length}</strong></article>
                  <article><span>Saved</span><strong>{savedVisibleCount}</strong></article>
                  <article><span>Sort</span><strong>{sortLabels[sortBy]}</strong></article>
                </div>
              </SurfacePanel>

              <section className="solara-connect-desk-priority">
                <div className="solara-connect-desk-section__head">
                  <div>
                    <p className="solara-connect-desk-section__kicker">Priority outreach</p>
                    <h2 className="solara-connect-desk-section__title">Use these first if you are sending a request today.</h2>
                  </div>
                  <div className="solara-connect-desk-section__rules">
                    {screeningRules.map((rule) => (
                      <p key={rule}>{rule}</p>
                    ))}
                  </div>
                </div>

                <div className="solara-connect-desk-priority__stack">
                  {priorityMatches.map((helper, index) => (
                    <motion.div
                      key={helper.id}
                      initial={ecoModeEnabled ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: ecoModeEnabled ? 0 : Math.min(index * 0.04, 0.1), ease: [0.4, 0, 0.2, 1] }}
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
                <section className="solara-connect-desk-directory">
                  <div className="solara-connect-desk-section__head">
                    <div>
                      <p className="solara-connect-desk-section__kicker">Full roster</p>
                      <h2 className="solara-connect-desk-section__title">Everything else that still deserves a second look.</h2>
                    </div>
                  </div>

                  <div className="solara-connect-desk-directory__grid">
                    {fullDirectory.map((helper, index) => (
                      <motion.div
                        key={helper.id}
                        initial={ecoModeEnabled ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: ecoModeEnabled ? 0 : Math.min(index * 0.015, 0.12), ease: [0.4, 0, 0.2, 1] }}
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
