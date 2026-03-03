import React, { useState } from "react";
import SectionContainer from "../components/ui/section-container";
import SketchNote from "../components/ui/SketchNote";

const categories = ["Installation", "Tools", "Advice & Learning", "Maintenance", "Community Projects"];

const RequestHelp = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-14 text-slate-900 dark:text-slate-50">
      <SectionContainer className="relative max-w-3xl space-y-8">
        {/* Hero header card */}
        <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.1),transparent_40%)]" />
          <div className="relative space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Request help</p>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Tell the community what you need.</h1>
            <p className="text-lg text-slate-700 dark:text-slate-200">A simple, soft-styled form to capture requests. No submission logic is wired in.</p>
          </div>
        </header>

        {submitted && (
          <div className="rounded-2xl border border-solara-blue/30 bg-solara-blue/10 px-4 py-3 text-sm font-semibold text-solara-navy shadow-sm dark:border-solara-gold/30 dark:bg-solara-gold/10 dark:text-solara-gold">
            Thanks! This mock alert confirms your request would be visible to helpers.
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.06),transparent_40%)]" />
          <div className="relative space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-white/60 transition-all duration-200 placeholder:text-slate-400 focus:border-solara-blue focus:ring-solara-blue/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:placeholder:text-slate-400 dark:focus:border-solara-gold dark:focus:ring-solara-gold/50"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Help category
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-white/60 transition-all duration-200 focus:border-solara-blue focus:ring-solara-blue/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:focus:border-solara-gold dark:focus:ring-solara-gold/50"
              >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-white/60 transition-all duration-200 placeholder:text-slate-400 focus:border-solara-blue focus:ring-solara-blue/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:placeholder:text-slate-400 dark:focus:border-solara-gold dark:focus:ring-solara-gold/50"
                placeholder="Describe what you need help with..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-white/60 transition-all duration-200 placeholder:text-slate-400 focus:border-solara-blue focus:ring-solara-blue/50 dark:border-white/10 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:placeholder:text-slate-400 dark:focus:border-solara-gold dark:focus:ring-solara-gold/50"
                placeholder="City or neighborhood"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SketchNote text="Details help us match" tone="blue" className="hidden sm:inline-flex" />
              <button
                type="submit"
                className="motion-arrow-shift inline-flex items-center justify-center gap-2 rounded-full bg-button-primary bg-[length:220%_220%] px-5 py-3 text-sm font-semibold text-white shadow-solara-soft transition hover:scale-[1.02] hover:shadow-glow hover:bg-[position:100%_50%] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
              >
                Submit request
                <svg className="motion-arrow h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </SectionContainer>
    </div>
  );
};

export default RequestHelp;
