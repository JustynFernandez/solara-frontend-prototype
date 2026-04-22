import fs from "fs";
import path from "path";
import { createRequire } from "module";
import PptxGenJS from "pptxgenjs";
import { helpers } from "../../src/data/helpers.ts";
import { projects } from "../../src/data/projects.ts";
import { guides, paths } from "../../src/data/learnContent.ts";
import { navigatorQuestions } from "../../src/components/ui/solar-navigator-wizard.tsx";

const require = createRequire(import.meta.url);
const ShapeType: any = new (PptxGenJS as any)().ShapeType;
const { imageSizingCrop, imageSizingContain } = require("./assets/pptxgenjs_helpers/image.js");
const { warnIfSlideHasOverlaps, warnIfSlideElementsOutOfBounds } = require("./assets/pptxgenjs_helpers/layout.js");
const { safeOuterShadow } = require("./assets/pptxgenjs_helpers/util.js");

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "output");
const SCREEN_DIR = path.join(OUT_DIR, "screens");
const RENDER_DIR = path.join(OUT_DIR, "rendered");
const PPTX_PATH = path.join(OUT_DIR, "solara-overview-deck.pptx");

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(SCREEN_DIR, { recursive: true });
fs.mkdirSync(RENDER_DIR, { recursive: true });

const COLORS = {
  white: "FFFFFF",
  page: "F7F9FC",
  panel: "F1F5FA",
  ink: "11161D",
  text: "223041",
  muted: "5D6B7B",
  rule: "D7DEE8",
  softRule: "E7ECF2",
  blue: "2C67AD",
  blueDark: "1F4F87",
  gold: "8A6B22",
  dark: "0F141B",
  darkMuted: "C8D1DC",
};

const DIM = {
  w: 13.333,
  h: 7.5,
  x: 0.6,
  y: 0.52,
  contentW: 12.133,
};

const screen = (name: string) => path.join(SCREEN_DIR, `${name}.png`);
const asset = (name: string) => path.join(ROOT, "..", "..", "public", name);

const verifiedHelpers = helpers.filter((helper) => helper.verified);
const verifiedAvailableHelpers = verifiedHelpers.filter((helper) => helper.availabilityStatus === "available");
const certifiedHelpers = verifiedHelpers.filter((helper) => helper.level === "certified");
const coveredAreas = new Set(verifiedHelpers.map((helper) => helper.coarseLocationLabel)).size;

const activeProjects = projects.filter((project) => project.status === "Recruiting" || project.status === "In Progress");
const recruitingProjects = projects.filter((project) => project.status === "Recruiting");
const featuredProject = activeProjects
  .slice()
  .sort((a, b) => {
    const aGap = a.goalVolunteers - a.currentVolunteers;
    const bGap = b.goalVolunteers - b.currentVolunteers;
    if (a.status !== b.status) return a.status === "Recruiting" ? -1 : 1;
    return bGap - aGap;
  })[0];
const featuredVolunteerGap = featuredProject.goalVolunteers - featuredProject.currentVolunteers;
const openVolunteerSpots = activeProjects.reduce(
  (sum, project) => sum + Math.max(project.goalVolunteers - project.currentVolunteers, 0),
  0
);
const safetyGuideCount = guides.filter((guide) => guide.safetyCritical).length;
const totalGuideCount = guides.length;
const firstThreeQuestions = navigatorQuestions.slice(0, 3);

const connectProof = [
  `${verifiedHelpers.length} verified helpers`,
  `${verifiedAvailableHelpers.length} available now`,
  `${certifiedHelpers.length} certified roles`,
];

function setBackground(slide: PptxGenJS.Slide, color = COLORS.page) {
  slide.background = { color };
}

function addSlideHeader(
  slide: PptxGenJS.Slide,
  eyebrow: string,
  title: string,
  body?: string,
  opts: { dark?: boolean; x?: number; y?: number; w?: number } = {}
) {
  const x = opts.x ?? DIM.x;
  const y = opts.y ?? DIM.y;
  const w = opts.w ?? 5.5;
  const titleColor = opts.dark ? COLORS.white : COLORS.ink;
  const bodyColor = opts.dark ? COLORS.darkMuted : COLORS.muted;
  slide.addText(eyebrow, {
    x,
    y,
    w,
    h: 0.22,
    fontFace: "Aptos",
    fontSize: 10,
    bold: true,
    color: COLORS.blue,
    charSpace: 1.2,
    margin: 0,
  });
  slide.addText(title, {
    x,
    y: y + 0.28,
    w,
    h: 0.82,
    fontFace: "Aptos Display",
    fontSize: 22,
    bold: true,
    color: titleColor,
    margin: 0,
    fit: "shrink",
  });
  if (body) {
    slide.addText(body, {
      x,
      y: y + 1.12,
      w,
      h: 0.56,
      fontFace: "Aptos",
      fontSize: 11.5,
      color: bodyColor,
      margin: 0,
      valign: "top",
      fit: "shrink",
    });
  }
}

