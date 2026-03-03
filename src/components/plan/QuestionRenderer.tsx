import React, { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NavigatorQuestion, NavigatorAnswerMap } from "../../data/solarNavigator";
import OptionCard from "./OptionCard";
import { ArrowRight } from "lucide-react";

type Props = {
  question: NavigatorQuestion;
  index: number;
  total: number;
  answers: NavigatorAnswerMap;
  onAnswer: (value: string) => void;
};

const QuestionRenderer: React.FC<Props> = ({ question, index, total, answers, onAnswer }) => {
  const reduceMotion = useReducedMotion();
  const selected = answers[question.id];
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    firstButtonRef.current?.focus();
  }, [question.id]);

  const variants = useMemo(
    () => ({
      initial: { opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: reduceMotion ? 0 : -10, scale: reduceMotion ? 1 : 0.98 },
    }),
    [reduceMotion]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div key={question.id} initial="initial" animate="animate" exit="exit" variants={variants} transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }} className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-solara-navy dark:text-indigo-200">
            Step {index + 1} of {total}
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{question.title}</h2>
          {question.helper && <p className="text-sm text-slate-700 dark:text-slate-200/80">{question.helper}</p>}
        </div>

        {question.type === "info" ? (
          <div className="rounded-2xl border border-[#ffd70040] bg-white/80 p-4 text-slate-900 shadow-[0_16px_60px_rgba(0,51,102,0.3)] dark:bg-white/5 dark:text-slate-100">
            <p className="text-sm text-slate-800 dark:text-slate-100">{question.body}</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((opt, optIndex) => (
              <OptionCard
                key={opt.value}
                ref={optIndex === 0 ? firstButtonRef : undefined}
                label={opt.label}
                description={opt.description}
                selected={selected === opt.value}
                onSelect={() => onAnswer(opt.value)}
                icon={opt.icon ? <ArrowRight className="h-4 w-4" /> : undefined}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionRenderer;
