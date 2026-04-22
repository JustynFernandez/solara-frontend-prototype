import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import SectionContainer from "../ui/section-container";
import { ChevronDown } from "lucide-react";
const faqs = [
    { q: "Can renters request help?", a: "Yes. Include permission status; certified helpers can advise on approvals." },
    { q: "Do I need roof access?", a: "No. Balcony and plug-in kits are supported. Share photos for remote checks." },
    { q: "What does verified mean?", a: "Verified helpers have confirmed identity and track record on Solara." },
    { q: "Who handles mains wiring?", a: "Certified helpers handle mains. Community and trained volunteers guide planning and DC." },
    { q: "How do cancellations work?", a: "Coordinate in chat; reschedule if possible. Safety-first if weather or access changes." },
    { q: "Is there a cost?", a: "Community support is typically free; certified helpers may charge. Align before work starts." },
];
const ConnectFAQ = () => {
    const [open, setOpen] = useState(faqs[0]?.q ?? null);
    return (_jsxs(SectionContainer, { className: "py-10", children: [_jsxs("div", { className: "space-y-2 text-slate-900 dark:text-white", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200", children: "FAQ" }), _jsx("h2", { className: "text-2xl font-semibold", children: "Common questions" })] }), _jsx("div", { className: "mt-4 space-y-2", children: faqs.map((item) => {
                    const isOpen = open === item.q;
                    return (_jsxs("div", { className: "overflow-hidden rounded-2xl border border-white/60 bg-white/85 text-slate-900 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white", children: [_jsxs("button", { type: "button", onClick: () => setOpen(isOpen ? null : item.q), className: "flex w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue", "aria-expanded": isOpen, children: [_jsx("span", { className: "font-semibold", children: item.q }), _jsx(ChevronDown, { className: `h-4 w-4 transition ${isOpen ? "rotate-180" : ""}` })] }), isOpen && _jsx("div", { className: "border-t border-white/20 px-4 py-3 text-sm text-slate-700 dark:text-slate-200", children: item.a })] }, item.q));
                }) })] }));
};
export default ConnectFAQ;