function addMetricRow(
  slide: PptxGenJS.Slide,
  x: number,
  y: number,
  w: number,
  label: string,
  value: string,
  opts: { dark?: boolean; accent?: string } = {}
) {
  slide.addShape(ShapeType.line, {
    x,
    y,
    w,
    h: 0,
    line: { color: opts.dark ? "2B3440" : COLORS.rule, width: 1.1 },
  });
  slide.addText(label, {
    x,
    y: y + 0.12,
    w: w * 0.55,
    h: 0.26,
    fontFace: "Aptos",
    fontSize: 10,
    color: opts.dark ? COLORS.darkMuted : COLORS.muted,
    margin: 0,
  });
  slide.addText(value, {
    x: x + w * 0.58,
    y: y + 0.07,
    w: w * 0.42,
    h: 0.32,
    align: "right",
    fontFace: "Aptos Display",
    fontSize: 14,
    bold: true,
    color: opts.accent || (opts.dark ? COLORS.white : COLORS.ink),
    margin: 0,
  });
}

function addPill(
  slide: PptxGenJS.Slide,
  text: string,
  x: number,
  y: number,
  w: number,
  opts: { fill?: string; color?: string } = {}
) {
  slide.addShape(ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.08,
    fill: { color: opts.fill || COLORS.panel },
    line: { color: opts.fill || COLORS.panel, transparency: 100 },
  });
  slide.addText(text, {
    x: x + 0.12,
    y: y + 0.06,
    w: w - 0.24,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 9,
    bold: true,
    color: opts.color || COLORS.blueDark,
    margin: 0,
    align: "center",
  });
}

function addSectionRule(slide: PptxGenJS.Slide, y: number, dark = false) {
  slide.addShape(ShapeType.line, {
    x: DIM.x,
    y,
    w: DIM.contentW,
    h: 0,
    line: { color: dark ? "27303B" : COLORS.rule, width: 1.1 },
  });
}

function helperPriorityList() {
  return verifiedAvailableHelpers
    .slice()
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.completedProjectsCount - a.completedProjectsCount;
    });
}

