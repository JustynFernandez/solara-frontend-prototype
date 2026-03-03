import React, { Suspense, lazy } from "react";
import { MapPin } from "lucide-react";
import { Skeleton } from "./Skeleton";
import type { Project } from "../../data/projects";

const ProjectMap = lazy(() => import("./ProjectMap"));

type ProjectMapLazyProps = {
  projects: Project[];
  onSelect: (id: string) => void;
};

const MapSkeleton: React.FC = () => (
  <div className="relative overflow-hidden rounded-[28px] card-surface p-3">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(14,207,138,0.08),transparent_36%),radial-gradient(circle_at_80%_12%,rgba(28,181,224,0.08),transparent_32%)]" />
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-white/20 shadow-lg dark:border-white/10">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-300/50 dark:bg-slate-600/50">
          <MapPin className="h-6 w-6 text-slate-400 dark:text-slate-500" />
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading map...
        </p>
      </div>
      {/* Fake pin placeholders */}
      <div className="absolute left-[30%] top-[40%] h-8 w-8 rounded-full bg-emerald-400/30 blur-sm" />
      <div className="absolute left-[55%] top-[35%] h-8 w-8 rounded-full bg-blue-400/30 blur-sm" />
      <div className="absolute left-[70%] top-[55%] h-8 w-8 rounded-full bg-amber-400/30 blur-sm" />
    </div>
  </div>
);

const ProjectMapLazy: React.FC<ProjectMapLazyProps> = (props) => (
  <Suspense fallback={<MapSkeleton />}>
    <ProjectMap {...props} />
  </Suspense>
);

export default ProjectMapLazy;
