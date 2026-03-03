import React from "react";
import SectionContainer from "../components/ui/section-container";

const Safety: React.FC = () => (
  <div className="relative min-h-screen overflow-hidden px-6 py-14 text-slate-900 dark:text-slate-50">
    <SectionContainer className="relative space-y-6">
      {/* Hero header card */}
      <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#050a16]/85">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.1),transparent_40%)]" />
        <div className="relative space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Safety & Scope</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Work safely, stay within scope.</h1>
          <p className="max-w-3xl text-slate-700 dark:text-slate-200">
            Solara is a community platform. Helpers are community members, not employees of Solara. Always follow local regulations and use licensed professionals for high-risk work.
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(0,123,255,0.08),transparent_34%)]" />
          <div className="relative space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Do</h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc list-inside">
              <li>Use licensed electricians for any grid-tied or high-voltage work.</li>
              <li>Wear PPE, de-energize circuits, and follow lock-out/tag-out where relevant.</li>
              <li>Document shade surveys, torque checks, and maintenance schedules.</li>
              <li>Match equipment to manufacturer specs; check voltage/current limits.</li>
              <li>Ensure safe ladders, harnesses, and rooftop practices.</li>
            </ul>
          </div>
        </article>
        <article className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_18%,rgba(212,175,55,0.08),transparent_34%)]" />
          <div className="relative space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Don't</h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200 list-disc list-inside">
              <li>Perform electrical work you're not qualified for.</li>
              <li>Bypass safety devices or ignore manufacturer warnings.</li>
              <li>Work at height without proper anchors or supervision.</li>
              <li>Share unvetted advice as professional guidance.</li>
            </ul>
          </div>
        </article>
      </div>

      <article className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,123,255,0.06),transparent_40%)]" />
        <div className="relative space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Reporting & escalation</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200">If you see unsafe behavior or misrepresentation, let the organiser know and pause work until risks are resolved.</p>
        </div>
      </article>
    </SectionContainer>
  </div>
);

export default Safety;
