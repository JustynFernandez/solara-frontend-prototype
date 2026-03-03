import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionContainer from "../components/ui/section-container";
import ServicesHero from "../components/services/ServicesHero";
import OutcomesStrip from "../components/services/OutcomesStrip";
import PillarMap from "../components/services/PillarMap";
import ServiceFinder from "../components/services/ServiceFinder";
import HowItWorksTimeline from "../components/services/HowItWorksTimeline";
import TrustSafetyPanel from "../components/services/TrustSafetyPanel";
import ProofStrip from "../components/services/ProofStrip";
import ServicesFAQ from "../components/services/ServicesFAQ";
import FinalCTA from "../components/services/FinalCTA";

const services = [
  {
    title: "Skill Sharing",
    description: "Hands-on helpers for installs, wiring, and safety spot-checks.",
    icon: "Installation",
    items: ["Site surveys and shade checks", "Racking, mounting, and cable routing", "Safety walk-throughs and tool setup"],
    accent: "from-[#eef2ff] via-white to-[#fdf5e9]",
    accentDark: "bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.14),transparent_42%)]",
    badge: "Live crews",
  },
  {
    title: "Resource Sharing",
    description: "Shared tools, checklists, and monitoring templates to speed up work.",
    icon: "Tools",
    items: ["Tool library and ladders", "Torque and crimp tool kits", "Monitoring dashboards and alerts"],
    accent: "from-[#eef2ff] via-white to-[#fdf5e9]",
    accentDark: "bg-[radial-gradient(circle_at_25%_18%,rgba(0,123,255,0.18),transparent_42%),radial-gradient(circle_at_85%_12%,rgba(3,25,54,0.3),transparent_46%)]",
    badge: "Tool pools",
  },
  {
    title: "Advice & Learning",
    description: "Lightweight coaching, design reviews, and self-paced learning paths.",
    icon: "Advice & Learning",
    items: ["Beginner-friendly lessons", "Remote design reviews", "Office hours for quick questions"],
    accent: "from-[#eef2ff] via-white to-[#fdf5e9]",
    accentDark: "bg-[radial-gradient(circle_at_18%_14%,rgba(212,175,55,0.18),transparent_40%),radial-gradient(circle_at_82%_12%,rgba(0,123,255,0.12),transparent_44%)]",
    badge: "Coaches",
  },
  {
    title: "Community Projects",
    description: "Organized build days, fundraising, and shared ownership models.",
    icon: "Community Projects",
    items: ["Weekend build coordination", "Fundraising playbooks", "Volunteer onboarding"],
    accent: "from-[#eef2ff] via-white to-[#fdf5e9]",
    accentDark: "bg-[radial-gradient(circle_at_18%_14%,rgba(0,123,255,0.16),transparent_42%),radial-gradient(circle_at_82%_12%,rgba(212,175,55,0.12),transparent_46%)]",
    badge: "Build hubs",
  },
];

const Services: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900 dark:text-white">
    <ServicesHero />
    <OutcomesStrip />
    <PillarMap />
    <ServiceFinder />
    <HowItWorksTimeline />
    <TrustSafetyPanel />
    <ProofStrip />

    <SectionContainer className="space-y-12 py-12">
      <div className="relative space-y-4 text-center">
        <span className="handmade-orbit pointer-events-none absolute right-4 top-0 h-8 w-14 rotate-[6deg] opacity-60" aria-hidden />
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-solara-navy shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-indigo-200">
          <span className="h-2 w-2 rounded-full bg-solara-gold shadow-[0_0_0_6px_rgba(212,175,55,0.2)]" />
          What we offer
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">Support tailored to how you want to help or learn.</h1>
        <span className="handmade-underline mx-auto h-3 w-32 opacity-70" aria-hidden />
        <p className="mx-auto max-w-3xl text-lg text-slate-700 dark:text-slate-200">
          Choose a path: dive into installs, share tools, coach others, or rally a community project. Each service is reusable, modular, and designed to scale across neighborhoods.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 text-slate-900 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white"
          >
            {/* Inner decorative gradient */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,123,255,0.08),transparent_40%)]" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{service.description}</p>
                </div>
                <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
                  {service.badge}
                </span>
              </div>

              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-solara-blue shadow-[0_0_0_4px_rgba(0,123,255,0.18)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/connect"
                className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-button-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue"
              >
                View helpers
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="relative overflow-hidden grid gap-4 rounded-3xl border border-white/70 bg-white/85 p-6 text-slate-900 shadow-md backdrop-blur sm:grid-cols-3 dark:border-white/10 dark:bg-[#050a16]/85 dark:text-white"
      >
        {/* Inner decorative gradient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.06),transparent_40%)]" />
        <div className="relative flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-solara-navy dark:text-indigo-200">Response speed</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">Under 24h</p>
          <p className="text-sm text-slate-700 dark:text-slate-200">Typical reply time from vetted helpers.</p>
        </div>
        <div className="relative flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-solara-navy dark:text-indigo-200">Reusability</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">Reusable playbooks</p>
          <p className="text-sm text-slate-700 dark:text-slate-200">Templates, checklists, and schedules ready to duplicate.</p>
        </div>
        <div className="relative flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-solara-navy dark:text-indigo-200">Coverage</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">UK-wide helpers</p>
          <p className="text-sm text-slate-700 dark:text-slate-200">Connect by region, specialty, or availability.</p>
        </div>
      </motion.div>
    </SectionContainer>

    <ServicesFAQ />
    <FinalCTA />
    </div>
  );
};

export default Services;
