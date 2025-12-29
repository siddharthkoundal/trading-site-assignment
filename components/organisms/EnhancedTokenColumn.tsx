"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSorting } from "@/store/tokenSlice";
import { useTokenQuery } from "@/hooks/useTokenQuery";
import { sortTokens } from "@/utils/sorting";
import { ColumnHeader } from "../molecules/ColumnHeader";
import { EnhancedTokenCard } from "../molecules/EnhancedTokenCard";
import { TokenCardSkeleton } from "../molecules/TokenCardSkeleton";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TokenColumn } from "@/types/token";

/**
 * Enhanced token column with sorting, loading states, and error handling (Organism)
 * Fully optimized with memoization and efficient rendering
 */

interface EnhancedTokenColumnProps {
  column: TokenColumn;
  title: string;
  onTokenClick?: (tokenId: string) => void;
}

export const EnhancedTokenColumn = memo(function EnhancedTokenColumn({
  column,
  title,
  onTokenClick,
}: EnhancedTokenColumnProps) {
  const dispatch = useAppDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get column state from Redux
  const columnState = useAppSelector((state) => state.tokens[column]);
  const { tokens, sortBy, isLoading, error } = columnState;

  // Fetch tokens with React Query
  const { refetch } = useTokenQuery(column);

  // Memoized sorted tokens
  const sortedTokens = useMemo(
    () => sortTokens(tokens, sortBy),
    [tokens, sortBy]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (newSort: typeof sortBy) => {
      dispatch(setSorting({ column, sortBy: newSort }));
    },
    [dispatch, column]
  );

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  // Handle token click
  const handleTokenClick = useCallback(
    (tokenId: string) => {
      onTokenClick?.(tokenId);
    },
    [onTokenClick]
  );

  return (
    <div className="flex flex-col h-full">
      <ColumnHeader
        title={title}
        count={tokens.length}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && tokens.length === 0 ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <TokenCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-3 pb-4">
            <AnimatePresence mode="wait">
              {sortedTokens.map((token) => (
                <EnhancedTokenCard
                  key={token.id}
                  token={token}
                  column={column}
                  onClick={() => handleTokenClick(token.id)}
                />
              ))}
            </AnimatePresence>

            {/* Loading More Indicator */}
            {isRefreshing && tokens.length > 0 && (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && tokens.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-gray-400">No tokens found</p>
                <p className="text-sm text-gray-500 mt-1">
                  Check back later for new listings
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
});
