/**
 * Utility functions for formatting data
 */

/**
 * Format large numbers to abbreviated form (e.g., 1.2M, 5.3K)
 */
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}

/**
 * Format currency values
 */
export function formatCurrency(value: number, decimals = 2): string {
  return `$${value.toFixed(decimals)}`;
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number, decimals = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Parse market cap string to number
 */
export function parseMarketCap(marketCap: string): number {
  const value = parseFloat(marketCap.replace(/[^0-9.]/g, ""));
  if (marketCap.includes("M")) return value * 1_000_000;
  if (marketCap.includes("K")) return value * 1_000;
  if (marketCap.includes("B")) return value * 1_000_000_000;
  return value;
}

/**
 * Parse price string to number
 */
export function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}
