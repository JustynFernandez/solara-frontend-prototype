import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/ThemeContext";
import UserAvatarMenu from "../ui/user-avatar-menu";

const navClasses = ({ isActive }) =>
  `relative rounded-full px-3 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-solara-midnight ${
    isActive
      ? "text-solara-navy underline decoration-solara-gold decoration-2 underline-offset-6 dark:text-solara-gold"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
  }`;

const Navbar = ({ navItems, onSearchClick }) => {
  const { user } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setElevated(latest > 18));

  const bgLight = elevated ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.86)";
  const bgDark = elevated ? "rgba(7,11,24,0.9)" : "rgba(8,12,24,0.8)";
  const borderLight = elevated ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)";
  const borderDark = elevated ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.12)";
  const shadowLight = elevated ? "0 24px 80px rgba(12,18,36,0.18)" : "0 12px 40px rgba(12,18,36,0.08)";
  const shadowDark = elevated ? "0 28px 90px rgba(0,0,0,0.45)" : "0 18px 60px rgba(0,0,0,0.35)";

  return (
    <div className="solara-navbar sticky top-3 z-40 px-4 pb-2 pt-4 sm:px-6">
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative mx-auto max-w-7xl"
      >
        <motion.div
          animate={{
            boxShadow: dark ? shadowDark : shadowLight,
            backgroundColor: dark ? bgDark : bgLight,
            borderColor: dark ? borderDark : borderLight,
          }}
          className="relative overflow-hidden rounded-[24px] border shadow-lg backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(0,51,102,0.12)] via-[rgba(0,123,255,0.14)] to-[rgba(212,175,55,0.12)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.34),transparent_42%),radial-gradient(circle_at_86%_84%,rgba(212,175,55,0.12),transparent_36%)] opacity-70 dark:bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.12),transparent_42%),radial-gradient(circle_at_86%_84%,rgba(212,175,55,0.1),transparent_36%)]" />
          {/* Edge fades to dissolve the bar into the page (light/dark aware) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[rgba(255,255,255,0.95)] via-[rgba(255,255,255,0.75)] to-transparent blur-lg dark:from-[rgba(7,11,24,0.92)] dark:via-[rgba(7,11,24,0.75)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[rgba(255,255,255,0.95)] via-[rgba(255,255,255,0.75)] to-transparent blur-lg dark:from-[rgba(7,11,24,0.92)] dark:via-[rgba(7,11,24,0.75)]" />

          <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/80 text-slate-900 shadow-inner transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue md:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
              <Link to="/" className="flex items-center gap-4 text-lg font-semibold text-slate-900 dark:text-white">
                <span className="relative inline-flex h-14 w-14 items-center justify-center">
                  <span className="pointer-events-none absolute inset-[-6px] rounded-full bg-gradient-to-br from-[rgba(0,51,102,0.26)] via-[rgba(0,123,255,0.24)] to-[rgba(212,175,55,0.16)] blur-xl" />
                  <img
                    src="/solara-logo.png"
                    alt="Solara logo"
                    className="relative h-14 w-14 object-contain drop-shadow-[0_10px_24px_rgba(0,123,255,0.35)]"
                  />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-[18px]">Solara</p>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-solara-navy dark:text-solara-gold">
                    Solar Support Network
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/50 bg-white/75 px-3 py-1 text-sm font-semibold text-slate-700 shadow-inner backdrop-blur md:flex dark:border-white/10 dark:bg-white/5 dark:text-white">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={navClasses} end={item.to === "/"}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Search / Command Palette trigger */}
              <button
                type="button"
                onClick={() => onSearchClick?.()}
                className="hidden h-9 items-center gap-2 rounded-xl border border-white/50 bg-white/75 px-3 text-sm text-slate-500 shadow-inner transition hover:border-solara-blue/30 hover:bg-white hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue md:flex dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-solara-blue/40 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Open search (Cmd+K)"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="hidden lg:inline">Search...</span>
                <kbd className="hidden rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-xs text-slate-400 lg:inline dark:border-slate-600 dark:bg-slate-800">
                  ⌘K
                </kbd>
              </button>

              {!user && (
                <NavLink
                  to="/sign-in"
                  className="motion-arrow-shift hidden items-center justify-center gap-2 rounded-full bg-button-primary px-4 py-2 text-sm font-semibold text-white shadow-solara-soft transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-gold md:inline-flex"
                >
                  Sign in / Join
                  <svg className="motion-arrow h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </NavLink>
              )}

              {user && <UserAvatarMenu />}

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/80 text-slate-900 shadow-inner transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue dark:border-white/10 dark:bg-white/10 dark:text-white"
                aria-label="Toggle theme"
              >
                {dark ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.7-5.7-1.4 1.4M6.7 17.3l-1.4 1.4m12.8 0-1.4-1.4M6.7 6.7 5.3 5.3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden"
                id="mobile-menu"
              >
                <div className="mx-4 mb-4 mt-2 flex flex-col gap-2 rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-md backdrop-blur dark:border-white/10 dark:bg-white/10">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-solara-midnight ${
                          isActive
                            ? "bg-solara-foam text-solara-navy dark:bg-solara-midnight dark:text-solara-gold"
                            : "text-slate-800 hover:bg-white/80 dark:text-slate-100 dark:hover:bg-white/5"
                        }`
                      }
                      end={item.to === "/"}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  {!user && (
                    <NavLink
                      to="/sign-in"
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-offset-solara-midnight"
                      onClick={() => setOpen(false)}
                    >
                      Sign in / Join
                    </NavLink>
                  )}
                  {user && (
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        navigate("/account/create");
                      }}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-solara-navy transition hover:bg-solara-foam focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solara-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-solara-gold dark:hover:bg-white/5 dark:focus-visible:ring-offset-solara-midnight"
                    >
                      Edit Profile
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <path d="M15 3h4v4m-4 0 5-5" />
                        <path d="M5 12h14" />
                        <path d="M9 8 5 12l4 4" />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
