import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import OptionCard from "./OptionCard";
import { ArrowRight } from "lucide-react";
const QuestionRenderer = ({ question, index, total, answers, onAnswer }) => {
    const reduceMotion = useReducedMotion();
    const selected = answers[question.id];
    const firstButtonRef = useRef(null);
    useEffect(() => {
        firstButtonRef.current?.focus();
    }, [question.id]);
    const variants = useMemo(() => ({
        initial: { opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: reduceMotion ? 0 : -10, scale: reduceMotion ? 1 : 0.98 },
    }), [reduceMotion]);
    return (_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: "initial", animate: "animate", exit: "exit", variants: variants, transition: { duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-xs uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200", children: ["Step ", index + 1, " of ", total] }), _jsx("h2", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: question.title }), question.helper && _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-200/80", children: question.helper })] }), question.type === "info" ? (_jsx("div", { className: "rounded-2xl border border-[#ffd70040] bg-white/80 p-4 text-slate-900 shadow-[0_16px_60px_rgba(0,51,102,0.3)] dark:bg-white/5 dark:text-slate-100", children: _jsx("p", { className: "text-sm text-slate-800 dark:text-slate-100", children: question.body }) })) : (_jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: question.options.map((opt, optIndex) => (_jsx(OptionCard, { ref: optIndex === 0 ? firstButtonRef : undefined, label: opt.label, description: opt.description, selected: selected === opt.value, onSelect: () => onAnswer(opt.value), icon: opt.icon ? _jsx(ArrowRight, { className: "h-4 w-4" }) : undefined }, opt.value))) }))] }, question.id) }));
};
export default QuestionRenderer;
