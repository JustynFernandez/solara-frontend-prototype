import React from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import UserAvatarMenu from "@/components/ui/user-avatar-menu";

const NavbarSharedControls = ({
  user,
  dark,
  toggleTheme,
  onSearchClick,
  mobileMenuOpen,
  onToggleMobileMenu,
  compact = false,
  groupClassName,
  controlClassName,
  ctaClassName,
  showSearch = true,
  showTheme = true,
  showAuth = true,
  showMobileMenu = true,
}) => {
  return (
    <div className={cn("solara-nav-preview__controls-group flex items-center gap-2", compact && "is-compact", groupClassName)}>
      {showSearch ? (
        <button
          type="button"
          onClick={() => onSearchClick?.()}
          className={cn(
            "solara-nav-preview__control solara-nav-preview__control--search hidden h-10 items-center gap-2 rounded-full px-3 text-sm md:inline-flex",
            compact && "is-compact",
            controlClassName
          )}
          aria-label="Open search (Cmd+K)"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className={cn("solara-nav-preview__search-label hidden", compact ? "xl:inline" : "lg:inline")}>Search</span>
          <kbd className={cn("solara-nav-preview__kbd hidden rounded-full px-1.5 py-0.5 text-[11px]", compact ? "2xl:inline-flex" : "xl:inline-flex")}>Cmd+K</kbd>
        </button>
      ) : null}

      {showAuth && !user ? (
        <NavLink
          to="/sign-in"
          className={cn(
            "solara-nav-preview__cta solara-nav-preview__cta--auth motion-arrow-shift hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold md:inline-flex",
            compact && "is-compact",
            ctaClassName
          )}
        >
          <span>Sign in / Join</span>
          <svg className="motion-arrow h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </NavLink>
      ) : null}

      {showAuth && user ? (
        <div className={cn("solara-nav-preview__avatar-shell hidden md:block", compact && "is-compact")}>
          <UserAvatarMenu />
        </div>
      ) : null}

      {showTheme ? (
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(
            "solara-nav-preview__control solara-nav-preview__control--icon inline-flex h-10 w-10 items-center justify-center rounded-full",
            compact && "is-compact",
            controlClassName
          )}
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
      ) : null}

      {showMobileMenu ? (
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="preview-mobile-menu"
          onClick={onToggleMobileMenu}
          className={cn(
            "solara-nav-preview__control solara-nav-preview__control--icon inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden",
            compact && "is-compact",
            controlClassName
          )}
        >
          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            {mobileMenuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      ) : null}
    </div>
  );
};

export const NavbarMobilePanel = ({
  open,
  navItems,
  user,
  onClose,
  panelClassName,
  itemClassName,
  activeItemClassName,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="preview-mobile-menu"
          initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
          animate={prefersReducedMotion ? { opacity: 1, height: "auto" } : { opacity: 1, height: "auto" }}
          exit={prefersReducedMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden"
        >
          <div className={cn("solara-nav-preview__mobile-panel mt-3", panelClassName)}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={onClose}
                className={({ isActive }) => cn("solara-nav-preview__mobile-link", itemClassName, isActive && activeItemClassName)}
              >
                <span>{item.label}</span>
                <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </NavLink>
            ))}

            {!user ? (
              <NavLink to="/sign-in" onClick={onClose} className={cn("solara-nav-preview__mobile-link", itemClassName)}>
                <span>Sign in / Join</span>
                <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </NavLink>
            ) : (
              <NavLink to="/my-account" onClick={onClose} className={cn("solara-nav-preview__mobile-link", itemClassName)}>
                <span>My Account</span>
                <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </NavLink>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default NavbarSharedControls;
