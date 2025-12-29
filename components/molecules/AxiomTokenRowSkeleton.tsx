"use client";

import React, { memo } from "react";
import { Shimmer } from "../atoms/Shimmer";
import { cn } from "@/utils/cn";

/**
 * Skeleton loader for Axiom Token Row
 * Matches exact dimensions and layout
 */
export const AxiomTokenRowSkeleton = memo(function AxiomTokenRowSkeleton() {
  return (
    <div
      className={cn(
        "relative flex items-start w-full border-b border-[rgba(255,255,255,0.05)]",
        "min-h-[100px] sm:min-h-[116px] h-[100px] sm:h-[116px]"
      )}
    >
      {/* Left Section: Avatar */}
      <div className="flex flex-col items-center gap-1 shrink-0 pl-3 pt-3">
        <div className="relative w-[74px] h-[74px]">
          <Shimmer className="w-full h-full rounded-[4px]" />
        </div>
        <Shimmer className="w-[74px] h-3 rounded" />
      </div>

      {/* Middle Section */}
      <div className="flex-1 flex flex-col justify-start pt-3 pb-3 pl-3 pr-3 min-w-0 gap-2">
        {/* Name Row */}
        <div className="flex items-center gap-1">
          <Shimmer className="w-24 h-4 rounded" />
          <Shimmer className="w-32 h-4 rounded" />
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3">
          <Shimmer className="w-8 h-3 rounded" />
          <div className="flex items-center gap-2.5">
            {[...Array(7)].map((_, i) => (
              <Shimmer key={i} className="w-3.5 h-3.5 rounded" />
            ))}
          </div>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Shimmer key={i} className="w-16 h-[18px] rounded-sm" />
          ))}
        </div>
      </div>

      {/* Right Section: Market Data */}
      <div className="flex flex-col items-end justify-start gap-0.5 pr-4 pt-4 shrink-0">
        <Shimmer className="w-20 h-4 rounded" />
        <Shimmer className="w-16 h-4 rounded" />
        <Shimmer className="w-24 h-3 rounded" />
      </div>
    </div>
  );
});

