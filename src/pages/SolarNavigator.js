import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS, generateSolarPlan } from "../data/solarNavigator";
import NavigatorShell from "../components/plan/NavigatorShell";
import NavigatorProgress from "../components/plan/NavigatorProgress";
import QuestionRenderer from "../components/plan/QuestionRenderer";
import ResultsPanel from "../components/plan/ResultsPanel";
import ExitConfirmDialog from "../components/plan/ExitConfirmDialog";
import { useNavigatorStorage } from "../components/plan/useNavigatorStorage";
import AnimatedButton from "../components/ui/animated-button";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";
const SolarNavigator = () => {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const { draft, saveDraft, clearDraft, savePlan, seedProject, seedRequestHelp } = useNavigatorStorage();
    const [answers, setAnswers] = useState(draft?.answers || {});
    const [currentIndex, setCurrentIndex] = useState(draft?.currentIndex || 0);
    const [showResume, setShowResume] = useState(Boolean(draft));
    const [showExit, setShowExit] = useState(false);
    const [planSaved, setPlanSaved] = useState(false);
    const total = QUESTIONS.length;
    const isResults = currentIndex >= total;
    const plan = useMemo(() => generateSolarPlan(answers), [answers]);
    const currentQuestion = QUESTIONS[Math.min(currentIndex, total - 1)];
    useEffect(() => {
        if (showResume)
            return;
        saveDraft({ answers, currentIndex, updatedAt: Date.now() });
    }, [answers, currentIndex, saveDraft, showResume]);
    const handleAnswer = (value) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    };
    const canContinue = useMemo(() => {
        if (currentQuestion?.type === "info")
            return true;
        return Boolean(answers[currentQuestion?.id]);
    }, [answers, currentQuestion]);
    const goNext = () => {
        if (currentQuestion?.type !== "info" && !canContinue)
            return;
        const nextIndex = currentIndex + 1;
        if (nextIndex === total) {
            setCurrentIndex(nextIndex);
            savePlan(plan);
            setPlanSaved(true);
        }
        else {
            setCurrentIndex(nextIndex);
        }
    };
    const goBack = () => {
        if (isResults) {
            setCurrentIndex(total - 1);
            return;
        }
        if (currentIndex === 0)
            return;
        setCurrentIndex((i) => i - 1);
    };
    const exitFlow = () => {
        if (Object.keys(answers).length > 0) {
            setShowExit(true);
        }
        else {
            navigate("/solar-navigator");
        }
    };
    const handleResumeChoice = (mode) => {
        if (mode === "resume") {
            setShowResume(false);
        }
        else {
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
    return (_jsxs(NavigatorShell, { children: [showResume ? (_jsxs("div", { className: "relative z-10 flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_26px_90px_rgba(0,51,102,0.35)]", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-[#c7d2fe]", children: "Draft detected" }), _jsx("h1", { className: "text-3xl font-semibold text-white", children: "Resume your Solar Navigator?" }), _jsx("p", { className: "max-w-xl text-sm text-slate-200/80", children: "You have an in-progress plan. Continue where you left off or start fresh." }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [_jsx(AnimatedButton, { onClick: () => handleResumeChoice("resume"), className: "px-5 py-3", children: "Resume" }), _jsx(AnimatedButton, { variant: "outline", onClick: () => handleResumeChoice("restart"), className: "px-5 py-3", children: "Start over" })] })] })) : (_jsxs("div", { className: "grid flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]", children: [_jsxs("div", { className: "space-y-4 rounded-3xl border border-white/60 bg-white/85 p-5 text-slate-900 shadow-[0_26px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white", children: [!isResults && currentQuestion && (_jsxs(_Fragment, { children: [_jsx(NavigatorProgress, { current: currentIndex, total: total }), _jsx(QuestionRenderer, { question: currentQuestion, index: currentIndex, total: total, answers: answers, onAnswer: handleAnswer })] })), isResults && (_jsxs(motion.div, { initial: { opacity: 0, y: reduceMotion ? 0 : 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduceMotion ? 0.1 : 0.35 }, className: "space-y-4", children: [_jsx(NavigatorProgress, { current: total - 1, total: total }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200", children: "Done" }), _jsx("h2", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: "Navigator complete" }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200/80", children: "Review your personalised plan and take the next step." })] })] })), _jsxs("div", { className: "flex flex-wrap justify-between gap-2", children: [_jsxs(AnimatedButton, { variant: "outline", onClick: goBack, className: "px-4 py-2", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] }), !isResults ? (_jsxs(AnimatedButton, { onClick: goNext, className: "px-4 py-2", disabled: !canContinue, children: ["Next", _jsx(ArrowRight, { className: "h-4 w-4" })] })) : (_jsx(AnimatedButton, { onClick: handleSavePlan, className: "px-4 py-2", variant: planSaved ? "outline" : "primary", children: planSaved ? "Plan saved" : "Save plan" }))] }), _jsx("button", { type: "button", onClick: exitFlow, className: "inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 hover:border-[#ffd70066] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:border-white/15 dark:bg-white/5 dark:text-slate-100", children: "Exit" })] }), _jsxs("div", { className: "space-y-4", children: [!isResults && (_jsxs(motion.div, { initial: { opacity: 0, y: reduceMotion ? 0 : 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduceMotion ? 0.1 : 0.35 }, className: "rounded-3xl border border-white/60 bg-white/85 p-5 text-slate-900 shadow-[0_26px_90px_rgba(0,51,102,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-slate-100", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Stay focused" }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200/80", children: "One question at a time. Progress saves automatically." }), _jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs text-solara-navy dark:text-indigo-200", children: [_jsx(PlayCircle, { className: "h-4 w-4" }), "Press Enter to continue when an option is selected."] })] })), isResults && (_jsx(ResultsPanel, { plan: plan, onSave: handleSavePlan, onCreateProject: handleCreateProject, onRequestHelp: handleRequestHelp, onDashboard: () => navigate("/my-account") }))] })] })), _jsx(ExitConfirmDialog, { open: showExit, onCancel: () => setShowExit(false), onConfirm: () => navigate("/solar-navigator") })] }));
};
export default SolarNavigator;
