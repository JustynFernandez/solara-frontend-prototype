import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import SectionContainer from "../ui/section-container";
import { faqs } from "../../data/servicesContent";
import { ChevronDown } from "lucide-react";
const ServicesFAQ = () => {
    const [open, setOpen] = useState(faqs[0]?.question ?? null);
    return (_jsxs(SectionContainer, { className: "py-10", children: [_jsxs("div", { className: "space-y-2 text-slate-900 dark:text-white", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200", children: "FAQ" }), _jsx("h2", { className: "text-3xl font-semibold", children: "Common questions" })] }), _jsx("div", { className: "mt-4 space-y-2", children: faqs.map((faq) => {
                    const isOpen = open === faq.question;
                    return (_jsxs("div", { className: "overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-[0_18px_70px_rgba(0,51,102,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white", children: [_jsxs("button", { type: "button", onClick: () => setOpen(isOpen ? null : faq.question), className: "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:text-white", "aria-expanded": isOpen, children: [_jsx("span", { className: "font-semibold", children: faq.question }), _jsx(ChevronDown, { className: `h-4 w-4 transition ${isOpen ? "rotate-180" : ""}` })] }), isOpen && (_jsx("div", { className: "border-t border-white/10 px-4 py-3 text-sm text-slate-700 dark:text-slate-200/85", children: faq.answer }))] }, faq.question));
                }) })] }));
};
export default ServicesFAQ;
