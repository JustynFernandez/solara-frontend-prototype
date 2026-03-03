import React from "react";
import { pillars } from "../../data/servicesContent";
import AnimatedButton from "../ui/animated-button";
import SectionContainer from "../ui/section-container";
import { motion, useReducedMotion } from "framer-motion";

const PillarMap: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <SectionContainer className="space-y-6 py-10">
      <div className="space-y-2 text-slate-900 dark:text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Pillars</p>
        <h2 className="text-3xl font-semibold">Plan, coordinate, and sustain</h2>
        <p className="text-sm text-slate-700 dark:text-slate-200/80">Each pillar links to the next so you never lose momentum.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.45, delay: idx * 0.05 }}
            className="flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/80 p-5 text-slate-900 shadow-[0_22px_80px_rgba(0,51,102,0.26)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-solara-navy dark:text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-[#ffd700]" aria-hidden />
              {pillar.title}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200/85">{pillar.description}</p>
            <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-100">
              {pillar.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#007bff]" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <AnimatedButton href={pillar.cta.href} className="mt-auto w-full justify-center px-4 py-2">
              {pillar.cta.label}
            </AnimatedButton>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default PillarMap;
