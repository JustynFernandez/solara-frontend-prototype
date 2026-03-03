import React, { useEffect, useState, useRef } from "react";
import { useEcoMode } from "../../hooks/useEcoMode";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

const stats: Stat[] = [
  { label: "Helpers Online", value: 142, prefix: "" },
  { label: "kWh Shared", value: 1200000, suffix: "+" },
  { label: "Communities", value: 150, suffix: "+" },
];

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, prefix = "", suffix = "", disabled }) => {
  const [displayValue, setDisplayValue] = useState(disabled ? value : 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (disabled || hasAnimated) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const steps = 40;
          const stepDuration = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(value * eased));

            if (step >= steps) {
              clearInterval(timer);
              setDisplayValue(value);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, disabled, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
};

type FooterStatsProps = {
  className?: string;
};

const FooterStats: React.FC<FooterStatsProps> = ({ className = "" }) => {
  const { ecoModeEnabled } = useEcoMode();

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          <span className="text-2xl font-bold text-white sm:text-3xl">
            <AnimatedCounter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              disabled={ecoModeEnabled}
            />
          </span>
          <span className="text-xs font-medium text-slate-400 sm:text-sm">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterStats;
