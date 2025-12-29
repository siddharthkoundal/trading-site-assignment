/**
 * Core domain types for token trading application
 */

export type PriceChange = "up" | "down" | "neutral";

export interface TokenBadge {
  icon: string; // icon identifier, e.g. 'star', 'fire', 'trophy'
  value: string;
}

export interface TokenStat {
  label: string;
  value: string;
  isPositive?: boolean;
  change?: PriceChange;
}

export interface Token {
  id: string;
  image: string;
  name: string;
  ticker: string;
  marketCap: string;
  price: string;
  timeframe: string;
  accentColor?: string;
  verified?: boolean;
  badges?: TokenBadge[];
  stats: TokenStat[];
  lastUpdate?: number;
}

export type TokenColumn = "newPairs" | "finalStretch" | "migrated";

export type SortOption = "marketCap" | "price" | "time" | "change";

export interface ColumnState {
  tokens: Token[];
  sortBy: SortOption;
  filters: string[];
  isLoading: boolean;
  error: string | null;
}
