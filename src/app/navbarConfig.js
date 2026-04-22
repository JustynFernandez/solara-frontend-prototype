const PRIMARY_ROUTES = ["/", "/connect", "/projects", "/learn"];
const SECONDARY_ROUTES = ["/services", "/plan"];

export const isNavItemActive = (pathname = "", to = "") =>
  pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));

export const groupNavbarItems = (navItems = []) => {
  const itemsByRoute = new Map(navItems.map((item) => [item.to, item]));

  return {
    primaryItems: PRIMARY_ROUTES.map((route) => itemsByRoute.get(route)).filter(Boolean),
    secondaryItems: SECONDARY_ROUTES.map((route) => itemsByRoute.get(route)).filter(Boolean),
  };
};
