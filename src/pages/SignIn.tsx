import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/auth-context";
import PasswordInput from "../components/ui/PasswordInput";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({ email: form.email });
    setStatus("Signed in (mock). Redirecting to your account...");
    setTimeout(() => navigate("/my-account"), 600);
  };

  return (
    <AuthForm
      eyebrow="Sign in"
      title="Access your Solara account"
      subtitle="Sign in to pick up saved helpers, projects, and planning progress. The flow stays mock-only, but the experience should still feel calm and direct."
      cta="Sign in"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--solara-text-strong)]" htmlFor="email">
          Email
        </label>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Use the same email tied to your profile and project history.</p>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full rounded-md border border-[var(--solara-rule)] bg-[var(--solara-surface-2)] px-4 py-3 text-sm text-[var(--solara-text-strong)] outline-none transition focus:border-[var(--solara-accent)] focus:ring-2 focus:ring-[var(--solara-accent-soft)]"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[var(--solara-text-strong)]" htmlFor="password">
          Password
        </label>
        <p className="text-sm leading-6 text-[var(--solara-text-muted)]">Your password is only used to continue the mock account flow.</p>
        <PasswordInput
          id="password"
          value={form.password}
          onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
          required
          className="border-[var(--solara-rule)] bg-[var(--solara-surface-2)] text-[var(--solara-text-strong)]"
        />
      </div>

      {status ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-[1rem] border border-[var(--solara-accent-soft)] bg-[var(--solara-accent-soft)]/50 px-4 py-3 text-sm font-semibold text-[var(--solara-text-strong)]"
        >
          {status}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button type="submit" className="solara-inline-action solara-inline-action--strong min-w-[9rem]">
          Sign in
        </button>
        <Link to="/register" className="solara-inline-action solara-inline-action--default">
          Create an account instead
        </Link>
      </div>
    </AuthForm>
  );
};

export default SignIn;
