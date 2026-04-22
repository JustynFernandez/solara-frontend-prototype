import React from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import RequestHelpDialog from "@/components/shared/RequestHelpDialog";
import type { GuideContent } from "@/data/learnContent";
import type { Project, ProjectTask } from "@/data/projects";
import ProjectWorkspaceHeader from "./ProjectWorkspaceHeader";
import ProjectWorkspaceDashboard from "./ProjectWorkspaceDashboard";
import ProjectWorkspaceTasks from "./ProjectWorkspaceTasks";
import ProjectWorkspaceRoles from "./ProjectWorkspaceRoles";
import ProjectWorkspaceResources, { ProjectWorkspaceResourcesModal } from "./ProjectWorkspaceResources";
import ProjectWorkspaceSidebar, { ProjectWorkspaceImpactCard } from "./ProjectWorkspaceSidebar";
import ProjectWorkspaceUpdates from "./ProjectWorkspaceUpdates";
import type { ProjectResourceState, WorkspaceTab } from "./types";
import type { BackendNotification, BackendNotificationPreference, BackendProjectDashboard } from "@/lib/solaraApi";

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
  resourceError?: string | null;
  dialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  dialogContext?: string;
  dashboardData: BackendProjectDashboard | null;
  dashboardLoading: boolean;
  dashboardError?: string | null;
  onRefreshDashboard: () => void;
  recommendedGuides: GuideContent[];
  searchableGuides: GuideContent[];
  projectResources: ProjectResourceState;
  notifications: BackendNotification[];
  notificationsLoading: boolean;
  notificationsError?: string | null;
  notificationPreferences: BackendNotificationPreference | null;
  preferencesLoading: boolean;
  preferencesError?: string | null;
  onRefreshNotifications: () => void;
  onToggleNotificationRead: (id: number, read: boolean) => void;
  onPreferenceChange: (
    key: "inAppEnabled" | "helpRequestsEnabled" | "projectResourcesEnabled" | "teamActivityEnabled",
    value: boolean
  ) => void;
  onSavePreferences: () => void;
  isSavingPreferences: boolean;
  preferenceDirty: boolean;
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
  onHelpRequestSubmitted: () => void;
};

const tabs: Array<{ key: WorkspaceTab; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "dashboard", label: "Dashboard" },
  { key: "tasks", label: "Tasks" },
  { key: "people", label: "People" },
  { key: "resources", label: "Resources" },
  { key: "updates", label: "Updates" },
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
  resourceError,
  dialogOpen,
  onDialogOpenChange,
  dialogContext,
  dashboardData,
  dashboardLoading,
  dashboardError,
  onRefreshDashboard,
  recommendedGuides,
  searchableGuides,
  projectResources,
  notifications,
  notificationsLoading,
  notificationsError,
  notificationPreferences,
  preferencesLoading,
  preferencesError,
  onRefreshNotifications,
  onToggleNotificationRead,
  onPreferenceChange,
  onSavePreferences,
  isSavingPreferences,
  preferenceDirty,
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
  onHelpRequestSubmitted,
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
        {tab === "dashboard" && (
          <ProjectWorkspaceDashboard
            project={project}
            dashboardData={dashboardData}
            dashboardLoading={dashboardLoading}
            dashboardError={dashboardError}
            onRefreshDashboard={onRefreshDashboard}
          />
        )}
        {tab === "people" && <ProjectWorkspaceRoles roles={project.roles} />}
        {resourceError ? (
          <div className="rounded-[18px] border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {resourceError}
          </div>
        ) : null}

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

        {tab === "updates" && (
          <ProjectWorkspaceUpdates
            project={project}
            notifications={notifications}
            notificationsLoading={notificationsLoading}
            notificationsError={notificationsError}
            notificationPreferences={notificationPreferences}
            preferencesLoading={preferencesLoading}
            preferencesError={preferencesError}
            onRefreshNotifications={onRefreshNotifications}
            onToggleNotificationRead={onToggleNotificationRead}
            onPreferenceChange={onPreferenceChange}
            onSavePreferences={onSavePreferences}
            isSavingPreferences={isSavingPreferences}
            preferenceDirty={preferenceDirty}
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

    <RequestHelpDialog
      open={dialogOpen}
      onOpenChange={onDialogOpenChange}
      projectId={project.backendId ? String(project.backendId) : undefined}
      context={dialogContext || project.name}
      onSubmitted={onHelpRequestSubmitted}
    />

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
