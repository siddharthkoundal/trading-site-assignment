import React, { useState } from "react";
import { motion } from "framer-motion";
import { TokenAvatar } from "../atoms/TokenAvatar";
import { AnimatedPrice } from "../atoms/AnimatedPrice";
import { TokenStat } from "../atoms/TokenStat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import { usePriceAnimation } from "@/hooks/usePriceAnimation";
import type { Token } from "@/types/token";

interface TokenCardProps {
  token: Token;
  onClick?: (token: Token) => void;
  className?: string;
}

/**
 * Main token card component with all interactions
 * Features: hover effects, tooltips, price animations
 * Optimized with React.memo and proper event handlers
 */
export const TokenCard = React.memo<TokenCardProps>(
  ({ token, onClick, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    const priceAnimation = usePriceAnimation(token.price);

    const handleClick = () => {
      onClick?.(token);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <motion.div
        className={cn(
          "bg-gray-900/50 border border-gray-800 rounded-lg p-3 cursor-pointer",
          "transition-all duration-200",
          "hover:border-gray-700 hover:shadow-lg hover:shadow-black/20",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -2 }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${token.name}`}
      >
        {/* Header Section */}
        <div className="flex items-start gap-3 mb-3">
          <TokenAvatar
            src={token.image}
            alt={token.name}
            accentColor={token.accentColor}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-white truncate hover:text-blue-400 transition-colors">
                      {token.name}
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{token.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {token.verified && (
                <motion.svg
                  className="w-3 h-3 text-blue-400 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </motion.svg>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">{token.ticker}</span>
              <span className="text-blue-400">MC</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-green-400">{token.marketCap}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Market Capitalization</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="text-right">
            <div className="text-gray-400 text-xs mb-1">{token.timeframe}</div>
            <AnimatedPrice value={token.price} changeType={priceAnimation} />
          </div>
        </div>

        {/* Badges Section */}
        {token.badges && token.badges.length > 0 && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {token.badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded"
              >
                {badge.icon}
                <span>{badge.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="flex items-center gap-4 flex-wrap">
          {token.stats.map((stat, index) => (
            <TokenStat key={`${token.id}-stat-${index}`} stat={stat} />
          ))}
        </div>

        {/* Hover indicator */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 border-2 border-blue-500/30 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for optimization
    return (
      prevProps.token.id === nextProps.token.id &&
      prevProps.token.price === nextProps.token.price &&
      prevProps.token.lastUpdate === nextProps.token.lastUpdate
    );
  }
);

TokenCard.displayName = "TokenCard";
