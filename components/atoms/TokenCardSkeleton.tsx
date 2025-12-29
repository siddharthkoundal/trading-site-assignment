import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/cn";

interface TokenCardSkeletonProps {
  className?: string;
}

/**
 * Skeleton loader for token cards
 * Provides visual feedback during loading states
 */
export const TokenCardSkeleton: React.FC<TokenCardSkeletonProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-gray-900/50 border border-gray-800 rounded-lg p-3 animate-pulse",
        className
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-3 w-12 ml-auto" />
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};

TokenCardSkeleton.displayName = "TokenCardSkeleton";
