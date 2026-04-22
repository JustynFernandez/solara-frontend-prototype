import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Home, Building2, Leaf, HandHeart, Sparkles, BadgeCheck, Wrench } from "lucide-react";
import StepIndicator from "./StepIndicator";
import AnimatedButton from "./animated-button";
const questions = [
    {
        id: "dwelling",
        prompt: "Do you rent or own?",
        options: [
            { value: "renter", label: "Renter", description: "Flat / apartment", icon: Building },
            { value: "owner", label: "Homeowner", description: "House with roof", icon: Home },
            { value: "org", label: "Organisation", description: "School, coop, community", icon: Building2 },
        ],
    },
    {
        id: "goal",
        prompt: "Primary goal?",
        options: [
            { value: "bills", label: "Lower bills", description: "Cut monthly energy costs", icon: Leaf },
            { value: "backup", label: "Backup power", description: "Resilience & batteries", icon: HandHeart },
            { value: "impact", label: "Environmental impact", description: "CO2 reduction", icon: Sparkles },
            { value: "learning", label: "Learning", description: "Hands-on experience", icon: Wrench },
        ],
    },
    {
        id: "budget",
        prompt: "Upfront budget?",
        options: [
            { value: "free", label: "Free", description: "Subscriptions / community", icon: Sparkles },
            { value: "lt200", label: "< GBP 200", description: "Portable / starter kits", icon: Leaf },
            { value: "200-1000", label: "GBP 200-1,000", description: "Portable + small battery", icon: Home },
            { value: "gt1000", label: "> GBP 1,000", description: "Rooftop / bigger kits", icon: Building2 },
        ],
    },
    {
        id: "space",
        prompt: "What space do you have?",
        options: [
            { value: "flat", label: "Flat / balcony", description: "Limited outdoor space", icon: Building },
            { value: "roof", label: "House with roof", description: "Rooftop-friendly", icon: Home },
            { value: "shared", label: "Shared building", description: "Community spaces", icon: Building2 },
            { value: "rural", label: "Rural outdoor", description: "Plenty of space", icon: Leaf },
        ],
    },
    {
        id: "confidence",
        prompt: "DIY / electrics confidence?",
        options: [
            { value: "beginner", label: "Beginner", description: "Prefer guidance", icon: Sparkles },
            { value: "intermediate", label: "Intermediate", description: "Comfortable", icon: HandHeart },
            { value: "advanced", label: "Advanced", description: "Can lead installs", icon: BadgeCheck },
        ],
    },
];
const SolarNavigatorWizard = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const currentQuestion = questions[step];
    const isLast = step === questions.length - 1;
    const handleSelect = (value) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    };
    const canContinue = useMemo(() => Boolean(answers[currentQuestion.id]), [answers, currentQuestion]);
    const handleNext = () => {
        if (!canContinue)
            return;
        if (isLast) {
            onComplete(answers);
        }
        else {
            setStep((s) => s + 1);
        }
    };
    const handleBack = () => {
        if (step === 0)
            return;
        setStep((s) => s - 1);
    };
    return (_jsxs("div", { className: "space-y-4 rounded-3xl border border-white/70 bg-white/95 p-4 text-slate-900 shadow-[0_24px_80px_rgba(0,51,102,0.18)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#0b1326]/95 dark:text-white", children: [_jsx(StepIndicator, { current: step, total: questions.length }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.25 }, className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-xs uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-100", children: ["Step ", step + 1] }), _jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-white", children: currentQuestion.prompt })] }), _jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: currentQuestion.options.map((opt) => {
                                const Icon = opt.icon;
                                const selected = answers[currentQuestion.id] === opt.value;
                                return (_jsxs("button", { type: "button", onClick: () => handleSelect(opt.value), className: `flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4fbf] ${selected
                                        ? "border-[rgba(0,123,255,0.55)] bg-white/90 shadow-[0_12px_32px_rgba(0,51,102,0.18)] dark:border-[rgba(0,123,255,0.6)] dark:bg-[#0b172e]/90"
                                        : "border-white/70 bg-white/80 hover:border-[rgba(0,123,255,0.4)] dark:border-white/15 dark:bg-[#0b172e]/70"}`, "aria-pressed": selected, children: [_jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,123,255,0.12)] text-solara-navy ring-1 ring-[rgba(0,123,255,0.25)] dark:text-indigo-100", children: _jsx(Icon, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-900 dark:text-white", children: opt.label }), _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-200", children: opt.description })] })] }, opt.value));
                            }) })] }, currentQuestion.id) }), _jsxs("div", { className: "flex justify-between gap-2", children: [_jsx(AnimatedButton, { variant: "outline", onClick: handleBack, className: "px-4 py-2", children: "Back" }), _jsx(AnimatedButton, { onClick: handleNext, className: "px-4 py-2", disabled: !canContinue, children: isLast ? "See my plan" : "Next" })] })] }));
};
export { questions as navigatorQuestions };
export default SolarNavigatorWizard;
