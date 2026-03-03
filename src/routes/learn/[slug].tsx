import React from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { guides } from "../../data/learnContent";
import { Project, projects as defaultProjects } from "../../data/projects";
import SectionContainer from "../../components/ui/section-container";
import GuideDetailLayout from "../../components/ui/GuideDetailLayout";
import TrustSafetyStrip from "../../components/connect/TrustSafetyStrip";
import RequestHelpDialog from "../../components/shared/RequestHelpDialog";

type ProjectResources = Record<string, { guideSlugs: string[]; pinned: string[] }>;
type LearnProgress = Record<string, { scroll: number; updatedAt: number }>;

const LearnGuidePage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectIdFromQuery = searchParams.get("projectId");
  const guide = guides.find((g) => g.slug === slug);
  const [lastSlug, setLastSlug] = React.useState<string | null>(null);
  const [projectsList] = React.useState<Project[]>(() => {
    const raw = localStorage.getItem("solara.projects.v1");
    if (!raw) return defaultProjects;
    try {
      return JSON.parse(raw);
    } catch {
      return defaultProjects;
    }
  });
  const [resources, setResources] = React.useState<ProjectResources>(() => {
    const raw = localStorage.getItem("solara.projectResources.v1");
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });
  const [progress, setProgress] = React.useState<LearnProgress>(() => {
    const raw = localStorage.getItem("solara.learnProgress.v1");
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>(() => projectIdFromQuery || projectsList[0]?.id || "");
  const [addedProjectId, setAddedProjectId] = React.useState<string | null>(null);
  const [requestOpen, setRequestOpen] = React.useState(false);

  const renderShell = (content: React.ReactNode) => (
    <div className="relative isolate min-h-screen overflow-hidden px-6 py-12 text-slate-900 dark:text-white">
      <SectionContainer className="relative space-y-6">{content}</SectionContainer>
    </div>
  );

  React.useEffect(() => {
    const stored = localStorage.getItem("solara:learn:last-guide");
    if (stored) setLastSlug(stored);
  }, []);

  React.useEffect(() => {
    if (!slug) return;
    const entry = progress[slug];
    if (entry) {
      window.scrollTo({ top: entry.scroll, behavior: "auto" });
    }
  }, [slug]);

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

  const addGuideToProject = (targetProjectId: string) => {
    if (!slug || !targetProjectId) return;
    const current = resources[targetProjectId] || { guideSlugs: [], pinned: [] };
    const nextProject = { ...current, guideSlugs: Array.from(new Set([...(current.guideSlugs || []), slug])) };
    const next = { ...resources, [targetProjectId]: nextProject };
    setResources(next);
    setAddedProjectId(targetProjectId);
    localStorage.setItem("solara.projectResources.v1", JSON.stringify(next));
  };

  React.useEffect(() => {
    if (projectIdFromQuery && slug) {
      addGuideToProject(projectIdFromQuery);
    }
  }, [projectIdFromQuery, slug]);

  if (!guide) {
    return renderShell(
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Guide</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Guide not found</h1>
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-solara-navy shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          Back to Learn
        </Link>
      </div>
    );
  }

  const addedProject = addedProjectId ? projectsList.find((p) => p.id === addedProjectId) : null;
  const currentProject = selectedProjectId ? projectsList.find((p) => p.id === selectedProjectId) : null;

  return renderShell(
    <div className="space-y-5">
      {lastSlug && lastSlug === slug && (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy shadow-md backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-indigo-200">
          Continue where you left off
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm font-semibold text-solara-navy shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
        <span className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-solara-gold">Add to project</span>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="rounded-lg border border-white/70 bg-white/85 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
          aria-label="Select project to add this guide"
        >
          {projectsList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => addGuideToProject(selectedProjectId)}
          className="inline-flex items-center gap-2 rounded-full bg-button-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
        >
          Save to workspace
        </button>
        <button
          type="button"
          onClick={() => setRequestOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-solara-navy shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          Request support
        </button>
      </div>

      {projectIdFromQuery && (
        <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm text-slate-800 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
          Do this next in your workspace: <button type="button" onClick={() => navigate(`/projects/${projectIdFromQuery}`)} className="underline decoration-solara-gold decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue">open project</button>
        </div>
      )}

      {addedProject && (
        <div className="rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm text-solara-navy shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
          Added to {addedProject.name}. Head to the Resources tab to use it with your tasks.
        </div>
      )}

      <GuideDetailLayout guide={guide} />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3 rounded-2xl border border-white/70 bg-white/85 p-4 text-slate-900 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Workspace linkage</h3>
          <p className="text-sm text-slate-700 dark:text-slate-200">Keep this guide pinned in your workspace resources. Use "Add to tasks" from the Resources tab to make it actionable.</p>
          {currentProject && (
            <div className="rounded-xl border border-white/70 bg-white/85 p-3 text-sm text-slate-900 shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white">
              <p className="font-semibold">{currentProject.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-200/80">Status: {currentProject.status}</p>
            </div>
          )}
        </div>
        <TrustSafetyStrip />
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 text-sm font-semibold text-solara-navy shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-solara-navy shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          Open Project Workspaces
        </Link>
        <Link
          to="/connect?requestHelp=1"
          className="inline-flex items-center gap-2 rounded-full bg-button-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
        >
          Request Support
        </Link>
        <Link
          to="/solar-navigator"
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-solara-navy shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          Run Solar Navigator
        </Link>
      </div>

      <RequestHelpDialog open={requestOpen} onOpenChange={setRequestOpen} projectId={selectedProjectId || undefined} guideSlug={slug || undefined} context={guide.title} />
    </div>
  );
};

export default LearnGuidePage;
