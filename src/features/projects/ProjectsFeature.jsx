import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { guides } from "@/data/learnContent";
import SectionContainer from "@/components/ui/section-container";
import ProjectMapLazy from "@/components/ui/ProjectMapLazy";
import { statusBadgeClass } from "@/components/ui/MapPin";
import { recommendGuidesForProject } from "@/lib/recommendGuides";
import TrustSafetyStrip from "@/components/connect/TrustSafetyStrip";
import HelperFilters from "@/components/connect/HelperFilters";
import HelperCard from "@/components/connect/HelperCard";
import HelperProfileDrawer from "@/components/connect/HelperProfileDrawer";
import SketchNote from "@/components/ui/SketchNote";
import ProjectsHeader from "./components/ProjectsHeader";
import { useProjectsHelperOverlay } from "./hooks/useProjectsHelperOverlay";

const ProjectsFeature = () => {
  const navigate = useNavigate();
  const {
    featuredHelpers,
    overlayOpen,
    setOverlayOpen,
    filters,
    setFilters,
    selectedSkill,
    setSelectedSkill,
    sortBy,
    setSortBy,
    profile,
    setProfile,
    savedHelpers,
    toggleSavedHelper,
    skillPool,
    filteredHelpers,
  } = useProjectsHelperOverlay();

  return (
    <div className="relative min-h-screen overflow-hidden py-12 text-slate-900 dark:text-white">
      <SectionContainer className="relative space-y-8">
        <ProjectsHeader />

        <div className="space-y-8">
          <ProjectMapLazy
            projects={projects}
            onSelect={(id) => {
              navigate(`/projects/${id}`);
            }}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, idx) => {
              const volunteerPercent = Math.min(100, Math.round((project.currentVolunteers / project.goalVolunteers) * 100));
              const recs = recommendGuidesForProject(project).map((slug) => guides.find((guide) => guide.slug === slug)).filter(Boolean);
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur text-slate-900 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(0,123,255,0.06),transparent_35%)]" />
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <p className="text-sm text-slate-700 dark:text-slate-200">{project.shortDescription}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ${statusBadgeClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 21a8 8 0 0 1-8-8c0-4 3-7 8-7s8 3 8 7a8 8 0 0 1-8 8Z" />
                      <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    </svg>
                    {project.location}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-slate-800 dark:text-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 font-semibold shadow-sm dark:border-white/10 dark:bg-white/10">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path d="M5 12.5 9.5 17 19 7.5" />
                        </svg>
                        {project.currentVolunteers}/{project.goalVolunteers} volunteers
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-solara-blue dark:text-solara-gold">{volunteerPercent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/70 dark:bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-solara-blue to-solara-gold" style={{ width: `${volunteerPercent}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-800 dark:text-slate-200">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 font-semibold shadow-sm dark:border-white/10 dark:bg-white/10">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M5 12.5 9.5 17 19 7.5" />
                      </svg>
                      {project.goalFunding
                        ? `GBP ${project.currentFunding?.toLocaleString() || 0} / GBP ${project.goalFunding.toLocaleString()}`
                        : "Community-led"}
                    </span>
                    <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-solara-blue to-solara-gold px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
                    >
                      Open workspace
                    </button>
                  </div>

                  {recs.length > 0 && (
                    <div className="relative rounded-2xl border border-white/70 bg-white/80 p-3 text-sm text-slate-800 shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-solara-navy dark:text-indigo-200">Recommended guides</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {recs.map(
                          (guide) =>
                            guide && (
                              <Link
                                key={guide.slug}
                                to={`/learn/${guide.slug}`}
                                className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-solara-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                              >
                                {guide.title}
                              </Link>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          <div className="grid gap-6 rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Need hands-on help?</h2>
                <div className="flex items-center gap-2">
                  <SketchNote text="Try Connect" tone="mint" className="hidden sm:inline-flex" />
                  <Link
                    to="/connect"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-solara-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                  >
                    Open Connect
                  </Link>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200">Top available helpers you can invite into any workspace.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {featuredHelpers.map((helper) => (
                  <div
                    key={helper.id}
                    className="rounded-2xl border border-white/70 bg-white/80 p-4 text-slate-900 shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{helper.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{helper.level}</p>
                      </div>
                      <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                        {helper.availabilityStatus}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {helper.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-200">Rating {helper.rating.toFixed(1)}</span>
                      <Link
                        to={`/connect?requestHelp=1&helperId=${helper.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-solara-blue to-solara-gold px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
                      >
                        Request support
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <TrustSafetyStrip />
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 text-sm text-slate-800 shadow-md backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white">
                <p className="font-semibold">How it works</p>
                <ul className="mt-2 space-y-1 text-sm list-disc list-inside text-slate-700 dark:text-slate-200">
                  <li>Pick a project workspace.</li>
                  <li>Invite helpers with the right level.</li>
                  <li>Track tasks and resources together.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setOverlayOpen(true)}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-solara-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  Browse all helpers
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {overlayOpen && (
              <div
                className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm px-4 py-10 overflow-y-auto overscroll-contain"
                onClick={() => setOverlayOpen(false)}
              >
                <div
                  onClick={(event) => event.stopPropagation()}
                  className="relative grid h-[90vh] min-h-[70vh] w-full max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#050a16]/95 lg:grid-cols-[0.3fr_1fr]"
                >
                  <button
                    type="button"
                    onClick={() => setOverlayOpen(false)}
                    className="absolute right-4 top-4 z-10 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                  >
                    Close
                  </button>
                  <div className="flex min-h-0 flex-col gap-4 overflow-y-auto border-b border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5 lg:border-b-0 lg:border-r">
                    <HelperFilters value={filters} onChange={setFilters} />
                    <div className="space-y-2 rounded-2xl border border-white/70 bg-white/80 p-3 text-sm font-semibold text-slate-800 shadow-md backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSkill("all")}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${selectedSkill === "all" ? "bg-gradient-to-r from-solara-blue to-solara-gold text-white shadow-md" : "border border-white/70 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"}`}
                        >
                          All
                        </button>
                        {skillPool.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => setSelectedSkill(skill)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${selectedSkill === skill ? "bg-gradient-to-r from-solara-blue to-solara-gold text-white shadow-md" : "border border-white/70 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"}`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 rounded-2xl border border-white/70 bg-white/80 p-3 text-sm font-semibold text-slate-800 shadow-md backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Sort</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          ["relevance", "Relevance"],
                          ["rating", "Rating"],
                          ["projects", "Projects"],
                          ["response", "Fast response"],
                        ].map(([key, label]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSortBy(key)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${sortBy === key ? "bg-gradient-to-r from-solara-blue to-solara-gold text-white shadow-md" : "border border-white/70 bg-white/80 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <TrustSafetyStrip />
                  </div>
                  <div className="relative flex min-h-0 flex-col overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white">
                      <span className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">{filteredHelpers.length} helpers</span>
                      <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">Browse & expand profiles</span>
                    </div>
                    <div className="grid flex-1 min-h-0 gap-4 overflow-y-auto p-4 md:grid-cols-1 xl:grid-cols-2">
                      {filteredHelpers.map((helper) => (
                        <HelperCard
                          key={helper.id}
                          helper={helper}
                          saved={savedHelpers.includes(helper.id)}
                          onSaveToggle={toggleSavedHelper}
                          onOpenProfile={(value) => setProfile(value)}
                          onRequest={(value) => {
                            setProfile(value);
                          }}
                        />
                      ))}
                      {filteredHelpers.length === 0 && (
                        <div className="col-span-full rounded-2xl border border-dashed border-slate-300/70 bg-white/80 p-8 text-center text-slate-600 shadow-md dark:border-slate-600/50 dark:bg-white/5 dark:text-slate-200">
                          No helpers match that filter yet. Try clearing search or another category.
                        </div>
                      )}
                    </div>
                  </div>
                  <HelperProfileDrawer
                    helper={profile}
                    open={Boolean(profile)}
                    onOpenChange={(open) => {
                      if (!open) setProfile(null);
                    }}
                    onRequest={(value) => setProfile(value)}
                  />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </SectionContainer>
    </div>
  );
};

export default ProjectsFeature;

