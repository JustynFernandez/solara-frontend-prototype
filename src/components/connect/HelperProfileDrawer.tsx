import React from "react";
import { Helper } from "../../data/helpers";
import AnimatedButton from "../ui/animated-button";
import { ShieldCheck } from "lucide-react";

type Props = {
  helper: Helper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequest: (helper: Helper) => void;
};

const levelCopy: Record<Helper["level"], string> = {
  community: "Guidance, photos, checklists, and remote support.",
  trained: "Peer review, site walkthroughs, and tool coaching.",
  certified: "Mains wiring, commissioning, and formal sign-off.",
};

const HelperProfileDrawer: React.FC<Props> = ({ helper, open, onOpenChange, onRequest }) => {
  if (!helper || !open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} aria-hidden />
      <div className="relative z-10 w-[95vw] max-w-2xl rounded-2xl border border-white/10 bg-white/90 p-5 text-slate-900 shadow-2xl backdrop-blur-2xl dark:bg-[#0a0f1e] dark:text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold">{helper.name}</p>
              {helper.verified && <ShieldCheck className="h-4 w-4 text-solara-gold" />}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200">{levelCopy[helper.level]}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full border border-white/50 bg-white/60 px-2 py-1 text-xs font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            Close
          </button>
        </div>
        <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <p>{helper.bio}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">Support types: {helper.supportTypes.join(", ")} · Response: {helper.responseTimeLabel}</p>
          <div className="flex flex-wrap gap-2">
            {helper.skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/50 bg-white/70 px-2 py-1 text-xs font-semibold text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">Any work involving mains wiring requires a certified professional.</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <AnimatedButton onClick={() => onRequest(helper)} className="px-4 py-2">
            Request support
          </AnimatedButton>
          <AnimatedButton variant="outline" className="px-4 py-2">
            Save helper
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default HelperProfileDrawer;
