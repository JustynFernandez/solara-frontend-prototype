import React from "react";
import { Link, useLocation } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  className?: string;
};

const routeLabels: Record<string, string> = {
  connect: "Find Helpers",
  services: "Services",
  projects: "Projects",
  plan: "Plan",
  learn: "Learn",
  register: "Register",
  account: "Account",
  "my-account": "My Account",
  "request-help": "Request Help",
  signin: "Sign In",
  safety: "Safety",
  "community-guidelines": "Guidelines",
  configurator: "3D Designer",
  dashboard: "Dashboard",
};

function generateFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((seg, idx) => ({
    label: routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    to: "/" + segments.slice(0, idx + 1).join("/"),
  }));
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  const location = useLocation();
  const pathItems = items || generateFromPath(location.pathname);

  if (pathItems.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
      <Link
        to="/"
        className="text-slate-500 transition-colors hover:text-solara-blue dark:text-slate-400 dark:hover:text-solara-sky"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </Link>
      {pathItems.map((item, idx) => (
        <React.Fragment key={item.label + idx}>
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
          {item.to && idx < pathItems.length - 1 ? (
            <Link
              to={item.to}
              className="text-slate-500 transition-colors hover:text-solara-blue dark:text-slate-400 dark:hover:text-solara-sky"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-900 dark:text-white">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
