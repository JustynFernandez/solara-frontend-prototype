import React from "react";
import { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonText } from "../ui/Skeleton";

const SkeletonHelperRow: React.FC = () => (
  <div className="solara-helper-row">
    <div className="solara-helper-row__identity">
      <SkeletonAvatar size="lg" />
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-40" />
        <SkeletonText lines={1} />
      </div>
    </div>
    <div className="solara-helper-row__meta">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <div className="solara-helper-row__support">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
    <div className="solara-helper-row__actions">
      <SkeletonButton className="w-24" />
      <SkeletonButton className="w-32" />
      <SkeletonButton className="w-20" />
    </div>
  </div>
);

export default SkeletonHelperRow;
