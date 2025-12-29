"use client";

import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { 
  Copy, 
  Search, 
  User, 
  Settings2, 
  Trophy, 
  Crown, 
  Instagram, 
  Globe, 
  Zap, 
  ChefHat, 
  Target, 
  Ghost, 
  Box 
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useRealTimePrice } from "@/hooks/useRealTimePrice";
import type { Token, TokenColumn } from "@/types/token";

// --- Optimized Sub-Components ---

/**
 * PriceDisplay
 * Isolated component to handle price flashes without re-rendering the parent card.
 * Uses standard CSS classes for color transitions (green/red).
 */
const PriceDisplay = memo(function PriceDisplay({ price }: { price: number }) {
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevPrice = useRef(price);

  useEffect(() => {
    if (price === prevPrice.current) return;

    if (price > prevPrice.current) setFlash("up");
    else if (price < prevPrice.current) setFlash("down");
    
    prevPrice.current = price;
    
    // Clear flash after 800ms
    const timer = setTimeout(() => setFlash(null), 800);
    return () => clearTimeout(timer);
  }, [price]);

  // Visual logic for "0.00031" -> "0.0₃31" subscript style
  // Note: For real production, you might parse this string dynamically.
  return (
    <div className={cn(
      "flex items-baseline font-mono font-medium leading-none tracking-tight transition-colors duration-200",
      flash === "up" && "text-[#22c55e]", // Explicit green
      flash === "down" && "text-[#ef4444]", // Explicit red
      !flash && "text-white"
    )}>
      <span className="text-gray-500 text-[10px] mr-0.5">F</span>
      <span className="text-gray-400">0.0</span>
      <span className="text-[9px] text-gray-500 translate-y-[1px]">3</span>
      <span className="text-current">1</span>
    </div>
  );
});

/**
 * SplitBadge
 * Static SVG/JSX that never changes, heavily memoized.
 */
const SplitBadge = memo(function SplitBadge() {
  return (
    <div className="flex items-center h-[18px] rounded-sm border border-gray-800 bg-[#161616]">
      <div className="flex items-center gap-1 px-1.5 border-r border-gray-800">
        <ChefHat className="size-3 text-[#22c55e]" />
        <span className="text-[10px] text-[#22c55e] font-medium">0%</span>
      </div>
      <div className="flex items-center gap-1 px-1.5 bg-[#1a1e2e]/50">
        <div className="flex items-center justify-center size-3 rounded-full bg-blue-500/20">
          <Zap className="size-2 text-blue-400 fill-blue-400" />
        </div>
        <span className="text-[10px] text-blue-400 font-medium">2mo</span>
      </div>
    </div>
  );
});

