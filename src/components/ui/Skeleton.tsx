import React from "react";
import { useEcoMode } from "../../hooks/useEcoMode";

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

/**
 * Base skeleton component with shimmer animation.
 * Respects eco mode - disables animation when enabled.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  animate = true,
}) => {
  const { ecoModeEnabled } = useEcoMode();
  const shouldAnimate = animate && !ecoModeEnabled;

  return (
    <div
      className={`
        rounded-lg bg-slate-200 dark:bg-slate-700
        ${shouldAnimate ? "animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] dark:from-slate-700 dark:via-slate-600 dark:to-slate-700" : ""}
        ${className}
      `}
      aria-hidden="true"
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 1,
  className = "",
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 ${i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}`}
      />
    ))}
  </div>
);

interface SkeletonAvatarProps {
  size?: "sm" | "md" | "lg";
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = "md",
}) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };
  return <Skeleton className={`rounded-full ${sizes[size]}`} />;
};

export const SkeletonBadge: React.FC<{ className?: string }> = ({
  className = "",
}) => <Skeleton className={`h-6 w-16 rounded-full ${className}`} />;

export const SkeletonButton: React.FC<{ className?: string }> = ({
  className = "",
}) => <Skeleton className={`h-10 w-24 rounded-full ${className}`} />;

export default Skeleton;
