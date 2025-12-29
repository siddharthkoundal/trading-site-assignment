import { memo } from "react";
import { Shimmer } from "../atoms/Shimmer";

/**
 * Token card skeleton loader (Molecular)
 * Displays loading state with shimmer effect
 */

export const TokenCardSkeleton = memo(function TokenCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
      <div className="flex items-start gap-3">
        {/* Avatar skeleton */}
        <Shimmer className="size-12 rounded-full flex-shrink-0" />

        <div className="flex-1 space-y-3">
          {/* Header skeleton */}
          <div className="space-y-2">
            <Shimmer width="w-32" height="h-5" />
            <Shimmer width="w-20" height="h-4" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <Shimmer width="w-8" height="h-3" />
                <Shimmer width="w-12" height="h-4" />
              </div>
            ))}
          </div>

          {/* Badges skeleton */}
          <div className="flex gap-2">
            <Shimmer width="w-16" height="h-6" className="rounded-full" />
            <Shimmer width="w-16" height="h-6" className="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
});
