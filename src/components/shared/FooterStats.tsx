import React from "react";
import { helpers } from "@/data/helpers";
import { projects } from "@/data/projects";
import { guides } from "@/data/learnContent";

const stats = [
  {
    label: "Verified helpers",
    value: String(helpers.filter((helper) => helper.verified).length),
  },
  {
    label: "Active projects",
    value: String(projects.filter((project) => project.status === "Recruiting" || project.status === "In Progress").length),
  },
  {
    label: "Guides available",
    value: String(guides.length),
  },
] as const;

type FooterStatsProps = {
  className?: string;
};

const FooterStats: React.FC<FooterStatsProps> = ({ className = "" }) => {
  return (
    <div className={`solara-footer__stats grid grid-cols-3 gap-4 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="solara-footer__stat-item flex flex-col gap-1 px-2 py-3 text-center">
          <span className="text-2xl font-semibold sm:text-[1.7rem]">{stat.value}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterStats;
