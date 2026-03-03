import React from "react";
import { motion } from "framer-motion";
import { GuideContent } from "../../data/learnContent";
import ResourceList from "./ResourceList";
import TableOfContents from "./TableOfContents";
import AnimatedButton from "./animated-button";

type GuideDetailLayoutProps = {
  guide: GuideContent;
};

const GuideDetailLayout: React.FC<GuideDetailLayoutProps> = ({ guide }) => {
  const nextActions: Record<string, { label: string; href: string; variant?: "primary" | "outline" }[]> = {
    "navigator-warmup": [
      { label: "Start Solar Navigator", href: "/solar-navigator" },
      { label: "Share with a helper", href: "/connect" },
    ],
    "workspace-playbook": [
      { label: "Open Project Workspaces", href: "/projects" },
      { label: "Invite collaborators", href: "/connect" },
    ],
    "maintenance-basics": [
      { label: "Set a quarterly reminder", href: "/projects" },
      { label: "Request a check", href: "/connect", variant: "outline" },
    ],
  };

  const actions = nextActions[guide.slug] || [
    { label: "Plan your solar journey", href: "/solar-navigator" },
    { label: "Browse helpers", href: "/connect" },
  ];

  const tocItems = guide.toc.map((item) => ({ id: item.toLowerCase().replace(/\s+/g, "-"), label: item }));

  // Persist the last guide viewed to surface a subtle "continue" breadcrumb.
  React.useEffect(() => {
    localStorage.setItem("solara:learn:last-guide", guide.slug);
  }, [guide.slug]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="halo-ring overflow-hidden rounded-[28px] card-surface"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(0,123,255,0.16),transparent_36%),radial-gradient(circle_at_86%_12%,rgba(212,175,55,0.12),transparent_32%)]" />
        <div className="space-y-3 p-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8e3ff]">
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1">{guide.format}</span>
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1">{guide.difficulty}</span>
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1">{guide.pillar}</span>
            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1">{guide.durationMins} min</span>
          </div>
          <h1 className="text-3xl font-semibold text-white">{guide.title}</h1>
          <p className="text-white/80">{guide.summary}</p>
          <div className="flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <AnimatedButton variant="outline" href="/learn" className="px-4 py-2">
              Back to Learn
            </AnimatedButton>
            <AnimatedButton href="#resources" className="px-4 py-2">
              Jump to resources
            </AnimatedButton>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="glass-ring space-y-4 rounded-[24px] card-surface p-6 prose prose-slate prose-sm max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
          <div className="space-y-2 rounded-2xl bg-white/70 p-3 text-slate-800 shadow-sm backdrop-blur dark:bg-white/5 dark:text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Key takeaways</p>
            <ul className="space-y-1">
              {guide.takeaways.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#0f62c7]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="resources" className="pt-2">
            <ResourceList resources={guide.resources} />
          </div>
        </article>
        <aside className="space-y-4">
          <TableOfContents items={tocItems} />
          <div className="glass-ring space-y-3 rounded-2xl card-surface p-4 text-slate-900 dark:text-white">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-solara-navy dark:text-indigo-200">Do this next on Solara</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200">Turn learning into action with a next step inside the product.</p>
            <div className="flex flex-col gap-2">
              {actions.map((action) => (
                <AnimatedButton key={action.label} href={action.href} variant={action.variant} className="w-full justify-center px-4 py-2">
                  {action.label}
                </AnimatedButton>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default GuideDetailLayout;
