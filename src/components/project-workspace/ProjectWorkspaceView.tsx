import React from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import RequestHelpDialog from "@/components/ui/request-help-dialog";
import type { Guide } from "@/data/guides";
import type { Project, ProjectTask } from "@/data/projects";
import ProjectWorkspaceHeader from "./ProjectWorkspaceHeader";
import ProjectWorkspaceTasks from "./ProjectWorkspaceTasks";
import ProjectWorkspaceRoles from "./ProjectWorkspaceRoles";
import ProjectWorkspaceResources, { ProjectWorkspaceResourcesModal } from "./ProjectWorkspaceResources";
import ProjectWorkspaceSidebar, { ProjectWorkspaceImpactCard } from "./ProjectWorkspaceSidebar";
import type { ProjectResourceState, WorkspaceTab } from "./types";

type ProjectWorkspaceViewProps = {
  project: Project;
  tab: WorkspaceTab;
  onTabChange: (tab: WorkspaceTab) => void;
  tasks: ProjectTask[];
  onToggleTaskStatus: (id: string) => void;
  volunteerPercent: number;
  fundingPercent: number | null;
  impactKwh: string;
  impactCO2: string;
  dialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  dialogContext?: string;
  recommendedGuides: Guide[];
  searchableGuides: Guide[];
  projectResources: ProjectResourceState;
  resourceCenterOpen: boolean;
  onOpenResourceCenter: () => void;
  onCloseResourceCenter: () => void;
  resourceSearch: string;
  onResourceSearchChange: (value: string) => void;
  onAddGuideToProject: (slug: string) => void;
  onAddGuideToTasks: (slug: string) => void;
  onTogglePin: (slug: string) => void;
  onPledgeHelp: () => void;
  onRequestHelpWithContext: () => void;
  onRequestHelp: () => void;
};

const tabs: Array<{ key: WorkspaceTab; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "tasks", label: "Tasks" },
  { key: "people", label: "People" },
  { key: "resources", label: "Resources" },
  { key: "impact", label: "Impact" },
];

const ProjectWorkspaceView: React.FC<ProjectWorkspaceViewProps> = ({
  project,
  tab,
  onTabChange,
  tasks,
  onToggleTaskStatus,
  volunteerPercent,
  fundingPercent,
  impactKwh,
  impactCO2,
  dialogOpen,
  onDialogOpenChange,
  dialogContext,
  recommendedGuides,
  searchableGuides,
  projectResources,
  resourceCenterOpen,
  onOpenResourceCenter,
  onCloseResourceCenter,
  resourceSearch,
  onResourceSearchChange,
  onAddGuideToProject,
  onAddGuideToTasks,
  onTogglePin,
  onPledgeHelp,
  onRequestHelpWithContext,
  onRequestHelp,
}) => (
  <div className="space-y-4">
    <div className="flex flex-wrap gap-2 rounded-2xl border border-white/20 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white">
      {tabs.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onTabChange(item.key)}
          aria-pressed={tab === item.key}
          className={`rounded-full px-3 py-1 transition ${tab === item.key ? "bg-[#003366] text-white" : "text-solara-navy dark:text-white"}`}
        >
          {item.label}
        </button>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-5">
        <ProjectWorkspaceHeader
          project={project}
          volunteerPercent={volunteerPercent}
          fundingPercent={fundingPercent}
          showOverviewStats={tab === "overview"}
          onPledgeHelp={onPledgeHelp}
          onRequestHelp={onRequestHelpWithContext}
          onOpenResourceCenter={onOpenResourceCenter}
        />

        {tab === "tasks" && <ProjectWorkspaceTasks tasks={tasks} onToggleTaskStatus={onToggleTaskStatus} />}
        {tab === "people" && <ProjectWorkspaceRoles roles={project.roles} />}

        {tab === "resources" && (
          <ProjectWorkspaceResources
            project={project}
            projectResources={projectResources}
            recommendedGuides={recommendedGuides}
            onOpenResourceCenter={onOpenResourceCenter}
            onAddGuideToProject={onAddGuideToProject}
            onAddGuideToTasks={onAddGuideToTasks}
            onTogglePin={onTogglePin}
          />
        )}

        {tab === "impact" && <ProjectWorkspaceImpactCard impactKwh={impactKwh} impactCO2={impactCO2} />}

        {tab === "overview" && (
          <section className="space-y-4 rounded-[20px] card-surface p-5">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Gallery</h3>
            <ImageGallery images={project.images} />
          </section>
        )}
      </div>

      <ProjectWorkspaceSidebar tab={tab} impactKwh={impactKwh} impactCO2={impactCO2} onRequestHelp={onRequestHelp} />
    </div>

    <RequestHelpDialog open={dialogOpen} onOpenChange={onDialogOpenChange} prefill={{ context: dialogContext || project.name }} />

    <ProjectWorkspaceResourcesModal
      open={resourceCenterOpen}
      onClose={onCloseResourceCenter}
      resourceSearch={resourceSearch}
      onResourceSearchChange={onResourceSearchChange}
      searchableGuides={searchableGuides}
      recommendedGuides={recommendedGuides}
      project={project}
      projectResources={projectResources}
      onAddGuideToProject={onAddGuideToProject}
      onAddGuideToTasks={onAddGuideToTasks}
      onTogglePin={onTogglePin}
    />
  </div>
);

export default ProjectWorkspaceView;

