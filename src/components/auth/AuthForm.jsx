import React from "react";
import { motion } from "framer-motion";

const AuthForm = ({ title, subtitle, onSubmit, children, cta }) => (
  <div className="relative min-h-screen overflow-hidden bg-page-light px-6 py-14 text-slate-900 dark:bg-page-dark dark:text-slate-50">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,123,255,0.08),transparent_50%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.06),transparent_50%)]" />
    <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#050a16]/85 lg:w-3/5"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(0,123,255,0.1),transparent_28%),radial-gradient(circle_at_90%_0%,rgba(212,175,55,0.08),transparent_30%)]" />
        <div className="relative space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">{cta || "Welcome"}</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{title}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-200">{subtitle}</p>
        </div>
        <form onSubmit={onSubmit} className="relative mt-6 space-y-5">
          {children}
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="relative w-full overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 text-sm text-slate-700 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85 dark:text-slate-100 lg:w-2/5"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.08),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.06),transparent_32%)]" />
        <div className="relative space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Why join Solara?</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-solara-blue shadow-[0_0_0_6px_rgba(0,123,255,0.14)]" />
              Connect with nearby helpers and organizers.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-solara-sky shadow-[0_0_0_6px_rgba(0,191,255,0.14)]" />
              Share or borrow tools and templates safely.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-solara-gold shadow-[0_0_0_6px_rgba(212,175,55,0.14)]" />
              Learn faster with curated guides and peer support.
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  </div>
);

export default AuthForm;
