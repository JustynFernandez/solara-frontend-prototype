import React, { useState } from "react";
import { ChevronDown, ShieldCheck, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { FAQ, guides as allGuides } from "../../data/learnContent";

type Props = {
  faqs: FAQ[];
};

const QuickAnswersFAQ: React.FC<Props> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]">Quick answers</p>
          <h3 className="text-xl font-semibold text-[var(--solara-text-strong)]">Common questions from new builders.</h3>
          <p className="text-sm leading-6 text-[var(--solara-text-muted)]">
            Short, scannable answers with clear links back into the guide library.
          </p>
        </div>
        <span className="hidden items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)] md:inline-flex">
          <ShieldCheck className="h-4 w-4" />
          Safety first
        </span>
      </div>

      <div className="space-y-2">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          const panelId = `${faq.id}-panel`;

          return (
            <div key={faq.id} className="overflow-hidden rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-1)]">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--solara-surface-2)]/70"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-semibold text-[var(--solara-text-strong)]">{faq.question}</span>
                <ChevronDown className={`h-4 w-4 text-[var(--solara-text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen ? (
                <div id={panelId} className="border-t border-[var(--solara-rule)] px-4 py-3 text-sm leading-6 text-[var(--solara-text-muted)]">
                  <p>{faq.answer}</p>

                  {faq.relatedGuides && faq.relatedGuides.length > 0 ? (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--solara-accent-strong)]">
                        Related
                      </span>
                      {faq.relatedGuides.map((slug) => {
                        const guide = allGuides.find((item) => item.slug === slug);
                        if (!guide) return null;
                        return (
                          <Link
                            key={slug}
                            to={`/learn/${slug}`}
                            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--solara-rule)] px-3 py-1.5 text-xs font-medium text-[var(--solara-text-strong)] transition-colors hover:border-[var(--solara-accent)]"
                          >
                            <BookOpen className="h-3 w-3 text-[var(--solara-accent-strong)]" />
                            {guide.title}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}

                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
                    Follow local regulations and pause if you are unsure about safety.
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAnswersFAQ;
