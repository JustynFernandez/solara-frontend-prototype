import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import AnimatedButton from "../ui/animated-button";
import ValidatedInput from "../ui/ValidatedInput";
import ValidatedTextarea from "../ui/ValidatedTextarea";
import SubmitButton from "../ui/SubmitButton";
import { requestHelpSchema, validateField, getDisabledReason } from "../../lib/validationSchemas";
import { buildHelpRequestContext, createHelpRequest, resolveBackendHelperUserId, toBackendProjectId, } from "@/lib/solaraApi";
const STORAGE_KEY = "solara.requestHelpDraft.v1";
const RequestHelpDialog = ({ open, onOpenChange, helperId, helperName, projectId, context, guideSlug, onSubmitted, }) => {
    const [draft, setDraft] = useState({
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
    const [touched, setTouched] = useState({
        whatNeeded: false,
        whenNeeded: false,
        description: false,
        contactMethod: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    useEffect(() => {
        if (open) {
            setSubmitted(false);
            setSubmitError(null);
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
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
                }
                catch {
                    // ignore
                }
            }
        }
    }, [open, helperId, helperName, projectId, context, guideSlug]);
    useEffect(() => {
        if (!open)
            return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }, [draft, open]);
    useEffect(() => {
        if (!open) {
            setIsSubmitting(false);
            setSubmitError(null);
        }
    }, [open]);
    // Validation errors
    const errors = useMemo(() => ({
        whatNeeded: validateField(requestHelpSchema, "whatNeeded", draft.whatNeeded),
        whenNeeded: validateField(requestHelpSchema, "whenNeeded", draft.whenNeeded),
        description: validateField(requestHelpSchema, "description", draft.description),
        contactMethod: validateField(requestHelpSchema, "contactMethod", draft.contactMethod),
    }), [draft]);
    const canSubmit = useMemo(() => !errors.whatNeeded && !errors.whenNeeded && !errors.description && !errors.contactMethod, [errors]);
    const disabledReason = useMemo(() => getDisabledReason(draft, ["whatNeeded", "whenNeeded", "description", "contactMethod"]), [draft]);
    const handleBlur = (field) => {
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
        if (!canSubmit)
            return;
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const resolvedHelperId = resolveBackendHelperUserId(draft.helperId, draft.helperName);
            const projectId = toBackendProjectId(draft.projectId);
            const createdHelpRequest = await createHelpRequest({
                whatNeeded: draft.whatNeeded.trim(),
                whenNeeded: draft.whenNeeded.trim(),
                description: draft.description.trim(),
                contactMethod: draft.contactMethod.trim(),
                helperId: resolvedHelperId,
                projectId,
                guideSlug: draft.guideSlug || undefined,
                context: buildHelpRequestContext(draft.context, draft.helperName, resolvedHelperId),
            });
            setSubmitted(true);
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...draft, submittedAt: Date.now() }));
            onSubmitted?.(createdHelpRequest);
        }
        catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Unable to submit request right now.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (open && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm", onClick: () => onOpenChange(false), "aria-hidden": true }), _jsxs("div", { className: "relative z-10 w-[95vw] max-w-xl rounded-lg border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] p-6 text-[var(--solara-text-strong)] shadow-[var(--solara-shadow-strong)] backdrop-blur-xl", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold", children: "Request support" }), _jsx("p", { className: "text-sm text-[var(--solara-text-muted)]", children: "Share context so the right helper can respond quickly." })] }), _jsx("button", { type: "button", onClick: () => onOpenChange(false), className: "solara-inline-action solara-inline-action--quiet", children: "Close" })] }), !submitted ? (_jsxs("div", { className: "mt-4 space-y-3", children: [_jsx(ValidatedInput, { id: "whatNeeded", label: "What do you need?", value: draft.whatNeeded, onChange: (value) => setDraft((p) => ({ ...p, whatNeeded: value })), onBlur: () => handleBlur("whatNeeded"), error: errors.whatNeeded, touched: touched.whatNeeded, placeholder: "e.g., rooftop safety review, battery sizing, permit check", required: true }), _jsx(ValidatedInput, { id: "whenNeeded", label: "When do you need it?", value: draft.whenNeeded, onChange: (value) => setDraft((p) => ({ ...p, whenNeeded: value })), onBlur: () => handleBlur("whenNeeded"), error: errors.whenNeeded, touched: touched.whenNeeded, placeholder: "e.g., this week, next month, specific date", required: true }), _jsx(ValidatedTextarea, { id: "description", label: "Description", value: draft.description, onChange: (value) => setDraft((p) => ({ ...p, description: value })), onBlur: () => handleBlur("description"), error: errors.description, touched: touched.description, placeholder: "Add site details, photos link, and constraints.", rows: 4, maxLength: 1000, required: true }), _jsx(ValidatedInput, { id: "contactMethod", label: "Contact method", value: draft.contactMethod, onChange: (value) => setDraft((p) => ({ ...p, contactMethod: value })), onBlur: () => handleBlur("contactMethod"), error: errors.contactMethod, touched: touched.contactMethod, placeholder: "Email or phone number", required: true }), helperName && _jsxs("p", { className: "text-xs text-[var(--solara-text-muted)]", children: ["You're requesting support from ", helperName, "."] }), submitError ? _jsx("p", { className: "text-sm text-red-500", children: submitError }) : null, _jsxs("div", { className: "flex flex-wrap justify-end gap-2 pt-2", children: [_jsx(AnimatedButton, { variant: "outline", onClick: () => onOpenChange(false), className: "px-4 py-2", children: "Cancel" }), _jsx(SubmitButton, { onClick: handleSubmit, disabled: !canSubmit, loading: isSubmitting, disabledReason: disabledReason, className: "w-auto px-6", children: "Submit request" })] })] })) : (_jsxs("div", { className: "mt-6 space-y-3", children: [_jsxs("div", { className: "rounded-md border border-[var(--solara-accent-soft)] bg-[var(--solara-accent-soft)]/55 p-4", children: [_jsx("p", { className: "font-semibold text-[var(--solara-text-strong)]", children: "Request submitted" }), _jsx("p", { className: "mt-1 text-sm text-[var(--solara-text-muted)]", children: "A helper will respond soon. Check your contact method for updates." })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(AnimatedButton, { href: "/projects", className: "px-4 py-2", children: "Go to projects" }), _jsx(AnimatedButton, { variant: "outline", onClick: () => onOpenChange(false), className: "px-4 py-2", children: "Close" })] })] }))] })] })));
};
export default RequestHelpDialog;
