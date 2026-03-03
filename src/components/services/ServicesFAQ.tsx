import React, { useState } from "react";
import SectionContainer from "../ui/section-container";
import { faqs } from "../../data/servicesContent";
import { ChevronDown } from "lucide-react";

const ServicesFAQ: React.FC = () => {
  const [open, setOpen] = useState<string | null>(faqs[0]?.question ?? null);
  return (
    <SectionContainer className="py-10">
      <div className="space-y-2 text-slate-900 dark:text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">FAQ</p>
        <h2 className="text-3xl font-semibold">Common questions</h2>
      </div>
      <div className="mt-4 space-y-2">
        {faqs.map((faq) => {
          const isOpen = open === faq.question;
          return (
            <div key={faq.question} className="overflow-hidden rounded-2xl border border-white/50 bg-white/80 shadow-[0_18px_70px_rgba(0,51,102,0.24)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : faq.question)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:text-white"
                aria-expanded={isOpen}
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="border-t border-white/10 px-4 py-3 text-sm text-slate-700 dark:text-slate-200/85">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default ServicesFAQ;
