import React from "react";
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonBadge, SkeletonButton } from "../ui/Skeleton";

const SkeletonHelperCard: React.FC = () => (
  <div className="flex h-full flex-col gap-3 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-md backdrop-blur dark:border-white/10 dark:bg-[#050a16]/85">
    {/* Header: Avatar, name, rating */}
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <SkeletonBadge className="w-16" />
    </div>

    {/* Meta badges row */}
    <div className="flex flex-wrap gap-2">
      <SkeletonBadge className="w-20" />
      <SkeletonBadge className="w-24" />
      <SkeletonBadge className="w-16" />
      <SkeletonBadge className="w-18" />
    </div>

    {/* Bio text */}
    <div className="space-y-2">
      <SkeletonText lines={2} />
    </div>

    {/* Skills */}
    <div className="flex flex-wrap gap-2">
      <SkeletonBadge className="w-16" />
      <SkeletonBadge className="w-20" />
      <SkeletonBadge className="w-14" />
      <SkeletonBadge className="w-18" />
    </div>

    {/* Action buttons */}
    <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
      <SkeletonButton className="w-24" />
      <SkeletonButton className="w-32" />
      <SkeletonButton className="w-20" />
    </div>
  </div>
);

export default SkeletonHelperCard;
