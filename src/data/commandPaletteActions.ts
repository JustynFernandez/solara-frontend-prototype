export type CommandAction = {
  id: string;
  title: string;
  description?: string;
  icon: "home" | "users" | "book" | "folder" | "zap" | "help" | "settings" | "search" | "sun";
  to?: string;
  action?: () => void;
  keywords?: string[];
  shortcut?: string;
  section?: "navigation" | "actions" | "account" | "learn";
};

export const commandPaletteActions: CommandAction[] = [
  {
    id: "home",
    title: "Go to Home",
    description: "Return to the main landing page",
    icon: "home",
    to: "/",
    keywords: ["landing", "start", "main"],
    section: "navigation",
  },
  {
    id: "connect",
    title: "Find Helpers",
    description: "Browse and connect with solar experts",
    icon: "users",
    to: "/connect/helpers",
    keywords: ["search", "help", "people", "experts", "installers"],
    section: "navigation",
  },
  {
    id: "projects",
    title: "Browse Projects",
    description: "Explore community solar projects",
    icon: "folder",
    to: "/projects",
    keywords: ["community", "work", "installations"],
    section: "navigation",
  },
  {
    id: "learn",
    title: "Learning Hub",
    description: "Access guides and educational content",
    icon: "book",
    to: "/learn",
    keywords: ["guides", "education", "courses", "tutorials"],
    section: "navigation",
  },
  {
    id: "plan",
    title: "Plan Your Solar",
    description: "Tools to plan your solar installation",
    icon: "sun",
    to: "/plan",
    keywords: ["navigator", "design", "planning"],
    section: "navigation",
  },
  {
    id: "services",
    title: "Services",
    description: "View available solar services",
    icon: "zap",
    to: "/services",
    keywords: ["offerings", "options"],
    section: "navigation",
  },

  {
    id: "request-help",
    title: "Request Help",
    description: "Submit a help request to the community",
    icon: "help",
    to: "/request-help",
    keywords: ["ask", "support", "assistance"],
    section: "actions",
  },
  {
    id: "navigator",
    title: "Start Solar Navigator",
    description: "Guided questionnaire for solar planning",
    icon: "zap",
    to: "/plan/navigator",
    keywords: ["questionnaire", "wizard", "guide"],
    section: "actions",
  },
  {
    id: "configurator",
    title: "Open 3D Designer",
    description: "Design your solar setup in 3D",
    icon: "sun",
    to: "/configurator",
    keywords: ["roof", "panels", "3d", "builder", "design"],
    section: "actions",
  },

  {
    id: "signin",
    title: "Sign In",
    description: "Access your Solara account",
    icon: "users",
    to: "/sign-in",
    keywords: ["login", "account", "auth"],
    section: "account",
  },
  {
    id: "register",
    title: "Create Account",
    description: "Join the Solara community",
    icon: "users",
    to: "/register",
    keywords: ["signup", "join", "new"],
    section: "account",
  },
  {
    id: "account",
    title: "My Account",
    description: "View and edit your profile",
    icon: "settings",
    to: "/my-account",
    keywords: ["profile", "settings", "preferences"],
    section: "account",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Your personal Solara dashboard",
    icon: "home",
    to: "/dashboard",
    keywords: ["home", "overview", "summary"],
    section: "account",
  },

  {
    id: "safety",
    title: "Safety Guidelines",
    description: "Important safety information",
    icon: "book",
    to: "/safety",
    keywords: ["danger", "warning", "precautions"],
    section: "learn",
  },
  {
    id: "guidelines",
    title: "Community Guidelines",
    description: "Rules and standards for our community",
    icon: "book",
    to: "/community-guidelines",
    keywords: ["rules", "standards", "conduct"],
    section: "learn",
  },
];

export const getSectionLabel = (section: CommandAction["section"]): string => {
  switch (section) {
    case "navigation":
      return "Navigate";
    case "actions":
      return "Quick Actions";
    case "account":
      return "Account";
    case "learn":
      return "Resources";
    default:
      return "Other";
  }
};