function addHelperTile(
  slide: PptxGenJS.Slide,
  helper: typeof helpers[number],
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { lead?: boolean } = {}
) {
  slide.addShape(ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: COLORS.white },
    line: { color: COLORS.softRule, width: 1 },
    shadow: safeOuterShadow("0B1224", 0.1, 45, 2, 1),
  });
  slide.addImage({
    path: asset(helper.avatar!.replace(/^\//, "")),
    ...imageSizingCrop(asset(helper.avatar!.replace(/^\//, "")), x + 0.18, y + 0.18, opts.lead ? 0.84 : 0.58, opts.lead ? 0.84 : 0.58),
  });
  slide.addText(helper.name, {
    x: x + (opts.lead ? 1.14 : 0.9),
    y: y + 0.19,
    w: w - (opts.lead ? 1.3 : 1.05),
    h: 0.22,
    fontFace: "Aptos",
    fontSize: opts.lead ? 12 : 10,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    fit: "shrink",
  });
  slide.addText(helper.level.charAt(0).toUpperCase() + helper.level.slice(1), {
    x: x + (opts.lead ? 1.14 : 0.9),
    y: y + 0.45,
    w: 1.2,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 9,
    color: COLORS.blueDark,
    margin: 0,
  });
  slide.addText(helper.responseTimeLabel, {
    x: x + (opts.lead ? 1.14 : 0.9),
    y: y + (opts.lead ? 0.7 : 0.66),
    w: w - 1.2,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 9,
    color: COLORS.muted,
    margin: 0,
  });
}

function addScreenshot(slide: PptxGenJS.Slide, file: string, x: number, y: number, w: number, h: number) {
  slide.addShape(ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: COLORS.white },
    line: { color: COLORS.softRule, width: 1 },
    shadow: safeOuterShadow("0B1224", 0.09, 45, 2, 1),
  });
  slide.addImage({
    path: file,
    ...imageSizingCrop(file, x + 0.02, y + 0.02, w - 0.04, h - 0.04),
  });
}

async function main() {
const pptx = new PptxGenJS();
const pptxAny: any = pptx;

pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Solara";
pptx.subject = "Solara product overview";
pptx.title = "Solara Overview";
pptx.lang = "en-GB";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-GB",
};

// Slide 1: Cover
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.dark };
  const cover = asset("hero-community-neighborhood.jpg");
  slide.addImage({ path: cover, ...imageSizingCrop(cover, 0, 0, DIM.w, DIM.h) });
  slide.addShape(ShapeType.rect, {
    x: 0,
    y: 0,
    w: DIM.w,
    h: DIM.h,
    fill: { color: COLORS.dark, transparency: 38 },
    line: { color: COLORS.dark, transparency: 100 },
  });
  slide.addImage({
    path: asset("solara-logo.png"),
    ...imageSizingContain(asset("solara-logo.png"), 0.62, 0.52, 0.85, 0.85),
  });
  slide.addText("Solara", {
    x: 0.62,
    y: 2.02,
    w: 5.8,
    h: 0.78,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });
  slide.addText("Neighborhood solar, made workable.", {
    x: 0.62,
    y: 2.84,
    w: 6.6,
    h: 0.38,
    fontFace: "Aptos",
    fontSize: 16,
    bold: true,
    color: "DDE6F1",
    margin: 0,
  });
  slide.addText("Find local help, plan the work, and move projects already in motion.", {
    x: 0.62,
    y: 3.32,
    w: 6.2,
    h: 0.5,
    fontFace: "Aptos",
    fontSize: 12.5,
    color: "D0D8E3",
    margin: 0,
  });
}

// Slide 2: Problem
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Problem", "Most solar intent stalls before work begins.", undefined, { x: DIM.x, y: 0.58, w: 7.2 });
  const columns = [
    { title: "Who to ask", body: "People do not know who can safely review a roof, check a budget, or take on certified work." },
    { title: "How to plan", body: "The first planning steps feel high-risk before there is enough information to spend with confidence." },
    { title: "How to coordinate", body: "Community-scale work needs roles, status, and safety references instead of ad hoc messages and docs." },
  ];
  columns.forEach((col, index) => {
    const x = DIM.x + index * 4.05;
    slide.addShape(ShapeType.roundRect, {
      x,
      y: 2.1,
      w: 3.55,
      h: 3.1,
      rectRadius: 0.08,
      fill: { color: COLORS.white },
      line: { color: COLORS.softRule, width: 1 },
    });
    addPill(slide, `0${index + 1}`, x + 0.2, 2.32, 0.5, { fill: COLORS.panel, color: COLORS.blueDark });
    slide.addText(col.title, {
      x: x + 0.2,
      y: 2.82,
      w: 2.8,
      h: 0.34,
      fontFace: "Aptos Display",
      fontSize: 17,
      bold: true,
      color: COLORS.ink,
      margin: 0,
    });
    slide.addText(col.body, {
      x: x + 0.2,
      y: 3.28,
      w: 3.1,
      h: 1.4,
      fontFace: "Aptos",
      fontSize: 11,
      color: COLORS.text,
      margin: 0,
      valign: "top",
    });
  });
}

