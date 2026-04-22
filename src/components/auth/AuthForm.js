import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import PageFrame from "@/components/ui/page-frame";
import FormShell from "@/components/ui/form-shell";
import ActionRail from "@/components/ui/action-rail";
import MetricBand from "@/components/ui/metric-band";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
const defaultAside = (_jsxs(PreviewFrame, { chromeLabel: "Account continuity", eyebrow: "What carries through", title: "Pick up the same work, the same context, and the same momentum.", body: "Sign in to resume planning, keep helper shortlists, and move between projects without rebuilding your setup.", viewportClassName: "pt-0", children: [_jsx(MetricBand, { compact: true, items: [
                { label: "Saved helpers", value: "One shortlist", meta: "Keep trusted contacts and request handoffs together." },
                { label: "Project continuity", value: "No reset", meta: "Move from guides and planning into active workspaces." },
                { label: "Profile setup", value: "Already framed", meta: "Your role, skills, and photo stay aligned across the flow." },
            ] }), _jsx(ActionRail, { compact: true, items: [
                {
                    eyebrow: "Saved helpers",
                    title: "Keep trusted contacts in one place.",
                    body: "Response history, fit notes, and request handoffs stay visible.",
                },
                {
                    eyebrow: "Project continuity",
                    title: "Move into active work without duplicate setup.",
                    body: "Saved guides, helpers, and planning choices stay attached to the flow.",
                },
            ] })] }));
const AuthForm = ({ title, subtitle, onSubmit, children, cta, aside = defaultAside, eyebrow }) => (_jsx(PageFrame, { family: "hub", width: "wide", density: "compact", className: "min-h-[calc(100vh-5rem)]", children: _jsx(PageReveal, { mode: "mount", children: _jsx(FormShell, { eyebrow: eyebrow || cta || "Account", title: title, body: subtitle, lead: _jsx(MetricBand, { compact: true, items: [
                    { label: "Flow", value: "Mock account", meta: "No backend dependency required." },
                    { label: "Carry-over", value: "Saved state", meta: "Helpers, guides, and planning stay linked." },
                ] }), aside: aside, layout: "split", children: _jsx("form", { onSubmit: onSubmit, className: "space-y-5", children: children }) }) }) }));
export default AuthForm;
