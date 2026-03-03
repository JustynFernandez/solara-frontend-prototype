import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../context/auth-context";
import SketchNote from "../components/ui/SketchNote";
import PasswordInput from "../components/ui/PasswordInput";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({ email: form.email });
    setStatus("Signed in (mock). Redirecting to your account...");
    setTimeout(() => navigate("/my-account"), 600);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-14 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl">
        <div className="absolute -left-16 top-20 h-72 w-72 rounded-full bg-solara-blue/20" />
        <div className="absolute right-10 top-10 h-80 w-80 rounded-full bg-solara-sky/15" />
        <div className="absolute bottom-12 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-solara-gold/12" />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
            <span className="h-2 w-2 rounded-full bg-solara-gold" />
            Sign in / Join
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Access your Solara account.</h1>
          <p className="max-w-3xl text-lg text-slate-200">
            One polished, animated flow for both sign in and join. Start with your email, and you can hop to account creation inside the modal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SketchNote text="Come on in" tone="blue" className="hidden sm:inline-flex" />
          <motion.div layoutId="auth-shell" className="rounded-full">
            <button
              onClick={() => setOpen(true)}
              className="motion-arrow-shift inline-flex items-center justify-center gap-2 rounded-full bg-button-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-solara-blue/30 transition hover:scale-[1.03] hover:shadow-glow active:scale-[0.98]"
            >
              Open sign in / join
              <svg className="motion-arrow h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </motion.div>
          <span className="text-sm text-slate-200">No account yet? Start here and choose 'Create an account' inside the modal.</span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex h-[92vh] w-full max-w-none overflow-hidden rounded-none border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-0 shadow-[0_30px_120px_rgba(0,0,0,0.55)] md:h-[85vh] md:max-w-6xl md:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,123,255,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.08),transparent_35%)]" />

              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                aria-label="Close"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m6 6 12 12M6 18 18 6" />
                </svg>
              </button>

              <motion.div
                layoutId="auth-shell"
                className="relative grid h-full gap-0 bg-white/5 text-white md:grid-cols-[1.2fr_1fr]"
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                <div className="flex h-full flex-col overflow-y-auto p-8 sm:p-10">
                  <AuthForm
                    title="Welcome back"
                    subtitle="Sign in to see your account, listings, and saved helpers. This is a mock flow - no backend required."
                    cta="Sign in"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-sm outline-none ring-1 ring-white/15 transition-all duration-200 placeholder:text-slate-400 focus:border-solara-blue focus:ring-solara-blue/50"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white" htmlFor="password">
                        Password
                      </label>
                      <PasswordInput
                        id="password"
                        value={form.password}
                        onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
                        required
                        className="border-white/15 bg-white/10 text-white ring-white/15"
                      />
                    </div>

                    {status && <div className="rounded-xl border border-solara-blue/30 bg-solara-blue/15 px-4 py-3 text-sm font-semibold text-solara-sky">{status}</div>}

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-button-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-solara-blue/30 transition hover:scale-[1.03] hover:shadow-glow active:scale-[0.98]"
                      >
                        Sign in
                      </button>
                      <Link
                        to="/register"
                        className="text-sm font-semibold text-solara-sky underline-offset-4 transition hover:text-white hover:underline"
                      >
                        Create an account instead
                      </Link>
                    </div>
                  </AuthForm>
                </div>

                <div className="flex h-full flex-col gap-4 overflow-y-auto border-t border-white/10 bg-white/5 p-8 sm:p-10 md:border-l md:border-t-0">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                    Why join Solara?
                  </div>
                  <ul className="space-y-3 text-sm text-slate-100">
                    {[
                      "Connect with nearby helpers and organizers.",
                      "Share or borrow tools and templates safely.",
                      "Learn faster with curated guides and peer support.",
                      "Switch between helper and seeker roles any time.",
                    ].map((item, idx) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_rgba(212,175,55,0.14)] ${idx % 3 === 0 ? "bg-solara-blue" : idx % 3 === 1 ? "bg-solara-sky" : "bg-solara-gold"}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignIn;
