import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SkillIcon from "../components/shared/SkillIcon";
import SectionContainer from "../components/ui/section-container";
import HeroWaveAnimation from "../components/ui/hero-wave/HeroWaveAnimation";

const quickPaths = [
  {
    title: "Find local helpers",
    body: "Skilled neighbors and volunteers ready to guide installs, maintenance, and safe upgrades.",
    cta: "Browse helpers",
    to: "/connect",
    icon: "Installation",
  },
  {
    title: "Learn the basics",
    body: "Short, beginner-friendly guides to demystify solar sizing, costs, and upkeep.",
    cta: "Start learning",
    to: "/learn",
    icon: "Advice & Learning",
  },
  {
    title: "Join a project",
    body: "Support community builds with time, tools, or mentorship to speed up clean energy adoption.",
    cta: "See projects",
    to: "/projects",
    icon: "Community Projects",
  },
];

const proofPoints = [
  {
    title: "Verified neighbors nearby",
    body: "Find trusted local helpers for installs, maintenance, and safety checks.",
  },
  {
    title: "Practical learning paths",
    body: "Learn key solar steps with short, beginner-friendly guides and project examples.",
  },
  {
    title: "Community-first project support",
    body: "Join shared builds, contribute tools, and move local clean energy projects forward.",
  },
  {
    title: "Safety-first planning",
    body: "Start every plan with clear, practical safety checklists before installation work begins.",
  },
];

const statStrip = [
  { label: "Helpers online", value: "142" },
  { label: "Projects active", value: "27" },
  { label: "MWh shared", value: "21.4" },
];

const serviceHighlights = [
  {
    step: "01",
    title: "Request practical support",
    body: "Ask for site guidance, tool-sharing help, and install coordination in one place.",
  },
  {
    step: "02",
    title: "Build confidence step by step",
    body: "Follow safe setup checklists and plain-language explainers before spending money.",
  },
  {
    step: "03",
    title: "Contribute where you can",
    body: "Offer time, expertise, or spare equipment to unblock community projects faster.",
  },
];

const linkPrimaryClass =
  "inline-flex items-center justify-center rounded-lg bg-solara-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0b4fbf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-solara-blue dark:hover:bg-[#2f81ff] dark:focus-visible:ring-offset-[#030713]";

const linkSecondaryClass =
  "inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-200 hover:border-solara-blue/45 hover:text-solara-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:bg-transparent dark:text-slate-100 dark:hover:border-solara-gold/55 dark:hover:text-solara-gold dark:focus-visible:ring-offset-[#030713]";

const textLinkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-solara-navy transition-colors duration-200 hover:text-solara-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-emerald-200 dark:hover:text-solara-gold dark:focus-visible:ring-offset-[#030713]";

const heroPrimaryClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-[14px] bg-[#635bff] px-6 py-3 text-base font-semibold tracking-[-0.02em] text-white transition-colors duration-200 hover:bg-[#544af6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-[#6f86ff] dark:hover:bg-[#6078ff] dark:focus-visible:ring-offset-[#030713]";

const heroSecondaryClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-[14px] border border-[#c9d4e5] bg-white/92 px-6 py-3 text-base font-semibold tracking-[-0.02em] text-[#1a2b4b] transition-colors duration-200 hover:border-[#8ea2ff] hover:text-[#635bff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-[#8ea2ff] dark:hover:text-[#c2caff] dark:focus-visible:ring-offset-[#030713]";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.34, delay, ease: [0.22, 1, 0.36, 1] },
});

const Home = () => {
  const location = useLocation();
  const waveCaptureEnabled = import.meta.env.DEV && new URLSearchParams(location.search).has("__waveCapture");

  React.useEffect(() => {
    if (!waveCaptureEnabled || typeof document === "undefined") return undefined;

    const root = document.documentElement;
    const previousOverlay = root.getAttribute("data-overlay");
    const wasDark = root.classList.contains("dark");

    root.setAttribute("data-overlay", "wave-capture");
    root.classList.remove("dark");

    return () => {
      if (previousOverlay) {
        root.setAttribute("data-overlay", previousOverlay);
      } else if (root.getAttribute("data-overlay") === "wave-capture") {
        root.removeAttribute("data-overlay");
      }

      if (wasDark) {
        root.classList.add("dark");
      }
    };
  }, [waveCaptureEnabled]);

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white">
      <SectionContainer className={waveCaptureEnabled ? "max-w-none px-0 sm:px-0 pb-0 pt-0" : "max-w-[1380px] pb-14 pt-12 lg:pt-16"}>
        <motion.section
          {...fadeInUp(0)}
          className={
            waveCaptureEnabled
              ? "home-hero-section home-hero-section--capture relative isolate overflow-hidden"
              : "home-hero-section relative isolate overflow-hidden pb-10 pt-8 lg:pt-12"
          }
        >
          <div className="hero-section__background" aria-hidden="true">
            <span className="hero-section__fullbleed-line hero-section__fullbleed-line--top" />
            <span className="hero-section__fullbleed-line hero-section__fullbleed-line--bottom" />
            <HeroWaveAnimation theme={waveCaptureEnabled ? "light" : "auto"} interactive={!waveCaptureEnabled} />
          </div>

          {!waveCaptureEnabled ? (
            <motion.div {...fadeInUp(0.04)} className="home-hero-shell relative z-10">
              <div className="home-hero-copy">
                <div className="home-hero-eyebrow-row">
                  <p className="home-hero-eyebrow">Solara Community</p>
                  <span className="home-hero-signal">
                    <span className="home-hero-signal-dot" aria-hidden="true" />
                    Verified support for home and community solar
                  </span>
                </div>

                <h1 className="home-hero-title">Neighbors helping neighbors go solar faster, safer, and with more confidence.</h1>

                <p className="home-hero-body">
                  Connect with vetted helpers, share tools, and learn the essentials of safe solar installs and maintenance with clear,
                  practical guidance at every step.
                </p>

                <div className="home-hero-actions">
                  <Link to="/request-help" className={heroPrimaryClass}>
                    Request help
                  </Link>
                  <Link to="/services" className={heroSecondaryClass}>
                    Explore services
                  </Link>
                </div>

                <div className="home-hero-footnote">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Core capabilities</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    <span>Installation support</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400/80 dark:bg-slate-500" />
                    <span>Tool sharing</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400/80 dark:bg-slate-500" />
                    <span>Advice & learning</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400/80 dark:bg-slate-500" />
                    <span>Community projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </motion.section>

        {!waveCaptureEnabled ? (
          <motion.section {...fadeInUp(0.08)} className="home-stat-strip border-y border-slate-200 py-7 dark:border-white/10">
            <dl className="home-stat-grid grid gap-8 sm:grid-cols-3">
              {statStrip.map((stat, idx) => (
                <div key={stat.label} className={`${idx > 0 ? "sm:border-l sm:border-slate-200 sm:pl-8 dark:sm:border-white/10" : ""}`}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{stat.label}</dt>
                  <dd className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-slate-900 dark:text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.section>
        ) : null}

        {!waveCaptureEnabled ? (
          <motion.section
            {...fadeInUp(0.12)}
            className="py-14"
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-solara-navy dark:text-emerald-200">Why neighbors pick Solara</p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[2.1rem]">
                Clear guidance, trusted hands, and practical support at every stage of the project.
              </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {proofPoints.map((point, idx) => (
                <motion.article
                  key={point.title}
                  {...fadeInUp(0.14 + idx * 0.04)}
                  className="rounded-[22px] border border-slate-200/90 bg-white/84 p-6 shadow-[0_22px_48px_rgba(15,23,42,0.07)] backdrop-blur-[6px] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_36px_rgba(0,0,0,0.28)]"
                >
                  <p className="text-base font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">{point.title}</p>
                  <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-slate-600 dark:text-slate-300">{point.body}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>
        ) : null}

        {!waveCaptureEnabled ? (
          <motion.section
            {...fadeInUp(0.16)}
            className="grid gap-12 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-solara-navy dark:text-emerald-200">How Solara helps</p>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[2.1rem]">
                  Practical support from your first question to your first install.
                </h2>
              </div>
              <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
                {serviceHighlights.map((item) => (
                  <article key={item.title} className="flex gap-4 py-5 sm:gap-6">
                    <p className="w-10 shrink-0 text-sm font-semibold tracking-[0.12em] text-slate-400 dark:text-slate-500">{item.step}</p>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-xl border border-slate-200 bg-white p-7 shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0a1222]/80 dark:shadow-[0_20px_46px_rgba(0,0,0,0.36)]">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-solara-navy dark:text-solara-gold">Solar Navigator</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Map your first solar plan in minutes.</h2>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  Answer a few quick questions to get a tailored checklist, realistic timeline, and support path for your home or community
                  project.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/solar-navigator" className={linkPrimaryClass}>
                    Start the navigator
                  </Link>
                  <Link to="/safety" className={linkSecondaryClass}>
                    Safety checklist
                  </Link>
                </div>
              </div>
            </aside>
          </motion.section>
        ) : null}
      </SectionContainer>

      {!waveCaptureEnabled ? (
        <SectionContainer className="max-w-[1380px] pb-20">
          <motion.section {...fadeInUp(0.16)} className="border-t border-slate-200 pt-10 dark:border-white/10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-solara-navy dark:text-emerald-200">What you can do</p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-[2.1rem]">
                Quick paths to start helping, learning, or joining a project.
              </h2>
            </div>

            <div className="mt-8 grid gap-10 md:grid-cols-3">
              {quickPaths.map((path, idx) => (
                <motion.article
                  key={path.title}
                  {...fadeInUp(0.18 + idx * 0.04)}
                  className="flex h-full flex-col gap-4 border-t border-slate-200 pt-5 dark:border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
                      <SkillIcon name={path.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{path.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{path.body}</p>
                  <Link to={path.to} className={textLinkClass}>
                    {path.cta}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.section>
        </SectionContainer>
      ) : null}
    </div>
  );
};

export default Home;

