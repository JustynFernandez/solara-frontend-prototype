import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { guides, paths, faqs } from "../../data/learnContent";
import SectionContainer from "../../components/ui/section-container";
import LearnSearch from "../../components/learn/LearnSearch";
import LearningPathAccordion from "../../components/learn/LearningPathAccordion";
import QuickAnswersFAQ from "../../components/learn/QuickAnswersFAQ";
import ToolsPanel from "../../components/learn/ToolsPanel";
import GuideList from "../../components/learn/GuideList";
import LearnTOC from "../../components/learn/LearnTOC";
import SketchNote from "../../components/ui/SketchNote";
import AnimatedStat from "../../components/learn/AnimatedStat";
import ProgressDashboard from "../../components/learn/ProgressDashboard";

const LearnIndex: React.FC = () => {
  const tocItems = [
    { id: "progress", label: "Your progress" },
    { id: "paths", label: "Recommended paths" },
    { id: "quick-answers", label: "Quick answers" },
    { id: "tools", label: "Hands-on tools" },
    { id: "guides", label: "Guides" },
    { id: "safety", label: "Safety and trust" },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-6 py-12 text-slate-900 dark:text-slate-100">
      <SectionContainer className="relative space-y-12 text-slate-900 dark:text-white">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/70 bg-white/85 px-8 py-10 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.08),transparent_40%)]" />
          <span className="handmade-orbit pointer-events-none absolute right-10 top-8 h-8 w-14 rotate-[6deg] opacity-75" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[2.2fr_1fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                <span className="h-2 w-2 rounded-full bg-solara-gold shadow-[0_0_0_6px_rgba(212,175,55,0.2)]" />
                Learning Hub
              </div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl dark:text-white">
                Guides, tools, and paths to launch your solar projects with confidence.
              </h1>
              <span className="handmade-underline h-3 w-40 opacity-80" aria-hidden />
              <p className="max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                Built around Solara's pillars: Plan with Solar Navigator, Coordinate through Project Workspaces, and Sustain with maintenance and safety first.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <SketchNote text="Nerdy but friendly" tone="blue" className="hidden sm:inline-flex" />
                  <Link
                    to="/plan"
                    className="inline-flex items-center gap-2 rounded-full bg-button-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
                  >
                    Start Planning
                  </Link>
                </div>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold text-solara-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  Browse Project Workspaces
                </Link>
              </div>
              <Link
                to="/safety"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline focus-visible:outline-none dark:text-slate-300 dark:hover:text-white"
              >
                Safety first: read the checklist before you climb or wire anything.
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex justify-around gap-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-white/5">
                <AnimatedStat value={2500} label="Learners" suffix="+" />
                <AnimatedStat value={guides.length} label="Guides" />
                <AnimatedStat value={paths.length} label="Pathways" />
              </div>

              <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Project OS pillars</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-solara-blue" aria-hidden />
                    Plan: use Navigator for tailored scenarios.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-solara-gold" aria-hidden />
                    Coordinate: organize projects and collaborators in Workspaces.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden />
                    Sustain: keep systems healthy with maintenance and safety.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid gap-6 lg:grid-cols-[2.6fr_0.9fr]">
          <div className="space-y-6">
            <LearnSearch guides={guides} />

            <section id="progress" aria-label="Your progress">
              <ProgressDashboard />
            </section>

            <section id="paths" aria-label="Recommended paths">
              <LearningPathAccordion paths={paths} />
            </section>

            <section id="quick-answers" aria-label="Quick answers">
              <QuickAnswersFAQ faqs={faqs} />
            </section>

            <section id="tools" aria-label="Hands-on tools">
              <ToolsPanel />
            </section>

            <motion.section
              id="guides"
              aria-label="Guides"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,123,255,0.05),transparent_35%)]" />
                <div className="relative">
                  <GuideList guides={guides} />
                </div>
              </div>
            </motion.section>

            <motion.section
              id="safety"
              aria-label="Safety and trust"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(212,175,55,0.06),transparent_35%)]" />
                <span className="handmade-scribble pointer-events-none absolute bottom-4 right-4 h-4 w-16 rotate-[-2deg] opacity-50" aria-hidden />
                <div className="relative space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">Safety and trust</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Safety-first culture, transparent badges</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    Review safety guidelines and know who you're working with. Badges help you spot experience at a glance.
                  </p>
                </div>
                <div className="relative flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                  <span className="rounded-full border border-white/70 bg-white/85 px-3 py-1 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">Community volunteer</span>
                  <span className="rounded-full border border-white/70 bg-white/85 px-3 py-1 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">Trained volunteer</span>
                  <span className="rounded-full border border-white/70 bg-white/85 px-3 py-1 text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">Certified installer</span>
                </div>
                <div className="relative flex flex-wrap gap-3">
                  <Link
                    to="/safety"
                    className="inline-flex items-center gap-2 rounded-full bg-button-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
                  >
                    View safety guidance
                  </Link>
                  <Link
                    to="/community-guidelines"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-solara-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                  >
                    Community guidelines
                  </Link>
                </div>
                <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">
                  No flashing elements. If you feel unsure, pause and ask a qualified pro.
                </p>
              </div>
            </motion.section>
          </div>

          <LearnTOC items={tocItems} />
        </div>
      </SectionContainer>
    </div>
  );
};

export default LearnIndex;
