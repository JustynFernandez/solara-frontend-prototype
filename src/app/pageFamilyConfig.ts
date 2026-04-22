export type PageFamily =
  | "editorial"
  | "hub"
  | "product"
  | "guide"
  | "account"
  | "immersive";

export type PageBackgroundVariant =
  | "home"
  | "editorial-stage"
  | "hub-clear"
  | "product-graphite"
  | "guide-paper"
  | "account-muted"
  | "immersive-dark";

type PageShellConfig = {
  family: PageFamily;
  background: PageBackgroundVariant;
  hideFloatingControls?: boolean;
  hideFooter?: boolean;
  hideMobileBottomNav?: boolean;
};

type RouteRule = {
  match: (pathname: string) => boolean;
  config: PageShellConfig;
};

const routeRules: RouteRule[] = [
  {
    match: (pathname) => pathname === "/",
    config: { family: "editorial", background: "home", hideFloatingControls: true },
  },
  {
    match: (pathname) =>
      pathname === "/services" ||
      pathname === "/learn" ||
      pathname === "/safety" ||
      pathname === "/community-guidelines",
    config: { family: "editorial", background: "editorial-stage" },
  },
  {
    match: (pathname) => pathname.startsWith("/learn/"),
    config: { family: "guide", background: "guide-paper", hideFloatingControls: true },
  },
  {
    match: (pathname) => pathname === "/connect",
    config: {
      family: "hub",
      background: "hub-clear",
      hideFloatingControls: true,
    },
  },
  {
    match: (pathname) =>
      pathname === "/plan" ||
      pathname === "/request" ||
      pathname === "/request-help",
    config: { family: "hub", background: "hub-clear" },
  },
  {
    match: (pathname) => pathname === "/connect/helpers",
    config: {
      family: "product",
      background: "product-graphite",
      hideFooter: true,
      hideFloatingControls: true,
    },
  },
  {
    match: (pathname) =>
      pathname === "/solar-navigator" ||
      pathname === "/plan/navigator" ||
      pathname === "/projects" ||
      pathname.startsWith("/projects/") ||
      pathname === "/dashboard" ||
      pathname.startsWith("/profile/"),
    config: { family: "product", background: "product-graphite" },
  },
  {
    match: (pathname) => pathname === "/my-account",
    config: { family: "account", background: "account-muted", hideFloatingControls: true },
  },
  {
    match: (pathname) =>
      pathname === "/sign-in" ||
      pathname === "/register" ||
      pathname === "/account/create",
    config: {
      family: "hub",
      background: "hub-clear",
      hideFloatingControls: true,
      hideFooter: true,
      hideMobileBottomNav: true,
    },
  },
  {
    match: (pathname) => pathname === "/configurator",
    config: {
      family: "immersive",
      background: "immersive-dark",
      hideFloatingControls: true,
      hideFooter: true,
      hideMobileBottomNav: true,
    },
  },
];

const defaultConfig: PageShellConfig = {
  family: "editorial",
  background: "editorial-stage",
};

export function getPageShellConfig(pathname: string): PageShellConfig {
  const rule = routeRules.find((candidate) => candidate.match(pathname));
  return rule?.config || defaultConfig;
}

export function getPageFamily(pathname: string): PageFamily {
  return getPageShellConfig(pathname).family;
}

export function getPageBackgroundVariant(pathname: string): PageBackgroundVariant {
  return getPageShellConfig(pathname).background;
}
