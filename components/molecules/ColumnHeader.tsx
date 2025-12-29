import { memo } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortDropdown } from "./SortDropdown";
import type { SortOption } from "@/types/token";

/**
 * Column header with title, sort, and refresh controls (Molecular)
 */

interface ColumnHeaderProps {
  title: string;
  count: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ColumnHeader = memo(function ColumnHeader({
  title,
  count,
  sortBy,
  onSortChange,
  onRefresh,
  isRefreshing = false,
}: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-800">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-400">{count} tokens</p>
      </div>

      <div className="flex items-center gap-2">
        <SortDropdown currentSort={sortBy} onSortChange={onSortChange} />

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
        >
          <RefreshCw
            className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
    </div>
  );
});
