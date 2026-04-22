import { guides as learnGuides } from "@/data/learnContent";
import {
  projects as fallbackProjects,
  type Project,
  type ProjectGuideResource,
  type ProjectRole,
  type ProjectStatus,
} from "@/data/projects";

const CONFIGURED_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const API_BASE_URL = import.meta.env.DEV ? "" : CONFIGURED_API_BASE_URL;
const DEV_USER_ID = import.meta.env.VITE_DEV_USER_ID || "user-demo-1";

const DEFAULT_PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1509395280263-4f24f3160b68?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=1200&q=80",
];

const BACKEND_HELPER_NAME_MAP: Record<string, string> = {
  "ali admin": "admin-demo-1",
  "ava mensah": "user-demo-2",
  "elliot p": "user-demo-4",
  "elliot p.": "user-demo-4",
  "elliot park": "user-demo-4",
  "justyn demo": "user-demo-1",
  "lina patel": "user-demo-3",
};

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  meta?: PageMeta;
  requestId?: string;
  error?: {
    code?: string;
    message?: string;
    fieldErrors?: Array<{ field: string; message: string }>;
  };
};

export type PageMeta = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type BackendProjectStatus = "PLANNING" | "RECRUITING" | "IN_PROGRESS" | "COMPLETED" | "SCOPING";

type BackendProjectSummary = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  status: BackendProjectStatus;
  location: string;
  latitude: number;
  longitude: number;
  goalVolunteers: number | null;
  currentVolunteers: number | null;
  goalFunding: number | null;
  currentFunding: number | null;
  membershipCount: number | null;
  linkedGuideCount: number | null;
  openHelpRequestCount: number | null;
  tags: string[];
  createdByUserId: string;
  createdByName: string;
};

type BackendProjectOwner = {
  userId: string;
  name: string;
  role: string;
};

export type BackendProjectGuideResource = {
  id: number;
  guideId: number | null;
  guideSlug: string;
  guideTitle: string;
  pinned: boolean;
  addedByUserId: string;
  addedByName: string;
};

export type BackendProjectDashboardHelpRequest = {
  id: number;
  requesterName: string;
  whatNeeded: string;
  status: string;
  createdAt: string;
};

type BackendProjectDetail = BackendProjectSummary & {
  fullDescription: string;
  impactEstimateKwhPerYear: number | null;
  impactEstimateTonsCo2PerYear: number | null;
  owners: BackendProjectOwner[];
  resources: BackendProjectGuideResource[];
};

export type BackendProjectDashboard = {
  id: number;
  slug: string;
  name: string;
  status: BackendProjectStatus;
  membershipCount: number | null;
  linkedGuideCount: number | null;
  openHelpRequestCount: number | null;
  volunteerProgressPercent: number | null;
  fundingProgressPercent: number | string | null;
  owners: BackendProjectOwner[];
  recentResources: BackendProjectGuideResource[];
  recentHelpRequests: BackendProjectDashboardHelpRequest[];
  updatedAt: string;
};

type CreateHelpRequestPayload = {
  whatNeeded: string;
  whenNeeded: string;
  description: string;
  contactMethod: string;
  helperId?: string;
  projectId?: number;
  guideSlug?: string;
  context?: string;
};

export type BackendHelpRequest = {
  id: number;
  requesterUserId: string;
  requesterName: string;
  assignedHelperUserId?: string | null;
  assignedHelperName?: string | null;
  projectId?: number | null;
  projectName?: string | null;
  guideSlug?: string | null;
  guideTitle?: string | null;
  whatNeeded: string;
  whenNeeded: string;
  description: string;
  contactMethod: string;
  context?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type BackendNotification = {
  id: number;
  type: "HELP_REQUEST_CREATED" | "GUIDE_SAVED_TO_PROJECT" | "MEMBER_ADDED" | "TASK_UPDATED";
  title: string;
  message: string;
  actionUrl?: string | null;
  read: boolean;
  readAt?: string | null;
  createdAt: string;
  recipientUserId: string;
  actorUserId?: string | null;
  actorName?: string | null;
  projectId?: number | null;
  projectName?: string | null;
  helpRequestId?: number | null;
};

export type BackendNotificationPreference = {
  userId: string;
  inAppEnabled: boolean;
  helpRequestsEnabled: boolean;
  projectResourcesEnabled: boolean;
  teamActivityEnabled: boolean;
  updatedAt: string;
};

const BACKEND_STATUS_TO_UI: Record<BackendProjectStatus, ProjectStatus> = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  PLANNING: "Planning",
  RECRUITING: "Recruiting",
  SCOPING: "Scoping",
};

