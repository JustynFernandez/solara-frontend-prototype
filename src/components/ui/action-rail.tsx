import React from "react";
import { cn } from "@/lib/utils";

export type ActionRailItem = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
};

type ActionRailProps = {
  items: ActionRailItem[];
  className?: string;
  compact?: boolean;
};

const ActionRail: React.FC<ActionRailProps> = ({ items, className, compact = false }) => (
  <div className={cn("solara-action-rail", compact && "solara-action-rail--compact", className)}>
    {items.map((item) => (
      <article key={`${item.title}-${item.eyebrow || ""}`} className="solara-action-rail__item">
        <div className="solara-action-rail__copy">
          {item.eyebrow ? <p className="solara-action-rail__eyebrow">{item.eyebrow}</p> : null}
          <h3 className="solara-action-rail__title">{item.title}</h3>
          {item.body ? <p className="solara-action-rail__body">{item.body}</p> : null}
        </div>
        {item.action ? <div className="solara-action-rail__action">{item.action}</div> : null}
      </article>
    ))}
  </div>
);

export default ActionRail;
