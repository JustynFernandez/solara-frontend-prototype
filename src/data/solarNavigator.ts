export type NavigatorOption = {
  value: string;
  label: string;
  description?: string;
  icon?: string;
};

export type NavigatorQuestion =
  | {
      id: string;
      type: "single";
      title: string;
      helper?: string;
      options: NavigatorOption[];
      required?: boolean;
    }
  | {
      id: string;
      type: "info";
      title: string;
      helper?: string;
      body: string;
    };

export type NavigatorAnswerMap = Record<string, string>;

export type SolarPlanTask = { title: string; status: "pending" | "done" };

export type SolarPlan = {
  readinessScore: number;
  recommendedFirstStep: string;
  pathway: string[];
  riskFlags: string[];
  recommendedGuides: string[];
  seedTasks: SolarPlanTask[];
};

export const QUESTIONS: NavigatorQuestion[] = [
  {
    id: "goal",
    type: "single",
    title: "What is your primary goal?",
    helper: "Choose the outcome you care about most right now.",
    options: [
      { value: "bills", label: "Reduce bills", description: "Lower monthly costs" },
      { value: "backup", label: "Resilience", description: "Handle outages with backup" },
      { value: "eco", label: "Lower footprint", description: "Prioritise emissions cuts" },
      { value: "power-device", label: "Power a device", description: "Run a specific load" },
      { value: "unsure", label: "Not sure yet", description: "Explore options" },
    ],
  },
  {
    id: "property",
    type: "single",
    title: "What type of property is this?",
    options: [
      { value: "house", label: "House with roof" },
      { value: "apartment", label: "Apartment or flat" },
      { value: "shared", label: "Shared building" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "permission",
    type: "single",
    title: "Do you have permission to install?",
    helper: "If you rent or share, choose the option closest to your situation.",
    options: [
      { value: "owner", label: "Yes, I own it" },
      { value: "approved", label: "Permission granted" },
      { value: "pending", label: "Permission pending" },
      { value: "unknown", label: "Not sure" },
    ],
  },
  {
    id: "roof-access",
    type: "single",
    title: "How confident are you with roof access?",
    options: [
      { value: "high", label: "Comfortable and safe" },
      { value: "medium", label: "With supervision" },
      { value: "low", label: "Prefer pro for roof work" },
      { value: "none", label: "No roof access" },
    ],
  },
  {
    id: "shading",
    type: "single",
    title: "Do you know your shading situation?",
    options: [
      { value: "clear", label: "Mostly clear" },
      { value: "mixed", label: "Some shade windows" },
      { value: "heavy", label: "Heavy shade" },
      { value: "unknown", label: "Not sure" },
    ],
  },
  {
    id: "timeline",
    type: "single",
    title: "When do you want this live?",
    options: [
      { value: "now", label: "This month" },
      { value: "soon", label: "1-3 months" },
      { value: "later", label: "3-6 months" },
      { value: "explore", label: "Exploring" },
    ],
  },
  {
    id: "budget",
    type: "single",
    title: "What is your budget comfort band?",
    options: [
      { value: "under500", label: "Up to $500" },
      { value: "500-2k", label: "$500 to $2k" },
      { value: "2k-8k", label: "$2k to $8k" },
      { value: "over8k", label: "$8k+" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "diy",
    type: "single",
    title: "DIY comfort and support preference?",
    options: [
      { value: "self-serve", label: "DIY with checklists" },
      { value: "guided", label: "Guided remote support" },
      { value: "pro", label: "Prefer pro for mains wiring" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    id: "safety-pref",
    type: "single",
    title: "Safety preference",
    helper: "Pick the boundary you want to keep.",
    options: [
      { value: "no-mains", label: "No mains wiring personally" },
      { value: "dc-only", label: "DC only, pro for AC" },
      { value: "pro-lead", label: "Certified leads all electrics" },
      { value: "flex", label: "Flexible with guidance" },
    ],
  },
  {
    id: "usage",
    type: "single",
    title: "Usage confidence or bill band?",
    options: [
      { value: "low", label: "Low usage or <$80" },
      { value: "medium", label: "Medium or $80-$180" },
      { value: "high", label: "High or $180+" },
      { value: "unknown", label: "Not sure" },
    ],
  },
  {
    id: "battery",
    type: "single",
    title: "Interest in battery storage?",
    options: [
      { value: "must-have", label: "Must have" },
      { value: "nice", label: "Nice to have later" },
      { value: "no", label: "Not now" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "backup-priority",
    type: "single",
    title: "Backup priority during outages?",
    options: [
      { value: "critical", label: "Critical loads only" },
      { value: "several", label: "Several rooms" },
      { value: "whole", label: "Whole home ideal" },
      { value: "none", label: "Not a priority" },
    ],
  },
  {
    id: "blocker",
    type: "single",
    title: "Biggest blocker right now?",
    options: [
      { value: "budget", label: "Budget clarity" },
      { value: "safety", label: "Safety confidence" },
      { value: "permission", label: "Permissions" },
      { value: "time", label: "Time to plan" },
      { value: "knowledge", label: "I need a walkthrough" },
    ],
  },
  {
    id: "support-channel",
    type: "single",
    title: "Preferred support channel",
    options: [
      { value: "remote", label: "Remote guidance" },
      { value: "visit", label: "On-site visit" },
      { value: "loan", label: "Toolkit loan" },
      { value: "asynch", label: "Async check-ins" },
    ],
  },
  {
    id: "region",
    type: "single",
    title: "Region (optional)",
    helper: "Gives better shade and hardware guidance.",
    options: [
      { value: "sunny", label: "High sun" },
      { value: "mixed", label: "Mixed climate" },
      { value: "cold", label: "Cold/low sun" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "safety-ack",
    type: "info",
    title: "Safety acknowledgement",
    helper: "Respect local codes, only work within your training, and pause if unsure.",
    body: "Solar involves heights, electricity, and permits. If you are not sure about any step, stop and ask a qualified pro. Use listed equipment and follow lockout-tagout practices where applicable.",
  },
];

const scoreLookup = (answers: NavigatorAnswerMap) => {
  let score = 50;
  if (answers.permission === "owner" || answers.permission === "approved") score += 8;
  if (answers.permission === "pending") score -= 6;
  if (answers.permission === "unknown") score -= 8;
  if (answers["roof-access"] === "high") score += 8;
  if (answers["roof-access"] === "medium") score += 4;
  if (answers["roof-access"] === "low") score -= 6;
  if (answers["roof-access"] === "none") score -= 10;
  if (answers.shading === "clear") score += 6;
  if (answers.shading === "heavy") score -= 6;
  if (answers.budget === "under500") score += 2;
  if (answers.budget === "500-2k") score += 4;
  if (answers.budget === "2k-8k") score += 6;
  if (answers.budget === "over8k") score += 8;
  if (answers.budget === "unsure") score -= 2;
  if (answers.timeline === "now" || answers.timeline === "soon") score += 4;
  if (answers.timeline === "later") score += 2;
  if (answers.timeline === "explore") score -= 2;
  if (answers.diy === "pro") score -= 2;
  if (answers.diy === "self-serve" || answers.diy === "guided") score += 2;
  return Math.max(0, Math.min(100, score));
};

const mapRisks = (answers: NavigatorAnswerMap): string[] => {
  const risks: string[] = [];
  if (answers.permission === "pending" || answers.permission === "unknown") risks.push("Permissions unclear");
  if (answers["roof-access"] === "low" || answers["roof-access"] === "none") risks.push("Roof access caution");
  if (answers.shading === "heavy" || answers.shading === "unknown") risks.push("Confirm shading");
  if (answers.diy === "pro" || answers["safety-pref"] === "pro-lead") risks.push("Prefer certified installer");
  if (answers.budget === "unsure") risks.push("Clarify budget band");
  return risks;
};

const mapGuides = (answers: NavigatorAnswerMap): string[] => {
  const guides: string[] = [];
  if (answers.goal === "bills") guides.push("navigator-warmup");
  if (answers.goal === "backup") guides.push("backup-basics");
  if (answers.goal === "eco") guides.push("workspace-playbook");
  if (answers["roof-access"] === "low" || answers["roof-access"] === "none") guides.push("rooftop-safety-basics");
  guides.push("maintenance-basics");
  return Array.from(new Set(guides));
};

const mapFirstStep = (answers: NavigatorAnswerMap): string => {
  if (answers.permission === "pending" || answers.permission === "unknown") return "Focus on permissions and landlord approval first";
  if (answers.goal === "backup") return "Book a roof suitability check with outage priorities";
  if (answers["roof-access"] === "none") return "Start with a balcony or plug-in solar kit plan";
  if (answers.diy === "pro") return "Talk to a certified installer before wiring";
  return "Run a quick shade and budget validation";
};

const mapPathway = (answers: NavigatorAnswerMap): string[] => {
  const steps: string[] = [];
  steps.push("Validate space and permissions with quick photos");
  if (answers.budget === "under500") steps.push("Model a starter kit with safe plug-in guidelines");
  else steps.push("Size rooftop array and shortlist hardware with safety limits");
  steps.push("Share plan with a helper or workspace and schedule safety review");
  return steps.slice(0, 3);
};

const mapTasks = (answers: NavigatorAnswerMap): SolarPlanTask[] => [
  { title: "Capture roof or balcony photos", status: "pending" },
  { title: "List critical loads and outage priorities", status: "pending" },
  { title: "Confirm permissions and codes", status: answers.permission === "owner" ? "done" : "pending" },
  { title: "Set a quarterly safety reminder", status: "pending" },
];

export const generateSolarPlan = (answers: NavigatorAnswerMap): SolarPlan => {
  const readinessScore = scoreLookup(answers);
  return {
    readinessScore,
    recommendedFirstStep: mapFirstStep(answers),
    pathway: mapPathway(answers),
    riskFlags: mapRisks(answers),
    recommendedGuides: mapGuides(answers),
    seedTasks: mapTasks(answers),
  };
};
