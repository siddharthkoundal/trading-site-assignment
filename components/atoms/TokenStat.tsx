import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/utils/cn";
import type { TokenStat as TokenStatType } from "@/types/token";

interface TokenStatProps {
  stat: TokenStatType;
  className?: string;
}

/**
 * Individual token statistic display with trend indicator
 * Memoized for performance optimization
 */
export const TokenStat = React.memo<TokenStatProps>(({ stat, className }) => {
  const Icon =
    stat.isPositive === true
      ? TrendingUp
      : stat.isPositive === false
      ? TrendingDown
      : null;

  const valueColorClass =
    stat.isPositive === true
      ? "text-green-400"
      : stat.isPositive === false
      ? "text-red-400"
      : "text-gray-300";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Icon && <Icon className="w-3 h-3" />}
      <span className="text-xs text-gray-400">{stat.label}</span>
      <span className={cn("text-xs", valueColorClass)}>{stat.value}</span>
    </div>
  );
});

TokenStat.displayName = "TokenStat";
