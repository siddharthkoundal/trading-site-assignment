"use client";

import React, { memo, useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { AxiomTokenRow } from "../molecules/AxiomTokenRow";
import { AxiomTokenRowSkeleton } from "../molecules/AxiomTokenRowSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Zap } from "lucide-react";
import { Token } from "../../mocks/mockTokens";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setTokens, setSorting } from "@/store/tokenSlice";
import { useTokenQuery } from "@/hooks/useTokenQuery";
import { generateMockTokens } from "@/services/tokenApi";
import { generateAxiomTokensFromRedux } from "@/utils/tokenMapper";
import { sortTokens } from "@/utils/sorting";
import { cn } from "@/utils/cn";
import type { TokenColumn as TokenColumnType } from "@/types/token";
import type { SortOption } from "@/types/token";

interface AxiomTokenTableProps {
  column: TokenColumnType;
  onTokenClick?: (token: Token) => void;
  isLoading?: boolean;
}

/**
 * Pixel-perfect Axiom Trade token table
 * Matches axiom.trade/pulse design with all three columns
 */
export const AxiomTokenTable = memo(function AxiomTokenTable({
  column,
  onTokenClick,
  isLoading = false,
}: AxiomTokenTableProps) {
  const dispatch = useAppDispatch();

  // Get tokens and sortBy from Redux (with live updates)
  const reduxTokens = useAppSelector((state) => state.tokens[column].tokens);
  const sortBy = useAppSelector((state) => state.tokens[column].sortBy);
  const isLoadingFromRedux = useAppSelector(
    (state) => state.tokens[column].isLoading
  );

  // Use useTokenQuery for automatic refetching every 60 seconds
  const { refetch } = useTokenQuery(column);
  
  // Initialize tokens in Redux on mount if empty using generateMockTokens
  // Note: useTokenQuery will handle fetching and updating tokens automatically
  useEffect(() => {
    if (reduxTokens.length === 0) {
      // Generate tokens based on column type
      const count =
        column === "newPairs" ? 15 : column === "finalStretch" ? 12 : 10;
      
      // Generate mock tokens using the function from tokenApi
      const generatedTokens = generateMockTokens(column, count);
      
      // Helper function to format volume
      const formatVolume = (value: number): string => {
        if (value >= 1000) {
          return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value.toFixed(0)}`;
      };
      
      // Add additional fields for WebSocket updates
      const tokensWithExtraFields = generatedTokens.map((token) => ({
        ...token,
        // Initialize volume, fee, txCount for WebSocket updates
        volume: formatVolume(Math.random() * 5000 + 100),
        fee: (Math.random() * 0.5 + 0.01).toFixed(3),
        txCount: Math.floor(Math.random() * 50 + 1).toString(),
      }));
      
      dispatch(setTokens({ column, tokens: tokensWithExtraFields }));
    }
  }, [column, dispatch, reduxTokens.length]);

  // Enhance tokens from useTokenQuery with volume, fee, txCount if missing
  // Only run once when tokens are first loaded to avoid infinite loops
  const hasEnhancedRef = useRef(false);
  useEffect(() => {
    if (reduxTokens.length > 0 && !hasEnhancedRef.current) {
      const needsEnhancement = reduxTokens.some(
        (token) => !(token as any).volume || !(token as any).fee || !(token as any).txCount
      );

      if (needsEnhancement) {
        const formatVolume = (value: number): string => {
          if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
          }
          return `$${value.toFixed(0)}`;
        };

        const enhancedTokens = reduxTokens.map((token) => ({
          ...token,
          volume: (token as any).volume || formatVolume(Math.random() * 5000 + 100),
          fee: (token as any).fee || (Math.random() * 0.5 + 0.01).toFixed(3),
          txCount: (token as any).txCount || Math.floor(Math.random() * 50 + 1).toString(),
        }));

        dispatch(setTokens({ column, tokens: enhancedTokens }));
        hasEnhancedRef.current = true;
      }
    }
  }, [reduxTokens.length, column, dispatch]); // Only depend on length to avoid re-running

  // Convert Redux tokens to Axiom display format and sort them
  const filteredAndSortedTokens = useMemo(() => {
    if (reduxTokens.length === 0) {
      return [];
    }

    // Map Redux tokens to Axiom token format for display
    const axiomTokens = generateAxiomTokensFromRedux(reduxTokens, column);

    // Convert back to Redux Token format for sorting (sortTokens expects Redux Token type)
    const tokensForSorting = axiomTokens.map((axiomToken) => {
      const reduxToken = reduxTokens.find((rt) => rt.id === axiomToken.id);
      if (reduxToken) {
        return {
          ...reduxToken,
          // Ensure volume is available for sorting if needed
          volume: axiomToken.volume,
          fee: axiomToken.fee,
          txCount: axiomToken.txCount,
        };
      }
      // Fallback: create minimal token from axiom token
      return {
        id: axiomToken.id,
        image: axiomToken.image,
        name: axiomToken.name,
        ticker: axiomToken.shortName,
        marketCap: axiomToken.marketCap,
        price: axiomToken.solAmount,
        timeframe: axiomToken.time,
        verified: true,
        badges: [],
        stats: [],
        lastUpdate: Date.now(),
      };
    });

    // Sort tokens using sortTokens function
    const sorted = sortTokens(tokensForSorting, sortBy);

    // Map back to Axiom format for display
    return sorted.map((sortedToken) => {
      const axiomToken = axiomTokens.find((at) => at.id === sortedToken.id);
      return axiomToken || {
        id: sortedToken.id,
        status: column === "newPairs" ? "new_pair" : column === "finalStretch" ? "final_stretch" : "migrated",
        marketCap: sortedToken.marketCap,
        volume: (sortedToken as any).volume || "$0",
        fee: (sortedToken as any).fee || "0",
        txCount: (sortedToken as any).txCount || "0",
        name: sortedToken.name,
        shortName: sortedToken.ticker,
        fullName: sortedToken.name,
        image: sortedToken.image,
        time: sortedToken.timeframe,
        xLink: "",
        website: "",
        pumpLink: "",
        searchLink: "",
        groupCount: "0",
        proTraderCount: "0",
        trophyCount: "0",
        vipCount: "0",
        eyeCount: "0",
      } as Token;
    });
  }, [column, reduxTokens, sortBy]); // Re-sort when tokens or sortBy changes

  // Handle sort change
  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      dispatch(setSorting({ column, sortBy: newSort }));
    },
    [dispatch, column]
  );

  const columnTitle =
    column === "newPairs"
      ? "New Pairs"
      : column === "finalStretch"
      ? "Final Stretch"
      : "Migrated";

  const [selectedPriority, setSelectedPriority] = useState<"P1" | "P2" | "P3">("P1");

  return (
    <div className="flex flex-col h-full w-full bg-black">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-black border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-3 min-h-12 px-3 py-2">
          {/* Column Title */}
          <span className="text-[16px] text-white font-medium whitespace-nowrap">
            {columnTitle}
          </span>

          {/* Lightning bolt button with "0" */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-125"
            aria-label="Filter value"
          >
            <Zap className="w-3.5 h-3.5 text-[#6b7280]" />
            <span className="text-[14px] text-white font-medium">0</span>
          </button>

          {/* SOL Logo */}
          <div className="w-5 h-5 rounded bg-gradient-to-br from-[#9945FF] via-[#14F195] to-[#9945FF] flex items-center justify-center overflow-hidden shrink-0 shadow-sm" role="img" aria-label="Solana">
            <Image
              src="/images/sol-fill.svg"
              alt=""
              width={20}
              height={20}
              className="w-full h-full object-contain"
              unoptimized
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<span class="text-[10px] text-white font-bold">S</span>';
                }
              }}
            />
          </div>

          {/* P1/P2/P3 Button Group */}
          <div className="flex items-center border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden bg-[rgba(255,255,255,0.02)]">
            <button
              type="button"
              onClick={() => setSelectedPriority("P1")}
              className={cn(
                "px-2.5 py-1 text-[12px] font-medium transition-colors duration-125",
                selectedPriority === "P1"
                  ? "bg-[rgba(59,130,246,0.15)] text-[#60a5fa]"
                  : "bg-transparent text-white hover:bg-[rgba(255,255,255,0.05)]"
              )}
              aria-label="Filter priority 1"
            >
              P1
            </button>
            <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />
            <button
              type="button"
              onClick={() => setSelectedPriority("P2")}
              className={cn(
                "px-2.5 py-1 text-[12px] font-medium transition-colors duration-125",
                selectedPriority === "P2"
                  ? "bg-[rgba(59,130,246,0.15)] text-[#60a5fa]"
                  : "bg-transparent text-white hover:bg-[rgba(255,255,255,0.05)]"
              )}
              aria-label="Filter priority 2"
            >
              P2
            </button>
            <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />
            <button
              type="button"
              onClick={() => setSelectedPriority("P3")}
              className={cn(
                "px-2.5 py-1 text-[12px] font-medium transition-colors duration-125",
                selectedPriority === "P3"
                  ? "bg-[rgba(59,130,246,0.15)] text-[#60a5fa]"
                  : "bg-transparent text-white hover:bg-[rgba(255,255,255,0.05)]"
              )}
              aria-label="Filter priority 3"
            >
              P3
            </button>
          </div>

          {/* Sort Icon Button with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="ml-auto flex items-center justify-center w-6 h-6 rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-125"
                aria-label="Sort tokens"
              >
                <ArrowUpDown className="w-4 h-4 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border-[rgba(255,255,255,0.1)] bg-[#0a0a0a]"
            >
              <DropdownMenuItem
                onClick={() => handleSortChange("time")}
                className={cn(
                  "cursor-pointer text-white hover:bg-[rgba(255,255,255,0.05)]",
                  sortBy === "time" && "bg-[rgba(59,130,246,0.2)]"
                )}
              >
                Time
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("marketCap")}
                className={cn(
                  "cursor-pointer text-white hover:bg-[rgba(255,255,255,0.05)]",
                  sortBy === "marketCap" && "bg-[rgba(59,130,246,0.2)]"
                )}
              >
                Market Cap
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("price")}
                className={cn(
                  "cursor-pointer text-white hover:bg-[rgba(255,255,255,0.05)]",
                  sortBy === "price" && "bg-[rgba(59,130,246,0.2)]"
                )}
              >
                Price
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("change")}
                className={cn(
                  "cursor-pointer text-white hover:bg-[rgba(255,255,255,0.05)]",
                  sortBy === "change" && "bg-[rgba(59,130,246,0.2)]"
                )}
              >
                Change
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full">
          {isLoading || isLoadingFromRedux ? (
            // Loading skeletons
            <>
              {[...Array(5)].map((_, i) => (
                <AxiomTokenRowSkeleton key={i} />
              ))}
            </>
          ) : filteredAndSortedTokens.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-[#6b7280] text-sm">No tokens found</p>
              <p className="text-[#6b7280] text-xs mt-1">
                Check back later for new listings
              </p>
            </div>
          ) : (
            // Token rows - always sorted based on current sortBy
            filteredAndSortedTokens.map((token) => (
              <AxiomTokenRow
                key={token.id}
                token={token}
                onTokenClick={onTokenClick}
                column={column}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
});

