import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useEcoMode } from "../../hooks/useEcoMode";
const PlanFeatureCard = ({ icon, title, tagline, bullets, ctaLabel, ctaHref, stat, accentColor, }) => {
    const { ecoModeEnabled } = useEcoMode();
    const motionEnabled = !ecoModeEnabled;
    const accentStyles = {
        blue: {
            iconBg: "from-blue-500 to-blue-600",
            iconShadow: "shadow-[0_8px_32px_rgba(0,123,255,0.3)]",
            ctaBg: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
            statBg: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
            glow: "group-hover:shadow-[0_24px_80px_rgba(0,123,255,0.25)]",
        },
        gold: {
            iconBg: "from-amber-500 to-amber-600",
            iconShadow: "shadow-[0_8px_32px_rgba(212,175,55,0.3)]",
            ctaBg: "from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
            statBg: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
            glow: "group-hover:shadow-[0_24px_80px_rgba(212,175,55,0.25)]",
        },
    };
    const styles = accentStyles[accentColor];
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: motionEnabled ? 0.5 : 0.2 }, whileHover: motionEnabled ? { y: -4 } : undefined, className: `group relative flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl transition-shadow duration-500 dark:border-white/10 dark:bg-white/5 ${styles.glow}`, children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5" }), _jsx("div", { className: "relative mb-6 flex justify-center", children: _jsx("div", { className: `flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${styles.iconBg} ${styles.iconShadow} text-white`, children: icon }) }), _jsxs("div", { className: "relative flex flex-1 flex-col", children: [_jsx("h3", { className: "mb-2 text-center text-2xl font-semibold text-slate-900 dark:text-white", children: title }), _jsx("p", { className: "mb-5 text-center text-sm text-slate-600 dark:text-slate-300", children: tagline }), _jsx("ul", { className: "mb-6 flex-1 space-y-3", children: bullets.map((bullet) => (_jsxs("li", { className: "flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200", children: [_jsx("span", { className: "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30", children: _jsx(Check, { className: "h-3 w-3 text-emerald-600 dark:text-emerald-400" }) }), bullet] }, bullet))) }), _jsxs(Link, { to: ctaHref, className: `group/btn mb-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${styles.ctaBg} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl`, children: [ctaLabel, _jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover/btn:translate-x-1" })] }), _jsx("div", { className: "flex justify-center", children: _jsxs("span", { className: `inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${styles.statBg}`, children: [_jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-70" }), stat] }) })] })] }));
};
export default PlanFeatureCard;
