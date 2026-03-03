import React from "react";
import { motion } from "framer-motion";
import { useEcoMode } from "../../hooks/useEcoMode";

type Step = {
  label: string;
  description?: string;
};

type StepIndicatorProps = {
  // New stepped interface
  steps?: Step[];
  currentStep?: number;
  compact?: boolean;
  // Legacy interface (backward compatible)
  current?: number;
  total?: number;
  // Common
  className?: string;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep = 0,
  compact = false,
  current,
  total,
  className = "",
}) => {
  const { ecoModeEnabled } = useEcoMode();

  // Legacy mode: simple progress bar
  if (typeof current === "number" && typeof total === "number" && !steps) {
    const percent = Math.round(((current + 1) / total) * 100);
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[rgba(0,123,255,0.18)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#003366] via-[#0b4fbf] to-[#d4af37] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-100">
          {percent}%
        </span>
      </div>
    );
  }

  // New mode: stepped visual indicator
  if (!steps || steps.length === 0) return null;

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "justify-between"} ${className}`}>
      {steps.map((step, idx) => {
        const isComplete = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <React.Fragment key={step.label + idx}>
            <div className={`flex ${compact ? "items-center gap-2" : "flex-col items-center"}`}>
              <motion.div
                initial={false}
                animate={
                  ecoModeEnabled
                    ? {}
                    : {
                        scale: isCurrent ? 1.05 : 1,
                      }
                }
                transition={{ duration: 0.2 }}
                className={`flex items-center justify-center rounded-full border-2 transition-colors ${
                  compact ? "h-8 w-8" : "h-10 w-10"
                } ${
                  isComplete
                    ? "border-solara-blue bg-solara-blue text-white"
                    : isCurrent
                    ? "border-solara-blue bg-solara-blue text-white"
                    : "border-slate-300 bg-transparent text-slate-400 dark:border-slate-600"
                }`}
              >
                {isComplete ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className={`font-semibold ${compact ? "text-xs" : "text-sm"}`}>{idx + 1}</span>
                )}
              </motion.div>
              {!compact && (
                <span
                  className={`mt-2 text-center text-xs font-medium ${
                    isCurrent ? "text-solara-blue dark:text-solara-sky" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              )}
              {compact && isCurrent && (
                <span className="text-xs font-medium text-solara-blue dark:text-solara-sky">{step.label}</span>
              )}
            </div>
            {idx < steps.length - 1 && (
              <div className={`${compact ? "w-8" : "mx-2 flex-1"} h-0.5 bg-slate-200 dark:bg-slate-700`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isComplete ? "100%" : "0%" }}
                  className="h-full bg-solara-blue"
                  transition={ecoModeEnabled ? { duration: 0 } : { duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
