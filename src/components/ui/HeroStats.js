import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useEcoMode } from "../../hooks/useEcoMode";
const stats = [
    { label: "Active Helpers", value: "2,500+", color: "blue" },
    { label: "kWh Shared", value: "1.2M", color: "sky" },
    { label: "Communities", value: "150+", color: "sky" },
];
const HeroStats = ({ className = "" }) => {
    const { ecoModeEnabled } = useEcoMode();
    return (_jsx("div", { className: `flex flex-wrap justify-center gap-4 ${className}`, children: stats.map((stat, idx) => (_jsxs(motion.div, { initial: ecoModeEnabled ? false : { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: {
                delay: ecoModeEnabled ? 0 : 0.6 + idx * 0.1,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
            }, className: "group rounded-2xl border border-white/70 bg-white/85 px-6 py-4 shadow-lg backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#050a16]/85 dark:hover:shadow-solara-blue/10 glow-card", children: [_jsx("p", { className: `text-2xl font-bold tabular-nums ${stat.color === "blue" ? "text-solara-blue" :
                        stat.color === "gold" ? "text-solara-gold glow-gold" :
                            "text-solara-sky"} dark:text-white`, children: stat.value }), _jsx("p", { className: "text-sm font-medium text-slate-600 dark:text-slate-300", children: stat.label })] }, stat.label))) }));
};
export default HeroStats;
