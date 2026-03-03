import React from "react";
import AnimatedButton from "../ui/animated-button";
import SketchNote from "../ui/SketchNote";

type Props = {
  onRequestSupport: () => void;
  search: string;
  onSearchChange: (v: string) => void;
};

const ConnectHero: React.FC<Props> = ({ onRequestSupport, search, onSearchChange }) => (
  <div className="relative rounded-[28px] border border-white/60 bg-white/85 p-6 text-slate-900 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
    <span className="handmade-sun pointer-events-none absolute right-6 top-6 h-10 w-10 rotate-[10deg]" aria-hidden />
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Get support safely</p>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold leading-tight">Get support safely</h1>
        <span className="handmade-underline h-3 w-32" aria-hidden />
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-200">Search by skill, task, or role. Certified help for mains wiring; volunteers for guidance.</p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <SketchNote text="Need a hand?" tone="blue" className="hidden sm:inline-flex" />
          <AnimatedButton onClick={onRequestSupport} className="px-5 py-3">
            Request Support
          </AnimatedButton>
        </div>
        <AnimatedButton variant="outline" href="/safety" className="px-5 py-3">
          Safety rules
        </AnimatedButton>
      </div>
      <div className="rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
        <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-100">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Search</span>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Skills, tasks, roles"
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-slate-400"
            aria-label="Search helpers"
          />
        </label>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300">Any work involving mains wiring requires a certified professional.</p>
    </div>
  </div>
);

export default ConnectHero;
