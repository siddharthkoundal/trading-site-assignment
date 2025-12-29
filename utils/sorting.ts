import type { Token, SortOption } from "@/types/token";
import { parseMarketCap, parsePrice } from "./formatters";

/**
 * Sorting utilities for token lists
 */

export function sortTokens(tokens: Token[], sortBy: SortOption): Token[] {
  const sorted = [...tokens];

  switch (sortBy) {
    case "marketCap":
      return sorted.sort(
        (a, b) => parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap)
      );

    case "price":
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    case "time":
      return sorted.sort((a, b) => (b.lastUpdate || 0) - (a.lastUpdate || 0));

    case "change": {
      // Sort by the first stat change value
      return sorted.sort((a, b) => {
        const aChange = parseFloat(a.stats[0]?.value || "0");
        const bChange = parseFloat(b.stats[0]?.value || "0");
        return bChange - aChange;
      });
    }

    default:
      return sorted;
  }
}
