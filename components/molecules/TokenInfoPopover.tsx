import { memo } from "react";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Token } from "@/types/token";

/**
 * Token info popover (Molecular)
 * Shows detailed token information on hover/click
 */

interface TokenInfoPopoverProps {
  token: Token;
}

export const TokenInfoPopover = memo(function TokenInfoPopover({
  token,
}: TokenInfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-full p-1 hover:bg-gray-700/50 transition-colors">
          <Info className="size-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 border-gray-700 bg-gray-900 p-4"
        side="right"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={token.image}
              alt={token.name}
              className="size-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold">{token.name}</h4>
              <p className="text-sm text-gray-400">{token.ticker}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Market Cap:</span>
              <span className="font-medium">{token.marketCap}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Price:</span>
              <span className="font-medium font-mono">{token.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Listed:</span>
              <span className="font-medium">{token.timeframe} ago</span>
            </div>
          </div>

          {token.stats.length > 0 && (
            <div className="pt-2 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                {token.stats.map((stat, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="text-gray-500">{stat.label}: </span>
                    <span
                      className={
                        stat.isPositive
                          ? "text-green-400"
                          : stat.isPositive === false
                          ? "text-red-400"
                          : "text-gray-300"
                      }
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});
