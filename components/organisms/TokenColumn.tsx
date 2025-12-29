import React, { useState, useCallback } from "react";
import { Plus, ArrowUpDown } from "lucide-react";
import { TokenCard } from "../molecules/TokenCard";
import { TokenCardSkeleton } from "../atoms/TokenCardSkeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { cn } from "@/app/components/ui/utils";
import type { Token, SortOption } from "@/types/token";

interface TokenColumnProps {
  title: string;
  count: number;
  tokens: Token[];
  isLoading: boolean;
  filters?: string[];
  sortBy?: SortOption;
  onTokenClick?: (token: Token) => void;
  onSortChange?: (sortBy: SortOption) => void;
  onFilterChange?: (filters: string[]) => void;
  className?: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "marketCap", label: "Market Cap" },
  { value: "price", label: "Price" },
  { value: "time", label: "Time" },
  { value: "change", label: "Change" },
];

/**
 * Token column organism component
 * Features: sorting, filtering, infinite scroll ready
 * Performance: virtualization ready, memoized renders
 */
export const TokenColumn = React.memo<TokenColumnProps>(
  ({
    title,
    count,
    tokens,
    isLoading,
    filters = [],
    sortBy = "time",
    onTokenClick,
    onSortChange,
    onFilterChange,
    className,
  }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleSortChange = useCallback(
      (value: SortOption) => {
        onSortChange?.(value);
      },
      [onSortChange]
    );

    return (
      <div
        className={cn(
          "flex flex-col h-full border-r border-gray-800 last:border-r-0",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black/50">
          <div className="flex items-center gap-2">
            <h2 className="text-white">{title}</h2>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">▲</span>
              <span className="text-gray-400 text-sm">{count}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            {filters.map((filter, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-gray-400 bg-gray-800 hover:bg-gray-700"
              >
                {filter}
              </Button>
            ))}

            {/* Sort popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                >
                  <ArrowUpDown className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-gray-900 border-gray-800">
                <div className="space-y-1">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-sm",
                        sortBy === option.value && "bg-gray-800 text-white"
                      )}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Add button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {isLoading ? (
              // Loading skeletons
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TokenCardSkeleton key={i} />
                ))}
              </>
            ) : tokens.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-400 text-sm">No tokens found</p>
                <p className="text-gray-600 text-xs mt-1">
                  Add your first token to get started
                </p>
              </div>
            ) : (
              // Token cards
              tokens.map((token) => (
                <TokenCard
                  key={token.id}
                  token={token}
                  onClick={onTokenClick}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    );
  }
);

TokenColumn.displayName = "TokenColumn";
