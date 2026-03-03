import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import SectionContainer from "../components/ui/section-container";
import SolarNavigatorWizard, { NavigatorAnswers } from "../components/ui/solar-navigator-wizard";
import SolarPlanResult, { buildPlan, SolarPlan } from "../components/ui/solar-plan-result";
import AnimatedButton from "../components/ui/animated-button";

const SolarNavigatorPage: React.FC = () => {
  const [plan, setPlan] = useState<SolarPlan | null>(null);
  const [open, setOpen] = useState(false);

  const handleComplete = (answers: NavigatorAnswers) => {
    setPlan(buildPlan(answers));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.classList.add("overflow-hidden");
      root.setAttribute("data-overlay", "navigator");
      document.body.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
      if (root.getAttribute("data-overlay") === "navigator") {
        root.removeAttribute("data-overlay");
      }
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      root.classList.remove("overflow-hidden");
      if (root.getAttribute("data-overlay") === "navigator") {
        root.removeAttribute("data-overlay");
      }
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-[#eef3ff] to-[#fff9ed] px-6 py-12 text-slate-900 dark:from-[#030713] dark:via-[#040a16] dark:to-[#051026] dark:text-white">
      <SectionContainer className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-100">Plan</p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Solar Navigator</h1>
          <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">
            A focused, full-screen wizard that crafts a tailored solar plan. Answer once and we'll connect you to projects, helpers, and guides.
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.div layoutId="navigator-cta">
              <AnimatedButton onClick={() => setOpen(true)} className="px-5 py-3">
                Start Solar Navigator
              </AnimatedButton>
            </motion.div>
            <AnimatedButton href="/configurator" variant="outline" className="px-5 py-3">
              3D Roof Configurator
            </AnimatedButton>
            <AnimatedButton href="/learn" variant="outline" className="px-5 py-3">
              Browse guides
            </AnimatedButton>
          </div>
          <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-100">Personalised</p>
              <p>Answers map to projects, helpers, and learn guides instantly.</p>
            </div>
            <div className="rounded-2xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-100">Safety-first</p>
              <p>Includes a safety acknowledgement and flags that need certified pros.</p>
            </div>
            <div className="rounded-2xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-100">Save & resume</p>
              <p>Drafts auto-save; resume later without losing progress.</p>
            </div>
          </div>
        </motion.div>
      </SectionContainer>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[120] flex items-stretch justify-center bg-[linear-gradient(180deg,#eef3ff_0%,#e6edf9_100%)] px-3 py-0 dark:bg-[#05070f] dark:bg-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  layoutId="navigator-cta"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.98, y: 12 }}
                  animate={{ scale: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ scale: 0.98, opacity: 0, y: 12, transition: { duration: 0.2 } }}
                  className="relative h-[100dvh] w-full max-w-6xl overflow-hidden rounded-none border border-slate-200/70 bg-gradient-to-br from-white via-[#eef4ff] to-[#fff4e6] text-slate-900 shadow-[0_36px_140px_rgba(0,0,0,0.55)] dark:border-white/15 dark:from-[#0e1f3a] dark:via-[#0c162f] dark:to-[#0f223f] dark:text-white sm:rounded-[32px]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:border-white/15 dark:bg-white/10 dark:text-white"
                  >
                    Close
                  </button>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,123,255,0.2),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(255,204,0,0.18),transparent_38%)]" />
                  <div className="grid h-full gap-4 overflow-hidden p-4 lg:grid-cols-[1.4fr_0.95fr]">
                <div className="h-full overflow-y-auto rounded-2xl border border-slate-200/70 bg-white/95 p-3 dark:border-white/15 dark:bg-[#0b1326]/95">
                  <SolarNavigatorWizard onComplete={handleComplete} />
                </div>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/95 p-3 dark:border-white/15 dark:bg-[#0b1326]/95">
                  {plan ? (
                    <div className="h-full overflow-y-auto">
                      <SolarPlanResult plan={plan} />
                    </div>
                  ) : (
                    <div className="h-full rounded-2xl border border-slate-200/80 bg-white/90 p-4 text-sm text-slate-700 dark:border-white/20 dark:bg-[#0b172e]/95 dark:text-slate-200">
                      Complete the flow to see your personalised plan, readiness score, and recommended guides.
                    </div>
                  )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default SolarNavigatorPage;
