import React, { useState } from "react";
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

const ConnectFAQ: React.FC = () => {
  const [open, setOpen] = useState<string | null>(faqs[0]?.q ?? null);
  return (
    <SectionContainer className="py-10">
      <div className="space-y-2 text-slate-900 dark:text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">FAQ</p>
        <h2 className="text-2xl font-semibold">Common questions</h2>
      </div>
      <div className="mt-4 space-y-2">
        {faqs.map((item) => {
          const isOpen = open === item.q;
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl border border-white/60 bg-white/85 text-slate-900 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.q)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
                aria-expanded={isOpen}
              >
                <span className="font-semibold">{item.q}</span>
                <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="border-t border-white/20 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{item.a}</div>}
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default ConnectFAQ;
