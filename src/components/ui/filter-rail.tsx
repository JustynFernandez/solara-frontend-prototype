import React from "react";
import { cn } from "@/lib/utils";

type FilterRailProps = {
  label?: string;
  summary?: React.ReactNode;
  controls: React.ReactNode;
  className?: string;
};

const FilterRail: React.FC<FilterRailProps> = ({ label, summary, controls, className }) => (
  <div className={cn("solara-filter-rail", className)}>
    <div className="solara-filter-rail__copy">
      {label ? <p className="solara-filter-rail__label">{label}</p> : null}
      {summary ? <div className="solara-filter-rail__summary">{summary}</div> : null}
    </div>
    <div className="solara-filter-rail__controls">{controls}</div>
  </div>
);

export default FilterRail;
