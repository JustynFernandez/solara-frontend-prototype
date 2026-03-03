import React from "react";
import { motion } from "framer-motion";

type ActivityItem = {
  id: string;
  type: "guide_completed" | "helper_saved" | "project_viewed" | "request_sent" | "badge_earned";
  title: string;
  timestamp: Date;
  meta?: string;
};

// Mock activity data - in a real app this would come from an API/store
const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "guide_completed",
    title: "Completed 'Solar Panel Basics'",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    meta: "Learning",
  },
  {
    id: "2",
    type: "helper_saved",
    title: "Saved Ava Mensah to favorites",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    meta: "Helpers",
  },
  {
    id: "3",
    type: "project_viewed",
    title: "Viewed 'Community Center Install'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    meta: "Projects",
  },
  {
    id: "4",
    type: "request_sent",
    title: "Sent help request for roof survey",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    meta: "Requests",
  },
];

const iconMap: Record<ActivityItem["type"], { icon: React.ReactNode; color: string }> = {
  guide_completed: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  helper_saved: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "bg-solara-gold/20 text-solara-gold dark:bg-solara-gold/30",
  },
  project_viewed: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "bg-solara-blue/10 text-solara-blue dark:bg-solara-blue/20 dark:text-solara-sky",
  },
  request_sent: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  badge_earned: {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-slate-700/50 dark:bg-slate-800/50">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h2>

      <div className="mt-4 space-y-1">
        {mockActivities.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No recent activity
          </p>
        ) : (
          mockActivities.map((activity, idx) => {
            const { icon, color } = iconMap[activity.type];
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${color}`}>
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700 dark:text-slate-200">{activity.title}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                    {activity.meta && (
                      <>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span>{activity.meta}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export default ActivityFeed;
