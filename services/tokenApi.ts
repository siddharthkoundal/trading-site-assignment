import type { Token, TokenColumn } from "@/types/token";
import { TrendingUp, Zap, Flame } from "lucide-react";
import React from "react";

/**
 * Mock API service for fetching token data
 * Simulates API calls with realistic delays
 */

const MOCK_DELAY = 800;

/**
 * Generate mock tokens for a specific column
 * Exported for use in components
 */
export function generateMockTokens(column: TokenColumn, count: number): Token[] {
  const tokens: Token[] = [];

  for (let i = 0; i < count; i++) {
    const id = `${column}-${i}-${Date.now()}`;
    const marketCap = Math.random() * 10000000 + 100000;
    const price = Math.random() * 10 + 0.001;
    const change1h = (Math.random() - 0.5) * 20;
    const change24h = (Math.random() - 0.5) * 40;
    const volume = Math.random() * 5000000;
    const liquidity = Math.random() * 2000000;

    tokens.push({
      id,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
      name: `${
        column === "newPairs"
          ? "New"
          : column === "finalStretch"
          ? "Final"
          : "Migrated"
      } Token ${i + 1}`,
      ticker: `${column.toUpperCase().slice(0, 3)}${i}`,
      marketCap: formatMarketCap(marketCap),
      price: `$${price.toFixed(6)}`,
      timeframe: `${Math.floor(Math.random() * 60)}m`,
      verified: Math.random() > 0.5,
      accentColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      badges: generateBadges(),
      stats: [
        {
          label: "1h",
          value: `${change1h > 0 ? "+" : ""}${change1h.toFixed(2)}%`,
          isPositive: change1h > 0,
          change: change1h > 0 ? "up" : change1h < 0 ? "down" : "neutral",
        },
        {
          label: "24h",
          value: `${change24h > 0 ? "+" : ""}${change24h.toFixed(2)}%`,
          isPositive: change24h > 0,
          change: change24h > 0 ? "up" : change24h < 0 ? "down" : "neutral",
        },
        {
          label: "Vol",
          value: formatVolume(volume),
        },
        {
          label: "Liq",
          value: formatVolume(liquidity),
        },
      ],
      lastUpdate: Date.now() - Math.random() * 3600000,
    });
  }

  return tokens;
}

function formatMarketCap(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return `$${(value / 1_000).toFixed(1)}K`;
}

function formatVolume(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return `$${(value / 1_000).toFixed(0)}K`;
}

function generateBadges(): Array<{ icon: string; value: string }> {
  const allBadges = [
    { icon: "trendingUp", value: "Hot" },
    { icon: "zap", value: "Fast" },
    { icon: "flame", value: "Fire" },
  ];
  const count = Math.floor(Math.random() * 3);
  return allBadges.slice(0, count);
}

/**
 * Fetch tokens for a specific column
 */
export async function fetchTokens(column: TokenColumn): Promise<Token[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // Simulate occasional errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error(`Failed to fetch ${column} tokens`);
  }

  const count =
    column === "newPairs" ? 15 : column === "finalStretch" ? 12 : 10;
  return generateMockTokens(column, count);
}

/**
 * Fetch single token details
 */
export async function fetchTokenDetails(tokenId: string): Promise<
  Token & {
    description: string;
    website: string;
    twitter: string;
    contract: string;
    holders: number;
    transactions24h: number;
  }
> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const baseToken = generateMockTokens("newPairs", 1)[0];

  return {
    ...baseToken,
    id: tokenId,
    description:
      "This is a revolutionary DeFi token built on cutting-edge blockchain technology. Our mission is to provide the best trading experience with maximum security and transparency.",
    website: "https://example.com",
    twitter: "https://twitter.com/example",
    contract: "0x" + Math.random().toString(16).substr(2, 40),
    holders: Math.floor(Math.random() * 10000) + 1000,
    transactions24h: Math.floor(Math.random() * 50000) + 5000,
  };
}
