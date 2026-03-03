import React from "react";
import { motion } from "framer-motion";
import { SolarPlan } from "../../data/solarNavigator";
import AnimatedButton from "../ui/animated-button";
import { CheckCircle2, AlertTriangle, BookOpen } from "lucide-react";

type Props = {
  plan: SolarPlan;
  onSave: () => void;
  onCreateProject: () => void;
  onRequestHelp: () => void;
  onDashboard?: () => void;
};

const ResultsPanel: React.FC<Props> = ({ plan, onSave, onCreateProject, onRequestHelp, onDashboard }) => {
  const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4 rounded-3xl border border-white/50 bg-white/80 p-6 text-slate-900 shadow-[0_26px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Your Solar Plan</p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Personalised results</h2>
      </div>

      <motion.div variants={item} className="rounded-2xl border border-[#007bff40] bg-white/70 p-4 dark:bg-[#0b1b3a]/70">
        <p className="text-sm text-solara-navy dark:text-indigo-200">Readiness score</p>
        <p className="text-3xl font-semibold text-slate-900 dark:text-white">{plan.readinessScore} / 100</p>
        <p className="text-sm text-slate-700 dark:text-slate-200/80">Higher means you can proceed with fewer blockers.</p>
      </motion.div>

      <motion.div variants={item} className="space-y-2 rounded-2xl border border-[#ffd70040] bg-white/70 p-4 dark:bg-white/5">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Recommended first step</p>
        <p className="text-sm text-slate-700 dark:text-slate-200/80">{plan.recommendedFirstStep}</p>
      </motion.div>

      <motion.div variants={item} className="space-y-2 rounded-2xl border border-white/20 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Pathway</p>
        <ol className="space-y-2 text-sm text-slate-800 dark:text-slate-100">
          {plan.pathway.map((step, idx) => (
            <li key={step} className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#003366] text-[#ffd700]">{idx + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {plan.riskFlags.length > 0 && (
        <motion.div variants={item} className="space-y-2 rounded-2xl border border-[#ffcc00]/40 bg-[#fff7da] p-4 text-[#7a5a00] dark:bg-[#2c1f00]/40 dark:text-[#ffea9c]">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4 w-4" />
            Watch outs
          </div>
          <ul className="space-y-1 text-sm">
            {plan.riskFlags.map((risk) => (
              <li key={risk} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ffcc00]" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div variants={item} className="space-y-2 rounded-2xl border border-white/20 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <CheckCircle2 className="h-4 w-4 text-[#ffd700]" />
          Seed tasks
        </div>
        <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-100">
          {plan.seedTasks.map((task) => (
            <li key={task.title} className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${task.status === "done" ? "bg-[#ffd700]" : "bg-white/40"}`} />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={item} className="space-y-2 rounded-2xl border border-white/20 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <BookOpen className="h-4 w-4 text-[#ffd700]" />
          Recommended guides
        </div>
        <div className="flex flex-wrap gap-2">
          {plan.recommendedGuides.map((slug) => (
            <a
              key={slug}
              href={`/learn/${slug}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-900 hover:border-[#ffd70066] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:border-white/15 dark:bg-white/10 dark:text-slate-100"
            >
              {slug}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="grid gap-2 sm:grid-cols-2">
        <AnimatedButton onClick={onCreateProject} className="w-full justify-center px-4 py-3">
          Create Project Workspace
        </AnimatedButton>
        <AnimatedButton variant="outline" onClick={onRequestHelp} className="w-full justify-center px-4 py-3">
          Request Help
        </AnimatedButton>
        <AnimatedButton variant="outline" onClick={onSave} className="w-full justify-center px-4 py-3">
          Save plan
        </AnimatedButton>
        {onDashboard && (
          <AnimatedButton variant="outline" onClick={onDashboard} className="w-full justify-center px-4 py-3">
            Go to My Solara
          </AnimatedButton>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ResultsPanel;
