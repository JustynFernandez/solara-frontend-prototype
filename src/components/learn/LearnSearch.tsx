import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Command, Search, X } from "lucide-react";
import { GuideContent, Difficulty, Format, Pillar } from "../../data/learnContent";
import FilterChips from "./FilterChips";

type Filters = {
  difficulty: Difficulty | null;
  format: Format | null;
  pillar: Pillar | null;
};

type LearnSearchProps = {
  guides: GuideContent[];
};

const difficultyOptions: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
const formatOptions: Format[] = ["Guide", "Checklist", "Template", "Calculator"];
const pillarOptions: Pillar[] = ["Plan", "Coordinate", "Sustain"];

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (text: string, query: string) => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${escapeRegex(query)})`, "ig");
  const parts = text.split(regex);
  const lowerQuery = query.toLowerCase();
  return parts.map((part, idx) =>
    part.toLowerCase() === lowerQuery ? (
      <mark key={idx} className="rounded bg-solara-blue/12 px-0.5 text-solara-blue-alt dark:bg-solara-blue/24 dark:text-solara-sky">
        {part}
      </mark>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  );
};

// Inline search + Cmd/Ctrl+K command palette style search.
const LearnSearch: React.FC<LearnSearchProps> = ({ guides }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({ difficulty: null, format: null, pillar: null });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return guides
      .filter((guide) => {
        if (filters.difficulty && guide.difficulty !== filters.difficulty) return false;
        if (filters.format && guide.format !== filters.format) return false;
        if (filters.pillar && guide.pillar !== filters.pillar) return false;
        if (!normalizedQuery) return true;
        const haystack = `${guide.title} ${guide.summary} ${guide.tags.join(" ")} ${guide.takeaways.join(" ")}`.toLowerCase();
        return normalizedQuery.split(" ").every((term) => haystack.includes(term));
      })
      .slice(0, 8);
  }, [filters.difficulty, filters.format, filters.pillar, guides, query]);

  const renderResults = (compact = false) => (
    <div className="space-y-2" role="list" aria-live="polite">
      {filtered.length === 0 && (
        <p className="rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-sm text-slate-600 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-slate-200">
          No matches yet. Try a different phrase or adjust filters.
        </p>
      )}
      {filtered.map((guide) => (
        <div
          key={guide.slug}
          className={`rounded-2xl border border-white/70 bg-white/85 p-3 text-sm text-slate-900 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white ${
            compact ? "" : "space-y-1"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
            <span className="rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">{guide.format}</span>
            <span className="rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">{guide.difficulty}</span>
            <span className="rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">{guide.pillar}</span>
            <span className="rounded-full border border-white/70 bg-white/85 px-2 py-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">{guide.durationMins} min</span>
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900 dark:text-white">{highlight(guide.title, query)}</p>
              {!compact && (
                <p className="text-slate-700 dark:text-slate-200">{highlight(guide.summary, query)}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {guide.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/70 bg-white/85 px-2 py-1 text-[11px] font-semibold text-solara-navy shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                    {highlight(tag, query)}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={`/learn/${guide.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-button-primary px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
            >
              Read
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 sm:p-6 text-slate-900 dark:text-white" role="search" aria-label="Search learn content">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Search</p>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Find a guide or template</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200">Type a topic, press Cmd/Ctrl+K for quick search, or filter by pillar.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-xs font-semibold text-solara-navy shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white lg:inline-flex"
          >
            <Command className="h-4 w-4" />
            Cmd/Ctrl + K
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-solara-blue dark:text-sky-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, tags, or summaries"
              className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-slate-400"
              aria-label="Search learn content"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-full p-2 text-slate-500 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:text-slate-300 dark:hover:bg-white/10"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <FilterChips
              label="Difficulty"
              options={difficultyOptions.map((d) => ({ value: d, label: d }))}
              active={filters.difficulty}
              onChange={(v) => setFilters((f) => ({ ...f, difficulty: v as Difficulty | null }))}
            />
            <FilterChips
              label="Format"
              options={formatOptions.map((d) => ({ value: d, label: d }))}
              active={filters.format}
              onChange={(v) => setFilters((f) => ({ ...f, format: v as Format | null }))}
            />
            <FilterChips
              label="Pillar"
              options={pillarOptions.map((d) => ({ value: d, label: d }))}
              active={filters.pillar}
              onChange={(v) => setFilters((f) => ({ ...f, pillar: v as Pillar | null }))}
            />
          </div>
        </div>
      </div>

      {renderResults()}

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 py-10 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search learn content">
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#050a16]/95 p-4 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <Command className="h-5 w-5 text-sky-300" />
              <input
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search guides, checklists, or templates"
                className="w-full bg-transparent text-base text-white placeholder:text-slate-400 focus:outline-none"
                aria-label="Command search learn content"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
              {renderResults(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnSearch;
