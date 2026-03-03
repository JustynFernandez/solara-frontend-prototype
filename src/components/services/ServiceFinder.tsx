import React, { useEffect, useMemo, useState } from "react";
import AnimatedButton from "../ui/animated-button";
import SectionContainer from "../ui/section-container";
import { motion, useReducedMotion } from "framer-motion";

type Answers = {
  start?: string;
  support?: string;
  priority?: string;
};

const STORAGE_KEY = "solara.servicesRecs.v1";

const questions = [
  {
    id: "start",
    title: "Where are you starting?",
    options: [
      { value: "idea", label: "Idea" },
      { value: "planning", label: "Planning" },
      { value: "install", label: "Active install" },
      { value: "maintenance", label: "Maintenance" },
    ],
  },
  {
    id: "support",
    title: "What support level do you want?",
    options: [
      { value: "self", label: "Self-guided" },
      { value: "community", label: "Community" },
      { value: "certified", label: "Certified" },
    ],
  },
  {
    id: "priority",
    title: "What matters most?",
    options: [
      { value: "cost", label: "Cost" },
      { value: "speed", label: "Speed" },
      { value: "safety", label: "Safety" },
      { value: "resilience", label: "Resilience" },
    ],
  },
];

type Recommendation = {
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
};

const pickRecommendation = (answers: Answers): Recommendation => {
  if (answers.support === "certified" || answers.priority === "safety") {
    return { title: "Get certified help", body: "Request a helper for mains wiring and safety walkthroughs.", ctaLabel: "Request support", href: "/connect?requestHelp=1" };
  }
  if (answers.start === "planning" || answers.start === "idea") {
    return { title: "Start Solar Navigator", body: "Answer guided questions and save a plan draft.", ctaLabel: "Start Navigator", href: "/plan/navigator" };
  }
  if (answers.start === "install" || answers.priority === "speed") {
    return { title: "Create a Project Workspace", body: "Track tasks, files, and helper invites in one place.", ctaLabel: "Open Workspaces", href: "/projects" };
  }
  return { title: "Browse helpers and guides", body: "See helpers by specialty and guides for your scenario.", ctaLabel: "Go to Connect", href: "/connect" };
};

const ServiceFinder: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<Answers>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setAnswers(JSON.parse(raw));
      } catch {
        setAnswers({});
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, loaded]);

  const recommendation = useMemo(() => pickRecommendation(answers), [answers]);

  return (
    <SectionContainer className="space-y-4">
      <div className="space-y-2 text-slate-900 dark:text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-solara-navy dark:text-indigo-200">Service finder</p>
        <h2 className="text-2xl font-semibold">Find the next best move</h2>
        <p className="text-sm text-slate-700 dark:text-slate-200/80">Three quick choices. We’ll point you to the right flow.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-2xl border border-white/50 bg-white/80 p-4 text-slate-900 shadow-[0_22px_80px_rgba(0,51,102,0.26)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{q.title}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const selected = answers[q.id as keyof Answers] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                      aria-pressed={selected}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] ${
                        selected
                          ? "bg-[#0b4fbf] text-white shadow-[0_10px_30px_rgba(0,123,255,0.35)]"
                          : "border border-slate-300 bg-white text-slate-800 hover:border-[#ffd70066] dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.4 }}
          className="flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/80 p-5 text-slate-900 shadow-[0_22px_80px_rgba(0,51,102,0.26)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Recommendation</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{recommendation.title}</h3>
          <p className="text-sm text-slate-700 dark:text-slate-200/85">{recommendation.body}</p>
          <AnimatedButton href={recommendation.href} className="mt-auto w-full justify-center px-4 py-2">
            {recommendation.ctaLabel}
          </AnimatedButton>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default ServiceFinder;
