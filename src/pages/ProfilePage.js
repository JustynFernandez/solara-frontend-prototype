import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { helpers, mockUser } from "../data/mockData";
import SkillIcon, { skillDetails } from "../components/shared/SkillIcon";
import TooltipCard from "../components/shared/TooltipCard";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import PageHeroStage from "@/components/ui/page-hero-stage";
import PageIntro from "@/components/ui/page-intro";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
const statCard = (label, value) => (_jsxs("div", { className: "rounded-[1rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] p-4 shadow-sm", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-[var(--solara-accent-strong)]", children: label }), _jsx("p", { className: "text-2xl font-semibold text-slate-900 dark:text-white", children: value })] }));
const ProfilePage = () => {
    const { id } = useParams();
    const profile = helpers.find((helper) => helper.id === id) || mockUser;
    const profileSignals = [
        {
            eyebrow: "Support fit",
            title: profile.availability || "Flexible schedule",
            body: "Availability and response rhythm help projects decide whether this is the right first contact.",
        },
        {
            eyebrow: "Strengths",
            title: `${profile.skills?.length || 0} skills visible`,
            body: "Shared skills, resources, and tags make the helper legible before a request starts.",
        },
    ];
    return (_jsx(PageFrame, { family: "product", width: "wide", density: "compact", className: "min-h-screen", children: _jsxs(PageReveal, { mode: "mount", className: "space-y-8", children: [_jsx(PageHeroStage, { family: "product", eyebrow: "Helper profile", title: profile.name, body: profile.location, actions: _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(InlineAction, { to: "/request-help", emphasis: "strong", children: "Request help" }), _jsx(InlineAction, { to: "/connect", children: "Back to helpers" })] }), metrics: [
                        { label: "Rating", value: profile.rating?.toFixed(1) ?? "4.8", meta: "Community feedback and fit." },
                        { label: "Availability", value: profile.availability || "Flexible", meta: "Current working rhythm." },
                        { label: "Activity", value: profile.activityScore ? `${profile.activityScore}%` : "90%", meta: "Recent engagement across Solara." },
                    ], preview: _jsx(PreviewFrame, { chromeLabel: "Profile card", eyebrow: "At a glance", title: "What people see before they open the full detail.", body: "Role, location, and skills should be legible in seconds.", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("img", { src: profile.photo, alt: profile.name, className: "h-24 w-24 rounded-[1rem] object-cover ring-1 ring-[var(--solara-rule)]" }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-2xl font-semibold text-[var(--solara-text-strong)]", children: profile.name }), _jsx("p", { className: "text-sm text-[var(--solara-text-muted)]", children: profile.location }), _jsx("div", { className: "flex flex-wrap gap-2", children: profile.roles?.map((role) => (_jsx("span", { className: "rounded-md border border-[var(--solara-rule)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-strong)]", children: role }, role))) })] })] }) }) }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(SurfacePanel, { variant: "product", layout: "preview", children: _jsx(PageIntro, { variant: "product", layout: "preview", eyebrow: "About", title: "What this helper brings to the work.", body: profile.bio, className: "max-w-none" }) }), _jsxs(SurfacePanel, { variant: "product", layout: "preview", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx(PageIntro, { variant: "product", layout: "preview", eyebrow: "Skills and resources", title: "Read the core capabilities before opening the full conversation.", body: "Hover over a skill to see the shared capability behind it.", className: "max-w-none" }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Hover to learn" })] }), _jsx("div", { className: "mt-3 flex flex-wrap gap-3", children: profile.skills?.map((skill) => (_jsxs("div", { className: "group relative", children: [_jsx(SkillIcon, { name: skill, className: "h-12 w-12" }), _jsx(TooltipCard, { title: skill, description: skillDetails[skill] || "Shared knowledge" })] }, skill))) }), profile.tags?.length ? (_jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: profile.tags.map((tag) => (_jsx("span", { className: "rounded-full border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-muted)]", children: tag }, tag))) })) : null] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs(SurfacePanel, { variant: "product", layout: "rail", className: "p-5", children: [_jsx(PageIntro, { variant: "product", layout: "rail", eyebrow: "At a glance", title: "Screen the helper before you decide on the next move.", body: "Keep the key signals visible without forcing the user into a long profile read.", className: "max-w-none" }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 text-sm", children: [statCard("Rating", profile.rating?.toFixed(1) ?? "4.8"), statCard("Availability", profile.availability || "Flexible"), statCard("Joined", profile.joinedAt || "2024"), statCard("Activity", profile.activityScore ? `${profile.activityScore}%` : "90%")] })] }), _jsx(SurfacePanel, { variant: "product", layout: "rail", className: "p-5", children: _jsx(ActionRail, { compact: true, items: profileSignals }) }), _jsxs(SurfacePanel, { variant: "product", layout: "rail", className: "p-5", children: [_jsx(PageIntro, { variant: "product", layout: "rail", eyebrow: "Next steps", title: "Keep the handoff direct.", body: "Move from profile review into a request or back into the wider helper roster.", className: "max-w-none" }), _jsx(ActionRail, { items: [
                                                { title: "Send a request", body: "Open a support request if this helper fits the job.", action: _jsx(Link, { to: "/request-help", className: "solara-inline-action solara-inline-action--default", children: "Open" }) },
                                                { title: "Return to helpers", body: "Browse the full helper roster again.", action: _jsx(Link, { to: "/connect", className: "solara-inline-action solara-inline-action--default", children: "Browse" }) },
                                            ] })] })] })] })] }) }));
};
export default ProfilePage;
