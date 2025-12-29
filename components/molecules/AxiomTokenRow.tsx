"use client";

import React, { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy, Search, Instagram, Globe, TrendingUp, Trophy, Crown, Users, ChefHat, Target, Ghost, Box, BarChart3 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTokenWebSocket } from "@/hooks/useTokenWebSocket";
import { useAppSelector } from "@/store/hooks";
import type { Token } from "../../mocks/mockTokens";
import type { TokenColumn } from "@/types/token";

interface AxiomTokenRowProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
  column?: TokenColumn;
  isPriority?: boolean; // For LCP optimization - first few visible images
}

/**
 * Pixel-perfect Axiom Trade token row component
 * Matches design with ≤2px accuracy
 */
export const AxiomTokenRow = memo(function AxiomTokenRow({
  token,
  onTokenClick,
  column = "newPairs",
  isPriority = false,
}: AxiomTokenRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get live token data from Redux (updated by WebSocket)
  const liveToken = useAppSelector((state) => {
    const tokens = state.tokens[column].tokens;
    return tokens.find((t) => t.id === token.id) || token;
  });

  // HFT-style real-time WebSocket updates
  const { isConnected, priceChange } = useTokenWebSocket(
    token.id,
    column,
    token.marketCap
  );

  // Use live data if available, fallback to initial token data
  const displayToken = {
    ...token,
    marketCap: (liveToken as any).marketCap || token.marketCap,
    volume: (liveToken as any).volume || token.volume,
    fee: (liveToken as any).fee || token.fee,
    txCount: (liveToken as any).txCount || token.txCount,
  };

  const handleClick = () => {
    onTokenClick?.(token);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Parse market cap for display
  const marketCapValue = token.marketCap.replace(/[^0-9.]/g, "");
  const volumeValue = token.volume.replace(/[^0-9.]/g, "");

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative flex items-start w-full border-b border-[rgba(255,255,255,0.05)]",
          "cursor-pointer transition-colors duration-75 ease-linear",
          "hover:bg-[rgba(255,255,255,0.03)]",
          "h-[100px] sm:h-[116px]"
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Section: Avatar & Address */}
        <div className="flex flex-col items-center gap-0.5 sm:gap-1 shrink-0 pl-2 sm:pl-3 pt-2 sm:pt-3">
          <div className="relative w-[56px] h-[56px] sm:w-[74px] sm:h-[74px]" style={{ aspectRatio: "1 / 1" }}>
            {/* Animated border */}
            <div className="absolute inset-0 rounded-[4px]">
              <svg
                width="56"
                height="56"
                viewBox="0 0 74 74"
                className="absolute inset-0 w-full h-full sm:w-[74px] sm:h-[74px]"
              >
                <rect
                  x="1"
                  y="1"
                  width="72"
                  height="72"
                  rx="3"
                  fill="none"
                  stroke="rgba(255,107,53,0.4)"
                  strokeWidth="1"
                />
                <rect
                  x="1"
                  y="1"
                  width="72"
                  height="72"
                  rx="3"
                  fill="none"
                  stroke="#ff6b35"
                  strokeWidth="1"
                  strokeDasharray="296"
                  strokeDashoffset={isHovered ? "0" : "296"}
                  className="transition-all duration-300 ease-in-out"
                />
              </svg>
            </div>

            {/* Image container with pump badge */}
            <div className="absolute inset-[3px] rounded-[1px] overflow-hidden bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)]">
              <div className="relative w-full h-full">
                <Image
                  src={token.image}
                  alt={token.name}
                  fill
                  sizes="(max-width: 640px) 56px, 74px"
                  className="object-cover"
                  loading={isPriority ? "eager" : "lazy"}
                  quality={75}
                  priority={isPriority}
                />
                {/* Hover overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Pump badge */}
            <div className="absolute -bottom-1 -right-1 z-10 bg-[#ff6b35] p-[2px] rounded-full" role="img" aria-label="Pump.fun token">
              <div className="bg-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                <Image
                  src="https://axiom.trade/images/pump.svg"
                  alt=""
                  width={10}
                  height={10}
                  className="object-contain"
                  unoptimized
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(token.shortName);
            }}
            className="text-[10px] sm:text-[12px] text-[#9ca3af] font-medium hover:text-[#52c5ff] transition-colors duration-125 max-w-[56px] sm:max-w-[74px] text-center"
            aria-label={`Copy address ${token.shortName}`}
          >
            {token.shortName}
          </button>
        </div>

        {/* Middle Section: Name, Stats, Icons, Badges */}
        <div className="flex-1 flex flex-col justify-start pt-2 sm:pt-3 pb-2 sm:pb-3 pl-1.5 sm:pl-3 pr-1.5 sm:pr-3 min-w-0">
          {/* Name Row */}
          <div className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2 min-w-0">
            <div className="text-[14px] sm:text-[16px] text-white font-medium tracking-[-0.02em] truncate max-w-[80px] sm:max-w-[120px]">
              {token.name.toUpperCase()}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(token.fullName);
              }}
              className="flex items-center gap-0.5 sm:gap-1 text-[12px] sm:text-[14px] lg:text-[16px] text-[#9ca3af] font-medium tracking-[-0.02em] hover:text-[#52c5ff] transition-colors duration-125 min-w-0 overflow-hidden"
              aria-label={`Copy full name ${token.fullName}`}
            >
              <span className="truncate max-w-[60px] sm:max-w-none">{token.fullName}</span>
              <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>

          {/* Stats Row: Time + Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 mb-1 sm:mb-2">
            {/* Time indicator - green when connected, shows live status */}
            <span
              className={cn(
                "text-[10px] sm:text-[11px] lg:text-[12px] font-medium transition-colors duration-200",
                isConnected && "text-[#22c55e]",
                !isConnected && "text-[#6b7280]"
              )}
            >
              {token.time}
            </span>

            {/* Social/Utility Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={token.xLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                    aria-label={`View ${token.name} on Twitter/X`}
                  >
                    <Instagram className="w-full h-full text-[#E4405F]" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Twitter/X</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Pump.fun</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={token.searchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                    aria-label={`Search for ${token.name}`}
                  >
                    <Search className="w-full h-full text-[#6b7280]" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>

              <div className="w-px h-2.5 sm:h-3 bg-[rgba(255,255,255,0.1)]" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#6b7280]" />
                    <span className="text-[10px] sm:text-[11px] lg:text-[12px] text-white font-medium">
                      {token.groupCount}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Group Count</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#6b7280]" />
                    <span className="text-[12px] text-white font-medium">
                      {token.proTraderCount}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Pro Traders</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#6b7280]" />
                    <span className="text-[12px] text-white font-medium">
                      {token.trophyCount}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Trophy Count</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#6b7280]" />
                    <span className="text-[12px] text-white font-medium">
                      {token.vipCount}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>VIP Count</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Badges Row */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {/* Person with star badge */}
            <div className="flex items-center gap-0.5 sm:gap-1 h-[16px] sm:h-[18px] px-1 sm:px-1.5 rounded-sm bg-[#111c14] border border-[rgba(34,197,94,0.3)]">
              <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#22c55e]" />
              <span className="text-[9px] sm:text-[10px] text-[#22c55e] font-medium">0%</span>
            </div>

            {/* Chef hat badge with split design */}
            <div className="flex items-center h-[16px] sm:h-[18px] rounded-sm border border-[rgba(255,255,255,0.1)] bg-[#161616]">
              <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 border-r border-[rgba(255,255,255,0.1)]">
                <ChefHat className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#22c55e]" />
                <span className="text-[9px] sm:text-[10px] text-[#22c55e] font-medium">0%</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 bg-[rgba(26,30,46,0.5)]">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[rgba(59,130,246,0.2)] flex items-center justify-center">
                  <TrendingUp className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-[#3b82f6]" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#3b82f6] font-medium">2mo</span>
              </div>
            </div>

            {/* Target badge */}
            <div className="flex items-center gap-0.5 sm:gap-1 h-[16px] sm:h-[18px] px-1 sm:px-1.5 rounded-sm bg-[#111c14] border border-[rgba(34,197,94,0.3)]">
              <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#22c55e]" />
              <span className="text-[9px] sm:text-[10px] text-[#22c55e] font-medium">0%</span>
            </div>

            {/* Ghost badge */}
            <div className="flex items-center gap-0.5 sm:gap-1 h-[16px] sm:h-[18px] px-1 sm:px-1.5 rounded-sm bg-[#111c14] border border-[rgba(34,197,94,0.3)]">
              <Ghost className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#22c55e]" />
              <span className="text-[9px] sm:text-[10px] text-[#22c55e] font-medium">0%</span>
            </div>

            {/* Box badge */}
            <div className="flex items-center gap-0.5 sm:gap-1 h-[16px] sm:h-[18px] px-1 sm:px-1.5 rounded-sm bg-[#111c14] border border-[rgba(34,197,94,0.3)]">
              <Box className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#22c55e]" />
              <span className="text-[9px] sm:text-[10px] text-[#22c55e] font-medium">0%</span>
            </div>
          </div>
        </div>

        {/* Right Section: Market Data */}
        <div className="flex flex-col items-end justify-start gap-0.5 pr-2 sm:pr-3 lg:pr-4 pt-2 sm:pt-3 lg:pt-4 shrink-0">
          {/* Market Cap */}
          <div className="relative">
            <div
              className="absolute z-0"
              style={{ inset: "-12px -8px 1px -4px" }}
            >
              <div
                className={cn(
                  "absolute inset-0 z-10 transition-opacity duration-75",
                  isHovered ? "opacity-100 bg-[rgba(255,255,255,0.03)]" : "opacity-0"
                )}
              />
              <div className="bg-[#0a0a0a] absolute inset-0 z-0" />
            </div>
            <div className="relative flex flex-row gap-1 sm:gap-2 justify-end items-end z-20">
              <div className="flex flex-row h-[16px] sm:h-[18px] gap-0.5 sm:gap-1 justify-end items-end">
                <span className="text-[#6b7280] text-[10px] sm:text-[11px] lg:text-[12px] font-medium pb-[1px] sm:pb-[1.6px]">
                  MC
                </span>
                <span
                  className={cn(
                    "text-[13px] sm:text-[14px] lg:text-[16px] font-medium transition-colors duration-200",
                    priceChange === "up" && "text-[#22c55e]",
                    priceChange === "down" && "text-[#ef4444]",
                    !priceChange && "text-[#52c5ff]"
                  )}
                >
                  {displayToken.marketCap}
                </span>
              </div>
            </div>
          </div>

          {/* Volume */}
          <div className="relative">
            <div
              className="absolute z-0"
              style={{ inset: "-12px -8px 1px -4px" }}
            >
              <div
                className={cn(
                  "absolute inset-0 z-10 transition-opacity duration-75",
                  isHovered ? "opacity-100 bg-[rgba(255,255,255,0.03)]" : "opacity-0"
                )}
              />
              <div className="bg-[#0a0a0a] absolute inset-0 z-0" />
            </div>
            <div className="relative flex flex-row gap-1 sm:gap-2 justify-start items-start z-20">
              <div className="flex flex-row h-[16px] sm:h-[18px] flex-1 gap-0.5 sm:gap-1 justify-end items-end">
                <span className="text-[#6b7280] text-[10px] sm:text-[11px] lg:text-[12px] font-medium pb-[1px] sm:pb-[1.6px] flex justify-center items-center">
                  V
                </span>
                <span className="text-[13px] sm:text-[14px] lg:text-[16px] font-medium text-white">
                  {displayToken.volume}
                </span>
              </div>
            </div>
          </div>

          {/* Fee & TX Count */}
          <div className="relative flex flex-row gap-1 sm:gap-2 justify-start items-start -mt-0.5">
            <div
              className="absolute z-0"
              style={{ inset: "-2px -8px -4px -4px" }}
            >
              <div
                className={cn(
                  "absolute inset-0 z-5 transition-opacity duration-75",
                  isHovered ? "opacity-100 bg-[rgba(255,255,255,0.03)]" : "opacity-0"
                )}
              />
              <div className="bg-[#0a0a0a] absolute inset-0 z-0" />
            </div>
            <div className="relative flex flex-row justify-end items-center h-2.5 sm:h-3 gap-0.5 sm:gap-1 shrink-0 z-20">
              <span className="text-[#6b7280] text-[9px] sm:text-[10px] lg:text-[11px] font-medium">F</span>
              <div className="flex flex-row gap-0.5 items-center">
                {/* SOL Logo */}
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center overflow-hidden" role="img" aria-label="Solana">
                  <Image
                    src="/images/sol-fill.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="w-full h-full object-contain sm:w-[14px] sm:h-[14px]"
                    unoptimized
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-[7px] sm:text-[8px] text-white font-bold">S</span>';
                      }
                    }}
                  />
                </div>
                <span className="text-white text-[10px] sm:text-[11px] lg:text-[12px] font-medium">
                  {displayToken.fee}
                </span>
              </div>
            </div>
            <div className="relative flex flex-row justify-end items-center h-2.5 sm:h-3 gap-0.5 sm:gap-1 shrink-0 z-20">
              <span className="text-[#6b7280] text-[9px] sm:text-[10px] lg:text-[11px] font-medium">
                TX{" "}
                <span className="text-white text-[9px] sm:text-[10px] lg:text-[11px] font-medium">
                  {displayToken.txCount}
                </span>
              </span>
              {/* Progress bar */}
              <div className="flex flex-row flex-1 min-w-4 sm:min-w-6 max-w-4 sm:max-w-6 h-0.5 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#22c55e]"
                  style={{ width: "50%" }}
                />
                <div
                  className="h-full bg-[#ef4444]"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
});

