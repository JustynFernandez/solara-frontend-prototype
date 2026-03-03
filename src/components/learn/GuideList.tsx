import React, { useMemo, useState } from "react";
import { ChevronDown, Clock, Star, ShieldAlert, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import { GuideContent } from "../../data/learnContent";
import { Link } from "react-router-dom";
import { useLearnStore } from "../../store/useLearnStore";

type Props = {
  guides: GuideContent[];
};

type SortOption = "relevant" | "newest" | "shortest" | "safety";
type FilterOption = "all" | "bookmarked" | "incomplete";

const badgeColor = (type: "format" | "difficulty" | "pillar") => {
  const base = "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]";
  if (type === "format") return `${base} border border-white/70 bg-white/85 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white`;
  if (type === "pillar") return `${base} bg-button-primary text-white shadow-md`;
  return `${base} border border-white/70 bg-white/85 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white`;
};

// Card variant styles based on guide attributes
const getCardVariant = (guide: GuideContent) => {
  if (guide.safetyCritical) {
    return "border-l-4 border-l-amber-500 hover:shadow-amber-500/10";
  }
  if (guide.difficulty === "Advanced") {
    return "border-l-4 border-l-purple-500 hover:shadow-purple-500/10";
  }
  if (guide.difficulty === "Beginner") {
    return "border-l-4 border-l-emerald-500 hover:shadow-emerald-500/10";
  }
  return "";
};

const GuideList: React.FC<Props> = ({ guides }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("relevant");
  const [filter, setFilter] = useState<FilterOption>("all");

  const { bookmarkedGuides, toggleBookmark, completedGuides } = useLearnStore();

  const filtered = useMemo(() => {
    switch (filter) {
      case "bookmarked":
        return guides.filter((g) => bookmarkedGuides.includes(g.slug));
      case "incomplete":
        return guides.filter((g) => !completedGuides.includes(g.slug));
      default:
        return guides;
    }
  }, [guides, filter, bookmarkedGuides, completedGuides]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "newest":
        return arr.sort((a, b) => (b.published || "").localeCompare(a.published || ""));
      case "shortest":
        return arr.sort((a, b) => a.durationMins - b.durationMins);
      case "safety":
        return arr.sort((a, b) => Number(b.safetyCritical ?? false) - Number(a.safetyCritical ?? false));
      default:
        return arr;
    }
  }, [filtered, sort]);

  return (
    <div className="space-y-4" id="guides">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Guides</p>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Featured guides with previews</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200">Open outlines and key takeaways without leaving the page.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-white">
            <span>Sort</span>
            {(
              [
                { value: "relevant", label: "Most relevant" },
                { value: "newest", label: "Newest" },
                { value: "shortest", label: "Shortest" },
                { value: "safety", label: "Safety critical" },
              ] satisfies { value: SortOption; label: string }[]
            ).map((opt) => {
              const active = sort === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSort(opt.value)}
                  className={`rounded-full px-3 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
                    active
                      ? "bg-button-primary text-white shadow-md"
                      : "border border-white/70 bg-white/85 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white"
                  }`}
                  aria-pressed={active}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter options */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-white">
          <span>Filter</span>
          {(
            [
              { value: "all", label: `All (${guides.length})` },
              { value: "bookmarked", label: `Bookmarked (${bookmarkedGuides.length})` },
              { value: "incomplete", label: `Not completed` },
            ] satisfies { value: FilterOption; label: string }[]
          ).map((opt) => {
            const active = filter === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFilter(opt.value)}
                className={`rounded-full px-3 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
                  active
                    ? "bg-button-primary text-white shadow-md"
                    : "border border-white/70 bg-white/85 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white"
                }`}
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
          {completedGuides.length > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {completedGuides.length} completed
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {sorted.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300/70 bg-white/80 p-8 text-center text-slate-600 shadow-md dark:border-slate-600/50 dark:bg-white/5 dark:text-slate-300">
            {filter === "bookmarked" ? "No bookmarked guides yet. Click the bookmark icon on any guide to save it." : "No guides match this filter."}
          </div>
        )}
        {sorted.map((guide) => {
          const isOpen = expanded === guide.slug;
          const isBookmarked = bookmarkedGuides.includes(guide.slug);
          const isCompleted = completedGuides.includes(guide.slug);
          const cardVariant = getCardVariant(guide);

          return (
            <div
              key={guide.slug}
              className={`relative rounded-2xl border border-white/70 bg-white/85 p-4 text-slate-900 shadow-md backdrop-blur transition-shadow dark:border-white/10 dark:bg-[#050a16]/85 dark:text-slate-100 ${cardVariant}`}
            >
              {/* Completion badge */}
              {isCompleted && (
                <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}

              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={badgeColor("format")}>{guide.format}</span>
                    <span className={badgeColor("difficulty")}>{guide.difficulty}</span>
                    <span className={badgeColor("pillar")}>{guide.pillar}</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
                      <Clock className="h-3.5 w-3.5" />
                      {guide.durationMins} min
                    </span>
                    {guide.safetyCritical && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700 shadow-sm backdrop-blur dark:bg-amber-500/20 dark:text-amber-200">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Safety critical
                      </span>
                    )}
                    {guide.difficulty === "Beginner" && !guide.safetyCritical && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                        Start here
                      </span>
                    )}
                    {guide.difficulty === "Advanced" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                        Deep dive
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{guide.title}</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200">{guide.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {guide.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/70 bg-white/85 px-2 py-1 text-[11px] font-semibold text-solara-navy shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {/* Bookmark button */}
                    <button
                      type="button"
                      onClick={() => toggleBookmark(guide.slug)}
                      className={`rounded-full p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue ${
                        isBookmarked
                          ? "bg-solara-gold/20 text-solara-gold"
                          : "border border-white/70 bg-white/85 text-slate-500 hover:text-solara-gold dark:border-white/10 dark:bg-white/10 dark:text-slate-400"
                      }`}
                      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark guide"}
                      aria-pressed={isBookmarked}
                    >
                      {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                    </button>
                    <Link
                      to={`/learn/${guide.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-button-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
                    >
                      {isCompleted ? "Review" : "Read"}
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : guide.slug)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-xs font-semibold text-solara-navy shadow-md backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Hide preview" : "Expand preview"}
                    <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

                {isOpen && (
                  <div className="mt-3 grid gap-4 rounded-2xl border border-white/70 bg-white/85 p-3 text-sm text-slate-900 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-slate-100 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Outline</p>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-200">
                        {guide.toc.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-solara-blue" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Key takeaways</p>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-200">
                        {guide.takeaways.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Star className="mt-0.5 h-3.5 w-3.5 text-solara-gold" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuideList;
