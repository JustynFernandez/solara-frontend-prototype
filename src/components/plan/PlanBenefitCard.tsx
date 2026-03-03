import React from "react";
import { motion } from "framer-motion";
import { useEcoMode } from "../../hooks/useEcoMode";

type PlanBenefitCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
};

const PlanBenefitCard: React.FC<PlanBenefitCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  const { ecoModeEnabled } = useEcoMode();
  const motionEnabled = !ecoModeEnabled;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionEnabled ? 0.4 : 0.15,
        delay: motionEnabled ? delay : 0,
      }}
      whileHover={motionEnabled ? { y: -2, scale: 1.02 } : undefined}
      className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-5 shadow-md backdrop-blur-lg transition-shadow duration-300 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    >
      {/* Subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-solara-blue/5 via-transparent to-solara-gold/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 text-solara-navy shadow-sm dark:from-slate-800 dark:to-slate-700 dark:text-slate-200">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="mb-1 font-semibold text-slate-900 dark:text-white">
            {title}
          </h4>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanBenefitCard;
