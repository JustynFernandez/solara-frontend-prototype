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

type SortOption = "relevance" | "rating" | "projects" | "response";

type Props = {
  value: FilterState;
  onChange: (v: FilterState) => void;
  skillPool: string[];
  selectedSkill: string;
  onSelectedSkillChange: (skill: string) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
  activeSummary: string[];
  savedOnly?: boolean;
  onClear: () => void;
};

const searchFieldClassName =
  "solara-filter-search__input";

const renderChipButton = (label: string, active: boolean, onClick: () => void) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`solara-filter-chip${active ? " is-active" : ""}`}
  >
    {label}
  </button>
);

const HelperFilters: React.FC<Props> = ({
  value,
  onChange,
  skillPool,
  selectedSkill,
  onSelectedSkillChange,
  sortBy,
  onSortByChange,
  activeSummary,
  savedOnly = false,
  onClear,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        onChange(JSON.parse(raw));
      } catch {
        // ignore invalid local state
      }
    }
    setMounted(true);
  }, [onChange]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [mounted, value]);

  return (
    <div className="solara-filter-panel">
      <div className="solara-filter-panel__intro">
        <p className="solara-filter-panel__eyebrow">Filter stack</p>
        <p className="solara-filter-panel__body">
          Start with the job, then narrow by role, availability, support type, and response quality.
        </p>
      </div>

      <div className="solara-filter-search">
        <p className="solara-filter-section__label">Describe the job</p>
        <input
          value={value.search}
          onChange={(event) => onChange({ ...value, search: event.target.value })}
          placeholder="battery sizing, safety check, rooftop survey..."
          className={searchFieldClassName}
        />
      </div>

      {skillPool.length > 0 ? (
        <section className="solara-filter-section">
          <div className="flex items-center justify-between gap-3">
            <p className="solara-filter-section__label">Skill focus</p>
            {savedOnly ? <p className="solara-filter-section__note">Saved helpers only</p> : null}
          </div>
          <div className="solara-filter-cluster">
            {renderChipButton("All skills", selectedSkill === "all", () => onSelectedSkillChange("all"))}
            {skillPool.map((skill) => {
              const active = selectedSkill.toLowerCase() === skill.toLowerCase();
              return <React.Fragment key={skill}>{renderChipButton(skill, active, () => onSelectedSkillChange(skill))}</React.Fragment>;
            })}
          </div>
        </section>
      ) : null}

      <section className="solara-filter-section">
        <p className="solara-filter-section__label">Role level</p>
        <div className="solara-filter-cluster">
          {[
            ["all", "All roles"],
            ["community", "Community"],
            ["trained", "Trained"],
            ["certified", "Certified"],
          ].map(([option, label]) => (
            <React.Fragment key={option}>
              {renderChipButton(label, value.level === option, () => onChange({ ...value, level: option as Helper["level"] | "all" }))}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="solara-filter-section">
        <p className="solara-filter-section__label">Availability</p>
        <div className="solara-filter-cluster">
          {[
            ["all", "All states"],
            ["available", "Available"],
            ["limited", "Limited"],
            ["unavailable", "Unavailable"],
          ].map(([option, label]) => (
            <React.Fragment key={option}>
              {renderChipButton(label, value.availability === option, () => onChange({ ...value, availability: option as FilterState["availability"] }))}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="solara-filter-section">
        <p className="solara-filter-section__label">Support type</p>
        <div className="solara-filter-cluster">
          {[
            ["all", "Any support"],
            ["remote", "Remote"],
            ["visit", "On-site"],
          ].map(([option, label]) => (
            <React.Fragment key={option}>
              {renderChipButton(label, value.support === option, () => onChange({ ...value, support: option as FilterState["support"] }))}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="solara-filter-section">
        <p className="solara-filter-section__label">Minimum rating</p>
        <div className="solara-filter-cluster">
          {[0, 3, 4, 4.5].map((rating) => (
            <React.Fragment key={rating}>
              {renderChipButton(`${rating}+`, value.minRating === rating, () => onChange({ ...value, minRating: rating }))}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="solara-filter-section">
        <p className="solara-filter-section__label">Sort order</p>
        <div className="solara-filter-cluster">
          {[
            ["relevance", "Relevance"],
            ["rating", "Top rated"],
            ["projects", "Most projects"],
            ["response", "Fastest reply"],
          ].map(([option, label]) => (
            <React.Fragment key={option}>
              {renderChipButton(label, sortBy === option, () => onSortByChange(option as SortOption))}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div className="solara-filter-footer">
        <button type="button" onClick={onClear} className="solara-inline-action solara-inline-action--default">
          Clear filters
        </button>

        <p className="solara-filter-footer__summary">
          {activeSummary.length > 0 ? activeSummary.join(" / ") : "No active filters. Showing the full current screen."}
        </p>
      </div>
    </div>
  );
};

export type HelperFilterState = FilterState;
export type ConnectSortOption = SortOption;
export default HelperFilters;
