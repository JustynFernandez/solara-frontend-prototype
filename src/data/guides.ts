export type Resource = {
  type: "pdf" | "video" | "link";
  title: string;
  url: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  coverImage: string;
  resources: Resource[];
  content: string;
};

export const guides: Guide[] = [
  {
    slug: "solar-in-60-minutes",
    title: "Solar in 60 Minutes",
    description: "A quick primer on components, wiring basics, and how to spot safe installs.",
    tags: ["Beginner", "Safety", "Basics"],
    level: "Beginner",
    readTime: "12 min",
    coverImage: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80&sat=-20",
    resources: [
      { type: "pdf", title: "Quick Safety Checklist", url: "https://example.com/safety.pdf" },
      { type: "video", title: "Wiring Basics (5 min)", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { type: "link", title: "Component Glossary", url: "https://example.com/glossary" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Get acquainted with the core pieces of a small PV system: panel, controller, battery, and inverter. Learn what to check before powering on.</p>
      <h3 id="components">Key components</h3>
      <ul>
        <li>Panel: rated watts, voltage window, connectors.</li>
        <li>Charge controller: verify DC input limits and battery chemistry.</li>
        <li>Battery: check state-of-charge and low-voltage cutoffs.</li>
        <li>Inverter: AC rating and surge headroom.</li>
      </ul>
      <h3 id="safety">Safety first</h3>
      <p>Always de-energize before touching conductors, and torque-check lugs after the first thermal cycle.</p>
    `,
  },
  {
    slug: "sizing-your-first-system",
    title: "Sizing Your First System",
    description: "Estimate usage, plan panel counts, and read inverter spec sheets with confidence.",
    tags: ["Design", "Planning"],
    level: "Intermediate",
    readTime: "16 min",
    coverImage: "https://images.unsplash.com/photo-1505739779565-3c60c965f61b?auto=format&fit=crop&w=1600&q=80&sat=-10",
    resources: [
      { type: "pdf", title: "Load Calculator Template", url: "https://example.com/load-template.pdf" },
      { type: "link", title: "Inverter Spec Decoder", url: "https://example.com/inverter-guide" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Right-size a starter system by mapping your daily loads, surge requirements, and solar harvest window.</p>
      <h3 id="loads">Loads</h3>
      <p>List every device, watts, and hours/day. Multiply to get Wh/day; add 15% headroom.</p>
      <h3 id="panels">Panels</h3>
      <p>Divide daily Wh by sun-hours for your region to size panel watts. Add seasonal buffer.</p>
      <h3 id="battery">Battery</h3>
      <p>Pick usable kWh for 1–2 days of autonomy; match chemistry and voltage to your inverter/charger.</p>
    `,
  },
  {
    slug: "maintenance-playbook",
    title: "Maintenance Playbook",
    description: "Cleaning schedules, torque checks, and monitoring alerts you should set up.",
    tags: ["Maintenance", "Tools"],
    level: "Intermediate",
    readTime: "10 min",
    coverImage: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1600&q=80&sat=-10",
    resources: [
      { type: "pdf", title: "Quarterly Checklist", url: "https://example.com/maintenance.pdf" },
      { type: "video", title: "Torque & Cleaning Basics", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Prevent issues with simple, repeatable checks: cleanliness, terminations, and monitoring alerts.</p>
      <h3 id="cleaning">Cleaning</h3>
      <p>Use deionized water where possible; avoid abrasive pads. Clean in cool hours.</p>
      <h3 id="torque">Torque</h3>
      <p>Verify lugs after first thermal cycle, then annually. Follow manufacturer specs.</p>
      <h3 id="alerts">Monitoring</h3>
      <p>Set alerts for low production, battery undervoltage, and inverter faults.</p>
    `,
  },
  {
    slug: "battery-basics",
    title: "Battery Basics & Safety",
    description: "Chemistries, depth of discharge, and how to wire batteries safely for solar.",
    tags: ["Storage", "Safety"],
    level: "Beginner",
    readTime: "11 min",
    coverImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80&sat=-15",
    resources: [
      { type: "pdf", title: "Battery wiring do's & don'ts", url: "https://example.com/battery-wiring.pdf" },
      { type: "video", title: "Series vs parallel (6 min)", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { type: "link", title: "BMS terminology", url: "https://example.com/bms-terms" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Learn how lithium vs AGM batteries behave, what depth of discharge means, and how to stay safe when adding storage.</p>
      <h3 id="chemistry">Chemistry</h3>
      <p>LiFePO₄ offers more cycles and usable capacity; AGM prefers shallower discharge. Match voltage to your inverter/charger.</p>
      <h3 id="wiring">Wiring</h3>
      <p>Use identical cable lengths, torque-check lugs, and add fusing on each parallel string.</p>
      <h3 id="safety">Safety</h3>
      <p>Never mix chemistries; avoid unbalanced parallel packs; follow manufacturer charge profiles.</p>
    `,
  },
  {
    slug: "permitting-and-utility",
    title: "Permitting & Utility Coordination",
    description: "Learn the paperwork, permissions, and grid requirements before you build.",
    tags: ["Planning", "Compliance"],
    level: "Intermediate",
    readTime: "14 min",
    coverImage: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=1600&q=80&sat=-12",
    resources: [
      { type: "pdf", title: "Permit checklist", url: "https://example.com/permit-checklist.pdf" },
      { type: "link", title: "Net metering primer", url: "https://example.com/net-metering" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Understand the approvals needed for residential and community solar projects, and how to work with your utility.</p>
      <h3 id="paperwork">Paperwork</h3>
      <p>Gather site plan, single-line diagram, equipment spec sheets, and installer credentials where required.</p>
      <h3 id="utility">Utility interconnection</h3>
      <p>Check limits on inverter size, anti-islanding requirements, and metering upgrades.</p>
      <h3 id="timeline">Timeline</h3>
      <p>Plan for reviews in parallel: permitting, structural checks, and utility pre-approval to reduce delays.</p>
    `,
  },
  {
    slug: "troubleshooting-field-guide",
    title: "Troubleshooting Field Guide",
    description: "Step-by-step checks for low production, tripping breakers, or battery issues.",
    tags: ["Maintenance", "Diagnostics"],
    level: "Advanced",
    readTime: "18 min",
    coverImage: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1600&q=80&sat=-20",
    resources: [
      { type: "pdf", title: "Rapid fault tree", url: "https://example.com/fault-tree.pdf" },
      { type: "video", title: "Clamp meter basics (7 min)", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Use a repeatable approach to isolate inverter, PV, battery, or balance-of-system issues without guesswork.</p>
      <h3 id="production">Low production</h3>
      <p>Check irradiance, shading changes, IV curve if available, and compare strings for mismatch.</p>
      <h3 id="breakers">Tripping breakers</h3>
      <p>Inspect terminations for heat, verify breaker ratings vs surge loads, and confirm correct polarity.</p>
      <h3 id="battery">Battery issues</h3>
      <p>Verify BMS fault codes, measure resting voltage, and check charge/float setpoints.</p>
    `,
  },
  {
    slug: "community-solar-playbook",
    title: "Community Solar Playbook",
    description: "Organize neighbors, pick financing models, and run transparent communication.",
    tags: ["Community", "Projects"],
    level: "Intermediate",
    readTime: "15 min",
    coverImage: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80&sat=-18",
    resources: [
      { type: "pdf", title: "Stakeholder kickoff deck", url: "https://example.com/community-deck.pdf" },
      { type: "link", title: "Community governance templates", url: "https://example.com/community-templates" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Launch a community solar effort with clear roles, funding, and communication practices.</p>
      <h3 id="people">People</h3>
      <p>Define a coordinator, treasurer, technical lead, and safety officer. Set a cadence for updates.</p>
      <h3 id="funding">Funding</h3>
      <p>Compare grants, crowd-funding, and co-op shares; outline risks and returns transparently.</p>
      <h3 id="execution">Execution</h3>
      <p>Use pilot installs to build trust, publish timelines, and document lessons for the next block.</p>
    `,
  },
  {
    slug: "battery-backup-essentials",
    title: "Backup Power Essentials",
    description: "Design a resilient backup system with transfer switches, critical loads, and safety.",
    tags: ["Resilience", "Design"],
    level: "Intermediate",
    readTime: "13 min",
    coverImage: "https://images.unsplash.com/photo-1518611446852-1d6f0fe6c0eb?auto=format&fit=crop&w=1600&q=80&sat=-20",
    resources: [
      { type: "pdf", title: "Critical loads worksheet", url: "https://example.com/critical-loads.pdf" },
      { type: "video", title: "Transfer switch basics", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ],
    content: `
      <h2 id="overview">Overview</h2>
      <p>Plan backup power that safely isolates from the grid and keeps essential loads running.</p>
      <h3 id="loads">Critical loads</h3>
      <p>List must-run circuits (medical, refrigeration, comms) and sum watts/VA to size inverter and battery.</p>
      <h3 id="switching">Transfer</h3>
      <p>Use listed transfer equipment; test it quarterly; label panels for emergency use.</p>
      <h3 id="charging">Charging</h3>
      <p>Combine solar, generator, or grid charging with proper charge profiles and surge planning.</p>
    `,
  },
];
