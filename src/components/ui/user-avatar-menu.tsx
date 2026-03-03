import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/auth-context";
import { useEcoMode } from "../../hooks/useEcoMode";

const UserAvatarMenu = () => {
  const { user, logout } = useAuth();
  const { ecoModeEnabled } = useEcoMode();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  if (!user) return null;

  const initials = user.name?.slice(0, 2).toUpperCase() || "U";

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="user-menu"
        className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-2 py-1 text-sm font-semibold text-slate-800 shadow-[0_10px_26px_rgba(0,51,102,0.12)] transition hover:bg-white focus-visible:outline-none focus-glow dark:border-white/10 dark:bg-white/10 dark:text-white"
      >
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#003366,#0b4fbf,#d4af37)] text-sm font-bold uppercase text-white shadow-[0_12px_32px_rgba(0,51,102,0.28)] ring-1 ring-white/50 dark:ring-[#d4af3759]">
          <span className="absolute inset-0 animate-orbital-slow rounded-full bg-white/10 mix-blend-soft-light" aria-hidden />
          {initials}
        </span>
        <span className="hidden sm:inline">{user.name}</span>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="user-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="menu"
            aria-label="User shortcuts"
            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-xl ring-1 ring-[rgba(0,123,255,0.18)] backdrop-blur dark:border-white/10 dark:bg-[#050a18]/90"
          >
            <div className="pointer-events-none absolute -left-8 -top-10 h-24 w-24 rounded-full bg-[rgba(0,123,255,0.16)] blur-3xl" />
            {!ecoModeEnabled && <div className="pointer-events-none absolute inset-0 bg-solara-aurora opacity-80" />}
            <Link
              to="/my-account"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="block px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-[#f0f5ff] hover:pl-5 dark:text-white dark:hover:bg-white/5"
            >
              My Account
            </Link>
            <Link
              to="/account/create"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="block px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-[#f0f5ff] hover:pl-5 dark:text-white dark:hover:bg-white/5"
            >
              Edit Profile
            </Link>
            <Link
              to="/connect"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="block px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-[#f0f5ff] hover:pl-5 dark:text-white dark:hover:bg-white/5"
            >
              My Listings
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                setOpen(false);
              }}
              role="menuitem"
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 hover:pl-5 dark:text-rose-300 dark:hover:bg-rose-500/10"
            >
              Log Out
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M15 3h4v4m-4 0 5-5" />
                <path d="M5 12h14" />
                <path d="M9 8 5 12l4 4" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAvatarMenu;
