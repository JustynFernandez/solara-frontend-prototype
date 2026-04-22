import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Compass, FolderKanban, Users2, Wrench } from "lucide-react";
import SectionContainer from "../components/ui/section-container";
import HeroWaveAnimation from "../components/ui/hero-wave/HeroWaveAnimation";
import { HeroSection } from "@/components/blocks/hero-section-5";
import HomeOperatingBoard from "@/components/home/HomeOperatingBoard";
import HomeFeaturedBuild from "@/components/home/HomeFeaturedBuild";
import HomeOutcomeProof from "@/components/home/HomeOutcomeProof";
import HomeObjectionFaq from "@/components/home/HomeObjectionFaq";

const fadeInUp = (delay = 0, reducedMotion = false) =>
  reducedMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.26, delay, ease: [0.22, 1, 0.36, 1] },
      };

const revealInView = (delay = 0, reducedMotion = false) =>
  reducedMotion
    ? {
        initial: false,
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.26, delay, ease: [0.22, 1, 0.36, 1] },
      };

const SOLAR_VIDEO_SRC = "/hero-community-solar-install.mp4";
const SOLAR_VIDEO_POSTER_SRC = "/hero-community-solar-install-poster.jpg";
const HOME_HERO_CYCLING_WORDS = ["practical", "local", "joinable"];

const routeAtlas = [
  {
    title: "Connect",
    note: "Screen verified local help before you send a brief.",
    to: "/connect",
    icon: Users2,
  },
  {
    title: "Plan",
    note: "Choose guided planning or direct layout work.",
    to: "/plan",
    icon: Compass,
  },
  {
    title: "Projects",
    note: "Join live workspaces that already have momentum.",
    to: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Learn",
    note: "Use guides and safety notes that hand off into action.",
    to: "/learn",
    icon: BookOpen,
  },
];

const systemNotes = [
  {
    title: "No dead-end overview pages",
    body: "Every major route hands off to the next practical move instead of asking users to reread the product.",
  },
  {
    title: "Live network first",
    body: "Helpers, planning flows, and project demand sit in one system so context survives the handoff.",
  },
  {
    title: "Built for local delivery",
    body: "The product assumes real neighborhood work: volunteers, certified help, safety checks, and shared ownership.",
  },
];

const Home = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
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
    <div className="home-redesign relative min-h-screen text-slate-900 dark:text-white">
      <section className="max-w-none px-0 pb-0 pt-0">
        {!waveCaptureEnabled ? (
          <HeroSection
            showHeader={false}
            density="balanced"
            posterSrc={SOLAR_VIDEO_POSTER_SRC}
            videoSrc={SOLAR_VIDEO_SRC}
            title="Neighborhood solar, made practical."
            animatedTitlePrefix="Neighborhood solar,"
            animatedTitleBeforeWord="made"
            animatedTitleWords={HOME_HERO_CYCLING_WORDS}
            animatedTitleSuffix="."
            animatedTitleIntervalMs={2800}
            animatedTitleLoop={false}
            animatedTitleRestartDelayMs={7000}
            body="Screen local help, run a planning pass, or join live community builds without losing the thread between them."
            primaryCtaLabel="Open Connect"
            primaryCtaHref="/connect"
            secondaryCtaLabel="Open Plan"
            secondaryCtaHref="/plan"
          />
        ) : (
          <motion.section
            {...fadeInUp(0, prefersReducedMotion)}
            className="home-hero-section home-hero-section--capture relative isolate overflow-hidden"
          >
            <div className="hero-section__background" aria-hidden="true">
              <span className="hero-section__fullbleed-line hero-section__fullbleed-line--top" />
              <span className="hero-section__fullbleed-line hero-section__fullbleed-line--bottom" />
              <HeroWaveAnimation theme="light" interactive={false} />
            </div>
          </motion.section>
        )}

        {!waveCaptureEnabled ? (
          <div className="home-redesign__main mx-auto max-w-[1380px] px-6 pb-8 pt-4 sm:px-12 lg:pt-6">
            <motion.section
              {...fadeInUp(0.08, prefersReducedMotion)}
              className="home-redesign__atlas"
            >
              <div className="home-redesign__atlas-intro">
                <p className="home-redesign__eyebrow">Operating map</p>
                <h2 className="home-redesign__section-title">Four routes. One working system.</h2>
                <p className="home-redesign__section-body">
                  Start with the route that matches the blocker. Solara keeps the next handoff visible so you do
                  not restart from scratch every time the work changes.
                </p>
              </div>

              <div className="home-redesign__atlas-grid">
                {routeAtlas.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.title} to={item.to} className="home-redesign__atlas-card">
                      <div className="home-redesign__atlas-card-top">
                        <span className="home-redesign__atlas-icon">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="home-redesign__atlas-link">
                          Open
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.note}</p>
                    </Link>
                  );
                })}
              </div>

              <div className="home-redesign__system-notes">
                {systemNotes.map((note) => (
                  <article key={note.title} className="home-redesign__system-note">
                    <p className="home-redesign__system-note-title">{note.title}</p>
                    <p>{note.body}</p>
                  </article>
                ))}
              </div>
            </motion.section>

            <motion.section
              {...fadeInUp(0.12, prefersReducedMotion)}
              className="home-redesign__stage home-redesign__stage--proof"
            >
              <header className="home-redesign__section-header home-redesign__section-header--major">
                <p className="home-redesign__eyebrow">Live board</p>
                <h2 className="home-redesign__section-title">Start with what is live right now.</h2>
                <p className="home-redesign__section-body">
                  Helpers, planning entry points, and active neighborhood builds in one surface.
                </p>
              </header>
              <HomeOperatingBoard />
            </motion.section>
          </div>
        ) : null}
      </section>

      {!waveCaptureEnabled ? (
        <SectionContainer className="max-w-[1380px] pb-14">
          <motion.section
            {...revealInView(0.04, prefersReducedMotion)}
            className="home-redesign__stage home-redesign__stage--build"
          >
            <HomeFeaturedBuild />
          </motion.section>

          <motion.section
            {...revealInView(0.08, prefersReducedMotion)}
            className="home-redesign__stage home-redesign__stage--support"
          >
            <div className="home-redesign__support-grid">
              <section className="home-redesign__faq">
                <header className="home-redesign__section-header home-redesign__section-header--quiet">
                  <p className="home-redesign__eyebrow home-redesign__eyebrow--muted">Before you start</p>
                  <h2 className="home-redesign__section-title home-redesign__section-title--quiet">
                    The questions people usually ask first.
                  </h2>
                </header>
                <HomeObjectionFaq />
              </section>

              <section className="home-redesign__outcome-close">
                <HomeOutcomeProof />
              </section>
            </div>
          </motion.section>

          <motion.section
            {...revealInView(0.1, prefersReducedMotion)}
            className="home-redesign__closing-note"
          >
            <div className="home-redesign__closing-note-copy">
              <p className="home-redesign__eyebrow home-redesign__eyebrow--muted">Field note</p>
              <h2 className="home-redesign__section-title home-redesign__section-title--quiet">
                The product should feel like a working neighborhood desk, not a generic green-energy site.
              </h2>
            </div>
            <Link to="/projects" className="home-redesign__closing-note-link">
              Open live workspaces
              <Wrench className="h-4 w-4" />
            </Link>
          </motion.section>
        </SectionContainer>
      ) : null}
    </div>
  );
};

export default Home;
