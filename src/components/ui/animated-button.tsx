import React from "react";
import { motion } from "framer-motion";
import { buttonBase, buttonSizes, buttonVariants, type ButtonSize, type ButtonVariant } from "../../lib/buttonVariants";

type AnimatedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

/**
 * AnimatedButton - A performant, delightful button with CSS-based hover effects.
 *
 * Simplified from the previous spring-based implementation for better performance.
 * Uses CSS transitions for smooth hover states and Framer Motion only for tap feedback.
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  ...props
}) => {
  const sizeClasses = buttonSizes[size];
  const classes = `${buttonBase} ${buttonVariants[variant]} ${sizeClasses} ${className}`;

  const MotionComponent: typeof motion.a | typeof motion.button = href ? motion.a : motion.button;
  const mergedProps = href
    ? ({ ...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>), href } as React.AnchorHTMLAttributes<HTMLAnchorElement>)
    : ({ ...(props as React.ButtonHTMLAttributes<HTMLButtonElement>) } as React.ButtonHTMLAttributes<HTMLButtonElement>);

  return (
    <MotionComponent
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={classes}
      {...mergedProps}
    >
      {/* Soft glow layer - CSS only */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Sheen sweep on hover - CSS only */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full rounded-[inherit] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:translate-x-full group-hover:opacity-70"
        aria-hidden="true"
      />

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </MotionComponent>
  );
};

export default AnimatedButton;
