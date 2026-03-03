import React, { useEffect, useMemo, useState } from "react";
import { guides, type Guide } from "@/data/guides";
import type { ProjectTaskStatus } from "@/data/projects";
import { recommendGuidesForProject } from "@/lib/recommendGuides";
import ProjectWorkspaceView from "./ProjectWorkspaceView";
import type { ProjectResourceMap, ProjectWorkspaceProps, WorkspaceTab } from "./types";

const RESOURCE_STORAGE_KEY = "solara.projectResources.v1";

const nextStatus: Record<ProjectTaskStatus, ProjectTaskStatus> = {
  todo: "in-progress",
  "in-progress": "done",
  done: "todo",
};

const ProjectWorkspaceContainer: React.FC<ProjectWorkspaceProps> = ({ project }) => {
  const [tasks, setTasks] = useState(project.tasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState<string | undefined>();
  const [tab, setTab] = useState<WorkspaceTab>("overview");
  const [resourceCenterOpen, setResourceCenterOpen] = useState(false);
  const [resourceSearch, setResourceSearch] = useState("");
  const [resources, setResources] = useState<ProjectResourceMap>(() => {
    const raw = localStorage.getItem(RESOURCE_STORAGE_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });

  const volunteerPercent = useMemo(
    () => Math.min(100, Math.round((project.currentVolunteers / project.goalVolunteers) * 100)),
    [project.currentVolunteers, project.goalVolunteers]
  );
  const fundingPercent = project.goalFunding ? Math.min(100, Math.round(((project.currentFunding || 0) / project.goalFunding) * 100)) : null;
  const impactKwh = project.impactEstimateKwhPerYear ? project.impactEstimateKwhPerYear.toLocaleString() : "N/A";
  const impactCO2 = project.impactEstimateTonsCO2PerYear ? project.impactEstimateTonsCO2PerYear.toFixed(1) : "N/A";

  const projectResources = resources[project.id] || { guideSlugs: [], pinned: [] };
  const recommendedGuides = useMemo(
    () =>
      recommendGuidesForProject(project)
        .map((slug) => guides.find((guide) => guide.slug === slug))
        .filter((guide): guide is Guide => Boolean(guide)),
    [project]
  );
  const searchableGuides = useMemo(
    () =>
      guides.filter((guide) => {
        if (!resourceSearch.trim()) return true;
        const query = resourceSearch.toLowerCase();
        return guide.title.toLowerCase().includes(query) || guide.tags.some((tag) => tag.toLowerCase().includes(query));
      }),
    [resourceSearch]
  );

  const saveResources = (next: ProjectResourceMap) => {
    setResources(next);
    localStorage.setItem(RESOURCE_STORAGE_KEY, JSON.stringify(next));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: nextStatus[task.status] } : task)));
  };

  const addGuideToProject = (slug: string) => {
    const next = {
      ...resources,
      [project.id]: { guideSlugs: Array.from(new Set([...(projectResources.guideSlugs || []), slug])), pinned: projectResources.pinned || [] },
    };
    saveResources(next);
  };

  const addGuideToTasks = (slug: string) => {
    const guide = guides.find((item) => item.slug === slug);
    if (!guide) return;
    setTasks((prev) => [...prev, { id: `guide-${slug}`, title: `Read guide: ${guide.title}`, status: "todo" }]);
  };

  const togglePin = (slug: string) => {
    const pinned = new Set(projectResources.pinned || []);
    if (pinned.has(slug)) {
      pinned.delete(slug);
    } else {
      pinned.add(slug);
    }
    const next = {
      ...resources,
      [project.id]: { guideSlugs: projectResources.guideSlugs || [], pinned: Array.from(pinned) },
    };
    saveResources(next);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (resourceCenterOpen) {
      root.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      root.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [resourceCenterOpen]);

  return (
    <ProjectWorkspaceView
      project={project}
      tab={tab}
      onTabChange={setTab}
      tasks={tasks}
      onToggleTaskStatus={toggleTaskStatus}
      volunteerPercent={volunteerPercent}
      fundingPercent={fundingPercent}
      impactKwh={impactKwh}
      impactCO2={impactCO2}
      dialogOpen={dialogOpen}
      onDialogOpenChange={setDialogOpen}
      dialogContext={dialogContext}
      recommendedGuides={recommendedGuides}
      searchableGuides={searchableGuides}
      projectResources={projectResources}
      resourceCenterOpen={resourceCenterOpen}
      onOpenResourceCenter={() => setResourceCenterOpen(true)}
      onCloseResourceCenter={() => setResourceCenterOpen(false)}
      resourceSearch={resourceSearch}
      onResourceSearchChange={setResourceSearch}
      onAddGuideToProject={addGuideToProject}
      onAddGuideToTasks={addGuideToTasks}
      onTogglePin={togglePin}
      onPledgeHelp={() => {
        setDialogContext(`Pledge to help on ${project.name}`);
        setDialogOpen(true);
      }}
      onRequestHelpWithContext={() => {
        setDialogContext(`Request support for ${project.name}`);
        setDialogOpen(true);
      }}
      onRequestHelp={() => setDialogOpen(true)}
    />
  );
};

export default ProjectWorkspaceContainer;

