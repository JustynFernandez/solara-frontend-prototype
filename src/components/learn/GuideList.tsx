import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  Clock,
  ShieldAlert,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Star,
} from "lucide-react";
import { GuideContent } from "../../data/learnContent";
import { Link } from "react-router-dom";
import { useLearnStore } from "../../store/useLearnStore";
import FilterRail from "@/components/ui/filter-rail";
import InlineAction from "@/components/ui/inline-action";

type Props = {
  guides: GuideContent[];
};

type SortOption = "relevant" | "newest" | "shortest" | "safety";
type FilterOption = "all" | "bookmarked" | "incomplete";

const GuideList: React.FC<Props> = ({ guides }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("relevant");
  const [filter, setFilter] = useState<FilterOption>("all");
  const { bookmarkedGuides, toggleBookmark, completedGuides } = useLearnStore();

  const filtered = useMemo(() => {
    switch (filter) {
      case "bookmarked":
        return guides.filter((guide) => bookmarkedGuides.includes(guide.slug));
      case "incomplete":
        return guides.filter((guide) => !completedGuides.includes(guide.slug));
      default:
        return guides;
    }
  }, [guides, filter, bookmarkedGuides, completedGuides]);

  const sorted = useMemo(() => {
    const items = [...filtered];
    switch (sort) {
      case "newest":
        return items.sort((a, b) => (b.published || "").localeCompare(a.published || ""));
      case "shortest":
        return items.sort((a, b) => a.durationMins - b.durationMins);
      case "safety":
        return items.sort((a, b) => Number(b.safetyCritical ?? false) - Number(a.safetyCritical ?? false));
      default:
        return items;
    }
  }, [filtered, sort]);

  return (
    <div className="space-y-4" id="guides">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]">Guide library</p>
        <h3 className="text-2xl font-semibold text-[var(--solara-text-strong)]">Featured guides with expandable previews.</h3>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
          Review key takeaways before you open the full article, then continue into the guide only when you need the full detail.
        </p>
      </div>

      <FilterRail
        label="Browse guides"
        summary={
          <p className="text-sm text-[var(--solara-text-muted)]">
            {sorted.length} visible / {completedGuides.length} completed
          </p>
        }
        controls={
          <div className="flex flex-wrap gap-2">
            {[
              { value: "relevant", label: "Most relevant" },
              { value: "newest", label: "Newest" },
              { value: "shortest", label: "Shortest" },
              { value: "safety", label: "Safety first" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSort(option.value as SortOption)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  sort === option.value
                    ? "border-[var(--solara-accent)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)]"
                    : "border-[var(--solara-rule)] bg-transparent text-[var(--solara-text-muted)] hover:border-[var(--solara-rule)]/80"
                }`}
                aria-pressed={sort === option.value}
              >
                {option.label}
              </button>
            ))}
            {[
              { value: "all", label: `All (${guides.length})` },
              { value: "bookmarked", label: `Saved (${bookmarkedGuides.length})` },
              { value: "incomplete", label: "Not completed" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value as FilterOption)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  filter === option.value
                    ? "border-[var(--solara-accent)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)]"
                    : "border-[var(--solara-rule)] bg-transparent text-[var(--solara-text-muted)] hover:border-[var(--solara-rule)]/80"
                }`}
                aria-pressed={filter === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="space-y-3">
        {sorted.length === 0 ? (
          <div className="rounded-md border border-dashed border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-8 text-center text-[var(--solara-text-muted)]">
            {filter === "bookmarked"
              ? "No saved guides yet. Use the bookmark control on any guide to keep it close."
              : "No guides match this filter."}
          </div>
        ) : null}

        {sorted.map((guide) => {
          const isOpen = expanded === guide.slug;
          const isBookmarked = bookmarkedGuides.includes(guide.slug);
          const isCompleted = completedGuides.includes(guide.slug);

          return (
            <article
              key={guide.slug}
              className="rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] px-4 py-4 shadow-[var(--solara-shadow-soft)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    <span className="rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]">
                      {guide.format}
                    </span>
                    <span className="rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-text-muted)]">
                      {guide.difficulty}
                    </span>
                    <span className="rounded-md border border-[var(--solara-rule)] px-2 py-1 text-[var(--solara-accent-strong)]">
                      {guide.pillar}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[var(--solara-text-muted)]">
                      <Clock className="h-3.5 w-3.5" />
                      {guide.durationMins} min
                    </span>
                    {guide.safetyCritical ? (
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Safety critical
                      </span>
                    ) : null}
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-[var(--solara-text-strong)]">{guide.title}</h4>
                    <p className="max-w-3xl text-sm leading-6 text-[var(--solara-text-muted)]">{guide.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)]">
                    {guide.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-md border border-[var(--solara-rule)] px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(guide.slug)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--solara-rule)] text-[var(--solara-text-muted)] transition hover:border-[var(--solara-accent)] hover:text-[var(--solara-accent-strong)]"
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark guide"}
                    aria-pressed={isBookmarked}
                  >
                    {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  </button>
                  <InlineAction to={`/learn/${guide.slug}`} emphasis="strong">
                    {isCompleted ? "Review guide" : "Read guide"}
                  </InlineAction>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : guide.slug)}
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--solara-rule)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--solara-text-muted)] transition hover:border-[var(--solara-accent)] hover:text-[var(--solara-text-strong)]"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Hide preview" : "Preview"}
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

              {isOpen ? (
                <div className="mt-4 grid gap-4 border-t border-[var(--solara-rule)] pt-4 md:grid-cols-2">
                  <div className="space-y-2 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Outline</p>
                    <ul className="space-y-1 text-sm leading-6 text-[var(--solara-text-muted)]">
                      {guide.toc.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--solara-accent)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">Key takeaways</p>
                    <ul className="space-y-2 text-sm leading-6 text-[var(--solara-text-muted)]">
                      {guide.takeaways.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Star className="mt-1 h-3.5 w-3.5 text-[var(--solara-accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default GuideList;
