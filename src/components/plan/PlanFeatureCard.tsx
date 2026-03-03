import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useEcoMode } from "../../hooks/useEcoMode";

type PlanFeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  stat: string;
  accentColor: "blue" | "gold";
};

const PlanFeatureCard: React.FC<PlanFeatureCardProps> = ({
  icon,
  title,
  tagline,
  bullets,
  ctaLabel,
  ctaHref,
  stat,
  accentColor,
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionEnabled ? 0.5 : 0.2 }}
      whileHover={motionEnabled ? { y: -4 } : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl transition-shadow duration-500 dark:border-white/10 dark:bg-white/5 ${styles.glow}`}
    >
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5" />

      {/* Icon area */}
      <div className="relative mb-6 flex justify-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${styles.iconBg} ${styles.iconShadow} text-white`}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col">
        <h3 className="mb-2 text-center text-2xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="mb-5 text-center text-sm text-slate-600 dark:text-slate-300">
          {tagline}
        </p>

        {/* Bullet points */}
        <ul className="mb-6 flex-1 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to={ctaHref}
          className={`group/btn mb-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${styles.ctaBg} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl`}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>

        {/* Stat badge */}
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${styles.statBg}`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-70" />
            {stat}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanFeatureCard;
