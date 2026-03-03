import type { Guide } from "@/data/guides";
import type { Project, ProjectTask } from "@/data/projects";

export type WorkspaceTab = "overview" | "tasks" | "people" | "resources" | "impact";

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
  recommendedGuides: Guide[];
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
  searchableGuides: Guide[];
  recommendedGuides: Guide[];
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

