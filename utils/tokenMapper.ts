import type { Token as ReduxToken } from "@/types/token";
import type { Token as AxiomToken } from "@/mocks/mockTokens";
import type { TokenColumn } from "@/types/token";

/**
 * Maps Redux Token format to Axiom Token format for display
 */
export function mapReduxTokenToAxiomToken(
  reduxToken: ReduxToken,
  column: TokenColumn
): AxiomToken {
  // Generate short name from ticker or ID
  const shortName = reduxToken.ticker || `${reduxToken.id.slice(0, 4)}...pump`;
  
  // Determine status based on column
  const status =
    column === "newPairs"
      ? "new_pair"
      : column === "finalStretch"
      ? "final_stretch"
      : "migrated";

  // Extract numeric values for volume, fee, txCount
  // Try to get from stats first, then from direct properties
  const volumeStat = reduxToken.stats?.find((s) => s.label === "Vol");
  const volume = (reduxToken as any).volume || volumeStat?.value || "$0";
  const fee = (reduxToken as any).fee || "0";
  const txCount = (reduxToken as any).txCount || "0";

  return {
    id: reduxToken.id,
    status,
    new_pairs: status === "new_pair" || status === "migrated" ? `${reduxToken.ticker}/USDT` : undefined,
    migrated: status === "migrated" ? Math.random() * 100 : 0,
    solAmount: reduxToken.price,
    marketCap: reduxToken.marketCap,
    volume,
    fee,
    txCount,
    name: reduxToken.name.toLowerCase().replace(/\s+/g, ""),
    shortName,
    fullName: reduxToken.name,
    image: reduxToken.image,
    time: reduxToken.timeframe,
    xLink: `https://x.com/${reduxToken.name.toLowerCase().replace(/\s+/g, "")}`,
    website: `https://www.${reduxToken.name.toLowerCase().replace(/\s+/g, "")}.com/`,
    pumpLink: `https://pump.fun/coin/${reduxToken.id}`,
    searchLink: `https://x.com/search?q=${reduxToken.id}`,
    groupCount: Math.floor(Math.random() * 10).toString(),
    proTraderCount: Math.floor(Math.random() * 5).toString(),
    trophyCount: Math.floor(Math.random() * 3).toString(),
    vipCount: `${Math.floor(Math.random() * 3)}/${Math.floor(Math.random() * 6) + 1}`,
    eyeCount: Math.floor(Math.random() * 20).toString(),
  };
}

/**
 * Generates Axiom tokens from Redux tokens
 */
export function generateAxiomTokensFromRedux(
  reduxTokens: ReduxToken[],
  column: TokenColumn
): AxiomToken[] {
  return reduxTokens.map((token) => mapReduxTokenToAxiomToken(token, column));
}

