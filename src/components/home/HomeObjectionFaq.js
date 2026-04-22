import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
const FAQ_ITEMS = [
    {
        id: "faq-trust",
        question: "How do I know helpers are trustworthy?",
        answer: (_jsxs("p", { children: ["Start in ", _jsx(Link, { to: "/connect", children: "Connect" }), " to review verified profiles, then check our", " ", _jsx(Link, { to: "/safety", children: "safety guidance" }), " and ", _jsx(Link, { to: "/community-guidelines", children: "community guidelines" }), " before matching."] })),
    },
    {
        id: "faq-experience",
        question: "Do I need to know solar before asking for help?",
        answer: (_jsxs("p", { children: ["No. You can ask for support immediately in ", _jsx(Link, { to: "/connect", children: "Connect" }), ", or run ", _jsx(Link, { to: "/solar-navigator", children: "Solar Navigator" }), " ", "first to get a clearer starting point."] })),
    },
    {
        id: "faq-budget",
        question: "Can I start small before committing budget?",
        answer: (_jsxs("p", { children: ["Yes. Begin with ", _jsx(Link, { to: "/plan", children: "Plan" }), " and ", _jsx(Link, { to: "/solar-navigator", children: "Solar Navigator" }), " for low-risk steps, then expand into", " ", _jsx(Link, { to: "/services", children: "Services" }), " when you are ready."] })),
    },
    {
        id: "faq-first-step",
        question: "What should I do first if I am unsure?",
        answer: (_jsxs("p", { children: ["If you want human guidance first, open ", _jsx(Link, { to: "/connect", children: "Connect" }), ". If you want a structured path first, start in", " ", _jsx(Link, { to: "/plan", children: "Plan" }), "."] })),
    },
];
const HomeObjectionFaq = () => {
    const [openItemId, setOpenItemId] = React.useState(null);
    const prefersReducedMotion = useReducedMotion();
    const toggleItem = (itemId) => {
        setOpenItemId((prevId) => (prevId === itemId ? null : itemId));
    };
    return (_jsx("section", { className: "home-redesign__faq-band", children: _jsx("ul", { className: "home-redesign__faq-list", children: FAQ_ITEMS.map((item) => {
                const isOpen = openItemId === item.id;
                return (_jsxs("li", { className: "home-redesign__faq-row", children: [_jsxs("button", { type: "button", className: "home-redesign__faq-trigger", "aria-expanded": isOpen, "aria-controls": `${item.id}-panel`, id: `${item.id}-trigger`, onClick: () => toggleItem(item.id), children: [_jsx("span", { children: item.question }), _jsx("span", { className: `home-redesign__faq-icon ${isOpen ? "is-open" : ""}`, "aria-hidden": "true", children: isOpen ? "-" : "+" })] }), _jsx(AnimatePresence, { initial: false, children: isOpen ? (_jsx(motion.div, { id: `${item.id}-panel`, role: "region", "aria-labelledby": `${item.id}-trigger`, className: "home-redesign__faq-answer-wrap is-open", initial: prefersReducedMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: prefersReducedMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }, transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }, children: _jsx("div", { className: "home-redesign__faq-answer", children: item.answer }) })) : null })] }, item.id));
            }) }) }));
};
export default HomeObjectionFaq;
