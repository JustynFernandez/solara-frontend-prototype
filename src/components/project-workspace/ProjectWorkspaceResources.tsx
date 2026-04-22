import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";
import AnimatedButton from "@/components/ui/animated-button";
import ResourceList from "@/components/ui/ResourceList";
import TrustSafetyStrip from "@/components/connect/TrustSafetyStrip";
import { guides } from "@/data/learnContent";
import { resolveGuideTitle } from "@/lib/solaraApi";
import type { ProjectWorkspaceResourcesModalProps, ProjectWorkspaceResourcesProps } from "./types";

const ProjectWorkspaceResources: React.FC<ProjectWorkspaceResourcesProps> = ({
  project,
  projectResources,
  recommendedGuides,
  onOpenResourceCenter,
  onAddGuideToProject,
  onAddGuideToTasks,
  onTogglePin,
}) => (
  <section className="space-y-4 rounded-[20px] card-surface p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Resources</h3>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-solara-navy dark:text-emerald-200">
        Guides and safety
        <AnimatedButton variant="outline" onClick={onOpenResourceCenter} className="px-3 py-1.5 text-[11px]">
          Open drawer
        </AnimatedButton>
      </div>
    </div>
    <TrustSafetyStrip />
    <div className="space-y-3 rounded-2xl border border-white/20 bg-white/70 p-4 text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <BookOpen className="h-4 w-4 text-[#ffd700]" />
        Recommended guides
      </div>
      <div className="flex flex-wrap gap-2">
        {recommendedGuides.map((guide) => (
          <div key={guide.slug} className="flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm dark:border-white/15 dark:bg-white/10 dark:text-white">
            {guide.title}
            <button
              type="button"
              onClick={() => onAddGuideToProject(guide.slug)}
              className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:border-white/15 dark:bg-white/10 dark:text-white"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
            <button
              type="button"
              onClick={() => onAddGuideToTasks(guide.slug)}
              className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007bff] dark:border-white/15 dark:bg-white/10 dark:text-white"
            >
              Add to tasks
            </button>
          </div>
        ))}
      </div>
    </div>

    {projectResources.guideSlugs.length > 0 && (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Saved resources</h4>
        <ResourceList
          resources={projectResources.guideSlugs.map((slug) => {
            const title = resolveGuideTitle(slug, project);
            return {
              type: "link",
              title,
              url: `/learn/${slug}?projectId=${project.id}`,
            };
          })}
        />
      </div>
    )}
    {projectResources.pinned?.length ? (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Pinned</h4>
        <div className="flex flex-wrap gap-2">
          {projectResources.pinned.map((slug) => {
            return (
              <button
                key={slug}
                type="button"
                onClick={() => onTogglePin(slug)}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
              >
                {resolveGuideTitle(slug, project)}
                <span className="text-[10px] uppercase tracking-[0.14em] text-slate-200">Unpin</span>
              </button>
            );
          })}
        </div>
      </div>
    ) : null}
  </section>
);

export const ProjectWorkspaceResourcesModal: React.FC<ProjectWorkspaceResourcesModalProps> = ({
  open,
  onClose,
  resourceSearch,
  onResourceSearchChange,
  searchableGuides,
  recommendedGuides,
  project,
  projectResources,
  onAddGuideToProject,
  onAddGuideToTasks,
  onTogglePin,
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 py-10 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          onClick={(event) => event.stopPropagation()}
          initial={{ y: 24, scale: 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ y: 16, scale: 0.98, opacity: 0, transition: { duration: 0.2 } }}
          className="relative grid h-[85vh] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[28px] border border-white/18 bg-gradient-to-br from-[#0b162e]/96 via-[#0c2344]/94 to-[#0a1c38]/94 shadow-[0_28px_110px_rgba(0,0,0,0.65)] backdrop-blur-2xl lg:grid-cols-[0.4fr_0.6fr]"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
          >
            Close
          </button>
          <div className="flex min-h-0 flex-col gap-4 overflow-y-auto border-b border-white/10 bg-white/5 p-4 text-white lg:border-b-0 lg:border-r">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-200">Search resources</p>
              <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-2">
                <input
                  value={resourceSearch}
                  onChange={(event) => onResourceSearchChange(event.target.value)}
                  placeholder="Search by title or tag"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-200">Recommended</p>
              <div className="space-y-2">
                {recommendedGuides.map((guide) => (
                  <div key={guide.slug} className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm">
                    <div className="space-y-1">
                      <p className="font-semibold">{guide.title}</p>
                      <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-slate-300">
                        {guide.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => onAddGuideToProject(guide.slug)}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => onAddGuideToTasks(guide.slug)}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
                      >
                        Add to tasks
                      </button>
                      <button
                        type="button"
                        onClick={() => onTogglePin(guide.slug)}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
                      >
                        {projectResources.pinned?.includes(guide.slug) ? "Unpin" : "Pin"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {projectResources.pinned?.length ? (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-200">Pinned</p>
                <div className="flex flex-wrap gap-2">
                  {projectResources.pinned.map((slug) => {
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => onTogglePin(slug)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
                      >
                        {resolveGuideTitle(slug, project)}
                        <span className="text-[10px] uppercase tracking-[0.14em] text-slate-200">Unpin</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex min-h-0 flex-col gap-3 overflow-y-auto bg-white/3 p-4 text-white">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-200">{searchableGuides.length} guides</p>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                Resource drawer
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {searchableGuides.map((guide) => (
                <div key={guide.slug} className="space-y-2 rounded-2xl border border-white/15 bg-white/5 p-3 text-sm shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
                  <div className="space-y-1">
                    <p className="font-semibold">{guide.title}</p>
                    <p className="line-clamp-2 text-xs text-slate-200">{guide.summary || ""}</p>
                    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-slate-300">
                      {guide.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <AnimatedButton href={`/learn/${guide.slug}?projectId=${project.id}`} className="px-3 py-2">
                      Open
                    </AnimatedButton>
                    <button
                      type="button"
                      onClick={() => onAddGuideToProject(guide.slug)}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-2 font-semibold text-white hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddGuideToTasks(guide.slug)}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-2 font-semibold text-white hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
                    >
                      Add to tasks
                    </button>
                    <button
                      type="button"
                      onClick={() => onTogglePin(guide.slug)}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-2 font-semibold text-white hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f62c7]"
                    >
                      {projectResources.pinned?.includes(guide.slug) ? "Unpin" : "Pin"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ProjectWorkspaceResources;
