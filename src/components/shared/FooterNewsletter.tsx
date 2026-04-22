import React, { useState } from "react";

type FooterNewsletterProps = {
  className?: string;
};

const FooterNewsletter: React.FC<FooterNewsletterProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 2500);
    }, 900);
  };

  return (
    <div className={`solara-footer__newsletter ${className}`}>
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Get product updates</h3>
          <p className="text-sm">
            New guides, project calls, and major product changes. One short note when there is something worth sending.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            disabled={status === "loading"}
            className="solara-footer__newsletter-input w-full rounded-md border px-4 py-3 text-sm outline-none transition disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="solara-footer__newsletter-button inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition disabled:opacity-60"
          >
            {status === "loading" ? "Joining..." : status === "success" ? "Joined" : "Join update list"}
          </button>
        </form>

        <p className="text-xs">Unsubscribe any time.</p>
      </div>
    </div>
  );
};

export default FooterNewsletter;
