export const loadingMessages = [
  "Charging up the solar panels...",
  "Gathering a bit of sunshine...",
  "Warming up the circuits...",
  "Catching some rays for you...",
  "Calibrating the sun dial...",
  "Harnessing some photons...",
  "Brewing up some solar goodness...",
  "Spinning up the turbines...",
  "Almost there, just soaking up some light...",
];

export const emptyStates = {
  noHelpers: {
    title: "No helpers here... yet!",
    subtitle: "Looks like everyone's out catching some sun. Try adjusting your filters?",
    doodle: "question" as const,
  },
  noSavedHelpers: {
    title: "Your saved list is empty",
    subtitle: "When you find helpers you'd like to work with, save them here for easy access.",
    doodle: "sparkle" as const,
  },
  noProjects: {
    title: "This corner of the grid is quiet",
    subtitle: "Be the spark that starts something new. Community projects bring everyone together.",
    doodle: "lightbulb" as const,
  },
  noGuides: {
    title: "Hmm, nothing matches",
    subtitle: "Let's try a different search - the sun shines on many paths!",
    doodle: "question" as const,
  },
  noMessages: {
    title: "Your inbox is nice and empty",
    subtitle: "When helpers respond to your requests, their messages will appear here.",
    doodle: "wave" as const,
  },
  noNotifications: {
    title: "All caught up!",
    subtitle: "No new updates right now. Enjoy the quiet moment.",
    doodle: "sparkle" as const,
  },
} as const;

export const successMessages = {
  requestSent: "Your request is on its way!",
  helperSaved: "Saved to your list!",
  profileUpdated: "Looking good! Profile updated.",
  formSubmitted: "Got it! We'll be in touch soon.",
  copied: "Copied to clipboard!",
  signedIn: "Welcome back!",
  signedOut: "See you next time!",
  projectJoined: "You're in! Welcome to the project.",
};

export const errorMessages = {
  generic: "Oops, something went sideways. Mind giving that another go?",
  network: "Looks like we lost our connection. Check your internet?",
  validation: "Almost there! Just a few fields need your attention.",
  notFound: "Hmm, we couldn't find what you're looking for.",
  unauthorized: "You'll need to sign in first.",
  serverError: "Our servers are having a moment. Try again in a bit?",
  timeout: "That took longer than expected. Want to try again?",
};

export const placeholders = {
  search: "What are you looking for?",
  searchHelpers: "Search by name, skill, or location...",
  searchGuides: "What would you like to learn?",
  message: "Type your message here...",
  bio: "Tell people a bit about yourself...",
  feedback: "We'd love to hear your thoughts...",
};

export const hints = {
  saveHelper: "Save this helper to find them easily later",
  verifiedBadge: "This helper has been verified by the Solara community",
  responseTime: "How quickly they typically respond to requests",
  ecoMode: "Reduce animations for better battery life",
  darkMode: "Easy on the eyes, easy on the planet",
};

export const ctaText = {
  getStarted: "Let's get started",
  learnMore: "Tell me more",
  viewAll: "See all",
  tryAgain: "Give it another go",
  goBack: "Head back",
  continue: "Keep going",
  skip: "Maybe later",
  confirm: "Sounds good",
  cancel: "Never mind",
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Burning the midnight oil?";
};

export const getRandomLoadingMessage = (): string => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};

export type EmptyStateType = keyof typeof emptyStates;
export type DoodleType = "sparkle" | "lightbulb" | "question" | "wave";
