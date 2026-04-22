import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { guides } from "../../data/learnContent";
import { projects as defaultProjects } from "../../data/projects";
import PageFrame from "@/components/ui/page-frame";
import PageIntro from "@/components/ui/page-intro";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PreviewFrame from "@/components/ui/preview-frame";
import ActionRail from "@/components/ui/action-rail";
import PageReveal from "@/components/ui/page-reveal";
import GuideDetailLayout from "../../components/ui/GuideDetailLayout";
import RequestHelpDialog from "../../components/shared/RequestHelpDialog";
import { addProjectGuideResource, fetchProjectCatalog, isBackendProjectId } from "@/lib/solaraApi";

const LearnGuidePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectIdFromQuery = searchParams.get("projectId");
  const guide = guides.find((g) => g.slug === slug);
  const [projectsList, setProjectsList] = React.useState(() => {
    const raw = localStorage.getItem("solara.projects.v1");
    if (!raw) return defaultProjects;
    try {
      return JSON.parse(raw);
    } catch {
      return defaultProjects;
    }
  });
  const [resources, setResources] = React.useState(() => {
    const raw = localStorage.getItem("solara.projectResources.v1");
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });
  const [progress, setProgress] = React.useState(() => {
    const raw = localStorage.getItem("solara.learnProgress.v1");
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });
  const [selectedProjectId, setSelectedProjectId] = React.useState(() => projectIdFromQuery || projectsList[0]?.id || "");
  const [addedProjectId, setAddedProjectId] = React.useState(null);
  const [requestOpen, setRequestOpen] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    fetchProjectCatalog()
      .then((backendProjects) => {
        if (!active || backendProjects.length === 0) return;
        setProjectsList(backendProjects);
        setSelectedProjectId((current) => projectIdFromQuery || current || backendProjects[0]?.id || "");
      })
      .catch(() => {
        if (!active) return;
        setProjectsList((current) => current);
      });

    return () => {
      active = false;
    };
  }, [projectIdFromQuery]);

  React.useEffect(() => {
    if (!slug) return;
    const entry = progress[slug];
    if (entry) {
      window.scrollTo({ top: entry.scroll, behavior: "auto" });
    }
  }, [slug, progress]);

  React.useEffect(() => {
    if (!slug) return;
    const onScroll = () => {
      setProgress((prev) => {
        const next = { ...prev, [slug]: { scroll: window.scrollY, updatedAt: Date.now() } };
        localStorage.setItem("solara.learnProgress.v1", JSON.stringify(next));
        return next;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  const addGuideToProject = React.useCallback(
    async (targetProjectId) => {
      if (!slug || !targetProjectId) return;

      if (isBackendProjectId(targetProjectId)) {
        try {
          await addProjectGuideResource(Number(targetProjectId), slug);
          setAddedProjectId(targetProjectId);
          return;
        } catch {
          // Fall back to local storage so the learning flow still works offline.
        }
      }

      const current = resources[targetProjectId] || { guideSlugs: [], pinned: [] };
      const nextProject = {
        ...current,
        guideSlugs: Array.from(new Set([...(current.guideSlugs || []), slug])),
      };
      const next = { ...resources, [targetProjectId]: nextProject };

      setResources(next);
      setAddedProjectId(targetProjectId);
      localStorage.setItem("solara.projectResources.v1", JSON.stringify(next));
    },
    [resources, slug],
  );

  React.useEffect(() => {
    if (projectIdFromQuery && slug) {
      addGuideToProject(projectIdFromQuery);
    }
  }, [projectIdFromQuery, slug, addGuideToProject]);

  if (!guide) {
    return (
      <PageFrame family="guide" width="default" density="compact">
        <SurfacePanel variant="guide" density="comfortable" className="space-y-4">
          <PageIntro variant="quiet" eyebrow="Guide" title="Guide not found" body="The requested guide does not exist or has been removed." />
          <InlineAction to="/learn">Back to learn</InlineAction>
        </SurfacePanel>
      </PageFrame>
    );
  }

  const addedProject = addedProjectId ? projectsList.find((p) => p.id === addedProjectId) : null;
  const currentProject = selectedProjectId ? projectsList.find((p) => p.id === selectedProjectId) : null;

  return (
    <PageFrame family="guide" width="wide" density="compact">
      <PageReveal>
        <PageHeroStage
          family="guide"
          className="solara-route-hero solara-route-hero--guide"
          eyebrow="Guide dossier"
          title={guide.title}
          body={guide.summary}
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/learn">Back to learn</InlineAction>
              <InlineAction to="/solar-navigator" emphasis="strong">
                Run Navigator
              </InlineAction>
            </div>
          }
          preview={
            <PreviewFrame
              className="solara-route-preview solara-route-preview--guide"
              chromeLabel="Reading brief"
              eyebrow={`${guide.format} / ${guide.difficulty}`}
              title={`${guide.durationMins} minute guide`}
              body={
                guide.safetyCritical
                  ? "Safety-critical guidance. Pause and escalate when the risk picture changes."
                  : "Built to move from reading into concrete planning or workspace action."
              }
            >
              <div className="solara-route-list">
                {guide.takeaways.slice(0, 3).map((item) => (
                  <div key={item} className="solara-route-list__row">
                    {item}
                  </div>
                ))}
              </div>
            </PreviewFrame>
          }
          metrics={[
            { label: "Format", value: guide.format, meta: guide.pillar },
            { label: "Difficulty", value: guide.difficulty, meta: "Reading level" },
            { label: "Duration", value: `${guide.durationMins} min`, meta: "Estimated review time" },
            {
              label: "Published",
              value: guide.published || "Current",
              meta: guide.safetyCritical ? "Safety-critical" : "General guidance",
            },
          ]}
          rail={
            <ActionRail
              compact
              items={[
                {
                  eyebrow: "Save to workspace",
                  title: currentProject ? `Current workspace: ${currentProject.name}` : "Pick a workspace for this guide",
                  body: "Attach the guide to an active project so tasks, resources, and requests stay connected.",
                },
                {
                  eyebrow: "Next move",
                  title: projectIdFromQuery ? "Open the linked workspace after reading" : "Request support if you need another set of eyes",
                  body: projectIdFromQuery
                    ? "This guide was opened from a workspace flow, so the next handoff is already defined."
                    : "Turn the reading into a concrete request without leaving the same context.",
                  action: projectIdFromQuery ? (
                    <button type="button" onClick={() => navigate(`/projects/${projectIdFromQuery}`)} className="solara-inline-action solara-inline-action--default">
                      Open workspace
                    </button>
                  ) : (
                    <button type="button" onClick={() => setRequestOpen(true)} className="solara-inline-action solara-inline-action--default">
                      Request support
                    </button>
                  ),
                },
              ]}
            />
          }
        >
          <div className="solara-guide-savebar">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                Save to workspace
              </span>
              <select
                value={selectedProjectId}
                onChange={(event) => setSelectedProjectId(event.target.value)}
                className="rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-2 text-sm text-[var(--solara-text-strong)]"
                aria-label="Select project to add this guide"
              >
                {projectsList.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => addGuideToProject(selectedProjectId)} className="solara-inline-action solara-inline-action--strong">
                Save to workspace
              </button>
              <button type="button" onClick={() => setRequestOpen(true)} className="solara-inline-action solara-inline-action--default">
                Request support
              </button>
            </div>

            {projectIdFromQuery ? (
              <div className="text-sm text-[var(--solara-text-muted)]">
                Do this next in your workspace:{" "}
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${projectIdFromQuery}`)}
                  className="font-semibold text-[var(--solara-accent-strong)] underline decoration-[var(--solara-accent)] underline-offset-4"
                >
                  open project
                </button>
              </div>
            ) : null}

            {addedProject ? (
              <div className="text-sm text-[var(--solara-text-muted)]">
                Added to {addedProject.name}. Open the resources tab in that workspace to use it with tasks.
              </div>
            ) : null}
          </div>
        </PageHeroStage>
      </PageReveal>

      <PageReveal delay={0.06}>
        <GuideDetailLayout guide={guide} currentProject={currentProject} />
      </PageReveal>

      <RequestHelpDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        projectId={selectedProjectId || undefined}
        guideSlug={slug || undefined}
        context={guide.title}
      />
    </PageFrame>
  );
};

export default LearnGuidePage;