function normalise(value?: string | number | null) {
  return String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function titleCase(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isJsonBody(body?: BodyInit | null) {
  return Boolean(body) && !(body instanceof FormData);
}

function buildPath(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<{ data: T; meta?: PageMeta }> {
  const response = await fetch(buildPath(path), {
    ...init,
    headers: {
      Accept: "application/json",
      "X-User-Id": DEV_USER_ID,
      ...(isJsonBody(init?.body) ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers || {}),
    },
  });

  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (!response.ok || !body?.success) {
    const message = body?.error?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return { data: body.data, meta: body.meta };
}

function findFallbackProject(candidate: {
  id?: string;
  slug?: string;
  name?: string;
  location?: string;
}): Project | undefined {
  const directIdMatch = candidate.id
    ? fallbackProjects.find((project) => normalise(project.id) === normalise(candidate.id))
    : undefined;
  if (directIdMatch) {
    return directIdMatch;
  }

  const slugMatch = candidate.slug
    ? fallbackProjects.find((project) => normalise(project.slug) === normalise(candidate.slug))
    : undefined;
  if (slugMatch) {
    return slugMatch;
  }

  const nameMatch = candidate.name
    ? fallbackProjects.find((project) => normalise(project.name) === normalise(candidate.name))
    : undefined;
  if (nameMatch) {
    return nameMatch;
  }

  return fallbackProjects.find(
    (project) =>
      normalise(project.location) === normalise(candidate.location) &&
      normalise(project.name) === normalise(candidate.name)
  );
}

function toNumberOrNull(value?: number | null) {
  return value == null ? null : Number(value);
}

function buildGuideResources(resources?: BackendProjectGuideResource[]): ProjectGuideResource[] {
  return (resources || []).map((resource) => ({
    id: resource.id,
    guideId: resource.guideId || undefined,
    guideSlug: resource.guideSlug,
    guideTitle: resource.guideTitle,
    pinned: resource.pinned,
    addedByUserId: resource.addedByUserId,
    addedByName: resource.addedByName,
  }));
}

function buildFallbackRoles(fallback: Project | undefined, owners?: BackendProjectOwner[]): ProjectRole[] {
  if (fallback?.roles?.length) {
    return fallback.roles;
  }

  return (owners || []).map((owner) => ({
    id: owner.userId,
    name: owner.role === "OWNER" ? "Project owner" : titleCase(owner.role),
    userName: owner.name,
    isHelper: false,
    verified: true,
  }));
}

function toUiProjectBase(
  project: BackendProjectSummary | BackendProjectDetail,
  fallback: Project | undefined,
  overrides?: Partial<Project>
): Project {
  return {
    id: String(project.id),
    backendId: project.id,
    source: "backend",
    slug: project.slug,
    name: project.name,
    shortDescription: project.shortDescription,
    fullDescription: "fullDescription" in project ? project.fullDescription : fallback?.fullDescription || project.shortDescription,
    status: BACKEND_STATUS_TO_UI[project.status] || fallback?.status || "Planning",
    location: project.location,
    coordinates: [
      project.latitude ?? fallback?.coordinates?.[0] ?? 51.5074,
      project.longitude ?? fallback?.coordinates?.[1] ?? -0.1278,
    ],
    tags: project.tags?.length ? project.tags : fallback?.tags || [],
    goalVolunteers: toNumberOrNull(project.goalVolunteers) ?? fallback?.goalVolunteers ?? 0,
    currentVolunteers: toNumberOrNull(project.currentVolunteers) ?? fallback?.currentVolunteers ?? 0,
    goalFunding: toNumberOrNull(project.goalFunding) ?? fallback?.goalFunding ?? null,
    currentFunding: toNumberOrNull(project.currentFunding) ?? fallback?.currentFunding ?? null,
    images: fallback?.images?.length ? fallback.images : DEFAULT_PROJECT_IMAGES,
    tasks: fallback?.tasks || [],
    roles: buildFallbackRoles(fallback, "owners" in project ? project.owners : undefined),
    impactEstimateKwhPerYear:
      ("impactEstimateKwhPerYear" in project ? project.impactEstimateKwhPerYear : fallback?.impactEstimateKwhPerYear) ??
      fallback?.impactEstimateKwhPerYear,
    impactEstimateTonsCO2PerYear:
      ("impactEstimateTonsCo2PerYear" in project ? project.impactEstimateTonsCo2PerYear : fallback?.impactEstimateTonsCO2PerYear) ??
      fallback?.impactEstimateTonsCO2PerYear,
    ownershipStatus: fallback?.ownershipStatus ?? "unknown",
    roofAccessConfidence: fallback?.roofAccessConfidence ?? "unknown",
    shadingConfidence: fallback?.shadingConfidence ?? "unknown",
    batteryInterest: fallback?.batteryInterest ?? "maybe",
    supportPreference: fallback?.supportPreference ?? "mixed",
    guideResources: "resources" in project ? buildGuideResources(project.resources) : fallback?.guideResources || [],
    membershipCount: project.membershipCount ?? fallback?.membershipCount,
    linkedGuideCount: project.linkedGuideCount ?? fallback?.linkedGuideCount,
    openHelpRequestCount: project.openHelpRequestCount ?? fallback?.openHelpRequestCount,
    createdByUserId: project.createdByUserId,
    createdByName: project.createdByName,
    ...overrides,
  };
}

export function isBackendProjectId(projectId?: string | number | null) {
  if (typeof projectId === "number") {
    return Number.isInteger(projectId) && projectId > 0;
  }
  return typeof projectId === "string" && /^\d+$/.test(projectId);
}

export function toBackendProjectId(projectId?: string | number | null) {
  if (!isBackendProjectId(projectId)) {
    return undefined;
  }
  return Number(projectId);
}

export function resolveBackendHelperUserId(helperId?: string, helperName?: string) {
  if (helperId && /^(user|admin)-demo-\d+$/.test(helperId)) {
    return helperId;
  }
  if (helperName) {
    return BACKEND_HELPER_NAME_MAP[helperName.trim().toLowerCase()];
  }
  return undefined;
}

export function buildHelpRequestContext(baseContext?: string, helperName?: string, helperUserId?: string) {
  if (!helperName || helperUserId) {
    return baseContext;
  }
  return [baseContext, `Requested helper: ${helperName}`].filter(Boolean).join(" | ");
}

export function getFallbackProject(projectId?: string | null) {
  if (!projectId) {
    return undefined;
  }

  const normalizedId = normalise(projectId);
  const numericId = Number(projectId);

  return (
    fallbackProjects.find((project) => normalise(project.id) === normalizedId) ||
    fallbackProjects.find((project) => normalise(project.backendId) === normalizedId) ||
    (Number.isFinite(numericId) && numericId > 0 ? fallbackProjects[numericId - 1] : undefined)
  );
}

export async function fetchProjectCatalog() {
  const { data } = await apiRequest<BackendProjectSummary[]>("/api/projects?page=1&size=50");
  return data.map((project) => {
    const fallback = findFallbackProject(project);
    return toUiProjectBase(project, fallback);
  });
}

export async function fetchProjectDetail(projectId: string | number) {
  const { data } = await apiRequest<BackendProjectDetail>(`/api/projects/${projectId}`);
  const fallback = findFallbackProject(data);
  return toUiProjectBase(data, fallback, {
    roles: buildFallbackRoles(fallback, data.owners),
    guideResources: buildGuideResources(data.resources),
  });
}

export async function fetchProjectDashboard(projectId: string | number) {
  const { data } = await apiRequest<BackendProjectDashboard>(`/api/projects/${projectId}/dashboard`);
  return data;
}

export async function addProjectGuideResource(projectId: number, guideSlug: string) {
  const { data } = await apiRequest<BackendProjectGuideResource>(`/api/projects/${projectId}/resources/guides/${guideSlug}`, {
    method: "POST",
  });
  return data;
}

export async function setProjectGuidePinned(projectId: number, guideSlug: string, pinned: boolean) {
  const { data } = await apiRequest<BackendProjectGuideResource>(`/api/projects/${projectId}/resources/guides/${guideSlug}/pin`, {
    method: "PATCH",
    body: JSON.stringify({ pinned }),
  });
  return data;
}

export async function createHelpRequest(payload: CreateHelpRequestPayload) {
  const { data } = await apiRequest<BackendHelpRequest>("/api/help-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data;
}

export async function fetchNotifications(options?: { read?: boolean; page?: number; size?: number }) {
  const params = new URLSearchParams();
  if (options?.read !== undefined) {
    params.set("read", String(options.read));
  }
  params.set("page", String(options?.page || 1));
  params.set("size", String(options?.size || 20));

  const { data, meta } = await apiRequest<BackendNotification[]>(`/api/notifications?${params.toString()}`);
  return { data, meta };
}

export async function updateNotificationRead(id: number, read: boolean) {
  const { data } = await apiRequest<BackendNotification>(`/api/notifications/${id}/read`, {
    method: "PATCH",
    body: JSON.stringify({ read }),
  });
  return data;
}

export async function fetchNotificationPreferences() {
  const { data } = await apiRequest<BackendNotificationPreference>("/api/notification-preferences");
  return data;
}

export async function updateNotificationPreferences(payload: Omit<BackendNotificationPreference, "userId" | "updatedAt">) {
  const { data } = await apiRequest<BackendNotificationPreference>("/api/notification-preferences", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return data;
}

export function resolveGuideTitle(guideSlug: string, project?: Project) {
  return (
    project?.guideResources?.find((resource) => resource.guideSlug === guideSlug)?.guideTitle ||
    learnGuides.find((guide) => guide.slug === guideSlug)?.title ||
    guideSlug
  );
}