// Slide 3: What Solara Is
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "System", "One platform for local solar action.", "Solara connects helpers, planning, projects, and learning in one operating flow.", { x: DIM.x, y: 0.58, w: 6.2 });
  const pillars = [
    { label: "Connect", body: "Find verified local helpers by location, response speed, and work level." },
    { label: "Navigator", body: "Use a five-step planning flow before you commit to spend or scope." },
    { label: "Projects", body: "Track live builds, volunteer demand, and the next task that actually moves the work." },
    { label: "Learn", body: "Keep planning and field work grounded in safety, guides, and reusable references." },
  ];
  pillars.forEach((pillar, index) => {
    const x = DIM.x + (index % 2) * 3.55 + 5.9;
    const y = 1.4 + Math.floor(index / 2) * 2.2;
    slide.addShape(ShapeType.roundRect, {
      x,
      y,
      w: 2.95,
      h: 1.72,
      rectRadius: 0.08,
      fill: { color: COLORS.white },
      line: { color: COLORS.softRule, width: 1 },
    });
    slide.addText(pillar.label, {
      x: x + 0.18,
      y: y + 0.18,
      w: 2.2,
      h: 0.24,
      fontFace: "Aptos Display",
      fontSize: 14,
      bold: true,
      color: COLORS.ink,
      margin: 0,
    });
    slide.addText(pillar.body, {
      x: x + 0.18,
      y: y + 0.54,
      w: 2.5,
      h: 0.9,
      fontFace: "Aptos",
      fontSize: 10,
      color: COLORS.text,
      margin: 0,
    });
  });
  const leftX = DIM.x;
  const diagramY = 2.5;
  const nodes = [
    { x: leftX + 0.2, y: diagramY + 0.1, w: 1.8, label: "Helpers" },
    { x: leftX + 2.25, y: diagramY + 0.1, w: 1.8, label: "Planning" },
    { x: leftX + 0.2, y: diagramY + 1.55, w: 1.8, label: "Projects" },
    { x: leftX + 2.25, y: diagramY + 1.55, w: 1.8, label: "Guides" },
  ];
  nodes.forEach((node) => {
    slide.addShape(ShapeType.roundRect, {
      x: node.x,
      y: node.y,
      w: node.w,
      h: 0.78,
      rectRadius: 0.08,
      fill: { color: COLORS.panel },
      line: { color: COLORS.rule, width: 1 },
    });
    slide.addText(node.label, {
      x: node.x,
      y: node.y + 0.23,
      w: node.w,
      h: 0.2,
      fontFace: "Aptos",
      fontSize: 11,
      bold: true,
      align: "center",
      color: COLORS.ink,
      margin: 0,
    });
  });
  [
    { x: leftX + 2.0, y: diagramY + 0.49, w: 0.25, h: 0 },
    { x: leftX + 1.1, y: diagramY + 0.88, w: 0, h: 0.65 },
    { x: leftX + 3.15, y: diagramY + 0.88, w: 0, h: 0.65 },
    { x: leftX + 2.0, y: diagramY + 1.94, w: 0.25, h: 0 },
  ].forEach((line) => {
    slide.addShape(ShapeType.line, {
      x: line.x,
      y: line.y,
      w: line.w,
      h: line.h,
      line: { color: COLORS.blue, width: 1.8 },
    });
  });
}

