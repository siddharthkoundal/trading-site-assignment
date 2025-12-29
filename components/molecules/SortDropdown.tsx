import { memo } from "react";
import {
  ArrowUpDown,
  TrendingUp,
  DollarSign,
  Clock,
  Activity,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { SortOption } from "@/types/token";

/**
 * Sort dropdown for token columns (Molecular)
 */

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: Array<{
  value: SortOption;
  label: string;
  icon: React.ReactNode;
}> = [
  { value: "time", label: "Recent", icon: <Clock className="size-4" /> },
  {
    value: "marketCap",
    label: "Market Cap",
    icon: <TrendingUp className="size-4" />,
  },
  { value: "price", label: "Price", icon: <DollarSign className="size-4" /> },
  { value: "change", label: "Change %", icon: <Activity className="size-4" /> },
];

export const SortDropdown = memo(function SortDropdown({
  currentSort,
  onSortChange,
}: SortDropdownProps) {
  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "Sort";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
        >
          <ArrowUpDown className="size-4" />
          <span className="hidden sm:inline">{currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 border-gray-700 bg-gray-900"
      >
        <DropdownMenuLabel className="text-xs text-gray-400">
          Sort By
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className="gap-2 cursor-pointer focus:bg-gray-800"
          >
            {option.icon}
            <span>{option.label}</span>
            {currentSort === option.value && (
              <span className="ml-auto text-blue-400">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
