import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionRail from "@/components/ui/action-rail";
import PageFrame from "@/components/ui/page-frame";
import FormShell from "@/components/ui/form-shell";
import MetricBand from "@/components/ui/metric-band";
import PageReveal from "@/components/ui/page-reveal";
import PreviewFrame from "@/components/ui/preview-frame";
import { useAuth } from "../context/auth-context";
import { skillOptions } from "../data/mockData";
const roles = ["Helper", "Seeker"];
const fieldClassName = "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition placeholder:text-[var(--solara-text-muted)] focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]";
const fileInputClassName = "text-sm text-[var(--solara-text-muted)] file:mr-3 file:rounded-md file:border file:border-[var(--solara-rule)] file:bg-[var(--solara-surface-2)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--solara-text-strong)]";
const AccountCreate = () => {
    const { updateProfile } = useAuth();
    const navigate = useNavigate();
    const [selectedRoles, setSelectedRoles] = useState(["Helper"]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [photo, setPhoto] = useState("");
    const toggleRole = (role) => {
        setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((item) => item !== role) : [...prev, role]));
    };
    const toggleSkill = (skill) => {
        setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]));
    };
    const handlePhoto = (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => setPhoto(String(reader.result));
        reader.readAsDataURL(file);
    };
    const handleSave = (event) => {
        event.preventDefault();
        updateProfile({ roles: selectedRoles, skills: selectedSkills, photo });
        navigate("/my-account");
    };
    return (_jsx(PageFrame, { family: "hub", width: "wide", density: "compact", className: "min-h-[calc(100vh-5rem)]", children: _jsx(PageReveal, { mode: "mount", children: _jsx(FormShell, { eyebrow: "Profile setup", title: "Tell Solara how you want to participate.", body: "Choose your role, add the skills or resources you can share, and upload a profile photo. This setup stays mock-only and in-memory, but it should feel like a real account step.", layout: "split", lead: _jsx(MetricBand, { compact: true, items: [
                        { label: "Matching", value: "Cleaner fit", meta: "Skills and roles improve helper discovery and requests." },
                        { label: "Handoff", value: "Faster context", meta: "Projects can understand your role before opening a full profile." },
                    ] }), aside: _jsx(PreviewFrame, { chromeLabel: "What changes after this", eyebrow: "Profile impact", title: "Your profile becomes usable across Connect and Projects.", body: "Roles and skills shape how you appear in helper discovery, support requests, and project invitations.", viewportClassName: "pt-0", children: _jsx(ActionRail, { compact: true, items: [
                            { eyebrow: "Cleaner matching", title: "Route requests based on real skills.", body: "Projects and helpers can screen for actual capabilities instead of generic tags." },
                            { eyebrow: "Faster handoff", title: "Make your role legible before profile expansion.", body: "People can understand fit without reading a full profile first." },
                        ] }) }), children: _jsxs("form", { onSubmit: handleSave, className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: "Role" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Use this to tell Solara how you want to show up in the network." }), _jsx("div", { className: "flex flex-wrap gap-2", children: roles.map((role) => {
                                        const active = selectedRoles.includes(role);
                                        return (_jsx("button", { type: "button", onClick: () => toggleRole(role), className: `rounded-full border px-4 py-2 text-sm font-semibold transition ${active
                                                ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                                                : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)] hover:border-[var(--solara-accent-soft)]"}`, children: role }, role));
                                    }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", children: "Skills and resources" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "These tags help the rest of Solara place you in the right conversations." }), _jsx("div", { className: "flex flex-wrap gap-2", children: skillOptions.map((skill) => {
                                        const active = selectedSkills.includes(skill);
                                        return (_jsx("button", { type: "button", onClick: () => toggleSkill(skill), className: `rounded-full border px-4 py-2 text-sm transition ${active
                                                ? "border-[var(--solara-accent)] bg-[var(--solara-accent-soft)] text-[var(--solara-accent-strong)]"
                                                : "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-muted)] hover:border-[var(--solara-accent-soft)] hover:text-[var(--solara-text-strong)]"}`, children: skill }, skill));
                                    }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", htmlFor: "photo", children: "Profile photo" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "A photo is optional, but it makes the mock profile feel complete." }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("input", { id: "photo", type: "file", accept: "image/*", onChange: handlePhoto, className: fileInputClassName }), photo ? _jsx("img", { src: photo, alt: "Profile preview", className: "h-14 w-14 rounded-[1rem] border border-[var(--solara-rule)] object-cover" }) : null] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-1", children: [_jsx("button", { type: "submit", className: "solara-inline-action solara-inline-action--strong min-w-[11rem]", children: "Save and continue" }), _jsx("button", { type: "button", onClick: () => navigate("/my-account"), className: "solara-inline-action solara-inline-action--default", children: "Skip for now" })] })] }) }) }) }));
};
export default AccountCreate;
