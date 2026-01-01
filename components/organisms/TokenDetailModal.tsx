"use client";

import { memo, useState, useMemo } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Copy,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { PriceDisplay } from "../atoms/PriceDisplay";
import { StatBadge } from "../atoms/StatBadge";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import type { Token as ReduxToken } from "@/types/token";
import type { Token as AxiomToken } from "@/mocks/mockTokens";

/**
 * Token detail modal with comprehensive information (Organism)
 */

interface TokenDetailModalProps {
  tokenId: string | null;
  token?: ReduxToken | AxiomToken | null; // Optional token object to use directly (supports both types)
  open: boolean;
  onClose: () => void;
}

export const TokenDetailModal = memo(function TokenDetailModal({
  tokenId,
  token: tokenProp,
  open,
  onClose,
}: TokenDetailModalProps) {
  const [copied, setCopied] = useState(false);

  // Wrap onClose to reset copied state
  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  // Get tokens from all columns in Redux to find the token
  const allTokens = useAppSelector((state) => [
    ...state.tokens.newPairs.tokens,
    ...state.tokens.finalStretch.tokens,
    ...state.tokens.migrated.tokens,
  ]);

  // Find token from Redux state or use provided token prop
  const foundToken = useMemo(() => {
    if (tokenProp) return tokenProp;
    if (!tokenId) return null;
    return allTokens.find((t) => t.id === tokenId) || null;
  }, [tokenId, tokenProp, allTokens]);

  // Map token to modal format (handles both ReduxToken and AxiomToken types)
  const token = useMemo(() => {
    if (!foundToken) return null;

    // Check if it's an AxiomToken (has 'shortName' property) or ReduxToken (has 'ticker' property)
    const isAxiomToken = 'shortName' in foundToken || 'solAmount' in foundToken;

    if (isAxiomToken) {
      // Handle AxiomToken type (from mocks/mockTokens.ts)
      const axiomToken = foundToken as AxiomToken;
      return {
        id: axiomToken.id,
        name: axiomToken.fullName || axiomToken.name,
        ticker: axiomToken.shortName,
        image: axiomToken.image,
        marketCap: axiomToken.marketCap,
        price: axiomToken.solAmount,
        timeframe: axiomToken.time,
        verified: true,
        stats: [
          {
            label: "24h Change",
            value: "+2.5%",
            isPositive: true,
            change: "up" as const,
          },
        ],
        description: `Token ${axiomToken.name} on ${axiomToken.status}`,
        website: axiomToken.website || `https://example.com/${axiomToken.name}`,
        twitter: axiomToken.xLink || `https://twitter.com/${axiomToken.name}`,
        contract: axiomToken.shortName,
        holders: Number.parseInt(axiomToken.groupCount) || 0,
        transactions24h: Number.parseInt(axiomToken.txCount) || 0,
      };
    } else {
      // Handle ReduxToken type (from types/token.ts)
      const reduxToken = foundToken as ReduxToken;
      const stats = reduxToken.stats && reduxToken.stats.length > 0
        ? reduxToken.stats
        : [
            {
              label: "24h Change",
              value: "+2.5%",
              isPositive: true,
              change: "up" as const,
            },
          ];

      const contract = reduxToken.ticker || reduxToken.id.slice(0, 8) + "...";

      // Generate stable pseudo-random values based on token ID
      const hash = reduxToken.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const holders = (hash % 9000) + 1000; // Stable value between 1000-10000
      const transactions24h = ((hash * 7) % 45000) + 5000; // Stable value between 5000-50000
      
      return {
        id: reduxToken.id,
        name: reduxToken.name,
        ticker: reduxToken.ticker,
        image: reduxToken.image,
        marketCap: reduxToken.marketCap,
        price: reduxToken.price,
        timeframe: reduxToken.timeframe,
        verified: reduxToken.verified ?? true,
        stats,
        description: `${reduxToken.name} is a token in the marketplace with ticker ${reduxToken.ticker}.`,
        website: `https://example.com/${reduxToken.ticker.toLowerCase()}`,
        twitter: `https://twitter.com/${reduxToken.ticker.toLowerCase()}`,
        contract,
        holders,
        transactions24h,
      };
    }
  }, [foundToken]);

  const isLoading = !token && !!tokenId && open;

  const handleCopyContract = () => {
    if (token?.contract) {
      navigator.clipboard.writeText(token.contract);
      setCopied(true);
      toast.success("Contract address copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Remove useEffect that resets copied state

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl border-gray-700 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Token Details</span>
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size={40} />
          </div>
        ) : token ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="relative size-20 shrink-0">
                <Image
                  src={token.image}
                  alt={token.name}
                  className="size-20 rounded-full ring-4 ring-gray-800 object-cover"
                  width={80}
                  height={80}
                  loading="lazy"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-2xl font-semibold">{token.name}</h2>
                  <p className="text-gray-400">{token.ticker}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PriceDisplay price={token.price} className="text-xl" />
                  {token.stats && token.stats.length > 0 && token.stats[0] && (
                    <Badge
                      variant={
                        token.stats[0].isPositive ? "default" : "destructive"
                      }
                    >
                      {token.stats[0].value}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <TrendingUp className="size-4" />
                  <span>Market Cap</span>
                </div>
                <p className="text-lg font-semibold">{token.marketCap}</p>
              </div>

              {token.holders && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Users className="size-4" />
                    <span>Holders</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {token.holders.toLocaleString()}
                  </p>
                </div>
              )}

              {token.transactions24h && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Activity className="size-4" />
                    <span>24h Txns</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {token.transactions24h.toLocaleString()}
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span>Listed</span>
                </div>
                <p className="text-lg font-semibold">{token.timeframe} ago</p>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Detailed Stats */}
            {token.stats.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  Performance
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {token.stats.map((stat, idx) => (
                    <StatBadge key={idx} stat={stat} />
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-gray-700" />

            {/* Description */}
            {token.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                  About
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {token.description}
                </p>
              </div>
            )}

            {/* Contract Address */}
            {token.contract && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                  Contract Address
                </h3>
                <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-3">
                  <code className="flex-1 text-sm font-mono text-gray-300 truncate">
                    {token.contract}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyContract}
                    className="shrink-0"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="text-green-400"
                        >
                          ✓
                        </motion.span>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Copy className="size-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3">
              {token.website && (
                <Button variant="outline" asChild className="flex-1 text-black">
                  <a
                    href={token.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
              {token.twitter && (
                <Button variant="outline" asChild className="flex-1 text-black">
                  <a
                    href={token.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-400">Token not found</div>
        )}
      </DialogContent>
    </Dialog>
  );
});