const GreenBadge = memo(function GreenBadge({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-1 h-[18px] px-1.5 rounded-sm bg-[#111c14] border border-green-900/30">
      <Icon className="size-3 text-[#22c55e]" />
      <span className="text-[10px] text-[#22c55e] font-medium">{label}</span>
    </div>
  );
});

// --- Main Component ---

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
  // Hook logic is kept, but it only drives specific visual booleans now
  const { isConnected } = useRealTimePrice(token.id, column);
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex w-full gap-3 p-2",
        "bg-[#09090b] border-b border-gray-900",
        "hover:bg-[#0f0f11] active:bg-[#18181b]", // Immediate CSS feedback
        "transition-colors duration-75 ease-linear cursor-pointer select-none",
        "h-[100px] overflow-hidden" // Strict height constraint
      )}
      style={{
        contentVisibility: "auto", // Browser rendering optimization
        containIntrinsicSize: "100px",
      }}
    >
      {/* --- LEFT COL: Image & Address --- */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <div className="relative">
          {/* Avatar Border: Uses CSS opacity transition for "Live" state instead of mounting/unmounting DOM nodes */}
          <div className={cn(
            "relative size-[56px] rounded-md border-2 overflow-hidden transition-all duration-300",
            isConnected ? "border-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.15)]" : "border-gray-800"
          )}>
             <Image
              src={token.image}
              alt={token.ticker}
              width={56}
              height={56}
              className="object-cover"
              loading="lazy" // Native lazy loading
              unoptimized
            />
          </div>
          
          {/* Online Indicator Pill */}
          <div className="absolute -bottom-1 -right-1 z-10 rounded-full bg-black p-[2px]">
            <div className={cn(
              "flex items-center justify-center size-4 rounded-full transition-colors duration-300",
              isConnected ? "bg-[#22c55e]" : "bg-gray-700"
            )}>
              <div className="h-1 w-2 bg-black rounded-full rotate-45" /> 
            </div>
          </div>
        </div>

        <span className="text-[10px] text-gray-500 font-medium font-mono">
          {token.ticker?.slice(0, 4) || "..."}...pump
        </span>
      </div>

      {/* --- MIDDLE COL: Info & Badges --- */}
      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        
        {/* Row 1: Header */}
        <div className="flex items-center gap-1.5">
          <h3 className="text-white font-bold text-[14px] leading-none tracking-tight">
            {token.ticker}
          </h3>
          <span className="text-gray-500 text-[13px] truncate leading-none pt-[1px] max-w-[120px]">
            {token.name}
          </span>
          <Copy className="size-3 text-gray-600 hover:text-gray-400 active:scale-95 transition-transform" />
        </div>

        {/* Row 2: Stats Line */}
        <div className="flex items-center gap-3 text-[11px] text-gray-500">
          {/* Blinking "1s" if live */}
          <span className={cn(
            "font-bold transition-colors duration-300",
            isConnected ? "text-[#22c55e] animate-pulse" : "text-gray-500"
          )}>
            {token.timeframe || "1s"}
          </span>
          
          <div className="flex items-center gap-2.5">
            <Instagram className="size-3.5 text-pink-600" />
            <Globe className="size-3.5 text-gray-500" /> 
            <Search className="size-3.5 text-gray-500" />
            <div className="w-[1px] h-3 bg-gray-800" />
            <div className="flex items-center gap-1">
              <User className="size-3 text-gray-400" />
              <span className="text-gray-300">1</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings2 className="size-3 text-gray-400 rotate-90" />
              <span className="text-gray-300">1</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="size-3 text-gray-400" />
              <span className="text-gray-300">0</span>
            </div>
             <div className="flex items-center gap-1">
              <Crown className="size-3 text-gray-400" />
              <span className="text-gray-300">0/6</span>
            </div>
          </div>
        </div>

        {/* Row 3: Badges */}
        <div className="flex items-center gap-1.5 mt-auto">
          <GreenBadge icon={User} label="0%" />
          <SplitBadge />
          <GreenBadge icon={Target} label="0%" />
          <GreenBadge icon={Ghost} label="0%" />
          <GreenBadge icon={Box} label="0%" />
        </div>
      </div>

      {/* --- RIGHT COL: Market Data --- */}
      <div className="flex flex-col items-end justify-between py-0.5 shrink-0 w-[80px]">
        
        {/* MC & Vol */}
        <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1 text-[11px]">
            <span className="text-gray-500 font-bold text-[9px] uppercase">MC</span>
            <span className="text-[#38bdf8] font-bold">
                {token.marketCap}
            </span>
            </div>
            <div className="flex items-center gap-1 text-[11px]">
            <span className="text-gray-500 font-bold text-[9px] uppercase">V</span>
            <span className="text-gray-200 font-bold">
                $0
            </span>
            </div>
        </div>

        {/* Price & TX & Bar */}
        <div className="flex flex-col items-end w-full gap-1 mt-auto">
          <div className="flex items-center gap-2">
            <PriceDisplay price={parseFloat(token.price) || 0} />
            <div className="flex items-baseline gap-0.5">
               <span className="text-[8px] text-gray-500 font-bold uppercase">TX</span>
               <span className="text-[11px] text-gray-200">0</span>
            </div>
          </div>
          
          <div className="w-full h-0.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
             <div 
               className="h-full bg-[#22c55e] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" 
               style={{ width: "66%" }} // Dynamic width via style is faster than class
             />
          </div>
        </div>
      </div>
    </div>
  );
});