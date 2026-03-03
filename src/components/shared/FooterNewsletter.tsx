import React, { useState } from "react";

type FooterNewsletterProps = {
  className?: string;
};

const FooterNewsletter: React.FC<FooterNewsletterProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    // Simulate submission - replace with actual API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br from-solara-blue/10 via-transparent to-solara-gold/5 p-6 backdrop-blur-sm ${className}`}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Stay in the loop</h3>
          <p className="text-sm text-slate-400">
            Join <span className="font-semibold text-solara-gold">5,000+</span> solar enthusiasts getting tips, project updates, and community news.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={status === "loading"}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-solara-blue/50 focus:ring-2 focus:ring-solara-blue/20 disabled:opacity-50"
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-solara-blue/20 via-transparent to-solara-gold/20 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-button-primary bg-[length:220%_220%] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[position:100%_50%] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Subscribing...
              </>
            ) : status === "success" ? (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>

        <p className="text-xs text-slate-500">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default FooterNewsletter;
