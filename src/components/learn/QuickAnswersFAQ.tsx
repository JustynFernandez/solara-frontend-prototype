import React, { useState, useMemo } from "react";
import { ChevronDown, ShieldCheck, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { FAQ, guides as allGuides } from "../../data/learnContent";

type Props = {
  faqs: FAQ[];
};

const QuickAnswersFAQ: React.FC<Props> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Quick answers</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Common questions from new builders</h3>
          <p className="text-sm text-slate-700 dark:text-slate-200">Short, scannable answers with safety-first reminders.</p>
        </div>
        <span className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-xs font-semibold text-solara-navy shadow-sm backdrop-blur dark:inline-flex dark:border-white/10 dark:bg-white/10 dark:text-white">
          <ShieldCheck className="h-4 w-4" />
          Safety first
        </span>
      </div>
      <div className="space-y-2">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          const panelId = `${faq.id}-panel`;
          return (
            <div key={faq.id} className="overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-slate-900 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:text-white dark:hover:bg-white/5"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div id={panelId} className="border-t border-white/70 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:text-slate-200">
                  <p>{faq.answer}</p>

                  {/* Related guides */}
                  {faq.relatedGuides && faq.relatedGuides.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-solara-navy dark:text-indigo-200">
                        Related:
                      </span>
                      {faq.relatedGuides.map((slug) => {
                        const guide = allGuides.find((g) => g.slug === slug);
                        if (!guide) return null;
                        return (
                          <Link
                            key={slug}
                            to={`/learn/${slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                          >
                            <BookOpen className="h-3 w-3 text-solara-blue" />
                            {guide.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
                    Always follow local regulations and pause if unsure about safety.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAnswersFAQ;
