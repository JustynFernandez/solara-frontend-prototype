import React, { useEffect, useMemo, useState } from "react";
import { guides, type GuideContent } from "@/data/learnContent";
import type { ProjectGuideResource, ProjectTaskStatus } from "@/data/projects";
import {
  addProjectGuideResource,
  fetchNotificationPreferences,
  fetchNotifications,
  fetchProjectDashboard,
  isBackendProjectId,
  setProjectGuidePinned,
  type BackendNotification,
  type BackendNotificationPreference,
  type BackendProjectDashboard,
  updateNotificationPreferences,
  updateNotificationRead,
} from "@/lib/solaraApi";
import { recommendGuidesForProject } from "@/lib/recommendGuides";
import ProjectWorkspaceView from "./ProjectWorkspaceView";
import type { ProjectResourceMap, ProjectWorkspaceProps, WorkspaceTab } from "./types";

const RESOURCE_STORAGE_KEY = "solara.projectResources.v1";

const nextStatus: Record<ProjectTaskStatus, ProjectTaskStatus> = {
  todo: "in-progress",
  "in-progress": "done",
  done: "todo",
};

const emptyResources = { guideSlugs: [], pinned: [] };

function readStoredResources(): ProjectResourceMap {
  const raw = localStorage.getItem(RESOURCE_STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function toResourceState(resources?: ProjectGuideResource[]) {
  const guideSlugs = Array.from(new Set((resources || []).map((resource) => resource.guideSlug)));
  const pinned = (resources || []).filter((resource) => resource.pinned).map((resource) => resource.guideSlug);
  return { guideSlugs, pinned };
}

function mergeResourceState(
  current: { guideSlugs: string[]; pinned: string[] } | undefined,
  slug: string,
  pinned: boolean
) {
  const nextGuideSlugs = Array.from(new Set([...(current?.guideSlugs || []), slug]));
  const nextPinned = new Set(current?.pinned || []);
  if (pinned) {
    nextPinned.add(slug);
  } else {
    nextPinned.delete(slug);
  }

  return {
    guideSlugs: nextGuideSlugs,
    pinned: Array.from(nextPinned),
  };
}

const ProjectWorkspaceContainer: React.FC<ProjectWorkspaceProps> = ({ project }) => {
  const backendProjectId = project.backendId ?? (isBackendProjectId(project.id) ? Number(project.id) : undefined);
  const [tasks, setTasks] = useState(project.tasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState<string | undefined>();
  const [tab, setTab] = useState<WorkspaceTab>("overview");
  const [resourceCenterOpen, setResourceCenterOpen] = useState(false);
  const [resourceSearch, setResourceSearch] = useState("");
  const [resourceError, setResourceError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<BackendProjectDashboard | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<BackendNotification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState<string | null>(null);
  const [notificationPreferences, setNotificationPreferences] = useState<BackendNotificationPreference | null>(null);
  const [preferencesLoading, setPreferencesLoading] = useState(false);
  const [preferencesError, setPreferencesError] = useState<string | null>(null);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [preferenceDirty, setPreferenceDirty] = useState(false);
  const [resources, setResources] = useState<ProjectResourceMap>(() => {
    const storedResources = readStoredResources();
    if (backendProjectId) {
      return {
        ...storedResources,
        [project.id]: toResourceState(project.guideResources),
      };
    }
    return storedResources;
  });

  useEffect(() => {
    setTasks(project.tasks);
  }, [project.id, project.tasks]);

  useEffect(() => {
    if (backendProjectId) {
      setResources((prev) => ({
        ...prev,
        [project.id]: toResourceState(project.guideResources),
      }));
      return;
    }

    const storedResources = readStoredResources();
    setResources(storedResources);
  }, [backendProjectId, project.guideResources, project.id]);

  useEffect(() => {
    if (!resourceError) return undefined;
    const timeoutId = window.setTimeout(() => setResourceError(null), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [resourceError]);

  useEffect(() => {
    let active = true;

    if (!backendProjectId) {
      setDashboardData(null);
      setNotifications([]);
      setNotificationPreferences(null);
      setDashboardError(null);
      setNotificationsError(null);
      setPreferencesError(null);
      setDashboardLoading(false);
      setNotificationsLoading(false);
      setPreferencesLoading(false);
      setPreferenceDirty(false);
      return undefined;
    }

    setDashboardLoading(true);
    setNotificationsLoading(true);
    setPreferencesLoading(true);

    fetchProjectDashboard(backendProjectId)
      .then((data) => {
        if (!active) return;
        setDashboardData(data);
        setDashboardError(null);
      })
      .catch((error) => {
        if (!active) return;
        setDashboardError(error instanceof Error ? error.message : "Unable to load the backend dashboard.");
      })
      .finally(() => {
        if (!active) return;
        setDashboardLoading(false);
      });

    fetchNotifications({ page: 1, size: 20 })
      .then(({ data }) => {
        if (!active) return;
        setNotifications(data);
        setNotificationsError(null);
      })
      .catch((error) => {
        if (!active) return;
        setNotificationsError(error instanceof Error ? error.message : "Unable to load notifications.");
      })
      .finally(() => {
        if (!active) return;
        setNotificationsLoading(false);
      });

    fetchNotificationPreferences()
      .then((data) => {
        if (!active) return;
        setNotificationPreferences(data);
        setPreferenceDirty(false);
        setPreferencesError(null);
      })
      .catch((error) => {
        if (!active) return;
        setPreferencesError(error instanceof Error ? error.message : "Unable to load notification preferences.");
      })
      .finally(() => {
        if (!active) return;
        setPreferencesLoading(false);
      });

    return () => {
      active = false;
    };
  }, [backendProjectId]);

  const volunteerPercent = useMemo(
    () => Math.min(100, Math.round((project.currentVolunteers / project.goalVolunteers) * 100)),
    [project.currentVolunteers, project.goalVolunteers]
  );
  const fundingPercent = project.goalFunding ? Math.min(100, Math.round(((project.currentFunding || 0) / project.goalFunding) * 100)) : null;
  const impactKwh = project.impactEstimateKwhPerYear ? project.impactEstimateKwhPerYear.toLocaleString() : "N/A";
  const impactCO2 = project.impactEstimateTonsCO2PerYear ? project.impactEstimateTonsCO2PerYear.toFixed(1) : "N/A";
  const projectResources = resources[project.id] || emptyResources;
  const recommendedGuides = useMemo(
    () =>
      recommendGuidesForProject(project)
        .map((slug) => guides.find((guide) => guide.slug === slug))
        .filter((guide): guide is GuideContent => Boolean(guide)),
    [project]
  );
  const searchableGuides = useMemo(
    () =>
      guides.filter((guide) => {
        if (!resourceSearch.trim()) return true;
        const query = resourceSearch.toLowerCase();
        return (
          guide.title.toLowerCase().includes(query) ||
          guide.summary.toLowerCase().includes(query) ||
          guide.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }),
    [resourceSearch]
  );

  const saveResources = (next: ProjectResourceMap) => {
    setResources(next);
    if (!backendProjectId) {
      localStorage.setItem(RESOURCE_STORAGE_KEY, JSON.stringify(next));
    }
  };

  const visibleNotifications = useMemo(() => {
    if (!backendProjectId) {
      return notifications;
    }
    const projectNotifications = notifications.filter(
      (item) =>
        item.projectId === backendProjectId ||
        item.actionUrl?.includes(`/projects/${backendProjectId}`)
    );
    return projectNotifications.length > 0 ? projectNotifications : notifications;
  }, [backendProjectId, notifications]);

  const refreshDashboard = async () => {
    if (!backendProjectId) return;
    setDashboardLoading(true);
    try {
      const data = await fetchProjectDashboard(backendProjectId);
      setDashboardData(data);
      setDashboardError(null);
    } catch (error) {
      setDashboardError(error instanceof Error ? error.message : "Unable to refresh the backend dashboard.");
    } finally {
      setDashboardLoading(false);
    }
  };

  const refreshNotifications = async () => {
    if (!backendProjectId) return;
    setNotificationsLoading(true);
    try {
      const { data } = await fetchNotifications({ page: 1, size: 20 });
      setNotifications(data);
      setNotificationsError(null);
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : "Unable to refresh notifications.");
    } finally {
      setNotificationsLoading(false);
    }
  };

  const handleNotificationReadToggle = async (id: number, read: boolean) => {
    if (!backendProjectId) return;
    try {
      const updated = await updateNotificationRead(id, read);
      setNotifications((prev) => prev.map((item) => (item.id === id ? updated : item)));
      setNotificationsError(null);
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : "Unable to update notification state.");
    }
  };

  const handlePreferenceChange = (
    key: "inAppEnabled" | "helpRequestsEnabled" | "projectResourcesEnabled" | "teamActivityEnabled",
    value: boolean
  ) => {
    setNotificationPreferences((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
    setPreferenceDirty(true);
  };

  const savePreferences = async () => {
    if (!notificationPreferences) return;
    setIsSavingPreferences(true);
    try {
      const updated = await updateNotificationPreferences({
        inAppEnabled: notificationPreferences.inAppEnabled,
        helpRequestsEnabled: notificationPreferences.helpRequestsEnabled,
        projectResourcesEnabled: notificationPreferences.projectResourcesEnabled,
        teamActivityEnabled: notificationPreferences.teamActivityEnabled,
      });
      setNotificationPreferences(updated);
      setPreferenceDirty(false);
      setPreferencesError(null);
      await refreshNotifications();
    } catch (error) {
      setPreferencesError(error instanceof Error ? error.message : "Unable to save notification preferences.");
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: nextStatus[task.status] } : task)));
  };

  const addGuideToProject = async (slug: string) => {
    if (!backendProjectId) {
      const next = {
        ...resources,
        [project.id]: {
          guideSlugs: Array.from(new Set([...(projectResources.guideSlugs || []), slug])),
          pinned: projectResources.pinned || [],
        },
      };
      saveResources(next);
      return;
    }

    try {
      const resource = await addProjectGuideResource(backendProjectId, slug);
      setResourceError(null);
      setResources((prev) => ({
        ...prev,
        [project.id]: mergeResourceState(prev[project.id] || emptyResources, resource.guideSlug, resource.pinned),
      }));
      await Promise.all([refreshDashboard(), refreshNotifications()]);
    } catch (error) {
      setResourceError(error instanceof Error ? error.message : "Unable to save that guide right now.");
    }
  };

  const addGuideToTasks = (slug: string) => {
    const guide = guides.find((item) => item.slug === slug);
    if (!guide) return;
    setTasks((prev) => [...prev, { id: `guide-${slug}`, title: `Read guide: ${guide.title}`, status: "todo" }]);
  };

  const togglePin = async (slug: string) => {
    if (!backendProjectId) {
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
      return;
    }

    try {
      const alreadySaved = projectResources.guideSlugs.includes(slug);
      if (!alreadySaved) {
        await addProjectGuideResource(backendProjectId, slug);
      }

      const nextPinned = !projectResources.pinned.includes(slug);
      const resource = await setProjectGuidePinned(backendProjectId, slug, nextPinned);
      setResourceError(null);
      setResources((prev) => ({
        ...prev,
        [project.id]: mergeResourceState(prev[project.id] || emptyResources, resource.guideSlug, resource.pinned),
      }));
      await Promise.all([refreshDashboard(), refreshNotifications()]);
    } catch (error) {
      setResourceError(error instanceof Error ? error.message : "Unable to update the pinned guides.");
    }
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
      resourceError={resourceError}
      dialogOpen={dialogOpen}
      onDialogOpenChange={setDialogOpen}
      dialogContext={dialogContext}
      dashboardData={dashboardData}
      dashboardLoading={dashboardLoading}
      dashboardError={dashboardError}
      onRefreshDashboard={refreshDashboard}
      recommendedGuides={recommendedGuides}
      searchableGuides={searchableGuides}
      projectResources={projectResources}
      notifications={visibleNotifications}
      notificationsLoading={notificationsLoading}
      notificationsError={notificationsError}
      notificationPreferences={notificationPreferences}
      preferencesLoading={preferencesLoading}
      preferencesError={preferencesError}
      onRefreshNotifications={refreshNotifications}
      onToggleNotificationRead={handleNotificationReadToggle}
      onPreferenceChange={handlePreferenceChange}
      onSavePreferences={savePreferences}
      isSavingPreferences={isSavingPreferences}
      preferenceDirty={preferenceDirty}
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
      onHelpRequestSubmitted={async () => {
        await Promise.all([refreshDashboard(), refreshNotifications()]);
      }}
    />
  );
};

export default ProjectWorkspaceContainer;
