import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import FooterStats from "./FooterStats";
import FooterNewsletter from "./FooterNewsletter";

const linkGroups = {
  product: {
    title: "Product",
    links: [
      { label: "Find Helpers", to: "/connect/helpers" },
      { label: "Plan Your Solar", to: "/plan" },
      { label: "3D Configurator", to: "/configurator" },
      { label: "Projects", to: "/projects" },
    ],
  },
  learn: {
    title: "Learn",
    links: [
      { label: "Getting Started", to: "/learn" },
      { label: "Solar Navigator", to: "/solar-navigator" },
      { label: "Safety Guide", to: "/safety" },
      { label: "Services", to: "/services" },
    ],
  },
  community: {
    title: "Community",
    links: [
      { label: "Request Help", to: "/request-help" },
      { label: "Become a Helper", to: "/register" },
      { label: "Guidelines", to: "/community-guidelines" },
      { label: "Projects Board", to: "/projects" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { label: "Sign In", to: "/signin" },
      { label: "Register", to: "/register" },
      { label: "My Account", to: "/account" },
      { label: "Profile", to: "/profile" },
    ],
  },
};

const Footer = ({ navItems }) => {
  const [clicks, setClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleSecretClick = useCallback(() => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 5 && !showSecret) {
      setShowSecret(true);
    }
  }, [clicks, showSecret]);

  return (
    <footer className="mt-16 bg-gradient-to-t from-solara-midnight via-[#04121f] to-[#020812] text-slate-200 dark:from-black dark:via-[#050b16] dark:to-[#01040c]">
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="pointer-events-none absolute inset-x-0 -top-6 h-16 bg-[radial-gradient(ellipse_at_top,_rgba(0,123,255,0.22),transparent_55%)]" />

        <FooterStats className="mb-10" />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
                <img src="/solara-logo.png" alt="Solara logo" className="h-full w-full object-contain" />
              </span>
              <div className="space-y-2">
                <div className="text-xl font-semibold text-white">Solara</div>
                <p className="text-sm text-slate-300">Community support for clean energy. Neighbors powering neighbors with safer installs, shared tools, and friendly learning.</p>
                <span className="handmade-underline mt-2 h-3 w-32" aria-hidden />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {Object.values(linkGroups).map((group) => (
                <div key={group.title} className="space-y-3">
                  <h4 className="text-sm font-semibold text-white">{group.title}</h4>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-gold"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <FooterNewsletter />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleSecretClick}
            className="cursor-default text-left text-xs text-slate-400 transition-colors hover:text-slate-300"
          >
            Built with clean energy in mind
            {showSecret && (
              <span className="ml-1 text-solara-gold animate-in fade-in duration-500">
                ...and lots of coffee
              </span>
            )}
          </button>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-solara-glow rounded-full bg-solara-gold/85 shadow-[0_0_0_8px_rgba(212,175,55,0.18)]" />
              Low-carbon digital footprint
            </span>
            <span>&copy; {new Date().getFullYear()} Solara Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
