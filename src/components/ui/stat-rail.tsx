import React from "react";
import { cn } from "@/lib/utils";

type StatRailItem = {
  label: string;
  value: React.ReactNode;
  meta?: React.ReactNode;
};

type StatRailProps = {
  items: StatRailItem[];
  className?: string;
};

const StatRail: React.FC<StatRailProps> = ({ items, className }) => (
  <div className={cn("solara-stat-rail", className)}>
    {items.map((item) => (
      <div key={item.label} className="solara-stat-rail__item">
        <p className="solara-stat-rail__label">{item.label}</p>
        <p className="solara-stat-rail__value">{item.value}</p>
        {item.meta ? <p className="solara-stat-rail__meta">{item.meta}</p> : null}
      </div>
    ))}
  </div>
);

export default StatRail;

