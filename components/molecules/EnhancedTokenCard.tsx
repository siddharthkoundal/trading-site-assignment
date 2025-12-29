"use client";
import { memo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { PriceDisplay } from "../atoms/PriceDisplay";
import { StatBadge } from "../atoms/StatBadge";
import { VerifiedBadge } from "../atoms/VerifiedBadge";
import { TokenInfoPopover } from "./TokenInfoPopover";
import type { Token, TokenColumn } from "@/types/token";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";

/**
 * Enhanced token card with real-time updates and interactions (Molecular)
 * Optimized with memo and real-time price updates
 */

interface EnhancedTokenCardProps {
  token: Token;
  column: TokenColumn;
  onClick?: () => void;
}

export const EnhancedTokenCard = memo(function EnhancedTokenCard({
  token,
  column,
  onClick,
}: EnhancedTokenCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isConnected } = useRealTimePrice(token.id, column);

  // Helper to render badge icon from identifier
  function renderBadgeIcon(icon: string) {
    switch (icon) {
      case "star":
        return <span>⭐</span>;
      case "fire":
        return <span>🔥</span>;
      case "trophy":
        return <span>🏆</span>;
      case "eye":
        return <span>👁️</span>;
      case "vip":
        return <span>💎</span>;
      default:
        return null;
    }
  }

  const mainStat = token.stats[0];
  const isPositive = mainStat?.isPositive ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative rounded-lg border border-gray-800 bg-linear-to-br from-gray-900/80 to-gray-900/50 p-3 h-[142px] min-h-[142px] sm:h-[116px] sm:min-h-[116px] md:h-[142px] md:min-h-[142px] lg:h-[142px] lg:min-h-[142px] xl:h-[116px] xl:min-h-[116px]",
        "cursor-pointer transition-all duration-200",
        "hover:border-gray-700 hover:shadow-lg hover:shadow-blue-500/10",
        isHovered && "ring-1 ring-blue-500/20"
      )}
      style={{
        borderLeftWidth: "3px",
      }}
    >
      {/* Live indicator */}
      {isConnected && (
        <div className="absolute top-2 right-2 z-10">
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="size-2 rounded-full bg-green-500"
            />
            <span className="text-[10px] text-green-400 uppercase tracking-wider">
              Live
            </span>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 h-full">
        {/* Token Avatar */}
        <div className="relative flex-shrink-0 pt-1">
          <Image
            src={token.image}
            alt={token.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover ring-2 ring-gray-800"
            unoptimized
          />
          {token.verified && (
            <div className="absolute -bottom-1 -right-1">
              <VerifiedBadge verified={token.verified} />
            </div>
          )}
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate leading-tight text-base">
                  {token.name}
                </h3>
                <TokenInfoPopover token={token} />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                <span className="font-mono">{token.ticker}</span>
                <span>•</span>
                <span>{token.timeframe}</span>
              </div>
            </div>
            <div className="flex-shrink-0 pt-0.5">
              {isPositive ? (
                <TrendingUp className="size-5 text-green-400" />
              ) : (
                <TrendingDown className="size-5 text-red-400" />
              )}
            </div>
          </div>

          {/* Price & Market Cap */}
          <div className="flex items-end justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <PriceDisplay
                price={token.price}
                lastUpdate={token.lastUpdate}
                className="text-lg"
              />
              {mainStat && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive ? "text-green-400" : "text-red-400"
                  )}
                >
                  {mainStat.value}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
              MC: {token.marketCap}
            </div>
          </div>

          {/* Stats Grid */}
          {token.stats.length > 1 && (
            <div className="grid grid-cols-4 gap-1 pt-2 border-t border-gray-800 mt-2">
              {token.stats.slice(0, 4).map((stat, idx) => (
                <StatBadge key={idx} stat={stat} />
              ))}
            </div>
          )}

          {/* Badges */}
          {token.badges && token.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {token.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 rounded-full bg-gray-800/50 px-2 py-0.5 text-xs text-gray-300"
                >
                  {renderBadgeIcon(badge.icon)}
                  <span>{badge.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover overlay effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        className="absolute inset-0 rounded-lg bg-blue-500 pointer-events-none"
      />
    </motion.div>
  );
});
