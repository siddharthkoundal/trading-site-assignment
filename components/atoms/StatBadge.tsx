import { memo } from "react";
import { cn } from "@/utils/cn";
import type { TokenStat } from "@/types/token";

/**
 * Stat badge component for displaying token statistics (Atomic)
 */

interface StatBadgeProps {
  stat: TokenStat;
  className?: string;
}

export const StatBadge = memo(function StatBadge({
  stat,
  className,
}: StatBadgeProps) {
  const isChange = stat.change !== undefined;
  const colorClass = isChange
    ? stat.isPositive
      ? "text-green-400"
      : "text-red-400"
    : "text-gray-400";

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">
        {stat.label}
      </span>
      <span className={cn("text-xs font-medium", colorClass)}>
        {stat.value}
      </span>
    </div>
  );
});
