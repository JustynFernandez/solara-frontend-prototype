import React, { useEffect, useState, useRef } from "react";
import { useEcoMode } from "../../hooks/useEcoMode";

type AnimatedStatProps = {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Animated counter that counts from 0 to target value.
 * Respects eco mode - shows instant value when enabled.
 */
const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value,
  label,
  suffix = "",
  duration = 1500,
  className = "",
}) => {
  const { ecoModeEnabled } = useEcoMode();
  const [displayValue, setDisplayValue] = useState(ecoModeEnabled ? value : 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If eco mode is on or already animated, show final value
    if (ecoModeEnabled) {
      setDisplayValue(value);
      return;
    }

    // Intersection observer to trigger animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ecoModeEnabled, value, hasAnimated]);

  const animateValue = () => {
    const startTime = performance.now();
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeOut);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  };

  // Format number with commas
  const formattedValue = displayValue.toLocaleString();

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        {formattedValue}
        {suffix && <span className="text-solara-blue">{suffix}</span>}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
        {label}
      </div>
    </div>
  );
};

export default AnimatedStat;
