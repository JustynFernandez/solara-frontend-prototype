import React, { useEffect, useMemo, useState } from "react";
import AnimatedButton from "../ui/animated-button";
import ValidatedInput from "../ui/ValidatedInput";
import ValidatedTextarea from "../ui/ValidatedTextarea";
import SubmitButton from "../ui/SubmitButton";
import { requestHelpSchema, validateField, getDisabledReason } from "../../lib/validationSchemas";

type RequestHelpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  helperId?: string;
  helperName?: string;
  projectId?: string;
  context?: string;
  guideSlug?: string;
};

const STORAGE_KEY = "solara.requestHelpDraft.v1";

type Draft = {
  whatNeeded: string;
  whenNeeded: string;
  description: string;
  contactMethod: string;
  helperId?: string;
  helperName?: string;
  projectId?: string;
  context?: string;
  guideSlug?: string;
};

type TouchedState = {
  whatNeeded: boolean;
  whenNeeded: boolean;
  description: boolean;
  contactMethod: boolean;
};

const RequestHelpDialog: React.FC<RequestHelpDialogProps> = ({ open, onOpenChange, helperId, helperName, projectId, context, guideSlug }) => {
  const [draft, setDraft] = useState<Draft>({
    whatNeeded: "",
    whenNeeded: "",
    description: context || "",
    contactMethod: "",
    helperId,
    helperName,
    projectId,
    context,
    guideSlug,
  });
  const [touched, setTouched] = useState<TouchedState>({
    whatNeeded: false,
    whenNeeded: false,
    description: false,
    contactMethod: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as Draft;
          setDraft((prev) => ({
            ...prev,
            ...parsed,
            helperId: helperId ?? parsed.helperId,
            helperName: helperName ?? parsed.helperName,
            projectId: projectId ?? parsed.projectId,
            context: context ?? parsed.context,
            guideSlug: guideSlug ?? parsed.guideSlug,
            description: context || prev.description || parsed.description || "",
          }));
        } catch {
          // ignore
        }
      }
    }
  }, [open, helperId, helperName, projectId, context, guideSlug]);

  useEffect(() => {
    if (!open) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft, open]);

  // Validation errors
  const errors = useMemo(() => ({
    whatNeeded: validateField(requestHelpSchema, "whatNeeded", draft.whatNeeded),
    whenNeeded: validateField(requestHelpSchema, "whenNeeded", draft.whenNeeded),
    description: validateField(requestHelpSchema, "description", draft.description),
    contactMethod: validateField(requestHelpSchema, "contactMethod", draft.contactMethod),
  }), [draft]);

  const canSubmit = useMemo(
    () => !errors.whatNeeded && !errors.whenNeeded && !errors.description && !errors.contactMethod,
    [errors]
  );

  const disabledReason = useMemo(
    () => getDisabledReason(requestHelpSchema, draft),
    [draft]
  );

  const handleBlur = (field: keyof TouchedState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    // Mark all fields as touched to show any remaining errors
    setTouched({
      whatNeeded: true,
      whenNeeded: true,
      description: true,
      contactMethod: true,
    });

    if (!canSubmit) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...draft, submittedAt: Date.now() }));
  };

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} aria-hidden />
        <div className="relative z-10 w-[95vw] max-w-xl rounded-2xl border border-white/10 bg-white/90 p-6 text-slate-900 shadow-2xl backdrop-blur-2xl dark:bg-[#0a0f1e] dark:text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold">Request support</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">Share context so the right helper can respond quickly.</p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full border border-white/40 bg-white/60 px-2 py-1 text-xs font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:border-white/15 dark:bg-white/10 dark:text-white"
            >
              Close
            </button>
          </div>
          {!submitted ? (
            <div className="mt-4 space-y-3">
              <ValidatedInput
                id="whatNeeded"
                label="What do you need?"
                value={draft.whatNeeded}
                onChange={(value) => setDraft((p) => ({ ...p, whatNeeded: value }))}
                onBlur={() => handleBlur("whatNeeded")}
                error={errors.whatNeeded}
                touched={touched.whatNeeded}
                placeholder="e.g., rooftop safety review, battery sizing, permit check"
                required
              />
              <ValidatedInput
                id="whenNeeded"
                label="When do you need it?"
                value={draft.whenNeeded}
                onChange={(value) => setDraft((p) => ({ ...p, whenNeeded: value }))}
                onBlur={() => handleBlur("whenNeeded")}
                error={errors.whenNeeded}
                touched={touched.whenNeeded}
                placeholder="e.g., this week, next month, specific date"
                required
              />
              <ValidatedTextarea
                id="description"
                label="Description"
                value={draft.description}
                onChange={(value) => setDraft((p) => ({ ...p, description: value }))}
                onBlur={() => handleBlur("description")}
                error={errors.description}
                touched={touched.description}
                placeholder="Add site details, photos link, and constraints."
                rows={4}
                maxLength={1000}
                required
              />
              <ValidatedInput
                id="contactMethod"
                label="Contact method"
                value={draft.contactMethod}
                onChange={(value) => setDraft((p) => ({ ...p, contactMethod: value }))}
                onBlur={() => handleBlur("contactMethod")}
                error={errors.contactMethod}
                touched={touched.contactMethod}
                placeholder="Email or phone number"
                required
              />
              {helperName && (
                <p className="text-xs text-slate-600 dark:text-slate-300">You're requesting support from {helperName}.</p>
              )}
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <AnimatedButton variant="outline" onClick={() => onOpenChange(false)} className="px-4 py-2">
                  Cancel
                </AnimatedButton>
                <SubmitButton
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  loading={isSubmitting}
                  disabledReason={disabledReason}
                  className="w-auto px-6"
                >
                  Submit request
                </SubmitButton>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">Request submitted!</p>
                <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">A helper will respond soon. Check your contact method for updates.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <AnimatedButton href="/projects" className="px-4 py-2">
                  Go to projects
                </AnimatedButton>
                <AnimatedButton variant="outline" onClick={() => onOpenChange(false)} className="px-4 py-2">
                  Close
                </AnimatedButton>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default RequestHelpDialog;
