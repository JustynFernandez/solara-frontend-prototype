import React, { useEffect, useState } from "react";
import { Helper } from "../../data/helpers";

const STORAGE_KEY = "solara.connectFilters.v1";

type FilterState = {
  search: string;
  level: Helper["level"] | "all";
  availability: "all" | "available" | "limited" | "unavailable";
  support: "all" | "remote" | "visit";
  minRating: number;
};

type Props = {
  value: FilterState;
  onChange: (v: FilterState) => void;
};

const HelperFilters: React.FC<Props> = ({ value, onChange }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        onChange(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
    setMounted(true);
  }, [onChange]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [mounted, value]);

  return (
    <div className="space-y-3 rounded-2xl border border-white/60 bg-white/85 p-4 text-slate-900 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Filters</p>
        <input
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Search skills, tasks, roles"
          className="w-full rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Role level</span>
          <select
            value={value.level}
            onChange={(e) => onChange({ ...value, level: e.target.value as any })}
            className="mt-1 w-full rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <option value="all">All</option>
            <option value="community">Community</option>
            <option value="trained">Trained</option>
            <option value="certified">Certified</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Availability</span>
          <select
            value={value.availability}
            onChange={(e) => onChange({ ...value, availability: e.target.value as any })}
            className="mt-1 w-full rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="limited">Limited</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Support type</span>
          <select
            value={value.support}
            onChange={(e) => onChange({ ...value, support: e.target.value as any })}
            className="mt-1 w-full rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            <option value="all">All</option>
            <option value="remote">Remote</option>
            <option value="visit">Visit</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Minimum rating</span>
          <select
            value={value.minRating}
            onChange={(e) => onChange({ ...value, minRating: Number(e.target.value) })}
            className="mt-1 w-full rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            {[0, 3, 4, 4.5].map((r) => (
              <option key={r} value={r}>
                {r}+
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onChange({ search: "", level: "all", availability: "all", support: "all", minRating: 0 })}
          className="text-xs font-semibold text-solara-navy underline-offset-4 hover:underline dark:text-indigo-200"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export type HelperFilterState = FilterState;
export default HelperFilters;
