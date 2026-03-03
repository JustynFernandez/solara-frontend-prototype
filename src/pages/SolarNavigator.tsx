import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS, NavigatorAnswerMap, generateSolarPlan } from "../data/solarNavigator";
import NavigatorShell from "../components/plan/NavigatorShell";
import NavigatorProgress from "../components/plan/NavigatorProgress";
import QuestionRenderer from "../components/plan/QuestionRenderer";
import ResultsPanel from "../components/plan/ResultsPanel";
import ExitConfirmDialog from "../components/plan/ExitConfirmDialog";
import { useNavigatorStorage } from "../components/plan/useNavigatorStorage";
import AnimatedButton from "../components/ui/animated-button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";

const SolarNavigator: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { draft, saveDraft, clearDraft, savePlan, seedProject, seedRequestHelp } = useNavigatorStorage();
  const [answers, setAnswers] = useState<NavigatorAnswerMap>(draft?.answers || {});
  const [currentIndex, setCurrentIndex] = useState<number>(draft?.currentIndex || 0);
  const [showResume, setShowResume] = useState<boolean>(Boolean(draft));
  const [showExit, setShowExit] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);

  const total = QUESTIONS.length;
  const isResults = currentIndex >= total;
  const plan = useMemo(() => generateSolarPlan(answers), [answers]);
  const currentQuestion = QUESTIONS[Math.min(currentIndex, total - 1)];

  useEffect(() => {
    if (showResume) return;
    saveDraft({ answers, currentIndex, updatedAt: Date.now() });
  }, [answers, currentIndex, saveDraft, showResume]);

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const canContinue = useMemo(() => {
    if (currentQuestion?.type === "info") return true;
    return Boolean(answers[currentQuestion?.id]);
  }, [answers, currentQuestion]);

  const goNext = () => {
    if (currentQuestion?.type !== "info" && !canContinue) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex === total) {
      setCurrentIndex(nextIndex);
      savePlan(plan);
      setPlanSaved(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const goBack = () => {
    if (isResults) {
      setCurrentIndex(total - 1);
      return;
    }
    if (currentIndex === 0) return;
    setCurrentIndex((i) => i - 1);
  };

  const exitFlow = () => {
    if (Object.keys(answers).length > 0) {
      setShowExit(true);
    } else {
      navigate("/solar-navigator");
    }
  };

  const handleResumeChoice = (mode: "resume" | "restart") => {
    if (mode === "resume") {
      setShowResume(false);
    } else {
      clearDraft();
      setAnswers({});
      setCurrentIndex(0);
      setShowResume(false);
    }
  };

  const handleSavePlan = () => {
    savePlan(plan);
    setPlanSaved(true);
  };

  const handleCreateProject = () => {
    const id = seedProject(plan);
    navigate(`/projects/${id}`);
  };

  const handleRequestHelp = () => {
    seedRequestHelp();
    navigate("/connect?requestHelp=1");
  };

  return (
    <NavigatorShell>
      {showResume ? (
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_26px_90px_rgba(0,51,102,0.35)]">
          <p className="text-sm uppercase tracking-[0.2em] text-[#c7d2fe]">Draft detected</p>
          <h1 className="text-3xl font-semibold text-white">Resume your Solar Navigator?</h1>
          <p className="max-w-xl text-sm text-slate-200/80">You have an in-progress plan. Continue where you left off or start fresh.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <AnimatedButton onClick={() => handleResumeChoice("resume")} className="px-5 py-3">
              Resume
            </AnimatedButton>
            <AnimatedButton variant="outline" onClick={() => handleResumeChoice("restart")} className="px-5 py-3">
              Start over
            </AnimatedButton>
          </div>
        </div>
      ) : (
        <div className="grid flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-3xl border border-white/60 bg-white/85 p-5 text-slate-900 shadow-[0_26px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
            {!isResults && currentQuestion && (
              <>
                <NavigatorProgress current={currentIndex} total={total} />
                <QuestionRenderer question={currentQuestion} index={currentIndex} total={total} answers={answers} onAnswer={handleAnswer} />
              </>
            )}

            {isResults && (
              <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.1 : 0.35 }} className="space-y-4">
                <NavigatorProgress current={total - 1} total={total} />
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Done</p>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Navigator complete</h2>
                  <p className="text-sm text-slate-700 dark:text-slate-200/80">Review your personalised plan and take the next step.</p>
                </div>
              </motion.div>
            )}

            <div className="flex flex-wrap justify-between gap-2">
              <AnimatedButton variant="outline" onClick={goBack} className="px-4 py-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </AnimatedButton>
              {!isResults ? (
                <AnimatedButton onClick={goNext} className="px-4 py-2" disabled={!canContinue}>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              ) : (
                <AnimatedButton onClick={handleSavePlan} className="px-4 py-2" variant={planSaved ? "outline" : "primary"}>
                  {planSaved ? "Plan saved" : "Save plan"}
                </AnimatedButton>
              )}
            </div>

            <button
              type="button"
              onClick={exitFlow}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 hover:border-[#ffd70066] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            >
              Exit
            </button>
          </div>

          <div className="space-y-4">
            {!isResults && (
              <motion.div
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.1 : 0.35 }}
                className="rounded-3xl border border-white/60 bg-white/85 p-5 text-slate-900 shadow-[0_26px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Stay focused</p>
                <p className="text-sm text-slate-700 dark:text-slate-200/80">One question at a time. Progress saves automatically.</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-solara-navy dark:text-indigo-200">
                  <PlayCircle className="h-4 w-4" />
                  Press Enter to continue when an option is selected.
                </div>
              </motion.div>
            )}
            {isResults && (
              <ResultsPanel plan={plan} onSave={handleSavePlan} onCreateProject={handleCreateProject} onRequestHelp={handleRequestHelp} onDashboard={() => navigate("/my-account")} />
            )}
          </div>
        </div>
      )}

      <ExitConfirmDialog open={showExit} onCancel={() => setShowExit(false)} onConfirm={() => navigate("/solar-navigator")} />
    </NavigatorShell>
  );
};

export default SolarNavigator;
