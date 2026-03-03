import React from "react";
import { motion } from "framer-motion";

type Stat = {
  label: string;
  value: string;
  tone?: "emerald" | "amber" | "indigo";
};

type StatsCardProps = {
  title?: string;
  stats: Stat[];
  checklist?: string[];
};

const toneClasses: Record<NonNullable<Stat["tone"]>, string> = {
  emerald: "bg-solara-foam text-solara-navy dark:bg-solara-panel dark:text-indigo-100",
  amber: "bg-amber-50 text-amber-800 dark:bg-solara-gold/10 dark:text-amber-100",
  indigo: "bg-sky-50 text-solara-navy dark:bg-solara-panel dark:text-sky-100",
};

const StatsCard: React.FC<StatsCardProps> = ({ title = "Live snapshot", stats, checklist = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="relative overflow-hidden rounded-3xl card-surface p-6 text-slate-900 dark:text-slate-100"
  >
    <div className="pointer-events-none absolute inset-0 bg-solara-aurora opacity-60" />
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.25),transparent,rgba(255,255,255,0.2))] opacity-70" />
    <span className="handmade-corner pointer-events-none absolute right-6 top-6 h-9 w-9" aria-hidden />
    <div className="relative space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-solara-navy dark:text-indigo-100">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-solara-gold shadow-[0_0_0_6px_rgba(212,175,55,0.2)]" />
          {title}
        </div>
        <span className="handmade-underline ml-5 h-3 w-24" aria-hidden />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.06 }}
            className={`rounded-2xl border border-white/50 px-4 py-4 text-center text-sm font-semibold shadow-md backdrop-blur dark:border-white/10 ${toneClasses[stat.tone || "emerald"]}`}
          >
            <div className="text-xl font-extrabold">{stat.value}</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      {checklist.length > 0 && (
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-100">
          {checklist.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-xl bg-solara-foam px-3 py-2 text-solara-navy shadow-sm ring-1 ring-solara-blue/20 dark:bg-solara-panel dark:text-indigo-100 dark:ring-solara-blue/30"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

export default StatsCard;
