import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/auth-context";
import { locations, skillOptions } from "../data/mockData";
const fieldClassName = "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition placeholder:text-[var(--solara-text-muted)] focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";
const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        location: "London",
        bio: "",
        roles: ["Helper"],
        skills: [],
        photo: "",
    });
    const [status, setStatus] = useState("");
    const toggleRole = (role) => {
        setForm((prev) => ({
            ...prev,
            roles: prev.roles.includes(role) ? prev.roles.filter((item) => item !== role) : [...prev.roles, role],
        }));
    };
    const toggleSkill = (skill) => {
        setForm((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill) ? prev.skills.filter((item) => item !== skill) : [...prev.skills, skill],
        }));
    };
    const handlePhoto = (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
        reader.readAsDataURL(file);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        register(form);
        setStatus("Account created (mock). Continue to set up your profile...");
        setTimeout(() => navigate("/account/create"), 700);
    };
    return (_jsxs(AuthForm, { eyebrow: "Create account", title: "Create your Solara profile", subtitle: "Choose your role, add skills, and share a short bio. This flow stays mock-only and in-memory, but it should still feel curated.", cta: "Register", onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", htmlFor: "name", children: "Name" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "This is the name that will appear on your profile card and requests." }), _jsx("input", { id: "name", type: "text", required: true, value: form.name, onChange: (event) => setForm((prev) => ({ ...prev, name: event.target.value })), className: fieldClassName, placeholder: "Your name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", htmlFor: "location", children: "Location" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Used to shape helper discovery and nearby project suggestions." }), _jsx("select", { id: "location", value: form.location, onChange: (event) => setForm((prev) => ({ ...prev, location: event.target.value })), className: fieldClassName, children: locations.filter((city) => city !== "Any").map((city) => (_jsx("option", { value: city, children: city }, city))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", htmlFor: "bio", children: "Short bio" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Keep it short and practical. What do you help with, or what do you need?" }), _jsx("textarea", { id: "bio", rows: "3", value: form.bio, onChange: (event) => setForm((prev) => ({ ...prev, bio: event.target.value })), className: fieldClassName, placeholder: "Share how you help or what you need." })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: "Role" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Pick one or both so Solara can frame how you participate." }), _jsx("div", { className: "flex flex-wrap gap-2", children: ["Helper", "Seeker"].map((role) => {
                            const active = form.roles.includes(role);
                            return (_jsx("button", { type: "button", onClick: () => toggleRole(role), className: `rounded-full border px-4 py-2 text-sm font-semibold transition ${active
                                    ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                                    : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)] hover:border-[var(--solara-accent-soft)]"}`, children: role }, role));
                        }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: "Skills and tools" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "These tags shape matching, not just decoration, so choose the ones that feel accurate." }), _jsx("div", { className: "flex flex-wrap gap-2", children: skillOptions.map((skill) => {
                            const active = form.skills.includes(skill);
                            return (_jsx("button", { type: "button", onClick: () => toggleSkill(skill), className: `rounded-full border px-4 py-2 text-sm transition ${active
                                    ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                                    : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-muted)] hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)]"}`, children: skill }, skill));
                        }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", htmlFor: "photo", children: "Profile picture (preview only)" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "A simple image is enough. It helps the profile feel complete in the mock flow." }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("input", { id: "photo", type: "file", accept: "image/*", onChange: handlePhoto, className: "text-sm text-[var(--solara-text-muted)] file:mr-3 file:rounded-full file:border file:border-[var(--solara-rule)] file:bg-[var(--solara-surface-2)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--solara-text-strong)]" }), form.photo ? _jsx("img", { src: form.photo, alt: "Preview", className: "h-12 w-12 rounded-[1rem] object-cover border border-[var(--solara-rule)]" }) : null] })] }), status ? (_jsx("div", { role: "status", "aria-live": "polite", className: "rounded-[1rem] border border-[var(--solara-accent-soft)] bg-[var(--solara-accent-soft)]/50 px-4 py-3 text-sm font-semibold text-[var(--solara-text-strong)]", children: status })) : null, _jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-1", children: [_jsx("button", { type: "submit", className: "solara-inline-action solara-inline-action--strong min-w-[10rem]", children: "Create account" }), _jsx(Link, { to: "/sign-in", className: "solara-inline-action solara-inline-action--default", children: "Sign in instead" })] })] }));
};
export default Register;
