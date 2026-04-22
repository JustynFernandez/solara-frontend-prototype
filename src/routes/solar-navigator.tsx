import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ActionRail from "@/components/ui/action-rail";
import MetricBand from "@/components/ui/metric-band";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
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
    <>
      <PageFrame family="product" width="wide" density="compact">
        <PageReveal mode="mount">
          <PageHeroStage
            family="product"
            eyebrow="Plan"
            title="Solar Navigator"
            body="A focused, full-screen planning flow that translates answers into a workable solar pathway, then hands off to helpers, projects, and guides."
            actions={
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setOpen(true)} className="solara-inline-action solara-inline-action--strong">
                  Start Solar Navigator
                </button>
                <InlineAction to="/configurator">3D roof configurator</InlineAction>
                <InlineAction to="/learn">Browse guides</InlineAction>
              </div>
            }
            metrics={[
              { label: "Personalized", value: "Actionable route", meta: "Answers map to projects, helpers, and guides immediately." },
              { label: "Safety-first", value: "Scope checks", meta: "Flags work that requires a certified professional." },
              { label: "Save and resume", value: "Draft memory", meta: "Drafts auto-save so the plan does not get lost." },
            ]}
            preview={
              <PreviewFrame
                chromeLabel="Navigator preview"
                eyebrow="What the flow does"
                title="One short sequence, then a real handoff."
                body="The goal is to turn a vague idea into a practical next move, not to keep people in a questionnaire."
              >
                <ActionRail
                  compact
                  items={[
                    { eyebrow: "01", title: "Answer a few practical questions.", body: "Type of roof, energy goal, risk, budget, and timing." },
                    { eyebrow: "02", title: "Get a route, blocker check, and readiness signal.", body: "The output is a usable path, not a generic score." },
                    { eyebrow: "03", title: "Move into helpers, guides, or a project workspace.", body: "The result becomes a handoff into the rest of Solara." },
                  ]}
                />
              </PreviewFrame>
            }
          />
        </PageReveal>

        <PageReveal mode="in-view">
          <SurfacePanel variant="product" layout="split" density="comfortable" className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <PreviewFrame chromeLabel="Decision support" viewportClassName="pt-0">
              <MetricBand
                compact
                items={[
                  { label: "Best for", value: "First pass", meta: "When you need the route before you need the tooling." },
                  { label: "Hand-off", value: "Projects + helpers", meta: "The output is designed to become action, not just insight." },
                ]}
              />
            </PreviewFrame>
            <ActionRail
              items={[
                { eyebrow: "Use this when", title: "You want a guided planning route.", body: "Navigator is the quickest way to identify the right next move with safety and scope built in." },
                { eyebrow: "Use configurator when", title: "You already want to test layouts directly.", body: "The 3D configurator is still available for hands-on exploration once the route is clear.", action: <InlineAction to="/configurator">Open configurator</InlineAction> },
              ]}
            />
          </SurfacePanel>
        </PageReveal>
      </PageFrame>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open ? (
              <motion.div
                className="fixed inset-0 z-[120] flex items-stretch justify-center bg-[rgba(8,10,12,0.78)] px-3 py-0 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  onClick={(event) => event.stopPropagation()}
                  initial={{ scale: 0.985, y: 12 }}
                  animate={{ scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ scale: 0.985, opacity: 0, y: 10, transition: { duration: 0.2 } }}
                  className="relative h-[100dvh] w-full max-w-6xl overflow-hidden rounded-none border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,#0d1114_0%,#111618_100%)] text-white shadow-[0_36px_140px_rgba(0,0,0,0.55)] sm:rounded-[24px]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--solara-accent)]"
                  >
                    Close
                  </button>
                  <div className="grid h-full gap-4 overflow-hidden p-4 lg:grid-cols-[1.4fr_0.95fr]">
                    <div className="h-full overflow-y-auto rounded-lg border border-white/10 bg-[#11171b] p-3">
                      <SolarNavigatorWizard onComplete={handleComplete} />
                    </div>
                    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#11171b] p-3">
                      {plan ? (
                        <div className="h-full overflow-y-auto">
                          <SolarPlanResult plan={plan} />
                        </div>
                      ) : (
                        <div className="h-full rounded-md border border-white/10 bg-[#161d22] p-4 text-sm text-slate-300">
                          Complete the flow to see your personalized plan, readiness score, and recommended guides.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default SolarNavigatorPage;
