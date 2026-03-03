import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "./animated-button";

type RequestHelpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill?: { context?: string; need?: string };
};

const RequestHelpDialog: React.FC<RequestHelpDialogProps> = ({ open, onOpenChange, prefill }) => {
  const [need, setNeed] = useState(prefill?.need || "planning");
  const [timing, setTiming] = useState("flexible");
  const [description, setDescription] = useState(prefill?.context || "");
  const [contact, setContact] = useState("email");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => onOpenChange(false), 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="w-full max-w-lg rounded-2xl card-surface p-5"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">Request help</p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Share what you need</h3>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:text-emerald-100 dark:hover:bg-white/10"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {!submitted ? (
              <form className="mt-4 space-y-3 text-sm text-slate-800 dark:text-emerald-50" onSubmit={handleSubmit}>
                <label className="block space-y-1">
                  <span className="font-semibold">What do you need?</span>
                  <select
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <option value="planning">Planning</option>
                    <option value="installation">Installation</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="tools">Tools</option>
                    <option value="training">Training</option>
                  </select>
                </label>

                <label className="block space-y-1">
                  <span className="font-semibold">Preferred timing</span>
                  <select
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <option value="flexible">Flexible</option>
                    <option value="asap">ASAP</option>
                    <option value="weekend">Weekend</option>
                    <option value="evening">Evenings</option>
                  </select>
                </label>

                <label className="block space-y-1">
                  <span className="font-semibold">Short description</span>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    rows={3}
                    placeholder="Describe your need..."
                  />
                </label>

                <label className="block space-y-1">
                  <span className="font-semibold">Preferred contact</span>
                  <select
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <div className="flex justify-end gap-2 pt-2">
                  <AnimatedButton variant="outline" type="button" onClick={() => onOpenChange(false)} className="px-4 py-2">
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton type="submit" className="px-4 py-2">
                    Submit request
                  </AnimatedButton>
                </div>
              </form>
            ) : (
              <div className="mt-4 space-y-2 text-sm text-slate-800 dark:text-emerald-100">
                <p className="font-semibold text-emerald-700 dark:text-emerald-200">Request saved</p>
                <p>In a real version of Solara, this would notify the project organiser or helper.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestHelpDialog;
