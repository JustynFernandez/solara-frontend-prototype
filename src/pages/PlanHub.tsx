import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  Box,
  Sparkles,
  Target,
  Save,
  Users,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import SectionContainer from "../components/ui/section-container";
import PlanFeatureCard from "../components/plan/PlanFeatureCard";
import PlanBenefitCard from "../components/plan/PlanBenefitCard";
import { useEcoMode } from "../hooks/useEcoMode";

const PlanHub: React.FC = () => {
  const { ecoModeEnabled } = useEcoMode();

  return (
    <div className="relative min-h-screen overflow-hidden py-14 text-slate-900 dark:text-slate-50">
      <SectionContainer className="relative space-y-12">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: !ecoModeEnabled ? 0.5 : 0.2 }}
          className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/85 p-8 text-center shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 sm:p-12"
        >
          {/* Decorative gradients */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.08),transparent_40%)]" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-indigo-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-solara-gold shadow-[0_0_0_6px_rgba(212,175,55,0.2)]" />
              Plan Your Solar Journey
            </div>

            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Two paths to{" "}
              <span className="bg-gradient-to-r from-solara-blue to-solara-gold bg-clip-text text-transparent">
                solar success
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Whether you prefer guided questions or hands-on design, we've got you covered.
              Start with the Navigator for a personalized plan, or jump straight into the 3D designer.
            </p>
          </div>

          {/* Decorative corners */}
          <span className="handmade-corner pointer-events-none absolute right-6 top-6 h-8 w-8 rotate-[6deg] opacity-60" aria-hidden />
          <span className="handmade-scribble pointer-events-none absolute bottom-6 left-6 h-8 w-24 rotate-[-3deg] opacity-50" aria-hidden />
        </motion.header>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PlanFeatureCard
            icon={<ClipboardList className="h-10 w-10" />}
            title="Solar Navigator"
            tagline="Answer a few questions, get a personalized plan"
            bullets={[
              "5-minute guided questionnaire",
              "Personalized readiness score",
              "Step-by-step pathway to solar",
              "Risk & blocker assessment",
            ]}
            ctaLabel="Start Planning"
            ctaHref="/plan/navigator"
            stat="2,500+ plans generated"
            accentColor="blue"
          />

          <PlanFeatureCard
            icon={<Box className="h-10 w-10" />}
            title="3D Roof Designer"
            tagline="Visualize panels on your actual roof"
            bullets={[
              "Drag-and-drop panel placement",
              "Real-time energy estimates",
              "Sun & shadow simulation",
              "Export PDF reports",
            ]}
            ctaLabel="Design Your Roof"
            ctaHref="/configurator"
            stat="15,000+ panels placed"
            accentColor="gold"
          />
        </div>

        {/* Info Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: !ecoModeEnabled ? 0.4 : 0.15, delay: !ecoModeEnabled ? 0.2 : 0 }}
          className="relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-6 shadow-md backdrop-blur dark:border-white/10 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-slate-900/50"
        >
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">
                Not sure where to start?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Our learning guides cover everything from solar basics to installation tips.
                Perfect for first-timers and experienced DIYers alike.
              </p>
            </div>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-2.5 text-sm font-semibold text-solara-navy shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              Browse Guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: !ecoModeEnabled ? 0.4 : 0.15, delay: !ecoModeEnabled ? 0.25 : 0 }}
            className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200"
          >
            Why plan with Solara?
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PlanBenefitCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Personalized"
              description="Plans tailored to your property, budget, and goals"
              delay={0.1}
            />
            <PlanBenefitCard
              icon={<Target className="h-5 w-5" />}
              title="Visual Design"
              description="See exactly how panels will look on your roof"
              delay={0.15}
            />
            <PlanBenefitCard
              icon={<Save className="h-5 w-5" />}
              title="Save Progress"
              description="Your work is auto-saved so you can continue anytime"
              delay={0.2}
            />
            <PlanBenefitCard
              icon={<Users className="h-5 w-5" />}
              title="Community Support"
              description="Connect with local helpers and verified installers"
              delay={0.25}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: !ecoModeEnabled ? 0.4 : 0.15, delay: !ecoModeEnabled ? 0.3 : 0 }}
          className="relative overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br from-solara-navy via-[#0a2540] to-[#071a30] p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,123,255,0.2),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.15),transparent_50%)]" />

          <div className="relative">
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
              Ready to go solar?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-slate-300">
              Join thousands of UK homeowners who've planned their solar journey with Solara.
              It's free, takes minutes, and could save you thousands.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/plan/navigator"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-solara-navy shadow-lg transition hover:shadow-xl"
              >
                Start with Navigator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/configurator"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-white/20"
              >
                Try 3D Designer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </div>
  );
};

export default PlanHub;
