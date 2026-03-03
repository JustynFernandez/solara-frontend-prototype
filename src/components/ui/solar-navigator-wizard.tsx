import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Home, Building2, Leaf, HandHeart, Sparkles, BadgeCheck, Wrench } from "lucide-react";
import StepIndicator from "./StepIndicator";
import AnimatedButton from "./animated-button";

export type NavigatorQuestion = {
  id: string;
  prompt: string;
  options: {
    value: string;
    label: string;
    description: string;
    icon: React.ElementType;
  }[];
};

const questions: NavigatorQuestion[] = [
  {
    id: "dwelling",
    prompt: "Do you rent or own?",
    options: [
      { value: "renter", label: "Renter", description: "Flat / apartment", icon: Building },
      { value: "owner", label: "Homeowner", description: "House with roof", icon: Home },
      { value: "org", label: "Organisation", description: "School, coop, community", icon: Building2 },
    ],
  },
  {
    id: "goal",
    prompt: "Primary goal?",
    options: [
      { value: "bills", label: "Lower bills", description: "Cut monthly energy costs", icon: Leaf },
      { value: "backup", label: "Backup power", description: "Resilience & batteries", icon: HandHeart },
      { value: "impact", label: "Environmental impact", description: "CO2 reduction", icon: Sparkles },
      { value: "learning", label: "Learning", description: "Hands-on experience", icon: Wrench },
    ],
  },
  {
    id: "budget",
    prompt: "Upfront budget?",
    options: [
      { value: "free", label: "Free", description: "Subscriptions / community", icon: Sparkles },
      { value: "lt200", label: "< GBP 200", description: "Portable / starter kits", icon: Leaf },
      { value: "200-1000", label: "GBP 200-1,000", description: "Portable + small battery", icon: Home },
      { value: "gt1000", label: "> GBP 1,000", description: "Rooftop / bigger kits", icon: Building2 },
    ],
  },
  {
    id: "space",
    prompt: "What space do you have?",
    options: [
      { value: "flat", label: "Flat / balcony", description: "Limited outdoor space", icon: Building },
      { value: "roof", label: "House with roof", description: "Rooftop-friendly", icon: Home },
      { value: "shared", label: "Shared building", description: "Community spaces", icon: Building2 },
      { value: "rural", label: "Rural outdoor", description: "Plenty of space", icon: Leaf },
    ],
  },
  {
    id: "confidence",
    prompt: "DIY / electrics confidence?",
    options: [
      { value: "beginner", label: "Beginner", description: "Prefer guidance", icon: Sparkles },
      { value: "intermediate", label: "Intermediate", description: "Comfortable", icon: HandHeart },
      { value: "advanced", label: "Advanced", description: "Can lead installs", icon: BadgeCheck },
    ],
  },
];

export type NavigatorAnswers = Record<string, string>;

type SolarNavigatorWizardProps = {
  onComplete: (answers: NavigatorAnswers) => void;
};

const SolarNavigatorWizard: React.FC<SolarNavigatorWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<NavigatorAnswers>({});

  const currentQuestion = questions[step];
  const isLast = step === questions.length - 1;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const canContinue = useMemo(() => Boolean(answers[currentQuestion.id]), [answers, currentQuestion]);

  const handleNext = () => {
    if (!canContinue) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  return (
    <div className="space-y-4 rounded-3xl border border-white/70 bg-white/95 p-4 text-slate-900 shadow-[0_24px_80px_rgba(0,51,102,0.18)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#0b1326]/95 dark:text-white">
      <StepIndicator current={step} total={questions.length} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-100">Step {step + 1}</p>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{currentQuestion.prompt}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((opt) => {
              const Icon = opt.icon;
              const selected = answers[currentQuestion.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4fbf] ${
                    selected
                      ? "border-[rgba(0,123,255,0.55)] bg-white/90 shadow-[0_12px_32px_rgba(0,51,102,0.18)] dark:border-[rgba(0,123,255,0.6)] dark:bg-[#0b172e]/90"
                      : "border-white/70 bg-white/80 hover:border-[rgba(0,123,255,0.4)] dark:border-white/15 dark:bg-[#0b172e]/70"
                  }`}
                  aria-pressed={selected}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,123,255,0.12)] text-solara-navy ring-1 ring-[rgba(0,123,255,0.25)] dark:text-indigo-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{opt.label}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-200">{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between gap-2">
        <AnimatedButton variant="outline" onClick={handleBack} className="px-4 py-2">
          Back
        </AnimatedButton>
        <AnimatedButton onClick={handleNext} className="px-4 py-2" disabled={!canContinue}>
          {isLast ? "See my plan" : "Next"}
        </AnimatedButton>
      </div>
    </div>
  );
};

export { questions as navigatorQuestions };
export default SolarNavigatorWizard;
