import React from "react";
import SectionContainer from "../components/ui/section-container";

const CommunityGuidelines: React.FC = () => (
  <div className="relative min-h-screen overflow-hidden px-6 py-14 text-slate-900 dark:text-slate-50">
    <SectionContainer className="relative space-y-6">
      {/* Hero header card */}
      <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#050a16]/85">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.1),transparent_40%)]" />
        <div className="relative space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Community Guidelines</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">A respectful, inclusive solar community.</h1>
          <p className="max-w-3xl text-slate-700 dark:text-slate-200">
            Solara is for neighbors helping neighbors. Keep interactions honest, inclusive, and free from scams or misrepresentation.
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(0,123,255,0.08),transparent_34%)]" />
          <div className="relative space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Principles</h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc list-inside">
              <li>Respect, inclusion, and non-discrimination.</li>
              <li>Transparent skills and qualifications; no false claims.</li>
              <li>Safety-first: pause if something feels risky.</li>
              <li>Credit others' work and share knowledge openly.</li>
            </ul>
          </div>
        </article>
        <article className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(212,175,55,0.08),transparent_34%)]" />
          <div className="relative space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Reporting & moderation</h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc list-inside">
              <li>Flag scams, harassment, or unsafe advice.</li>
              <li>Organisers can remove posts or pause collaboration.</li>
              <li>Repeat violations may be removed from Solara spaces.</li>
            </ul>
          </div>
        </article>
      </div>

      <article className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,123,255,0.06),transparent_40%)]" />
        <div className="relative space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Professional boundaries</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            Helpers are community members, not employees of Solara. For high-risk electrical work, use certified professionals.
          </p>
        </div>
      </article>
    </SectionContainer>
  </div>
);

export default CommunityGuidelines;
