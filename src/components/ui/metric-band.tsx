import React from "react";
import { cn } from "@/lib/utils";

export type MetricBandItem = {
  label: React.ReactNode;
  value: React.ReactNode;
  meta?: React.ReactNode;
};

type MetricBandProps = {
  items: MetricBandItem[];
  className?: string;
  compact?: boolean;
};

const MetricBand: React.FC<MetricBandProps> = ({ items, className, compact = false }) => (
  <div className={cn("solara-metric-band", compact && "solara-metric-band--compact", className)}>
    {items.map((item) => (
      <article key={`${item.label}-${item.value}`} className="solara-metric-band__item">
        <p className="solara-metric-band__label">{item.label}</p>
        <p className="solara-metric-band__value">{item.value}</p>
        {item.meta ? <p className="solara-metric-band__meta">{item.meta}</p> : null}
      </article>
    ))}
  </div>
);

export default MetricBand;
