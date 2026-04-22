import React from "react";
import { Bell, BellRing, RefreshCcw, Save } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import type { ProjectWorkspaceUpdatesProps } from "./types";

function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }
  return new Date(value).toLocaleString();
}

const preferenceLabels = {
  inAppEnabled: "Enable in-app notifications",
  helpRequestsEnabled: "Help request activity",
  projectResourcesEnabled: "Project resource updates",
  teamActivityEnabled: "Team activity updates",
} as const;

const ProjectWorkspaceUpdates: React.FC<ProjectWorkspaceUpdatesProps> = ({
  project,
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
}) => {
  const unreadCount = notifications.filter((item) => !item.read).length;

  if (!project.backendId) {
    return (
      <section className="space-y-3 rounded-[20px] card-surface p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Updates</h3>
          <span className="rounded-full border border-white/25 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-emerald-100">
            backend only
          </span>
        </div>
        <p className="text-sm text-slate-700 dark:text-emerald-100/80">
          This tab is wired to the backend notification inbox and notification preference endpoints, so it only lights up on backend projects.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-[20px] card-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Updates</h3>
          <p className="mt-1 text-sm text-slate-700 dark:text-emerald-100/80">
            This panel is backed by `/api/notifications` and `/api/notification-preferences`.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/25 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white">
            {unreadCount} unread
          </span>
          <AnimatedButton variant="outline" onClick={onRefreshNotifications} className="px-4 py-2">
            Refresh
            <RefreshCcw className="h-4 w-4" />
          </AnimatedButton>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4 rounded-[24px] border border-white/25 bg-white/70 p-5 shadow-inner dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <BellRing className="h-4 w-4 text-sky-600 dark:text-sky-300" />
            Notification preferences
          </div>
          {preferencesLoading && !notificationPreferences ? (
            <p className="text-sm text-slate-700 dark:text-emerald-100/80">Loading notification preferences.</p>
          ) : notificationPreferences ? (
            <div className="space-y-3">
              {(Object.keys(preferenceLabels) as Array<keyof typeof preferenceLabels>).map((key) => (
                <label
                  key={key}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/80 px-4 py-3 text-sm shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <span className="text-slate-900 dark:text-white">{preferenceLabels[key]}</span>
                  <input
                    type="checkbox"
                    checked={notificationPreferences[key]}
                    onChange={(event) => onPreferenceChange(key, event.target.checked)}
                    className="h-4 w-4 accent-emerald-600"
                  />
                </label>
              ))}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500 dark:text-emerald-200/70">Last updated: {formatDate(notificationPreferences.updatedAt)}</p>
                <AnimatedButton
                  onClick={onSavePreferences}
                  disabled={!preferenceDirty || isSavingPreferences}
                  className="px-4 py-2"
                >
                  Save preferences
                  <Save className="h-4 w-4" />
                </AnimatedButton>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-700 dark:text-emerald-100/80">Preferences are unavailable right now.</p>
          )}
          {preferencesError ? (
            <div className="rounded-2xl border border-red-400/35 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {preferencesError}
            </div>
          ) : null}
        </div>

        <div className="space-y-4 rounded-[24px] border border-white/25 bg-white/70 p-5 shadow-inner dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Bell className="h-4 w-4 text-amber-500 dark:text-amber-300" />
            Recent backend notifications
          </div>
          {notificationsLoading && notifications.length === 0 ? (
            <p className="text-sm text-slate-700 dark:text-emerald-100/80">Loading notification inbox.</p>
          ) : notifications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/25 bg-white/80 px-4 py-4 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-emerald-100/80">
              No backend notifications for this project yet.
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-2xl border px-4 py-3 text-sm shadow-sm ${
                    notification.read
                      ? "border-white/20 bg-white/65 dark:border-white/10 dark:bg-white/5"
                      : "border-emerald-400/35 bg-emerald-500/10 dark:border-emerald-400/20 dark:bg-emerald-500/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900 dark:text-white">{notification.title}</p>
                      <p className="text-slate-700 dark:text-emerald-100/80">{notification.message}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-emerald-200/70">
                        <span>{notification.type}</span>
                        <span>{formatDate(notification.createdAt)}</span>
                        {notification.projectName ? <span>{notification.projectName}</span> : null}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleNotificationRead(notification.id, !notification.read)}
                      className="rounded-full border border-white/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    >
                      {notification.read ? "mark unread" : "mark read"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {notificationsError ? (
            <div className="rounded-2xl border border-red-400/35 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {notificationsError}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ProjectWorkspaceUpdates;
