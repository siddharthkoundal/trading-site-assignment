// Mock data for Axiom Trade's token discovery table
// This file exports a static array of tokens with all fields needed for pixel-perfect UI and feature development.
// Use this for local development, storybook, and tests. Update as needed for new columns or features.

export type Token = {
  id: string;
  // The trading pair name (e.g., "ETH/USDT"). Only populated if the token is live on a DEX (status: 'new_pair' or 'migrated').
  new_pairs?: string;
  // The launch lifecycle status: 'new_pair', 'final_stretch', or 'migrated'.
  status: "new_pair" | "final_stretch" | "migrated";
  // The numeric value relevant to the status (e.g., migrated amount, or 0 if not migrated yet).
  migrated?: number;
  solAmount: string;
  marketCap: string;
  volume: string;
  fee: string;
  txCount: string;
  name: string;
  shortName: string;
  fullName: string;
  image: string;
  time: string;
  xLink: string;
  website: string;
  pumpLink: string;
  searchLink: string;
  groupCount: string;
  proTraderCount: string;
  trophyCount: string;
  vipCount: string;
  eyeCount: string;
  // Add more fields as needed for popovers, tooltips, etc.
};

export const mockTokens: Token[] = [
  {
    id: "1",
    status: "new_pair",
    new_pairs: "ETH/USDT",
    migrated: 0,
    solAmount: "0.25 SOL",
    marketCap: "$3.47K",
    volume: "$3K",
    fee: "0.25",
    txCount: "19",
    name: "privacy",
    shortName: "jakB...pump",
    fullName: "privacy.fun",
    image:
      "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/jakBQmFZgKXMfr2v9k86XhU1LkBKxzCGgKCCwVKpump.webp",
    time: "39s",
    xLink: "https://x.com/privdotfun",
    website: "https://www.privacyfun.com/",
    pumpLink:
      "https://pump.fun/coin/jakBQmFZgKXMfr2v9k86XhU1LkBKxzCGgKCCwVKpump",
    searchLink:
      "https://x.com/search?q=jakBQmFZgKXMfr2v9k86XhU1LkBKxzCGgKCCwVKpump",
    groupCount: "0",
    proTraderCount: "0",
    trophyCount: "0",
    vipCount: "0/1",
    eyeCount: "4",
    badges: [
      { icon: "star", value: "New" },
      { icon: "fire", value: "Hot" },
    ],
  },
  {
    id: "2",
    status: "final_stretch",
    new_pairs: "BTC/USDT",
    migrated: 0,
    solAmount: "0.10 SOL",
    marketCap: "$10.2K",
    volume: "$8K",
    fee: "0.10",
    txCount: "8",
    name: "bitcoin",
    shortName: "btc...pump",
    fullName: "bitcoin.fun",
    image:
      "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/btc_image.webp",
    time: "20s",
    xLink: "https://x.com/bitcoin",
    website: "https://www.bitcoin.com/",
    pumpLink: "https://pump.fun/coin/btc_pump",
    searchLink: "https://x.com/search?q=btc_pump",
    groupCount: "2",
    proTraderCount: "1",
    trophyCount: "1",
    vipCount: "1/2",
    eyeCount: "10",
    badges: [
      { icon: "trophy", value: "Winner" },
      { icon: "vip", value: "VIP" },
    ],
  },
  {
    id: "3",
    status: "migrated",
    new_pairs: "SOL/USDT",
    migrated: 98.45,
    solAmount: "0.05 SOL",
    marketCap: "$1.2K",
    volume: "$1K",
    fee: "0.05",
    txCount: "2",
    name: "solana",
    shortName: "sol...pump",
    fullName: "solana.fun",
    image:
      "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/sol_image.webp",
    time: "5s",
    xLink: "https://x.com/solana",
    website: "https://www.solana.com/",
    pumpLink: "https://pump.fun/coin/sol_pump",
    searchLink: "https://x.com/search?q=sol_pump",
    groupCount: "3",
    proTraderCount: "2",
    trophyCount: "2",
    vipCount: "2/3",
    eyeCount: "2",
    badges: [
      { icon: "eye", value: "Watched" },
      { icon: "fire", value: "Hot" },
    ],
  },
  {
    id: "4",
    status: "new_pair",
    new_pairs: "DOGE/USDT",
    migrated: 0,
    solAmount: "0.15 SOL",
    marketCap: "$5.2K",
    volume: "$4.5K",
    fee: "0.15",
    txCount: "25",
    name: "WIRK",
    shortName: "6Fbf...pump",
    fullName: "Will are charlie kirk",
    image:
      "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/jakBQmFZgKXMfr2v9k86XhU1LkBKxzCGgKCCwVKpump.webp",
    time: "1s",
    xLink: "https://x.com/wirk",
    website: "https://www.wirk.com/",
    pumpLink: "https://pump.fun/coin/wirk_pump",
    searchLink: "https://x.com/search?q=wirk_pump",
    groupCount: "1",
    proTraderCount: "1",
    trophyCount: "0",
    vipCount: "0/6",
    eyeCount: "5",
    badges: [
      { icon: "star", value: "New" },
    ],
  },
  {
    id: "5",
    status: "final_stretch",
    new_pairs: "ADA/USDT",
    migrated: 0,
    solAmount: "0.08 SOL",
    marketCap: "$8.5K",
    volume: "$7K",
    fee: "0.08",
    txCount: "15",
    name: "MEME",
    shortName: "meme...pump",
    fullName: "meme.coin",
    image:
      "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/btc_image.webp",
    time: "45s",
    xLink: "https://x.com/meme",
    website: "https://www.meme.com/",
    pumpLink: "https://pump.fun/coin/meme_pump",
    searchLink: "https://x.com/search?q=meme_pump",
    groupCount: "3",
    proTraderCount: "2",
    trophyCount: "1",
    vipCount: "1/3",
    eyeCount: "12",
    badges: [
      { icon: "fire", value: "Hot" },
    ],
  },
  {
    id: "6",
    status: "migrated",
    new_pairs: "MATIC/USDT",
    migrated: 95.2,
    solAmount: "0.03 SOL",
    marketCap: "$2.1K",
    volume: "$1.8K",
    fee: "0.03",
    txCount: "5",
    name: "DEFI",
    shortName: "defi...pump",
    fullName: "defi.token",
    image:
      "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/sol_image.webp",
    time: "2m",
    xLink: "https://x.com/defi",
    website: "https://www.defi.com/",
    pumpLink: "https://pump.fun/coin/defi_pump",
    searchLink: "https://x.com/search?q=defi_pump",
    groupCount: "5",
    proTraderCount: "3",
    trophyCount: "3",
    vipCount: "3/5",
    eyeCount: "8",
    badges: [
      { icon: "trophy", value: "Winner" },
    ],
  },
  // Add more tokens for variety, edge cases, and UI testing
];
