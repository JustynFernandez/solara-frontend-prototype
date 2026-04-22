import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FolderKanban, HandHelping, MapPinned, ShieldCheck, Waves } from "lucide-react";
import { projects as fallbackProjects } from "@/data/projects";
import { guides } from "@/data/learnContent";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageIntro from "@/components/ui/page-intro";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import ProjectMapLazy from "@/components/ui/ProjectMapLazy";
import { statusBadgeClass } from "@/components/ui/MapPin";
import { recommendGuidesForProject } from "@/lib/recommendGuides";
import TrustSafetyStrip from "@/components/connect/TrustSafetyStrip";
import HelperFilters from "@/components/connect/HelperFilters";
import HelperCard from "@/components/connect/HelperCard";
import HelperProfileDrawer from "@/components/connect/HelperProfileDrawer";
import { useProjectsHelperOverlay } from "./hooks/useProjectsHelperOverlay";
import { fetchProjectCatalog } from "@/lib/solaraApi";

const overlaySteps = [
  "Pick the workspace with the clearest current need.",
  "Invite helpers by level, skills, and availability.",
  "Keep tasks, resources, and follow-up in the same thread.",
];

const ProjectsFeature = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState(fallbackProjects);
  const [projectsSource, setProjectsSource] = React.useState("mock");
  const [projectsError, setProjectsError] = React.useState(null);
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

  React.useEffect(() => {
    let active = true;

    fetchProjectCatalog()
      .then((backendProjects) => {
        if (!active || backendProjects.length === 0) return;
        setProjects(backendProjects);
        setProjectsSource("backend");
        setProjectsError(null);
      })
      .catch((error) => {
        if (!active) return;
        setProjects(fallbackProjects);
        setProjectsSource("mock");
        setProjectsError(error instanceof Error ? error.message : "Unable to load live project data.");
      });

    return () => {
      active = false;
    };
  }, []);

  const volunteerDemand = projects.reduce(
    (sum, project) => sum + Math.max(project.goalVolunteers - project.currentVolunteers, 0),
    0,
  );
  const activeCount = projects.filter((project) => project.status !== "Completed").length;
  const featuredProject = projects[0];
  const sourceMessage =
    projectsSource === "backend"
      ? "Live backend data connected for projects and workspace resources."
      : `Showing fallback project data while the backend is unavailable${projectsError ? `: ${projectsError}` : "."}`;

  return (
    <PageFrame family="product" width="wide" density="compact">
      <PageReveal mode="mount">
        <PageHeroStage
          family="product"
          className="solara-route-hero solara-route-hero--projects"
          eyebrow="Project board"
          title="Community builds, active workspaces, and the help they need next."
          body="Projects is the delivery layer. Review neighborhood builds, see where volunteer demand sits, and pull qualified help into work that is already moving."
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/connect/helpers" emphasis="strong">
                Browse helpers
              </InlineAction>
              <InlineAction to="/learn">Open guides</InlineAction>
            </div>
          }
          metrics={[
            { label: "Active workspaces", value: activeCount, meta: "Projects currently in motion" },
            { label: "Volunteer demand", value: volunteerDemand, meta: "Open volunteer slots across the board" },
            { label: "Guide handoff", value: guides.length, meta: "Learning links available from projects" },
          ]}
          preview={
            <PreviewFrame
              className="solara-route-preview solara-route-preview--projects"
              chromeLabel="Project board"
              eyebrow="Current project mix"
              title="See what is live before you open a workspace."
              body="Each workspace keeps status, volunteer demand, and guide handoffs visible so the board reads like a working system."
            >
              <div className="solara-project-preview-list">
                {projects.slice(0, 3).map((project) => (
                  <article key={project.id} className="solara-project-preview-list__item">
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.location}</p>
                    </div>
                    <span className={`rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ${statusBadgeClass(project.status)}`}>
                      {project.status}
                    </span>
                  </article>
                ))}
              </div>
            </PreviewFrame>
          }
        >
          {featuredProject ? (
            <div className="solara-route-notes solara-route-notes--projects">
              <article className="solara-route-note-card">
                <span className="solara-route-note-card__icon">
                  <FolderKanban className="h-4 w-4" />
                </span>
                <div>
                  <p className="solara-route-note-card__title">Featured workspace</p>
                  <p className="solara-route-note-card__body">
                    {featuredProject.name} in {featuredProject.location} is currently the lead project on the board.
                  </p>
                </div>
              </article>
              <article className="solara-route-note-card">
                <span className="solara-route-note-card__icon">
                  <HandHelping className="h-4 w-4" />
                </span>
                <div>
                  <p className="solara-route-note-card__title">Volunteer gap</p>
                  <p className="solara-route-note-card__body">
                    {Math.max(featuredProject.goalVolunteers - featuredProject.currentVolunteers, 0)} open spots on the current lead project.
                  </p>
                </div>
              </article>
            </div>
          ) : null}
        </PageHeroStage>
      </PageReveal>

      <div className="space-y-8">
        <PageReveal mode="in-view">
          <section className="solara-route-grid solara-route-grid--projects-top">
            <SurfacePanel variant="product" layout="preview" density="comfortable" className="solara-route-card">
              <div className="solara-route-card__header">
                <p className="solara-route-card__eyebrow">Data source</p>
                <h2 className="solara-route-card__title">
                  {projectsSource === "backend" ? "Live workspace feed" : "Fallback workspace feed"}
                </h2>
                <p className="solara-route-card__body">{sourceMessage}</p>
              </div>
              <div className="solara-project-feed-pill">{projectsSource}</div>
            </SurfacePanel>

            {featuredProject ? (
              <SurfacePanel variant="product" layout="preview" density="comfortable" className="solara-route-card solara-route-card--project-spotlight">
                <div className="solara-route-card__header">
                  <p className="solara-route-card__eyebrow">Lead workspace</p>
                  <h2 className="solara-route-card__title">{featuredProject.name}</h2>
                  <p className="solara-route-card__body">{featuredProject.shortDescription}</p>
                </div>
                <div className="solara-project-spotlight">
                  <div className="solara-project-spotlight__meta">
                    <span>{featuredProject.location}</span>
                    <span>{featuredProject.status}</span>
                  </div>
                  <button type="button" onClick={() => navigate(`/projects/${featuredProject.id}`)} className="solara-inline-action solara-inline-action--strong">
                    Open workspace
                  </button>
                </div>
              </SurfacePanel>
            ) : null}
          </section>
        </PageReveal>

        <PageReveal mode="in-view">
          <SurfacePanel variant="product" layout="preview" density="compact" className="solara-route-card">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <PageIntro
                variant="product"
                layout="preview"
                eyebrow="Project map"
                title="See active builds before choosing a workspace."
                body="Scan the board geographically, then open the workspace that already has momentum, need, or the strongest local fit."
                className="max-w-none"
              />
              <InlineAction to="/connect">Need people for a project?</InlineAction>
            </div>
            <ProjectMapLazy
              projects={projects}
              onSelect={(id) => {
                navigate(`/projects/${id}`);
              }}
            />
          </SurfacePanel>
        </PageReveal>

        <PageReveal mode="in-view">
          <>
            <PageIntro
              variant="product"
              layout="preview"
              eyebrow="Active workspaces"
              title="Review the strongest current matches before opening the full workspace."
              body="Each card surfaces volunteer demand, funding posture, and the most relevant guide handoff so the board reads like a working system instead of a static directory."
              className="max-w-none"
            />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, idx) => {
                const volunteerPercent = Math.min(
                  100,
                  Math.round((project.currentVolunteers / project.goalVolunteers) * 100),
                );
                const recs = recommendGuidesForProject(project)
                  .map((slug) => guides.find((guide) => guide.slug === slug))
                  .filter(Boolean);

                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`solara-project-card ${idx === 0 ? "solara-project-card--featured md:col-span-2 xl:col-span-2" : ""}`}
                  >
                    <div className="solara-project-card__head">
                      <div>
                        <h3>{project.name}</h3>
                        <p>{project.shortDescription}</p>
                      </div>
                      <span className={`rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ${statusBadgeClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="solara-project-card__location">
                      <MapPinned className="h-4 w-4" />
                      {project.location}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="solara-project-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="solara-project-card__meter">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 font-medium text-[var(--solara-text-strong)]">
                          <Waves className="h-4 w-4" />
                          {project.currentVolunteers}/{project.goalVolunteers} volunteers
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">
                          {volunteerPercent}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--solara-surface-2)]">
                        <div className="h-full rounded-full bg-[var(--solara-accent)]" style={{ width: `${volunteerPercent}%` }} />
                      </div>
                    </div>

                    <div className="solara-project-card__footer">
                      <span className="inline-flex items-center gap-2 font-medium text-[var(--solara-text-strong)]">
                        <ShieldCheck className="h-4 w-4" />
                        {project.goalFunding
                          ? `GBP ${project.currentFunding?.toLocaleString() || 0} / GBP ${project.goalFunding.toLocaleString()}`
                          : "Community-led"}
                      </span>
                      <button type="button" onClick={() => navigate(`/projects/${project.id}`)} className="solara-inline-action solara-inline-action--strong">
                        Open workspace
                      </button>
                    </div>

                    {recs.length > 0 ? (
                      <div className="solara-project-card__guides">
                        <p className="solara-project-card__guides-label">Recommended guides</p>
                        <div className="flex flex-wrap gap-2">
                          {recs.map(
                            (guide) =>
                              guide && (
                                <Link key={guide.slug} to={`/learn/${guide.slug}`} className="solara-inline-action solara-inline-action--quiet">
                                  {guide.title}
                                </Link>
                              ),
                          )}
                        </div>
                      </div>
                    ) : null}
                  </motion.article>
                );
              })}
            </div>
          </>
        </PageReveal>

        <PageReveal mode="in-view">
          <SurfacePanel as="section" variant="product" layout="split" density="comfortable" className="solara-route-card solara-route-card--project-support">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <PageIntro
                  variant="product"
                  layout="preview"
                  eyebrow="Helper handoff"
                  title="Need hands-on help?"
                  body="Top available helpers you can invite into any workspace without leaving the project flow."
                  className="max-w-none"
                />
                <InlineAction to="/connect">Open Connect</InlineAction>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {featuredHelpers.map((helper) => (
                  <div key={helper.id} className="solara-project-helper-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{helper.name}</p>
                        <p className="text-xs text-[var(--solara-text-muted)]">{helper.level}</p>
                      </div>
                      <span className="rounded-md border border-[var(--solara-rule-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                        {helper.availabilityStatus}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {helper.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="rounded-md border border-[var(--solara-rule-soft)] px-3 py-1 text-[11px] text-[var(--solara-text-muted)]">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-[var(--solara-text-muted)]">Rating {helper.rating.toFixed(1)}</span>
                      <Link to={`/connect?requestHelp=1&helperId=${helper.id}`} className="solara-inline-action solara-inline-action--default">
                        Request support
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <TrustSafetyStrip />
              <PreviewFrame
                chromeLabel="Helper invite flow"
                eyebrow="How it works"
                title="Move from workspace to support without breaking the thread."
                body="Pick a workspace, invite the right helper level, then keep tasks, resources, and follow-up together."
                actions={
                  <button type="button" onClick={() => setOverlayOpen(true)} className="solara-inline-action solara-inline-action--default">
                    Browse all helpers
                  </button>
                }
              >
                <div className="solara-route-flow">
                  {overlaySteps.map((step, index) => (
                    <div key={step} className="solara-route-flow__item">
                      <p className="solara-route-flow__index">0{index + 1}</p>
                      <p className="solara-route-flow__body">{step}</p>
                    </div>
                  ))}
                </div>
              </PreviewFrame>
            </div>
          </SurfacePanel>
        </PageReveal>
      </div>

      <AnimatePresence>
        {overlayOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/55 px-4 py-10 backdrop-blur-sm"
            onClick={() => setOverlayOpen(false)}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="solara-project-overlay"
            >
              <button
                type="button"
                onClick={() => setOverlayOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--solara-accent)]"
              >
                Close
              </button>

              <div className="solara-project-overlay__rail">
                <HelperFilters
                  value={filters}
                  onChange={setFilters}
                  skillPool={skillPool}
                  selectedSkill={selectedSkill}
                  onSelectedSkillChange={setSelectedSkill}
                  sortBy={sortBy}
                  onSortByChange={setSortBy}
                  activeSummary={[
                    selectedSkill !== "all" ? `Skill: ${selectedSkill}` : null,
                    sortBy !== "relevance" ? `Sort: ${sortBy}` : null,
                  ].filter(Boolean)}
                  onClear={() => {
                    setFilters({
                      search: "",
                      level: "all",
                      availability: "all",
                      support: "all",
                      minRating: 0,
                    });
                    setSelectedSkill("all");
                    setSortBy("relevance");
                  }}
                />

                <div className="space-y-2 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-3 text-sm font-semibold text-[var(--solara-text-strong)]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSkill("all")}
                      className={`solara-inline-action ${selectedSkill === "all" ? "solara-inline-action--strong" : "solara-inline-action--quiet"}`}
                    >
                      All
                    </button>
                    {skillPool.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => setSelectedSkill(skill)}
                        className={`solara-inline-action ${selectedSkill === skill ? "solara-inline-action--strong" : "solara-inline-action--quiet"}`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-3 text-sm font-semibold text-[var(--solara-text-strong)]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Sort</p>
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
                        className={`solara-inline-action ${sortBy === key ? "solara-inline-action--strong" : "solara-inline-action--quiet"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <TrustSafetyStrip />
              </div>

              <div className="solara-project-overlay__main">
                <div className="solara-project-overlay__header">
                  <span className="text-xs uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                    {filteredHelpers.length} helpers
                  </span>
                  <span className="rounded-md border border-[var(--solara-rule-soft)] px-3 py-1 text-[11px] font-semibold text-[var(--solara-text-muted)]">
                    Browse and expand profiles
                  </span>
                </div>

                <div className="solara-project-overlay__grid">
                  {filteredHelpers.map((helper) => (
                    <HelperCard
                      key={helper.id}
                      helper={helper}
                      saved={savedHelpers.includes(helper.id)}
                      onSaveToggle={toggleSavedHelper}
                      onOpenProfile={(value) => setProfile(value)}
                      onRequest={(value) => setProfile(value)}
                    />
                  ))}

                  {filteredHelpers.length === 0 ? (
                    <div className="col-span-full rounded-md border border-dashed border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-8 text-center text-[var(--solara-text-muted)]">
                      No helpers match that filter yet. Try clearing search or another category.
                    </div>
                  ) : null}
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
        ) : null}
      </AnimatePresence>
    </PageFrame>
  );
};

export default ProjectsFeature;
