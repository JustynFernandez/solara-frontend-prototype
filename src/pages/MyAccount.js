import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import PageIntro from "@/components/ui/page-intro";
import PageHeroStage from "@/components/ui/page-hero-stage";
import MetricBand from "@/components/ui/metric-band";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import SurfacePanel from "@/components/ui/surface-panel";
import InlineAction from "@/components/ui/inline-action";
import { useAuth } from "../context/auth-context";
import { locations, skillOptions } from "../data/mockData";
const fieldClassName = "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition placeholder:text-[var(--solara-text-muted)] focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";
const roleOptions = ["Helper", "Seeker"];
const MyAccount = () => {
    const { user, updateProfile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(user || {});
    const initials = useMemo(() => {
        if (!user?.name)
            return "SO";
        return user.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [user?.name]);
    if (!user) {
        return (_jsx(PageFrame, { family: "account", width: "wide", density: "compact", children: _jsx(PageReveal, { mode: "mount", children: _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.05fr_0.95fr]", children: [_jsxs(SurfacePanel, { variant: "account", density: "comfortable", className: "space-y-5", children: [_jsx(PageIntro, { variant: "quiet", eyebrow: "My account", title: "You are signed out.", body: "Sign in to view your profile, saved helpers, and planning progress.", align: "left" }), _jsx(MetricBand, { compact: true, items: [
                                        { label: "Profile", value: "Private", meta: "Your saved identity and preferences stay behind sign-in." },
                                        { label: "Context", value: "Stored", meta: "Helpers, projects, and planning notes reappear after login." },
                                    ] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(InlineAction, { to: "/sign-in", emphasis: "strong", children: "Sign in" }), _jsx(InlineAction, { to: "/register", children: "Create account" })] })] }), _jsx(PreviewFrame, { chromeLabel: "Why it matters", eyebrow: "Account continuity", title: "Keep your profile, helpers, and planning history together.", body: "The account area is the stable surface that carries your identity through the rest of Solara.", viewportClassName: "pt-0", children: _jsx(ActionRail, { compact: true, items: [
                                    { eyebrow: "Saved work", title: "Return to the same setup.", body: "Projects and helper shortlists wait for you instead of starting fresh." },
                                    { eyebrow: "Profile state", title: "Keep your roles visible.", body: "Location, skills, and photo all stay attached to your account." },
                                ] }) })] }) }) }));
    }
    const toggleRole = (role) => {
        setDraft((prev) => {
            const roles = prev.roles || [];
            return {
                ...prev,
                roles: roles.includes(role) ? roles.filter((item) => item !== role) : [...roles, role],
            };
        });
    };
    const toggleSkill = (skill) => {
        setDraft((prev) => {
            const skills = prev.skills || [];
            return {
                ...prev,
                skills: skills.includes(skill) ? skills.filter((item) => item !== skill) : [...skills, skill],
            };
        });
    };
    const saveProfile = (event) => {
        event.preventDefault();
        updateProfile(draft);
        setEditing(false);
    };
    const roleCount = user.roles?.length || 0;
    const skillCount = user.skills?.length || 0;
    const bioWords = user.bio ? user.bio.split(/\s+/).filter(Boolean).length : 0;
    return (_jsxs(PageFrame, { family: "account", width: "wide", density: "compact", children: [_jsx(PageReveal, { mode: "mount", children: _jsx(PageHeroStage, { family: "account", eyebrow: "My account", title: user.name, body: `${user.location} · ${(user.roles || []).join(", ")}`, actions: _jsx("button", { type: "button", onClick: () => setEditing((value) => !value), className: "solara-inline-action solara-inline-action--strong", children: editing ? "Cancel" : "Edit profile" }), metrics: [
                        { label: "Roles", value: roleCount, meta: "How you appear across Solara" },
                        { label: "Skills", value: skillCount, meta: "Used for matching and requests" },
                        { label: "Bio", value: bioWords, meta: "Words available for context" },
                    ], preview: _jsx(PreviewFrame, { chromeLabel: "Profile summary", eyebrow: "Visible identity", title: "The profile people see before opening the full detail.", body: "Keep your role, skills, and short context readable at a glance.", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("span", { className: "inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-xl font-semibold text-[var(--solara-text-strong)]", children: user.photo ? _jsx("img", { src: user.photo, alt: user.name, className: "h-full w-full object-cover" }) : initials }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-lg font-semibold text-[var(--solara-text-strong)]", children: user.name }), _jsx("p", { className: "text-sm text-[var(--solara-text-muted)]", children: user.location }), _jsx("div", { className: "flex flex-wrap gap-2", children: (user.roles || []).map((role) => (_jsx("span", { className: "rounded-full border border-[var(--solara-rule)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-strong)]", children: role }, role))) })] })] }) }) }) }), _jsx(PageReveal, { mode: "in-view", children: _jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]", children: [_jsxs(SurfacePanel, { variant: "account", layout: "preview", density: "comfortable", className: "space-y-5", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("span", { className: "inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-xl font-semibold text-[var(--solara-text-strong)]", children: user.photo ? _jsx("img", { src: user.photo, alt: user.name, className: "h-full w-full object-cover" }) : initials }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Profile" }), _jsx("p", { className: "text-xl font-semibold text-[var(--solara-text-strong)]", children: user.name }), _jsx("p", { className: "text-sm text-[var(--solara-text-muted)]", children: user.location }), _jsx("div", { className: "flex flex-wrap gap-2", children: (user.roles || []).map((role) => (_jsx("span", { className: "rounded-full border border-[var(--solara-rule)] px-3 py-1 text-xs font-semibold text-[var(--solara-text-strong)]", children: role }, role))) })] })] }), _jsxs("div", { className: "space-y-2 border-t border-[var(--solara-rule-soft)] pt-4", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "About" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: user.bio || "No bio added yet." })] }), _jsxs("div", { className: "space-y-3 border-t border-[var(--solara-rule-soft)] pt-4", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Skills and resources" }), _jsx("div", { className: "flex flex-wrap gap-2", children: (user.skills || []).length > 0 ? (user.skills.map((skill) => (_jsx("span", { className: "rounded-full border border-[var(--solara-rule)] px-3 py-2 text-sm text-[var(--solara-text-muted)]", children: skill }, skill)))) : (_jsx("span", { className: "text-sm text-[var(--solara-text-muted)]", children: "No skills added yet." })) })] })] }), _jsxs(SurfacePanel, { variant: "account", layout: "rail", density: "compact", className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]", children: "Actions" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Move into the parts of Solara where your profile matters most." })] }), _jsx(ActionRail, { items: [
                                        { title: "Browse helpers", body: "See who matches your role and location best.", action: _jsx(Link, { to: "/connect/helpers", className: "solara-inline-action solara-inline-action--default", children: "Open" }) },
                                        { title: "Open projects", body: "Move from profile into active neighborhood workspaces.", action: _jsx(Link, { to: "/projects", className: "solara-inline-action solara-inline-action--default", children: "Open" }) },
                                        { title: "Run Navigator", body: "Turn your next solar question into a practical route.", action: _jsx(Link, { to: "/plan/navigator", className: "solara-inline-action solara-inline-action--default", children: "Open" }) },
                                    ] })] })] }) }), editing ? (_jsx(PageReveal, { mode: "in-view", children: _jsx(SurfacePanel, { variant: "account", layout: "split", density: "comfortable", children: _jsxs("form", { onSubmit: saveProfile, className: "space-y-6", children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsx("div", { className: "space-y-2", children: _jsxs("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: ["Name", _jsx("input", { type: "text", value: draft.name || "", onChange: (event) => setDraft((prev) => ({ ...prev, name: event.target.value })), className: fieldClassName })] }) }), _jsx("div", { className: "space-y-2", children: _jsxs("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: ["Location", _jsx("select", { value: draft.location || "London", onChange: (event) => setDraft((prev) => ({ ...prev, location: event.target.value })), className: fieldClassName, children: locations.filter((city) => city !== "Any").map((city) => (_jsx("option", { value: city, children: city }, city))) })] }) })] }), _jsxs("label", { className: "block space-y-2 text-sm font-semibold text-[var(--solara-text-strong)]", children: ["Bio", _jsx("textarea", { rows: "3", value: draft.bio || "", onChange: (event) => setDraft((prev) => ({ ...prev, bio: event.target.value })), className: fieldClassName })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: "Roles" }), _jsx("div", { className: "flex flex-wrap gap-2", children: roleOptions.map((role) => {
                                            const active = (draft.roles || []).includes(role);
                                            return (_jsx("button", { type: "button", onClick: () => toggleRole(role), className: `rounded-full border px-4 py-2 text-sm font-semibold transition ${active
                                                    ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                                                    : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)] hover:border-[var(--solara-accent-soft)]"}`, children: role }, role));
                                        }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: "Skills" }), _jsx("div", { className: "flex flex-wrap gap-2", children: skillOptions.map((skill) => {
                                            const active = (draft.skills || []).includes(skill);
                                            return (_jsx("button", { type: "button", onClick: () => toggleSkill(skill), className: `rounded-full border px-4 py-2 text-sm transition ${active
                                                    ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                                                    : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-muted)] hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)]"}`, children: skill }, skill));
                                        }) })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("button", { type: "submit", className: "solara-inline-action solara-inline-action--strong", children: "Save changes" }), _jsx("button", { type: "button", onClick: () => setEditing(false), className: "solara-inline-action solara-inline-action--default", children: "Cancel" })] })] }) }) })) : null] }));
};
export default MyAccount;
