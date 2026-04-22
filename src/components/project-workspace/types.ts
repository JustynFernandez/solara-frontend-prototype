import type { GuideContent } from "@/data/learnContent";
import type { Project, ProjectTask } from "@/data/projects";
import type {
  BackendNotification,
  BackendNotificationPreference,
  BackendProjectDashboard,
} from "@/lib/solaraApi";

export type WorkspaceTab = "overview" | "dashboard" | "tasks" | "people" | "resources" | "updates" | "impact";

export type ProjectResourceState = {
  guideSlugs: string[];
  pinned: string[];
};

export type ProjectResourceMap = Record<string, ProjectResourceState>;

export type ProjectWorkspaceProps = {
  project: Project;
};

export type ProjectWorkspaceResourcesProps = {
  project: Project;
  projectResources: ProjectResourceState;
  recommendedGuides: GuideContent[];
  onOpenResourceCenter: () => void;
  onAddGuideToProject: (slug: string) => void;
  onAddGuideToTasks: (slug: string) => void;
  onTogglePin: (slug: string) => void;
};

export type ProjectWorkspaceResourcesModalProps = {
  open: boolean;
  onClose: () => void;
  resourceSearch: string;
  onResourceSearchChange: (value: string) => void;
  searchableGuides: GuideContent[];
  recommendedGuides: GuideContent[];
  project: Project;
  projectResources: ProjectResourceState;
  onAddGuideToProject: (slug: string) => void;
  onAddGuideToTasks: (slug: string) => void;
  onTogglePin: (slug: string) => void;
};

export type ProjectWorkspaceTasksProps = {
  tasks: ProjectTask[];
  onToggleTaskStatus: (id: string) => void;
};

export type ProjectWorkspaceDashboardProps = {
  project: Project;
  dashboardData: BackendProjectDashboard | null;
  dashboardLoading: boolean;
  dashboardError?: string | null;
  onRefreshDashboard: () => void;
};

export type ProjectWorkspaceUpdatesProps = {
  project: Project;
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
};
