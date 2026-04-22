import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { buttonBase, buttonSizes, buttonVariants } from "../../lib/buttonVariants";
/**
 * AnimatedButton - A performant, delightful button with CSS-based hover effects.
 *
 * Simplified from the previous spring-based implementation for better performance.
 * Uses CSS transitions for smooth hover states and Framer Motion only for tap feedback.
 */
const AnimatedButton = ({ variant = "primary", size = "md", children, className = "", href, ...props }) => {
    const sizeClasses = buttonSizes[size];
    const classes = `${buttonBase} ${buttonVariants[variant]} ${sizeClasses} ${className}`;
    const MotionComponent = href ? motion.a : motion.button;
    const mergedProps = href
        ? { ...props, href }
        : { ...props };
    return (_jsxs(MotionComponent, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.97 }, transition: { type: "spring", stiffness: 400, damping: 25 }, className: classes, ...mergedProps, children: [_jsx("span", { className: "pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", "aria-hidden": "true" }), _jsx("span", { className: "pointer-events-none absolute inset-0 -translate-x-full rounded-[inherit] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-500 ease-out group-hover:translate-x-full group-hover:opacity-70", "aria-hidden": "true" }), _jsx("span", { className: "relative z-10", children: children })] }));
};
export default AnimatedButton;
