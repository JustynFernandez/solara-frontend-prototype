export type Pillar = "Plan" | "Coordinate" | "Sustain";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Format = "Guide" | "Checklist" | "Template" | "Calculator";

export type ResourceType = "pdf" | "video" | "link" | "template";

export interface GuideContent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  pillar: Pillar;
  difficulty: Difficulty;
  format: Format;
  durationMins: number;
  tags: string[];
  toc: string[];
  takeaways: string[];
  resources: { type: ResourceType; title: string; url: string }[];
  content: string;
  safetyCritical?: boolean;
  published?: string;
}

export interface PathStep {
  id: string;
  title: string;
  description: string;
  recommendedNextAction: "navigator" | "projects" | "connect" | "learn";
  optionalSlugOrProjectId?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  pillar: Pillar;
  durationMins: number;
  outcome: string;
  steps: PathStep[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  relatedGuides?: string[];
}

export const guides: GuideContent[] = [
  {
    id: "g1",
    slug: "navigator-warmup",
    title: "Navigator Warmup",
    summary: "Get oriented before you launch Solar Navigator: what it asks, what you need, and how to save your run.",
    pillar: "Plan",
    difficulty: "Beginner",
    format: "Guide",
    durationMins: 10,
    tags: ["Plan", "Starter", "Navigator"],
    toc: ["Overview", "What to prepare", "How results are calculated", "Common pitfalls"],
    takeaways: [
      "Know the 3 things you need before starting: roof type, energy goal, budget envelope.",
      "Understand why the navigator asks about shade, circuits, and availability.",
      "Learn how to export results and share with helpers.",
    ],
    resources: [
      { type: "pdf", title: "Navigator quick prep checklist", url: "https://example.com/navigator-prep.pdf" },
      { type: "link", title: "Start Solar Navigator", url: "/solar-navigator" },
    ],
    published: "2025-01-10",
    content: `
      <h2 id="overview">Overview</h2>
      <p>The Solar Navigator asks a handful of inputs so it can frame a safe, realistic plan. You can pause and resume at any point.</p>
      <h3 id="what-to-prepare">What to prepare</h3>
      <ul>
        <li>Photos of your roof or balcony area.</li>
        <li>Your goal: offset % or backup runtime.</li>
        <li>Your time window and rough budget.</li>
      </ul>
      <h3 id="how-results-are-calculated">How results are calculated</h3>
      <p>Navigator combines your location, target offset, and space to suggest a starter array size plus next steps.</p>
      <h3 id="common-pitfalls">Common pitfalls</h3>
      <p>Skipping shading questions or leaving budget blank can skew results. Add a range even if it's a placeholder.</p>
    `,
  },
  {
    id: "g2",
    slug: "rooftop-safety-basics",
    title: "Rooftop Safety Basics",
    summary: "Safe access, PPE, and power-down checks before any hands-on work.",
    pillar: "Plan",
    difficulty: "Beginner",
    format: "Guide",
    durationMins: 12,
    tags: ["Safety", "Basics", "Checklist"],
    toc: ["Access", "PPE", "Power-down sequence", "When to stop"],
    takeaways: [
      "Have a spotter and stable ladder angle before climbing.",
      "Use insulated tools and confirm circuits are de-energized.",
      "If you're unsure about roof integrity, stop and call a pro.",
    ],
    resources: [
      { type: "pdf", title: "Safe work-at-height checklist", url: "https://example.com/safety-height.pdf" },
      { type: "video", title: "5 minute safety primer", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ],
    safetyCritical: true,
    published: "2025-01-12",
    content: `
      <h2 id="overview">Overview</h2>
      <p>Before any rooftop work, set a safety baseline. Double-check ladder angle, weather, and PPE.</p>
      <h3 id="access">Access</h3>
      <p>Use a stable ladder secured at the top. Never work alone.</p>
      <h3 id="ppe">PPE</h3>
      <p>Gloves, eye protection, and non-slip shoes are mandatory. Wear a harness where required.</p>
      <h3 id="power-down-sequence">Power-down sequence</h3>
      <p>Disconnect at the inverter, then isolate DC if accessible. Verify with a meter before touching conductors.</p>
      <h3 id="when-to-stop">When to stop</h3>
      <p>High winds, wet roofs, or structural doubts are all stop signals. Re-book when safe.</p>
    `,
  },
  {
    id: "g3",
    slug: "workspace-playbook",
    title: "Project Workspace Playbook",
    summary: "How to set up a Project Workspace to track installs, documents, and tasks with your crew.",
    pillar: "Coordinate",
    difficulty: "Intermediate",
    format: "Template",
    durationMins: 15,
    tags: ["Projects", "Templates", "Coordination"],
    toc: ["Workspace setup", "Roles and access", "Docs to track", "Handoffs"],
    takeaways: [
      "Create one workspace per site with clear roles.",
      "Attach permits, single-line, and photos in one place.",
      "Use status boards so helpers see exactly what's next.",
    ],
    resources: [
      { type: "template", title: "Workspace board template", url: "https://example.com/workspace-template" },
      { type: "link", title: "Browse project workspaces", url: "/projects" },
    ],
    published: "2025-01-08",
    content: `
      <h2 id="workspace-setup">Workspace setup</h2>
      <p>Project Workspaces keep tasks, photos, and safety checkpoints in one place.</p>
      <h3 id="roles-and-access">Roles and access</h3>
      <p>Assign a coordinator, safety lead, and reviewer. Keep access scoped to people on the job.</p>
      <h3 id="docs-to-track">Docs to track</h3>
      <p>Upload permits, single-line diagrams, torque specs, and site photos.</p>
      <h3 id="handoffs">Handoffs</h3>
      <p>Use checklists for pre-flight, in-progress, and close-out, and assign owners for each stage.</p>
    `,
  },
  {
    id: "g4",
    slug: "maintenance-basics",
    title: "Maintenance Basics",
    summary: "Quarterly checks, cleaning guidance, and alerts to set so small issues don't grow.",
    pillar: "Sustain",
    difficulty: "Beginner",
    format: "Checklist",
    durationMins: 8,
    tags: ["Sustain", "Maintenance", "Checklist"],
    toc: ["Quarterly checks", "Cleaning", "Monitoring alerts", "When to escalate"],
    takeaways: [
      "Create a recurring reminder for quarterly visual checks.",
      "Clean panels in cool hours with non-abrasive methods.",
      "Set alerts for low production and battery undervoltage.",
    ],
    resources: [
      { type: "pdf", title: "Quarterly maintenance list", url: "https://example.com/maintenance.pdf" },
      { type: "link", title: "Request a helper", url: "/connect" },
    ],
    published: "2025-01-05",
    content: `
      <h2 id="overview">Overview</h2>
      <p>Simple maintenance keeps production up and safety risks down.</p>
      <h3 id="quarterly-checks">Quarterly checks</h3>
      <p>Look for debris, discoloration, or loose hardware. Note anything unusual.</p>
      <h3 id="cleaning">Cleaning</h3>
      <p>Use soft brushes and deionized water when possible. Avoid high pressure near seals.</p>
      <h3 id="monitoring-alerts">Monitoring alerts</h3>
      <p>Set alerts for low production, fault codes, and battery undervoltage or over-temperature.</p>
      <h3 id="when-to-escalate">When to escalate</h3>
      <p>Heat damage, burn marks, or water ingress warrant a pro inspection.</p>
    `,
  },
  {
    id: "g5",
    slug: "backup-basics",
    title: "Backup Power Basics",
    summary: "A primer on safe backup power: critical loads, transfer switches, and runtime expectations.",
    pillar: "Plan",
    difficulty: "Intermediate",
    format: "Guide",
    durationMins: 14,
    tags: ["Resilience", "Design", "Backup"],
    toc: ["Critical loads", "Transfer switches", "Runtime math", "Safety"],
    takeaways: [
      "List critical loads and calculate Watts/VA before picking hardware.",
      "Use listed transfer equipment and label panels clearly.",
      "Plan battery runtime with a safety buffer for cold temps.",
    ],
    resources: [
      { type: "pdf", title: "Critical loads worksheet", url: "https://example.com/critical-loads.pdf" },
      { type: "link", title: "See helpers", url: "/connect" },
    ],
    published: "2025-01-06",
    content: `
      <h2 id="overview">Overview</h2>
      <p>Backup power is about safe isolation and realistic runtime expectations.</p>
      <h3 id="critical-loads">Critical loads</h3>
      <p>List must-run circuits like comms and refrigeration. Sum Watts and VA to size the inverter.</p>
      <h3 id="transfer-switches">Transfer switches</h3>
      <p>Use listed transfer equipment and test it quarterly.</p>
      <h3 id="runtime-math">Runtime math</h3>
      <p>Estimate runtime as usable kWh divided by average load, then add 20% buffer.</p>
      <h3 id="safety">Safety</h3>
      <p>Label disconnects, keep ventilation clear, and verify neutral bonding rules locally.</p>
    `,
  },
  {
    id: "g6",
    slug: "troubleshooting-quickwalk",
    title: "Troubleshooting Quickwalk",
    summary: "A fast decision tree for low production, alerts, or odd inverter behavior.",
    pillar: "Sustain",
    difficulty: "Advanced",
    format: "Guide",
    durationMins: 9,
    tags: ["Diagnostics", "Monitoring"],
    toc: ["Symptoms", "Visual inspection", "Electrical checks", "When to pause"],
    takeaways: [
      "Compare strings and check weather before assuming a fault.",
      "Look for heat at terminations and discoloration.",
      "If unsure about DC safety, stop and call a qualified installer.",
    ],
    resources: [
      { type: "link", title: "Community troubleshooting thread", url: "https://example.com/community" },
      { type: "link", title: "Connect with a helper", url: "/connect" },
    ],
    published: "2025-01-11",
    content: `
      <h2 id="overview">Overview</h2>
      <p>Use a repeatable flow: observe, compare, isolate, and only then adjust settings.</p>
      <h3 id="symptoms">Symptoms</h3>
      <p>Capture screenshots or fault codes and note conditions when the issue appears.</p>
      <h3 id="visual-inspection">Visual inspection</h3>
      <p>Check for debris, damage, or loose cables. Verify disconnects are in the correct position.</p>
      <h3 id="electrical-checks">Electrical checks</h3>
      <p>Only measure DC if you are trained and equipped. Otherwise, stop and call a pro.</p>
      <h3 id="when-to-pause">When to pause</h3>
      <p>Any smell of burning, arcing, or damaged conductors means stop work immediately.</p>
    `,
  },
  {
    id: "g7",
    slug: "dc-electrical-safety",
    title: "DC Electrical Safety Essentials",
    summary: "Essential knowledge about DC voltage hazards, proper disconnection procedures, and when to call a professional.",
    pillar: "Sustain",
    difficulty: "Beginner",
    format: "Guide",
    durationMins: 10,
    tags: ["Safety", "Electrical", "DC", "Essentials"],
    toc: ["Why DC is different", "Voltage hazards", "Safe disconnection", "Grounding basics", "When to call a pro"],
    takeaways: [
      "DC doesn't cross zero like AC, making arcs harder to extinguish.",
      "Always disconnect at the inverter first, then isolate DC strings.",
      "Use a multimeter to verify zero voltage before touching any conductor.",
      "If you're unsure about any electrical work, stop and hire a qualified installer.",
    ],
    resources: [
      { type: "pdf", title: "DC safety quick reference", url: "https://example.com/dc-safety.pdf" },
      { type: "video", title: "DC vs AC safety explained", url: "https://example.com/dc-video" },
      { type: "link", title: "Find a certified installer", url: "/connect" },
    ],
    safetyCritical: true,
    published: "2025-01-14",
    content: `
      <h2 id="why-dc-is-different">Why DC is different</h2>
      <p>Direct current (DC) from solar panels behaves differently than household AC. DC doesn't naturally cross zero voltage, which means arcs can sustain longer and are harder to extinguish. This makes DC circuits potentially more dangerous if not handled properly.</p>

      <h3 id="voltage-hazards">Voltage hazards</h3>
      <p>A typical residential solar array can produce 300-600V DC in full sun. This voltage is present whenever light hits the panels - you cannot "turn off" solar panels. The only way to make them safe is proper isolation and covering.</p>
      <ul>
        <li>Voltage above 50V DC is considered dangerous to humans.</li>
        <li>DC current can cause muscle lock, preventing you from letting go.</li>
        <li>Burns from DC arcs can be severe and occur without warning.</li>
      </ul>

      <h3 id="safe-disconnection">Safe disconnection procedure</h3>
      <p>Always follow this sequence when de-energizing a solar system:</p>
      <ol>
        <li>Turn off the inverter (AC side first, then DC side if separate).</li>
        <li>Open the DC isolator switch near the inverter.</li>
        <li>If accessible, open string-level DC disconnects.</li>
        <li>Wait 5 minutes for capacitors to discharge.</li>
        <li>Verify zero voltage with a rated multimeter before touching conductors.</li>
      </ol>

      <h3 id="grounding-basics">Grounding basics</h3>
      <p>Proper grounding protects against faults and lightning. Equipment grounding connects metal frames to earth. Never bypass or modify grounding connections. If you see corrosion or loose ground connections, flag for professional repair.</p>

      <h3 id="when-to-call-a-pro">When to call a pro</h3>
      <p>Call a qualified installer immediately if you observe:</p>
      <ul>
        <li>Burn marks, melting, or discoloration on any component.</li>
        <li>Smell of burning plastic or ozone.</li>
        <li>Buzzing, crackling, or arcing sounds.</li>
        <li>Any uncertainty about safe procedures.</li>
      </ul>
      <p><strong>Remember:</strong> No task is worth risking electrocution. When in doubt, stop and get help.</p>
    `,
  },
  {
    id: "g8",
    slug: "battery-chemistry-101",
    title: "Battery Chemistry 101",
    summary: "Compare LiFePO4 and lead-acid batteries: cycle life, depth of discharge, temperature factors, and sizing considerations.",
    pillar: "Plan",
    difficulty: "Intermediate",
    format: "Guide",
    durationMins: 12,
    tags: ["Batteries", "Planning", "LiFePO4", "Lead-acid"],
    toc: ["Chemistry overview", "LiFePO4 advantages", "Lead-acid considerations", "Temperature effects", "Sizing your battery"],
    takeaways: [
      "LiFePO4 offers 80-90% usable capacity vs 50% for lead-acid.",
      "Cycle life differs dramatically: 3000-5000 cycles for LiFePO4 vs 500-1000 for lead-acid.",
      "Cold temperatures reduce all battery capacity - plan for winter performance.",
      "Size batteries for your actual critical loads, not theoretical maximums.",
    ],
    resources: [
      { type: "pdf", title: "Battery comparison chart", url: "https://example.com/battery-comparison.pdf" },
      { type: "link", title: "Use the sizing estimator", url: "/learn#tools" },
      { type: "link", title: "Try the 3D Configurator", url: "/configurator" },
    ],
    published: "2025-01-15",
    content: `
      <h2 id="chemistry-overview">Chemistry overview</h2>
      <p>The two most common battery chemistries for home solar are Lithium Iron Phosphate (LiFePO4) and Lead-Acid (flooded or AGM). Each has trade-offs in cost, lifespan, and performance.</p>

      <h3 id="lifepo4-advantages">LiFePO4 advantages</h3>
      <p>LiFePO4 batteries have become the preferred choice for most new installations:</p>
      <ul>
        <li><strong>Depth of Discharge (DoD):</strong> 80-90% usable capacity safely.</li>
        <li><strong>Cycle Life:</strong> 3,000-5,000 cycles at 80% DoD.</li>
        <li><strong>Weight:</strong> About 1/3 the weight of equivalent lead-acid.</li>
        <li><strong>Efficiency:</strong> 95-98% round-trip efficiency.</li>
        <li><strong>Maintenance:</strong> No watering, no equalization charges needed.</li>
        <li><strong>Safety:</strong> Thermally stable, no thermal runaway risk.</li>
      </ul>

      <h3 id="lead-acid-considerations">Lead-acid considerations</h3>
      <p>Lead-acid remains viable for budget-constrained projects or specific use cases:</p>
      <ul>
        <li><strong>Depth of Discharge:</strong> Only 50% for reasonable lifespan.</li>
        <li><strong>Cycle Life:</strong> 500-1,000 cycles at 50% DoD.</li>
        <li><strong>Upfront Cost:</strong> 30-50% cheaper per kWh initially.</li>
        <li><strong>True Cost:</strong> Often higher over 10 years due to replacements.</li>
        <li><strong>Maintenance:</strong> Flooded types need regular watering and equalization.</li>
      </ul>

      <h3 id="temperature-effects">Temperature effects</h3>
      <p>All batteries lose capacity in cold weather:</p>
      <ul>
        <li>At 0°C (32°F), expect 10-20% capacity reduction.</li>
        <li>At -10°C (14°F), expect 20-30% reduction.</li>
        <li>LiFePO4 should not be charged below 0°C without low-temp protection.</li>
        <li>Lead-acid can charge in cold but at reduced rates.</li>
      </ul>
      <p>Plan your battery sizing for winter conditions, not summer peaks.</p>

      <h3 id="sizing-your-battery">Sizing your battery</h3>
      <p>To size your battery bank:</p>
      <ol>
        <li>List critical loads and their wattage.</li>
        <li>Estimate hours of runtime needed (e.g., 8 hours overnight).</li>
        <li>Calculate: Watt-hours = Watts × Hours.</li>
        <li>Apply DoD factor: LiFePO4 divide by 0.85, Lead-acid divide by 0.5.</li>
        <li>Add 20% buffer for degradation and cold weather.</li>
      </ol>
      <p><strong>Example:</strong> 500W load × 8 hours = 4,000Wh. For LiFePO4: 4,000 ÷ 0.85 × 1.2 = ~5,650Wh battery needed.</p>
    `,
  },
];

export const paths: LearningPath[] = [
  {
    id: "p1",
    title: "Launch your first plan",
    summary: "Use the Solar Navigator, save a scenario, and share it for review.",
    difficulty: "Beginner",
    pillar: "Plan",
    durationMins: 35,
    outcome: "A saved Navigator run plus two next-step actions you can send to a helper.",
    steps: [
      { id: "p1s1", title: "Collect basics", description: "Grab photos of your roof or balcony and note your energy goal.", recommendedNextAction: "navigator" },
      { id: "p1s2", title: "Run Solar Navigator", description: "Complete the guided quiz and save the scenario.", recommendedNextAction: "navigator" },
      { id: "p1s3", title: "Pick a scenario", description: "Choose your preferred offset or backup option.", recommendedNextAction: "navigator" },
      { id: "p1s4", title: "Share for review", description: "Send your saved scenario link to a helper.", recommendedNextAction: "connect" },
      { id: "p1s5", title: "Create a workspace", description: "Start a Project Workspace to track documents and tasks.", recommendedNextAction: "projects" },
    ],
  },
  {
    id: "p2",
    title: "Coordinate a community install",
    summary: "Set up a workspace, assign roles, and prepare communication for neighbors.",
    difficulty: "Intermediate",
    pillar: "Coordinate",
    durationMins: 50,
    outcome: "A shared workspace with roles, timeline, and safety checkpoints.",
    steps: [
      { id: "p2s1", title: "Create a project workspace", description: "Set title, location, and invite your crew.", recommendedNextAction: "projects" },
      { id: "p2s2", title: "Define roles", description: "Add coordinator, safety lead, and reviewer.", recommendedNextAction: "projects" },
      { id: "p2s3", title: "Add docs", description: "Upload permits, single-line, and site photos.", recommendedNextAction: "projects" },
      { id: "p2s4", title: "Set communication cadence", description: "Post weekly updates and decisions.", recommendedNextAction: "connect" },
      { id: "p2s5", title: "Schedule safety review", description: "Ask for a peer review before build day.", recommendedNextAction: "connect" },
    ],
  },
  {
    id: "p3",
    title: "Keep your system healthy",
    summary: "Establish a maintenance rhythm and alerts.",
    difficulty: "Beginner",
    pillar: "Sustain",
    durationMins: 25,
    outcome: "A quarterly maintenance loop with alerts and helper contacts.",
    steps: [
      { id: "p3s1", title: "Set reminders", description: "Create quarterly tasks in your workspace.", recommendedNextAction: "projects" },
      { id: "p3s2", title: "Add a cleaning checklist", description: "Use the maintenance basics guide to define steps.", recommendedNextAction: "learn", optionalSlugOrProjectId: "maintenance-basics" },
      { id: "p3s3", title: "Configure alerts", description: "Set monitoring alerts for low production and battery voltage.", recommendedNextAction: "projects" },
      { id: "p3s4", title: "Save helper contacts", description: "Bookmark two helpers you trust for quick issues.", recommendedNextAction: "connect" },
      { id: "p3s5", title: "Log observations", description: "After each check, log notes and photos.", recommendedNextAction: "projects" },
    ],
  },
];

export const faqs: FAQ[] = [
  {
    id: "f1",
    question: "Do I need a south-facing roof for solar?",
    answer: "South is ideal, but east/west often works for small systems. Check shading and local regulations before installing.",
    relatedGuides: ["navigator-warmup"],
  },
  {
    id: "f2",
    question: "How do I know if my roof can handle panels?",
    answer: "Check structural health and consult a qualified professional. If you see sagging, leaks, or rot, pause and get an inspection.",
    relatedGuides: ["rooftop-safety-basics"],
  },
  {
    id: "f3",
    question: "Can I start with a balcony kit?",
    answer: "Yes, portable kits are a good starter. Keep expectations realistic and follow safety guidance for plugs and cords.",
    relatedGuides: ["navigator-warmup", "dc-electrical-safety"],
  },
  {
    id: "f4",
    question: "What about permits and interconnection?",
    answer: "Requirements vary by region. Check your local authority and utility rules before purchasing equipment.",
    relatedGuides: ["workspace-playbook"],
  },
  {
    id: "f5",
    question: "How do I clean panels safely?",
    answer: "Clean in cool hours with soft brushes and gentle water. Avoid high pressure and stop if you're unsure about footing.",
    relatedGuides: ["maintenance-basics", "rooftop-safety-basics"],
  },
  {
    id: "f6",
    question: "What runtime should I expect from backup?",
    answer: "Runtime depends on your critical load list and battery size. Use a buffer and avoid overloading inverters.",
    relatedGuides: ["backup-basics", "battery-chemistry-101"],
  },
  {
    id: "f7",
    question: "Can I work on DC wiring myself?",
    answer: "Only if trained and equipped. DC can arc; if unsure, stop and hire a qualified installer.",
    relatedGuides: ["dc-electrical-safety", "rooftop-safety-basics"],
  },
  {
    id: "f8",
    question: "How do I find a trusted helper?",
    answer: "Use the Connect page, review profiles, and ask for references. Prefer trained or certified volunteers for critical work.",
    relatedGuides: ["workspace-playbook"],
  },
  {
    id: "f9",
    question: "How often should I check my system?",
    answer: "Do a quick visual check monthly and a deeper review quarterly. Set reminders so it becomes routine.",
    relatedGuides: ["maintenance-basics", "troubleshooting-quickwalk"],
  },
  {
    id: "f10",
    question: "What if I see burn marks or smell smoke?",
    answer: "Stop immediately and isolate power if safe. Call a qualified installer and do not continue work until inspected.",
    relatedGuides: ["dc-electrical-safety", "troubleshooting-quickwalk"],
  },
];
