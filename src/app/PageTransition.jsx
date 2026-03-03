import React from "react";
import { motion } from "framer-motion";
import { useEcoMode } from "@/hooks/useEcoMode";

const PageTransition = ({ children }) => {
  const { ecoModeEnabled } = useEcoMode();

  if (ecoModeEnabled) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="relative"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -16,
        scale: 0.98,
        filter: "blur(4px)",
      }}
      transition={{
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
        filter: { duration: 0.25 },
      }}
      className="relative"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent dark:from-white/5" aria-hidden />
      {children}
    </motion.div>
  );
};

export default PageTransition;

