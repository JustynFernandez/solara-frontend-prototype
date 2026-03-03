import React from "react";

const ProjectsHeader = () => (
  <header className="relative space-y-3">
    <p className="text-sm font-semibold uppercase tracking-wide text-solara-navy dark:text-indigo-200">Projects</p>
    <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Community builds across the map.</h1>
    <span className="handmade-underline h-3 w-36" aria-hidden />
    <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">Explore mock projects, see what skills are needed, and join to bring more clean energy to local spaces.</p>
    <span className="handmade-orbit pointer-events-none absolute right-2 top-2 h-7 w-12 rotate-[6deg] opacity-70" aria-hidden />
  </header>
);

export default ProjectsHeader;

