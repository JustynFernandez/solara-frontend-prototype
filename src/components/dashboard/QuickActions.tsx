import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type QuickAction = {
  to: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "gold" | "sky" | "emerald";
};

const actions: QuickAction[] = [
  {
    to: "/request-help",
    label: "Request Help",
    description: "Get support from experts",
    color: "blue",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    to: "/connect",
    label: "Find Helpers",
    description: "Browse solar experts",
    color: "sky",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: "/learn",
    label: "Learn",
    description: "Explore guides & tutorials",
    color: "emerald",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    to: "/projects",
    label: "Projects",
    description: "Browse community work",
    color: "gold",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    to: "/plan/navigator",
    label: "Solar Navigator",
    description: "Plan your installation",
    color: "blue",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    to: "/configurator",
    label: "3D Designer",
    description: "Design your setup",
    color: "sky",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
];

const colorClasses: Record<QuickAction["color"], { bg: string; text: string; border: string }> = {
  blue: {
    bg: "bg-solara-blue/10 dark:bg-solara-blue/20",
    text: "text-solara-blue dark:text-solara-sky",
    border: "border-solara-blue/20 dark:border-solara-blue/30",
  },
  sky: {
    bg: "bg-solara-sky/10 dark:bg-solara-sky/20",
    text: "text-solara-sky dark:text-solara-sky",
    border: "border-solara-sky/20 dark:border-solara-sky/30",
  },
  gold: {
    bg: "bg-solara-gold/10 dark:bg-solara-gold/20",
    text: "text-solara-gold dark:text-solara-gold",
    border: "border-solara-gold/20 dark:border-solara-gold/30",
  },
  emerald: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20 dark:border-emerald-500/30",
  },
};

const QuickActions: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {actions.map((action, idx) => {
          const colors = colorClasses[action.color];
          return (
            <motion.div
              key={action.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={action.to}
                className={`group flex flex-col items-center gap-2 rounded-2xl border ${colors.border} ${colors.bg} p-4 text-center transition hover:scale-[1.02] hover:shadow-lg`}
              >
                <span className={colors.text}>{action.icon}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {action.label}
                </span>
                <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                  {action.description}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
