"use client";

import { memo, useState, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AxiomTokenTable } from "../organisms/AxiomTokenTable";
import { TokenDetailModal } from "../organisms/TokenDetailModal";
import { WebSocketStatus } from "../organisms/WebSocketStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Token } from "../../mocks/mockTokens";
import type { TokenColumn } from "@/types/token";

/**
 * Main Axiom Trade Dashboard
 * Pixel-perfect replica of axiom.trade/pulse
 */

function ErrorFallback({
  error,
  resetErrorBoundary,
}: Readonly<{
  error: Error;
  resetErrorBoundary: () => void;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="size-4" />
        <AlertDescription className="mt-2">
          <p className="font-semibold">Something went wrong</p>
          <p className="text-sm mt-1">{error.message}</p>
          <Button
            onClick={resetErrorBoundary}
            className="mt-4"
            variant="outline"
          >
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export const AxiomDashboard = memo(function AxiomDashboard() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<TokenColumn>("newPairs");

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedToken(null), 300);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-black text-white w-full">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden sticky top-0 z-40 bg-black border-b border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveColumn("newPairs")}
              className={cn(
                "flex-1 py-3 px-2 text-sm font-medium transition-colors",
                activeColumn === "newPairs"
                  ? "text-white border-b-2 border-white"
                  : "text-[#6b7280] hover:text-white"
              )}
            >
              New Pairs
            </button>
            <button
              onClick={() => setActiveColumn("finalStretch")}
              className={cn(
                "flex-1 py-3 px-2 text-sm font-medium transition-colors",
                activeColumn === "finalStretch"
                  ? "text-white border-b-2 border-white"
                  : "text-[#6b7280] hover:text-white"
              )}
            >
              Final Stretch
            </button>
            <button
              onClick={() => setActiveColumn("migrated")}
              className={cn(
                "flex-1 py-3 px-2 text-sm font-medium transition-colors",
                activeColumn === "migrated"
                  ? "text-white border-b-2 border-white"
                  : "text-[#6b7280] hover:text-white"
              )}
            >
              Migrated
            </button>
          </div>
        </div>

        {/* Main Content - Three Column Layout on Desktop, Single Column on Mobile */}
        <main className="w-full h-screen lg:h-auto lg:min-h-screen flex flex-col lg:flex-row">
          {/* New Pairs Column */}
          <ErrorBoundary
            FallbackComponent={({ error }) => (
              <div className="flex-1 border-r border-[rgba(255,255,255,0.1)] p-4">
                <div className="rounded-lg border border-red-900 bg-red-900/10 p-4">
                  <p className="text-sm text-red-400">Failed to load New Pairs</p>
                  <p className="text-xs text-gray-500 mt-1">{error.message}</p>
                </div>
              </div>
            )}
          >
            <div className={cn(
              "flex-1 h-full overflow-hidden",
              "lg:border-r border-[rgba(255,255,255,0.1)]",
              activeColumn !== "newPairs" && "hidden lg:block"
            )}>
              <AxiomTokenTable
                column="newPairs"
                onTokenClick={handleTokenClick}
              />
            </div>
          </ErrorBoundary>

          {/* Final Stretch Column */}
          <ErrorBoundary
            FallbackComponent={({ error }) => (
              <div className="flex-1 border-r border-[rgba(255,255,255,0.1)] p-4">
                <div className="rounded-lg border border-red-900 bg-red-900/10 p-4">
                  <p className="text-sm text-red-400">Failed to load Final Stretch</p>
                  <p className="text-xs text-gray-500 mt-1">{error.message}</p>
                </div>
              </div>
            )}
          >
            <div className={cn(
              "flex-1 h-full overflow-hidden",
              "lg:border-r border-[rgba(255,255,255,0.1)]",
              activeColumn !== "finalStretch" && "hidden lg:block"
            )}>
              <AxiomTokenTable
                column="finalStretch"
                onTokenClick={handleTokenClick}
              />
            </div>
          </ErrorBoundary>

          {/* Migrated Column */}
          <ErrorBoundary
            FallbackComponent={({ error }) => (
              <div className="flex-1 p-4">
                <div className="rounded-lg border border-red-900 bg-red-900/10 p-4">
                  <p className="text-sm text-red-400">Failed to load Migrated</p>
                  <p className="text-xs text-gray-500 mt-1">{error.message}</p>
                </div>
              </div>
            )}
          >
            <div className={cn(
              "flex-1 h-full overflow-hidden",
              activeColumn !== "migrated" && "hidden lg:block"
            )}>
              <AxiomTokenTable
                column="migrated"
                onTokenClick={handleTokenClick}
              />
            </div>
          </ErrorBoundary>
        </main>

        {/* Token Detail Modal */}
        {selectedToken && (
          <TokenDetailModal
            tokenId={selectedToken.id}
            open={modalOpen}
            onClose={handleModalClose}
          />
        )}

        {/* WebSocket Status Indicator */}
        <WebSocketStatus />
      </div>
    </ErrorBoundary>
  );
});

