import { jsx as _jsx } from "react/jsx-runtime";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
const PageReveal = ({ className, children, delay = 0, mode = "mount", }) => {
    const reducedMotion = useReducedMotion();
    if (reducedMotion) {
        return _jsx("div", { className: className, children: children });
    }
    if (mode === "in-view") {
        return (_jsx(motion.div, { className: cn(className), initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }, children: children }));
    }
    return (_jsx(motion.div, { className: cn(className), initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }, children: children }));
};
export default PageReveal;