// Slide 4: Connect
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Connect", "Start with verified local help.", "Helpers are screened by location, response speed, and certification.", { x: DIM.x, y: 0.6, w: 4.8 });
  addScreenshot(slide, screen("connect-hub"), 0.6, 1.9, 7.5, 4.75);
  slide.addText("Current connect surface", {
    x: 0.72,
    y: 6.55,
    w: 2.1,
    h: 0.2,
    fontFace: "Aptos",
    fontSize: 9,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("The fastest route into Solara starts with people, not forms.", {
    x: 8.45,
    y: 2.02,
    w: 3.95,
    h: 0.54,
    fontFace: "Aptos Display",
    fontSize: 15,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  connectProof.forEach((entry, index) => addMetricRow(slide, 8.45, 2.92 + index * 0.72, 3.95, ["Coverage", "Availability", "Certification"][index], entry, { accent: COLORS.blueDark }));
  slide.addText("Operators can screen who is available, who is certified, and who can respond before opening a request.", {
    x: 8.45,
    y: 5.5,
    w: 4.0,
    h: 0.8,
    fontFace: "Aptos",
    fontSize: 11,
    color: COLORS.text,
    margin: 0,
  });
}

// Slide 5: Navigator
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Navigator", "Plan before you spend.", "The first three questions frame budget, readiness, and support level before any commitment.", { x: DIM.x, y: 0.6, w: 4.8 });
  slide.addShape(ShapeType.roundRect, {
    x: 6.35,
    y: 1.55,
    w: 6.35,
    h: 5.4,
    rectRadius: 0.08,
    fill: { color: COLORS.white },
    line: { color: COLORS.softRule, width: 1 },
    shadow: safeOuterShadow("0B1224", 0.09, 45, 2, 1),
  });
  slide.addImage({
    path: screen("navigator"),
    ...imageSizingContain(screen("navigator"), 6.53, 1.73, 5.99, 5.04),
  });
  firstThreeQuestions.forEach((question, index) => {
    const y = 2.2 + index * 1.02;
    addPill(slide, `0${index + 1}`, 0.62, y, 0.48);
    slide.addText(question.prompt, {
      x: 1.22,
      y: y + 0.03,
      w: 4.35,
      h: 0.28,
      fontFace: "Aptos",
      fontSize: 11,
      bold: true,
      color: COLORS.ink,
      margin: 0,
    });
  });
  slide.addText("Five-step flow", { x: 0.62, y: 5.46, w: 1.6, h: 0.18, fontFace: "Aptos", fontSize: 10, color: COLORS.muted, margin: 0 });
  slide.addText("Safety-first", { x: 2.28, y: 5.46, w: 1.4, h: 0.18, fontFace: "Aptos", fontSize: 10, color: COLORS.muted, margin: 0 });
  slide.addText("Save and resume", { x: 3.82, y: 5.46, w: 1.9, h: 0.18, fontFace: "Aptos", fontSize: 10, color: COLORS.muted, margin: 0 });
}

// Slide 6: Projects
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Projects", "Move work already underway.", "Projects are the coordination layer: live builds, volunteer demand, and the next task that unlocks progress.", { x: DIM.x, y: 0.6, w: 5.2 });
  addScreenshot(slide, screen("projects"), 0.6, 1.8, 7.4, 4.9);
  slide.addText("Projects turn interest into visible work.", {
    x: 8.35,
    y: 2.02,
    w: 4.2,
    h: 0.4,
    fontFace: "Aptos Display",
    fontSize: 15,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  addMetricRow(slide, 8.35, 2.84, 4.15, "Active builds", `${activeProjects.length} live`);
  addMetricRow(slide, 8.35, 3.56, 4.15, "Recruiting now", `${recruitingProjects.length} build`);
  addMetricRow(slide, 8.35, 4.28, 4.15, "Open volunteer spots", `${openVolunteerSpots} spots`);
  slide.addText("Active need example", {
    x: 8.35,
    y: 5.1,
    w: 1.5,
    h: 0.18,
    fontFace: "Aptos",
    fontSize: 9.5,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("Brixton Solar Rooftops: order mounting kits, book safety walkthrough, and close a seven-volunteer gap.", {
    x: 8.35,
    y: 5.36,
    w: 4.2,
    h: 0.8,
    fontFace: "Aptos",
    fontSize: 10.5,
    color: COLORS.text,
    margin: 0,
  });
}

// Slide 7: Learn + Safety
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Learn + Safety", "Keep the work informed.", "Guides and safety references stay attached to planning and field work instead of living in separate docs.", { x: DIM.x, y: 0.6, w: 5.3 });
  slide.addShape(ShapeType.roundRect, {
    x: 0.62, y: 1.95, w: 4.75, h: 4.85, rectRadius: 0.08,
    fill: { color: COLORS.white }, line: { color: COLORS.softRule, width: 1 }
  });
  slide.addText("Guide library", { x: 0.82, y: 2.2, w: 2.0, h: 0.22, fontFace: "Aptos Display", fontSize: 15, bold: true, color: COLORS.ink, margin: 0 });
  [
    `Total guides: ${totalGuideCount}`,
    `Safety-critical guides: ${safetyGuideCount}`,
    `Learning paths: ${paths.length}`,
  ].forEach((row, i) => {
    slide.addText(row, { x: 0.82, y: 2.7 + i * 0.34, w: 3.2, h: 0.18, fontFace: "Aptos", fontSize: 10.5, color: COLORS.text, margin: 0 });
  });
  const guideCards = guides.slice(0, 3);
  guideCards.forEach((guide, i) => {
    const y = 3.9 + i * 0.82;
    slide.addShape(ShapeType.roundRect, {
      x: 0.82, y, w: 4.15, h: 0.62, rectRadius: 0.05,
      fill: { color: COLORS.panel }, line: { color: COLORS.rule, width: 1 }
    });
    slide.addText(guide.title, { x: 0.96, y: y + 0.12, w: 2.8, h: 0.16, fontFace: "Aptos", fontSize: 10.5, bold: true, color: COLORS.ink, margin: 0 });
    slide.addText(`${guide.format} • ${guide.durationMins} min`, { x: 0.96, y: y + 0.34, w: 1.6, h: 0.16, fontFace: "Aptos", fontSize: 8.5, color: COLORS.muted, margin: 0 });
    if (guide.safetyCritical) addPill(slide, "Safety critical", 3.55, y + 0.15, 1.1, { fill: "EAF0F8", color: COLORS.gold });
  });

  slide.addShape(ShapeType.roundRect, {
    x: 6.1, y: 1.95, w: 6.55, h: 4.85, rectRadius: 0.08,
    fill: { color: COLORS.white }, line: { color: COLORS.softRule, width: 1 }
  });
  slide.addText("Safety stays inside the operating flow", { x: 6.35, y: 2.2, w: 4.6, h: 0.24, fontFace: "Aptos Display", fontSize: 15, bold: true, color: COLORS.ink, margin: 0 });
  const safetyPoints = [
    "DC electrical safety lives alongside helper matching, not after it.",
    "Projects carry role clarity so certified work is not assigned casually.",
    "Guides stay useful because they are tied to the exact next move in the product.",
  ];
  safetyPoints.forEach((point, i) => {
    const y = 2.82 + i * 0.95;
    addPill(slide, `0${i + 1}`, 6.35, y, 0.48);
    slide.addText(point, { x: 6.98, y: y + 0.03, w: 5.15, h: 0.42, fontFace: "Aptos", fontSize: 10.8, color: COLORS.text, margin: 0 });
  });
}

// Slide 8: End-to-End Flow
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Flow", "How someone moves through Solara.", "A single path from first question to live work.", { x: DIM.x, y: 0.6, w: 5 });
  const steps = [
    { title: "Find help", body: "Screen helpers by location, response speed, and role." },
    { title: "Plan the work", body: "Open Navigator and save a five-step planning run." },
    { title: "Move a project", body: "Join or open a build with visible tasks and volunteer demand." },
    { title: "Stay supported", body: "Use guides and safety references without leaving the flow." },
  ];
  steps.forEach((step, i) => {
    const x = 0.72 + i * 3.1;
    slide.addShape(ShapeType.roundRect, {
      x, y: 2.65, w: 2.45, h: 2.2, rectRadius: 0.08,
      fill: { color: COLORS.white }, line: { color: COLORS.softRule, width: 1 }
    });
    addPill(slide, `0${i + 1}`, x + 0.18, 2.88, 0.48);
    slide.addText(step.title, { x: x + 0.18, y: 3.28, w: 1.9, h: 0.24, fontFace: "Aptos Display", fontSize: 14, bold: true, color: COLORS.ink, margin: 0 });
    slide.addText(step.body, { x: x + 0.18, y: 3.68, w: 2.0, h: 0.68, fontFace: "Aptos", fontSize: 10.2, color: COLORS.text, margin: 0 });
    if (i < steps.length - 1) {
      slide.addShape(ShapeType.line, {
        x: x + 2.45, y: 3.74, w: 0.65, h: 0,
        line: { color: COLORS.blue, width: 2, beginArrowType: "none", endArrowType: "triangle" }
      });
    }
  });
}

// Slide 9: Operational Proof
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Operational proof", "The platform is structured around live work.", "The current model is built on available helpers, active builds, and a planning flow ready to open.", { x: DIM.x, y: 0.6, w: 6.2 });
  const proofRows = [
    ["Verified helpers", `${verifiedHelpers.length} in the current network`],
    ["Available now", `${verifiedAvailableHelpers.length} helpers can respond now`],
    ["Projects already moving", `${activeProjects.length} active builds, ${recruitingProjects.length} recruiting`],
    ["Open volunteer demand", `${openVolunteerSpots} open spots across active work`],
  ];
  proofRows.forEach(([label, value], i) => addMetricRow(slide, 0.72, 2.25 + i * 0.82, 5.2, label, value, { accent: COLORS.blueDark }));
  slide.addShape(ShapeType.roundRect, {
    x: 6.55, y: 2.05, w: 5.98, h: 3.95, rectRadius: 0.08,
    fill: { color: COLORS.white }, line: { color: COLORS.softRule, width: 1 }
  });
  slide.addText("Current live snapshot", { x: 6.82, y: 2.33, w: 2.8, h: 0.22, fontFace: "Aptos Display", fontSize: 15, bold: true, color: COLORS.ink, margin: 0 });
  slide.addText(
    `Featured build: ${featuredProject.name}\n${featuredProject.status} in ${featuredProject.location}\nVolunteer gap: ${featuredVolunteerGap} people still needed`,
    { x: 6.82, y: 2.78, w: 5.2, h: 1.2, fontFace: "Aptos", fontSize: 11, color: COLORS.text, margin: 0 }
  );
  slide.addText("No testimonials. No placeholder logos. Just the current network, current work, and the flows that move it.", {
    x: 6.82, y: 4.5, w: 5.0, h: 0.8, fontFace: "Aptos", fontSize: 11, color: COLORS.muted, margin: 0
  });
}

// Slide 10: Why This Matters
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Why this matters", "Why this model works locally.", undefined, { x: DIM.x, y: 0.62, w: 5.4 });
  const points = [
    { title: "Lower the cost of starting", body: "The first useful step is helper discovery or a five-question planning run, not a full project commitment." },
    { title: "Make support visible", body: "Who is available, who is certified, and what still needs volunteers are visible before work gets blocked." },
    { title: "Coordinate community-scale work", body: "Projects give local efforts a shared operating layer instead of scattered docs, chats, and handoffs." },
  ];
  points.forEach((point, index) => {
    const x = 0.72 + index * 4.05;
    slide.addShape(ShapeType.roundRect, {
      x, y: 2.25, w: 3.55, h: 3.1, rectRadius: 0.08,
      fill: { color: COLORS.white }, line: { color: COLORS.softRule, width: 1 }
    });
    slide.addText(point.title, { x: x + 0.18, y: 2.52, w: 3.0, h: 0.5, fontFace: "Aptos Display", fontSize: 16, bold: true, color: COLORS.ink, margin: 0 });
    slide.addText(point.body, { x: x + 0.18, y: 3.22, w: 3.0, h: 1.28, fontFace: "Aptos", fontSize: 10.8, color: COLORS.text, margin: 0 });
  });
}

// Slide 11: Product Surface Montage
{
  const slide = pptx.addSlide();
  setBackground(slide);
  addSlideHeader(slide, "Product surfaces", "What the platform looks like in use.", "The same system runs from public entry to live work.", { x: DIM.x, y: 0.6, w: 5.2 });
  const shots = [
    { file: screen("home-live-board"), x: 0.72, y: 1.95, w: 5.95, h: 2.32, label: "Home / live board" },
    { file: screen("connect-hub"), x: 6.95, y: 1.95, w: 5.65, h: 2.32, label: "Connect" },
    { file: screen("navigator"), x: 0.72, y: 4.62, w: 5.95, h: 2.32, label: "Solar Navigator" },
    { file: screen("projects"), x: 6.95, y: 4.62, w: 5.65, h: 2.32, label: "Projects" },
  ];
  shots.forEach((shot) => {
    addScreenshot(slide, shot.file, shot.x, shot.y, shot.w, shot.h);
    slide.addShape(ShapeType.rect, {
      x: shot.x + 0.02, y: shot.y + shot.h - 0.42, w: shot.w - 0.04, h: 0.38,
      fill: { color: COLORS.dark, transparency: 45 }, line: { color: COLORS.dark, transparency: 100 }
    });
    slide.addText(shot.label, { x: shot.x + 0.14, y: shot.y + shot.h - 0.3, w: 2.8, h: 0.14, fontFace: "Aptos", fontSize: 8.5, color: COLORS.white, margin: 0 });
  });
}

// Slide 12: Close
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.dark };
  slide.addShape(ShapeType.rect, {
    x: 0, y: 0, w: DIM.w, h: DIM.h,
    fill: { color: COLORS.dark }, line: { color: COLORS.dark, transparency: 100 }
  });
  slide.addText("Solara makes neighborhood solar actionable.", {
    x: 0.9, y: 2.12, w: 8.4, h: 0.8,
    fontFace: "Aptos Display", fontSize: 26, bold: true, color: COLORS.white, margin: 0
  });
  slide.addText("Start with help, then move the work.", {
    x: 0.92, y: 3.06, w: 4.9, h: 0.3,
    fontFace: "Aptos", fontSize: 14, color: "CFD7E2", margin: 0
  });
  slide.addImage({
    path: asset("solara-logo.png"),
    ...imageSizingContain(asset("solara-logo.png"), 10.7, 5.82, 1.25, 1.0),
  });
}

for (const slide of (pptxAny._slides || [])) {
  warnIfSlideHasOverlaps(slide, pptx, { muteContainment: true });
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

await pptx.writeFile({ fileName: PPTX_PATH });
console.log(JSON.stringify({ ok: true, output: PPTX_PATH }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

