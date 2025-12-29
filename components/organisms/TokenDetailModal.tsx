"use client";

import { memo, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  X,
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
import { fetchTokenDetails } from "@/services/tokenApi";
import { toast } from "sonner";

/**
 * Token detail modal with comprehensive information (Organism)
 */

interface TokenDetailModalProps {
  tokenId: string | null;
  open: boolean;
  onClose: () => void;
}

export const TokenDetailModal = memo(function TokenDetailModal({
  tokenId,
  open,
  onClose,
}: TokenDetailModalProps) {
  const [copied, setCopied] = useState(false);

  // Wrap onClose to reset copied state
  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  const { data: token, isLoading } = useQuery({
    queryKey: ["tokenDetails", tokenId],
    queryFn: () => fetchTokenDetails(tokenId!),
    enabled: !!tokenId && open,
  });

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
              <img
                src={token.image}
                alt={token.name}
                className="size-20 rounded-full ring-4 ring-gray-800"
              />
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-2xl font-semibold">{token.name}</h2>
                  <p className="text-gray-400">{token.ticker}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PriceDisplay price={token.price} className="text-xl" />
                  {token.stats[0] && (
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
                    className="flex-shrink-0"
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
                <Button variant="outline" asChild className="flex-1">
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
                <Button variant="outline" asChild className="flex-1">
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
