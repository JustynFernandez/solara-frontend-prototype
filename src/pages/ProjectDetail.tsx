import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects as fallbackProjects } from "../data/projects";
import PageFrame from "@/components/ui/page-frame";
import PageIntro from "@/components/ui/page-intro";
import ProjectWorkspace from "../components/ui/project-workspace";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PreviewFrame from "@/components/ui/preview-frame";
import ActionRail from "@/components/ui/action-rail";
import PageReveal from "@/components/ui/page-reveal";
import { fetchProjectDetail, getFallbackProject } from "@/lib/solaraApi";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const fallbackPreviewPanels = [
  "from-[#c8ddff] via-[#f5f8ff] to-[#fff3dc]",
  "from-[#d7f4e8] via-[#eef7ff] to-[#fff4de]",
];

function resolveRouteFallback(projectId?: string) {
  return (
    getFallbackProject(projectId) ||
    fallbackProjects.find((item) => String(item.id) === String(projectId))
  );
}

type ProjectPreviewImageProps = {
  src?: string;
  title: string;
};

const ProjectPreviewImage: React.FC<ProjectPreviewImageProps> = ({ src, title }) => {
  const [errored, setErrored] = React.useState(false);

  if (!src || errored) {
    return (
      <div className={`flex h-44 flex-col justify-between rounded-[1.15rem] border border-[var(--solara-rule)] bg-gradient-to-br ${fallbackPreviewPanels[0]} p-5`}>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
          Workspace snapshot
        </span>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-[var(--solara-text-strong)]">{title}</p>
          <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
            Live image unavailable. The workspace brief and task board remain intact.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.15rem] border border-[var(--solara-rule-soft)]">
      <img src={src} alt={title} className="h-44 w-full object-cover" loading="lazy" onError={() => setErrored(true)} />
    </div>
  );
};

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = React.useState(() => resolveRouteFallback(id));
  const [projectSource, setProjectSource] = React.useState(project?.source || "mock");
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(Boolean(id && /^\d+$/.test(id) && !project));

  React.useEffect(() => {
    if (!id) return;
    if (!/^\d+$/.test(id)) {
      setProject(resolveRouteFallback(id));
      setProjectSource("mock");
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);

    fetchProjectDetail(id)
      .then((detail) => {
        if (!active) return;
        setProject(detail);
        setProjectSource("backend");
        setLoadError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!active) return;
        const fallbackProject = resolveRouteFallback(id);
        setProject(fallbackProject);
        setProjectSource("mock");
        setLoadError(error instanceof Error ? error.message : "Unable to load the project detail.");
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <PageFrame family="product" width="default" density="compact" className="min-h-screen">
        <SurfacePanel variant="product" layout="split" density="comfortable" className="space-y-4">
          <PageIntro
            eyebrow="Project workspace"
            title="Loading workspace"
            body="Pulling the latest project detail and workspace activity into view."
            variant="product"
            layout="split"
          />
        </SurfacePanel>
      </PageFrame>
    );
  }

  if (!project) {
    return (
      <PageFrame family="product" width="default" density="compact" className="min-h-screen">
        <SurfacePanel variant="product" layout="split" density="comfortable" className="space-y-4">
          <PageIntro
            eyebrow="Project workspace"
            title="Project not found"
            body="The workspace you requested does not exist or is no longer available."
            variant="product"
            layout="split"
          />
          <button type="button" onClick={() => navigate("/projects")} className="solara-inline-action">
            Back to projects
          </button>
        </SurfacePanel>
      </PageFrame>
    );
  }

  const completedTasks = project.tasks.filter((task) => task.status === "done").length;
  const openTasks = project.tasks.length - completedTasks;
  const volunteerSummary = `${project.currentVolunteers}/${project.goalVolunteers}`;
  const fundingSummary =
    project.goalFunding && project.currentFunding != null
      ? `${gbpFormatter.format(project.currentFunding)} / ${gbpFormatter.format(project.goalFunding)}`
      : "Self-funded";
  const leadRoles = project.roles.slice(0, 3).map((role) => ({
    eyebrow: role.verified ? "Verified role" : "Team role",
    title: `${role.name} / ${role.userName}`,
    body: role.isHelper ? "This role is assigned to a helper account." : "This role is currently filled by a community member.",
  }));

  return (
    <PageFrame family="product" width="wide" density="compact" className="min-h-screen">
      <PageReveal>
        <PageHeroStage
          family="product"
          eyebrow="Project workspace"
          title={project.name}
          body={project.shortDescription}
          actions={
            <div className="flex flex-wrap gap-3">
              <InlineAction to="/projects">Back to projects</InlineAction>
              <InlineAction to="/connect" emphasis="default">
                Browse helpers
              </InlineAction>
            </div>
          }
          preview={
            <PreviewFrame
              chromeLabel="Workspace brief"
              eyebrow={project.status}
              title={project.location}
              body={project.fullDescription}
              footer={
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--solara-rule)] px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              }
            >
              <div className="space-y-3">
                <ProjectPreviewImage src={project.images[0]} title={project.name} />
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.tasks.slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      className="rounded-[1.05rem] border border-[var(--solara-rule-soft)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">{task.status}</p>
                      <p className="mt-2 font-medium text-[var(--solara-text-strong)]">{task.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </PreviewFrame>
          }
          metrics={[
            { label: "Status", value: project.status, meta: project.location },
            { label: "Volunteers", value: volunteerSummary, meta: "Current / target" },
            { label: "Open tasks", value: openTasks, meta: `${completedTasks} already closed` },
            {
              label: "Impact",
              value: project.impactEstimateKwhPerYear ? `${project.impactEstimateKwhPerYear.toLocaleString()} kWh` : "Pending",
              meta: project.impactEstimateTonsCO2PerYear ? `${project.impactEstimateTonsCO2PerYear} tCO2 / yr` : "Estimate not set",
            },
          ]}
          rail={<ActionRail compact items={[{ eyebrow: "Funding", title: fundingSummary, body: "Current funding posture for the workspace." }, ...leadRoles]} />}
        />
      </PageReveal>

      <PageReveal delay={0.06} className="space-y-4">
        {projectSource === "mock" && loadError ? (
          <SurfacePanel variant="product" layout="split" density="compact" className="space-y-2 text-sm text-[var(--solara-text-muted)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
              Local fallback workspace
            </p>
            <p>
              The browser could not reach the live project API, so this page is showing the local workspace version
              instead. {loadError}
            </p>
          </SurfacePanel>
        ) : null}
        <ProjectWorkspace project={project} />
      </PageReveal>
    </PageFrame>
  );
};

export default ProjectDetailPage;
