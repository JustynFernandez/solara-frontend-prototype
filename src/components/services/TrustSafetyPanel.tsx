import React from "react";
import SectionContainer from "../ui/section-container";
import AnimatedButton from "../ui/animated-button";
import { ShieldCheck, AlertTriangle } from "lucide-react";

const TrustSafetyPanel: React.FC = () => (
  <SectionContainer className="py-10">
    <div className="grid gap-4 rounded-3xl border border-white/50 bg-white/80 p-6 text-slate-900 shadow-[0_22px_80px_rgba(0,51,102,0.26)] backdrop-blur-2xl lg:grid-cols-[1.2fr_0.8fr] dark:border-white/10 dark:bg-white/5 dark:text-white">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c7d2fe]">
          <ShieldCheck className="h-4 w-4 text-[#ffd700]" />
          Trust and safety
        </div>
        <p className="text-2xl font-semibold text-slate-900 dark:text-white">Safety-first help for every step</p>
        <p className="text-sm text-slate-700 dark:text-slate-200/85">Helpers have levels so you can pick the right support:</p>
        <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-100">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#ffd700]" aria-hidden />
            Community volunteer: guidance, photos, and checklists.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#ffd700]" aria-hidden />
            Trained volunteer: peer review, site walk-throughs, tool coaching.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#ffd700]" aria-hidden />
            Certified installer: mains wiring, commissioning, formal sign-off.
          </li>
        </ul>
        <p className="text-sm text-slate-700 dark:text-slate-200/80">For any mains wiring, use certified help. Review safety guidance before climbing or wiring.</p>
        <div className="flex flex-wrap gap-2">
          <AnimatedButton variant="outline" href="/safety" className="px-4 py-2">
            Safety checklist
          </AnimatedButton>
          <AnimatedButton variant="outline" href="/community-guidelines" className="px-4 py-2">
            Community guidelines
          </AnimatedButton>
        </div>
      </div>
      <div className="space-y-3 rounded-2xl border border-white/20 bg-white/70 p-5 text-slate-900 shadow-inner dark:border-white/10 dark:bg-[#0a1426]/70 dark:text-slate-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#c7a600] dark:text-[#ffd700]">
          <AlertTriangle className="h-4 w-4" />
          Safety microcopy
        </div>
        <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-100">
          <li>Confirm permissions before ordering hardware.</li>
          <li>Use listed equipment and follow local codes.</li>
          <li>Pause if unsure; request certified help for any electrics.</li>
          <li>Share photos for remote safety checks.</li>
        </ul>
      </div>
    </div>
  </SectionContainer>
);

export default TrustSafetyPanel;
