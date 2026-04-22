import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/auth-context";
import PasswordInput from "../components/ui/PasswordInput";
const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [status, setStatus] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        login({ email: form.email });
        setStatus("Signed in (mock). Redirecting to your account...");
        setTimeout(() => navigate("/my-account"), 600);
    };
    return (_jsxs(AuthForm, { eyebrow: "Sign in", title: "Access your Solara account", subtitle: "Sign in to pick up saved helpers, projects, and planning progress. The flow stays mock-only, but the experience should still feel calm and direct.", cta: "Sign in", onSubmit: handleSubmit, children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", htmlFor: "email", children: "Email" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Use the same email tied to your profile and project history." }), _jsx("input", { id: "email", type: "email", required: true, value: form.email, onChange: (event) => setForm((prev) => ({ ...prev, email: event.target.value })), className: "w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]", placeholder: "you@example.com" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-[var(--solara-text-strong)]", htmlFor: "password", children: "Password" }), _jsx("p", { className: "text-sm leading-6 text-[var(--solara-text-muted)]", children: "Your password is only used to continue the mock account flow." }), _jsx(PasswordInput, { id: "password", value: form.password, onChange: (value) => setForm((prev) => ({ ...prev, password: value })), required: true, className: "border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)]" })] }), status ? (_jsx("div", { role: "status", "aria-live": "polite", className: "rounded-[1rem] border border-[var(--solara-accent-soft)] bg-[var(--solara-accent-soft)]/50 px-4 py-3 text-sm font-semibold text-[var(--solara-text-strong)]", children: status })) : null, _jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-1", children: [_jsx("button", { type: "submit", className: "solara-inline-action solara-inline-action--strong min-w-[9rem]", children: "Sign in" }), _jsx(Link, { to: "/register", className: "solara-inline-action solara-inline-action--default", children: "Create an account instead" })] })] }));
};
export default SignIn;
