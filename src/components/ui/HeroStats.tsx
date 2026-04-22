import React from "react";
import { motion } from "framer-motion";
import { useEcoMode } from "../../hooks/useEcoMode";

const stats = [
  { label: "Active Helpers", value: "2,500+", color: "blue" },
  { label: "kWh Shared", value: "1.2M", color: "sky" },
  { label: "Communities", value: "150+", color: "sky" },
];

type HeroStatsProps = {
  className?: string;
};

const HeroStats: React.FC<HeroStatsProps> = ({ className = "" }) => {
  const { ecoModeEnabled } = useEcoMode();

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={ecoModeEnabled ? false : { opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: ecoModeEnabled ? 0 : 0.6 + idx * 0.1,
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="group rounded-2xl border border-white/70 bg-white/85 px-6 py-4 shadow-lg backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#050a16]/85 dark:hover:shadow-solara-blue/10 glow-card"
        >
          <p className={`text-2xl font-bold tabular-nums ${
            stat.color === "blue" ? "text-solara-blue" :
            stat.color === "gold" ? "text-solara-gold glow-gold" :
            "text-solara-sky"
          } dark:text-white`}>
            {stat.value}
          </p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroStats;
