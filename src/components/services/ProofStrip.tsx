import React from "react";
import SectionContainer from "../ui/section-container";
import { metrics, testimonials } from "../../data/servicesContent";

const ProofStrip: React.FC = () => (
  <SectionContainer className="py-10">
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-white/50 bg-white/80 p-4 text-slate-900 shadow-[0_18px_70px_rgba(0,51,102,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
            <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">{metric.label}</p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200/80">{metric.detail}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl border border-white/50 bg-white/80 p-4 text-slate-900 shadow-[0_18px_70px_rgba(0,51,102,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
            <p className="text-sm text-slate-700 dark:text-slate-200/90">"{t.quote}"</p>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">{t.title}</p>
          </div>
        ))}
      </div>
    </div>
  </SectionContainer>
);

export default ProofStrip;
