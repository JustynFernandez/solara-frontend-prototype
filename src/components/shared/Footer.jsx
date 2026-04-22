import React from "react";
import { Link, useLocation } from "react-router-dom";
import FooterStats from "./FooterStats";
import FooterNewsletter from "./FooterNewsletter";

const footerRoutes = [
  {
    title: "Connect",
    note: "Screen verified local help before you send a request.",
    to: "/connect",
    links: [
      { label: "Open Connect", to: "/connect" },
      { label: "Browse Helpers", to: "/connect/helpers" },
      { label: "Request Support", to: "/request-help" },
    ],
  },
  {
    title: "Plan",
    note: "Choose guided planning or direct layout work.",
    to: "/plan",
    links: [
      { label: "Planning Hub", to: "/plan" },
      { label: "Solar Navigator", to: "/solar-navigator" },
      { label: "3D Configurator", to: "/configurator" },
    ],
  },
  {
    title: "Projects",
    note: "Join active work instead of starting from a blank page.",
    to: "/projects",
    links: [
      { label: "Project Board", to: "/projects" },
      { label: "Open Workspaces", to: "/projects" },
      { label: "Safety Guidance", to: "/safety" },
    ],
  },
  {
    title: "Learn",
    note: "Use field-ready guides, not detached reading lists.",
    to: "/learn",
    links: [
      { label: "Learning Hub", to: "/learn" },
      { label: "Community Guidelines", to: "/community-guidelines" },
      { label: "Services Model", to: "/services" },
    ],
  },
];

const accountLinks = [
  { label: "Sign In", to: "/sign-in" },
  { label: "Register", to: "/register" },
  { label: "My Account", to: "/my-account" },
  { label: "Dashboard", to: "/dashboard" },
];

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const activeRoute = footerRoutes.find((route) => location.pathname === route.to || location.pathname.startsWith(`${route.to}/`));

  return (
    <footer className={`solara-footer-v2${isHome ? " solara-footer-v2--home" : ""}`}>
      <div className="solara-footer-v2__inner">
        <section className="solara-footer-v2__lead">
          <div className="solara-footer-v2__lead-copy">
            <p className="solara-footer-v2__eyebrow">Community solar operating system</p>
            <h2 className="solara-footer-v2__title">
              Move from question to local action without switching systems.
            </h2>
            <p className="solara-footer-v2__body">
              Solara keeps helper discovery, planning, project delivery, and learning in one routeable product.
              The goal is practical progress, not page views.
            </p>
          </div>

          <div className="solara-footer-v2__lead-board">
            <div className="solara-footer-v2__lead-card">
              <span className="solara-footer-v2__card-label">Current route</span>
              <strong>{activeRoute?.title ?? "Overview"}</strong>
              <p>{activeRoute?.note ?? "Use the route map below to jump into the part of the product that actually moves the work forward."}</p>
            </div>
            <div className="solara-footer-v2__lead-card">
              <span className="solara-footer-v2__card-label">Best start</span>
              <strong>{isHome ? "Connect or Plan" : "Follow the next handoff"}</strong>
              <p>{isHome ? "Open Connect when you need people first. Open Plan when you need structure first." : "Each route below is wired to a concrete next move rather than a dead-end overview page."}</p>
            </div>
          </div>
        </section>

        {!isHome ? <FooterStats className="solara-footer-v2__stats" /> : null}

        <section className="solara-footer-v2__grid">
          {footerRoutes.map((group) => (
            <article key={group.title} className={`solara-footer-v2__route${activeRoute?.title === group.title ? " is-active" : ""}`}>
              <div className="solara-footer-v2__route-head">
                <p className="solara-footer-v2__route-title">{group.title}</p>
                <p className="solara-footer-v2__route-note">{group.note}</p>
              </div>
              <div className="solara-footer-v2__route-links">
                {group.links.map((link) => (
                  <Link key={`${group.title}-${link.label}-${link.to}`} to={link.to} className="solara-footer-v2__link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="solara-footer-v2__meta">
          <div className="solara-footer-v2__meta-copy">
            <div className="solara-footer-v2__brand">
              <img src="/solara-logo.png" alt="Solara logo" className="solara-footer-v2__brand-mark" />
              <div>
                <p className="solara-footer-v2__brand-title">Solara</p>
                <p className="solara-footer-v2__brand-body">
                  Built for helper matching, planning, learning, and shared neighborhood delivery.
                </p>
              </div>
            </div>
            <div className="solara-footer-v2__account">
              {accountLinks.map((link) => (
                <Link key={link.to} to={link.to} className="solara-footer-v2__account-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {!isHome ? <FooterNewsletter className="solara-footer-v2__newsletter" /> : null}
        </section>

        <div className="solara-footer-v2__legal">
          <span>© {new Date().getFullYear()} Solara Community</span>
          <span>Designed for real local delivery, not generic marketplace traffic.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
