import React, { useState } from "react";
import { motion } from "framer-motion";
import { getRandomLoadingMessage } from "../../lib/personality";

type SolarSpinnerProps = {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { wrapper: "py-6", sun: "h-8 w-8", text: "text-xs" },
  md: { wrapper: "py-12", sun: "h-12 w-12", text: "text-sm" },
  lg: { wrapper: "py-16", sun: "h-16 w-16", text: "text-base" },
};

/**
 * SolarSpinner - A delightful loading indicator with personality.
 *
 * Features a spinning sun doodle and witty loading messages
 * that make waiting feel a little more pleasant.
 */
const SolarSpinner: React.FC<SolarSpinnerProps> = ({
  message,
  size = "md",
  className = "",
}) => {
  // Pick a random message on mount, not on every render
  const [displayMessage] = useState(() => message || getRandomLoadingMessage());
  const sizeClasses = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center gap-4 ${sizeClasses.wrapper} ${className}`}
    >
      {/* Spinning sun */}
      <div className={`relative ${sizeClasses.sun}`}>
        <motion.span
          className="handmade-sun absolute inset-0 opacity-80"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        />
        {/* Subtle glow behind the sun */}
        <span
          className="absolute inset-[-25%] rounded-full bg-solara-gold/20 blur-xl"
          aria-hidden="true"
        />
      </div>

      {/* Loading message */}
      <motion.p
        className={`font-medium text-slate-600 dark:text-slate-300 ${sizeClasses.text}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {displayMessage}
      </motion.p>
    </motion.div>
  );
};

export default SolarSpinner;
