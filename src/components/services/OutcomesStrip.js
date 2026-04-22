import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { outcomes } from "../../data/servicesContent";
import { motion, useReducedMotion } from "framer-motion";
import * as Icons from "lucide-react";
import SectionContainer from "../ui/section-container";
const OutcomesStrip = () => {
    const reduceMotion = useReducedMotion();
    return (_jsx(SectionContainer, { className: "mt-10", children: _jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: outcomes.map((outcome, idx) => {
                const Icon = Icons[outcome.icon] || Icons.Circle;
                return (_jsxs(motion.div, { initial: { opacity: 0, y: reduceMotion ? 0 : 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: reduceMotion ? 0.1 : 0.5, delay: idx * 0.04 }, className: "rounded-2xl border border-white/40 bg-white/80 p-4 text-slate-900 shadow-[0_18px_70px_rgba(0,51,102,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white", children: [_jsx(Icon, { className: "h-4 w-4 text-[#ffd700]" }), outcome.title] }), _jsx("p", { className: "mt-2 text-sm text-slate-700 dark:text-slate-200/85", children: outcome.description })] }, outcome.title));
            }) }) }));
};
export default OutcomesStrip;
