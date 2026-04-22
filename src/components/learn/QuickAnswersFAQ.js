import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ChevronDown, ShieldCheck, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { guides as allGuides } from "../../data/learnContent";
const QuickAnswersFAQ = ({ faqs }) => {
    const [openId, setOpenId] = useState(faqs[0]?.id ?? null);
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]", children: "Quick answers" }), _jsx("h3", { className: "text-xl font-semibold text-[var(--solara-text-strong)]", children: "Common questions from new builders." }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Short, scannable answers with clear links back into the guide library." })] }), _jsxs("span", { className: "hidden items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)] md:inline-flex", children: [_jsx(ShieldCheck, { className: "h-4 w-4" }), "Safety first"] })] }), _jsx("div", { className: "space-y-2", children: faqs.map((faq) => {
                    const isOpen = openId === faq.id;
                    const panelId = `${faq.id}-panel`;
                    return (_jsxs("div", { className: "overflow-hidden rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)]", children: [_jsxs("button", { type: "button", onClick: () => setOpenId(isOpen ? null : faq.id), className: "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--solara-surface-2)]/70", "aria-expanded": isOpen, "aria-controls": panelId, children: [_jsx("span", { className: "font-semibold text-[var(--solara-text-strong)]", children: faq.question }), _jsx(ChevronDown, { className: `h-4 w-4 text-[var(--solara-text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}` })] }), isOpen ? (_jsxs("div", { id: panelId, className: "border-t border-[var(--solara-rule)] px-4 py-3 text-sm leading-6 text-[var(--solara-text-muted)]", children: [_jsx("p", { children: faq.answer }), faq.relatedGuides && faq.relatedGuides.length > 0 ? (_jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]", children: "Related" }), faq.relatedGuides.map((slug) => {
                                                const guide = allGuides.find((item) => item.slug === slug);
                                                if (!guide)
                                                    return null;
                                                return (_jsxs(Link, { to: `/learn/${slug}`, className: "inline-flex items-center gap-1.5 rounded-md border border-[var(--solara-rule)] px-3 py-1.5 text-xs font-medium text-[var(--solara-text-strong)] transition-colors hover:border-[var(--solara-accent)]", children: [_jsx(BookOpen, { className: "h-3 w-3 text-[var(--solara-accent-strong)]" }), guide.title] }, slug));
                                            })] })) : null, _jsx("p", { className: "mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Follow local regulations and pause if you are unsure about safety." })] })) : null] }, faq.id));
                }) })] }));
};
export default QuickAnswersFAQ;
