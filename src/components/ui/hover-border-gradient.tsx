import React from "react";
import { motion } from "framer-motion";

type HoverBorderGradientProps = {
  children: React.ReactNode;
  className?: string;
};

const HoverBorderGradient: React.FC<HoverBorderGradientProps> = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-md backdrop-blur transition dark:border-white/10 dark:bg-white/5 ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-[radial-gradient(circle_at_10%_20%,rgba(0,123,255,0.22),transparent_25%),radial-gradient(circle_at_90%_10%,rgba(212,175,55,0.22),transparent_20%),radial-gradient(circle_at_80%_80%,rgba(0,191,255,0.18),transparent_20%)]" />
    <div className="relative">{children}</div>
  </motion.div>
);

export default HoverBorderGradient;
