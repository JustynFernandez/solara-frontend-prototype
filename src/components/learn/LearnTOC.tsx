import React, { useState, useMemo } from "react";
import { List } from "lucide-react";
import SurfacePanel from "@/components/ui/surface-panel";
import { useScrollSpy } from "../../hooks/useScrollSpy";

type TocItem = { id: string; label: string };

type LearnTOCProps = {
  items: TocItem[];
};

// Sticky desktop TOC + mobile collapsible menu for the Learn hub.
const LearnTOC: React.FC<LearnTOCProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  // Get section IDs for scroll spy
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeSection = useScrollSpy(sectionIds);

  return (
    <div className="space-y-3">
      <div className="sticky top-28 hidden lg:block">
        <SurfacePanel variant="guide" layout="rail" density="compact" as="nav" className="text-sm text-slate-800 dark:text-slate-100" aria-label="On this page">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">On this page</p>
          <ul className="mt-3 space-y-2">
            {items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block rounded-lg px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
                      isActive
                        ? "bg-solara-blue/10 font-semibold text-solara-blue dark:bg-solara-blue/20 dark:text-white"
                        : "text-slate-700 hover:text-solara-blue dark:text-slate-200 dark:hover:text-white"
                    }`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </SurfacePanel>
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-sm font-semibold text-solara-navy shadow-md backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white"
          aria-expanded={open}
        >
          <span className="inline-flex items-center gap-2">
            <List className="h-4 w-4" />
            On this page
          </span>
          <span className="text-xs uppercase tracking-[0.16em]">{open ? "Hide" : "Show"}</span>
        </button>
        {open && (
          <SurfacePanel variant="guide" layout="rail" density="compact" as="nav" className="mt-2 space-y-2 text-sm text-slate-800 dark:text-white" aria-label="On this page">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block rounded-xl px-3 py-2 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </SurfacePanel>
        )}
      </div>
    </div>
  );
};

export default LearnTOC;
