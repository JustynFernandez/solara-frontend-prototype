import React from "react";
import { FileText, Play, Link as LinkIcon, FileSpreadsheet } from "lucide-react";

type ResourceListProps = {
  resources: { type: string; title: string; url: string }[];
};

const iconFor = (type: string) =>
  ({
    pdf: <FileText className="h-4 w-4" />,
    video: <Play className="h-4 w-4" />,
    link: <LinkIcon className="h-4 w-4" />,
    template: <FileSpreadsheet className="h-4 w-4" />,
  }[type]);

const ResourceList: React.FC<ResourceListProps> = ({ resources }) => (
  <div className="space-y-2 rounded-2xl card-surface p-4 text-slate-900 dark:text-white">
    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Resources</h3>
    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
      {resources.map((res) => (
        <li
          key={res.title}
          className="flex items-center gap-3 rounded-xl border border-white/50 bg-white/80 px-3 py-2 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,51,102,0.18)] dark:border-white/10 dark:bg-white/5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f62c7]/10 text-[#0f62c7] ring-1 ring-[#0f62c7]/30 dark:text-white">
            {iconFor(res.type)}
          </span>
          <a
            href={res.url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 font-semibold text-slate-800 transition hover:text-[#0f62c7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7] dark:text-white"
          >
            {res.title}
          </a>
          <span className="text-[11px] uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">{res.type}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ResourceList;
