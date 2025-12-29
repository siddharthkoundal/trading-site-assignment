/**
 * Testing utilities and mock data generators
 * Useful for development, testing, and demos
 */

import type { Token, TokenColumn, TokenStat } from "@/types/token";

/**
 * Generate mock token data for testing
 */
export function generateMockToken(overrides?: Partial<Token>): Token {
  const id = Math.random().toString(36).substr(2, 9);
  const marketCapValue = Math.random() * 10000000 + 100000;
  const price = Math.random() * 10 + 0.001;

  const defaultToken: Token = {
    id,
    image: `https://source.unsplash.com/random/100x100?crypto&sig=${id}`,
    name: `Token ${id.slice(0, 6).toUpperCase()}`,
    ticker: `TKN${Math.floor(Math.random() * 999)}`,
    marketCap: `$${(marketCapValue / 1000000).toFixed(1)}M`,
    price: `$${price.toFixed(6)}`,
    timeframe: `${Math.floor(Math.random() * 60)}m`,
    verified: Math.random() > 0.5,
    accentColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    badges: [],
    stats: generateMockStats(),
    lastUpdate: Date.now(),
  };

  return { ...defaultToken, ...overrides };
}

/**
 * Generate mock stats
 */
function generateMockStats(): TokenStat[] {
  return [
    {
      label: "1h",
      value: `${(Math.random() - 0.5) * 20 > 0 ? "+" : ""}${(
        (Math.random() - 0.5) *
        20
      ).toFixed(2)}%`,
      isPositive: (Math.random() - 0.5) * 20 > 0,
      change: (Math.random() - 0.5) * 20 > 0 ? "up" : "down",
    },
    {
      label: "24h",
      value: `${(Math.random() - 0.5) * 40 > 0 ? "+" : ""}${(
        (Math.random() - 0.5) *
        40
      ).toFixed(2)}%`,
      isPositive: (Math.random() - 0.5) * 40 > 0,
      change: (Math.random() - 0.5) * 40 > 0 ? "up" : "down",
    },
    {
      label: "Vol",
      value: `$${((Math.random() * 5000000) / 1000).toFixed(0)}K`,
    },
    {
      label: "Liq",
      value: `$${((Math.random() * 2000000) / 1000).toFixed(0)}K`,
    },
  ];
}

/**
 * Generate multiple mock tokens
 */
export function generateMockTokens(
  count: number,
  column?: TokenColumn
): Token[] {
  return Array.from({ length: count }, () => generateMockToken());
}

/**
 * Delay function for simulating async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Random error generator for testing error states
 */
export function randomError(probability: number = 0.1): void {
  if (Math.random() < probability) {
    throw new Error("Simulated error for testing");
  }
}

/**
 * Mock localStorage for testing
 */
export const mockLocalStorage = {
  store: {} as Record<string, string>,

  getItem(key: string): string | null {
    return this.store[key] || null;
  },

  setItem(key: string, value: string): void {
    this.store[key] = value;
  },

  removeItem(key: string): void {
    delete this.store[key];
  },

  clear(): void {
    this.store = {};
  },
};

/**
 * Viewport size utilities
 */
export const viewportSizes = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
};

/**
 * Set viewport size (useful for responsive testing)
 */
export function setViewport(size: keyof typeof viewportSizes): void {
  if (typeof window !== "undefined") {
    const { width, height } = viewportSizes[size];
    // This would be used in testing environments
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: height,
    });
  }
}
