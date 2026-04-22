import { guides as learnGuides } from "@/data/learnContent";
import { projects as fallbackProjects, } from "@/data/projects";
const CONFIGURED_API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const API_BASE_URL = import.meta.env.DEV ? "" : CONFIGURED_API_BASE_URL;
const DEV_USER_ID = import.meta.env.VITE_DEV_USER_ID || "user-demo-1";
const DEFAULT_PROJECT_IMAGES = [
    "https://images.unsplash.com/photo-1509395280263-4f24f3160b68?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=1200&q=80",
];
const BACKEND_HELPER_NAME_MAP = {
    "ali admin": "admin-demo-1",
    "ava mensah": "user-demo-2",
    "elliot p": "user-demo-4",
    "elliot p.": "user-demo-4",
    "elliot park": "user-demo-4",
    "justyn demo": "user-demo-1",
    "lina patel": "user-demo-3",
};
const BACKEND_STATUS_TO_UI = {
    COMPLETED: "Completed",
    IN_PROGRESS: "In Progress",
    PLANNING: "Planning",
    RECRUITING: "Recruiting",
    SCOPING: "Scoping",
};
function normalise(value) {
    return String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}
function titleCase(value) {
    return (value || "")
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function isJsonBody(body) {
    return Boolean(body) && !(body instanceof FormData);
}
function buildPath(path) {
    return `${API_BASE_URL}${path}`;
}
async function apiRequest(path, init) {
    const response = await fetch(buildPath(path), {
        ...init,
        headers: {
            Accept: "application/json",
            "X-User-Id": DEV_USER_ID,
            ...(isJsonBody(init?.body) ? { "Content-Type": "application/json" } : {}),
            ...(init?.headers || {}),
        },
    });
    const body = (await response.json().catch(() => null));
    if (!response.ok || !body?.success) {
        const message = body?.error?.message || `Request failed with status ${response.status}`;
        throw new Error(message);
    }
    return { data: body.data, meta: body.meta };
}
function findFallbackProject(candidate) {
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
    return fallbackProjects.find((project) => normalise(project.location) === normalise(candidate.location) &&
        normalise(project.name) === normalise(candidate.name));
}
function toNumberOrNull(value) {
    return value == null ? null : Number(value);
}
function buildGuideResources(resources) {
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
function buildFallbackRoles(fallback, owners) {
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
function toUiProjectBase(project, fallback, overrides) {
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
        impactEstimateKwhPerYear: ("impactEstimateKwhPerYear" in project ? project.impactEstimateKwhPerYear : fallback?.impactEstimateKwhPerYear) ??
            fallback?.impactEstimateKwhPerYear,
        impactEstimateTonsCO2PerYear: ("impactEstimateTonsCo2PerYear" in project ? project.impactEstimateTonsCo2PerYear : fallback?.impactEstimateTonsCO2PerYear) ??
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
export function isBackendProjectId(projectId) {
    if (typeof projectId === "number") {
        return Number.isInteger(projectId) && projectId > 0;
    }
    return typeof projectId === "string" && /^\d+$/.test(projectId);
}
export function toBackendProjectId(projectId) {
    if (!isBackendProjectId(projectId)) {
        return undefined;
    }
    return Number(projectId);
}
export function resolveBackendHelperUserId(helperId, helperName) {
    if (helperId && /^(user|admin)-demo-\d+$/.test(helperId)) {
        return helperId;
    }
    if (helperName) {
        return BACKEND_HELPER_NAME_MAP[helperName.trim().toLowerCase()];
    }
    return undefined;
}
export function buildHelpRequestContext(baseContext, helperName, helperUserId) {
    if (!helperName || helperUserId) {
        return baseContext;
    }
    return [baseContext, `Requested helper: ${helperName}`].filter(Boolean).join(" | ");
}
export function getFallbackProject(projectId) {
    if (!projectId) {
        return undefined;
    }
    const normalizedProjectId = normalise(projectId);
    const directMatch = fallbackProjects.find((project) => normalise(project.id) === normalizedProjectId ||
        normalise(project.backendId) === normalizedProjectId);
    if (directMatch) {
        return directMatch;
    }
    const numericProjectId = Number(projectId);
    if (Number.isInteger(numericProjectId) && numericProjectId > 0) {
        return fallbackProjects[numericProjectId - 1];
    }
    return undefined;
}
export async function fetchProjectCatalog() {
    const { data } = await apiRequest("/api/projects?page=1&size=50");
    return data.map((project) => {
        const fallback = findFallbackProject(project);
        return toUiProjectBase(project, fallback);
    });
}
export async function fetchProjectDetail(projectId) {
    const { data } = await apiRequest(`/api/projects/${projectId}`);
    const fallback = findFallbackProject(data);
    return toUiProjectBase(data, fallback, {
        roles: buildFallbackRoles(fallback, data.owners),
        guideResources: buildGuideResources(data.resources),
    });
}
export async function fetchProjectDashboard(projectId) {
    const { data } = await apiRequest(`/api/projects/${projectId}/dashboard`);
    return data;
}
export async function addProjectGuideResource(projectId, guideSlug) {
    const { data } = await apiRequest(`/api/projects/${projectId}/resources/guides/${guideSlug}`, {
        method: "POST",
    });
    return data;
}
export async function setProjectGuidePinned(projectId, guideSlug, pinned) {
    const { data } = await apiRequest(`/api/projects/${projectId}/resources/guides/${guideSlug}/pin`, {
        method: "PATCH",
        body: JSON.stringify({ pinned }),
    });
    return data;
}
export async function createHelpRequest(payload) {
    const { data } = await apiRequest("/api/help-requests", {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return data;
}
export async function fetchNotifications(options) {
    const params = new URLSearchParams();
    if (options?.read !== undefined) {
        params.set("read", String(options.read));
    }
    params.set("page", String(options?.page || 1));
    params.set("size", String(options?.size || 20));
    const { data, meta } = await apiRequest(`/api/notifications?${params.toString()}`);
    return { data, meta };
}
export async function updateNotificationRead(id, read) {
    const { data } = await apiRequest(`/api/notifications/${id}/read`, {
        method: "PATCH",
        body: JSON.stringify({ read }),
    });
    return data;
}
export async function fetchNotificationPreferences() {
    const { data } = await apiRequest("/api/notification-preferences");
    return data;
}
export async function updateNotificationPreferences(payload) {
    const { data } = await apiRequest("/api/notification-preferences", {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    return data;
}
export function resolveGuideTitle(guideSlug, project) {
    return (project?.guideResources?.find((resource) => resource.guideSlug === guideSlug)?.guideTitle ||
        learnGuides.find((guide) => guide.slug === guideSlug)?.title ||
        guideSlug);
}
