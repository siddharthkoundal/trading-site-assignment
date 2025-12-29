"use client";

import { memo, useState, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DashboardHeader } from "../organisms/DashboardHeader";
import { EnhancedTokenColumn } from "../organisms/EnhancedTokenColumn";
import { TokenDetailModal } from "../organisms/TokenDetailModal";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

/**
 * Main crypto trading dashboard template (Template)
 * Orchestrates all dashboard components with error boundaries
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

export const CryptoTradingDashboard = memo(function CryptoTradingDashboard() {
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTokenClick = useCallback((tokenId: string) => {
    setSelectedTokenId(tokenId);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    // Delay clearing the token ID to allow modal exit animation
    setTimeout(() => setSelectedTokenId(null), 300);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-black text-white w-full">
        <DashboardHeader />

        <main className="w-full px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)] w-full">
            {/* New Pairs Column */}
            <ErrorBoundary
              FallbackComponent={({ error }) => (
                <div className="rounded-lg border border-red-900 bg-red-900/10 p-4">
                  <p className="text-sm text-red-400">
                    Failed to load New Pairs
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{error.message}</p>
                </div>
              )}
            >
              <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4 h-full overflow-y-auto">
                <EnhancedTokenColumn
                  column="newPairs"
                  title="New Pairs"
                  onTokenClick={handleTokenClick}
                />
              </div>
            </ErrorBoundary>

            {/* Final Stretch Column */}
            <ErrorBoundary
              FallbackComponent={({ error }) => (
                <div className="rounded-lg border border-red-900 bg-red-900/10 p-4">
                  <p className="text-sm text-red-400">
                    Failed to load Final Stretch
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{error.message}</p>
                </div>
              )}
            >
              <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4 h-full overflow-y-auto">
                <EnhancedTokenColumn
                  column="finalStretch"
                  title="Final Stretch"
                  onTokenClick={handleTokenClick}
                />
              </div>
            </ErrorBoundary>

            {/* Migrated Column */}
            <ErrorBoundary
              FallbackComponent={({ error }) => (
                <div className="rounded-lg border border-red-900 bg-red-900/10 p-4">
                  <p className="text-sm text-red-400">
                    Failed to load Migrated
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{error.message}</p>
                </div>
              )}
            >
              <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4 h-full overflow-y-auto">
                <EnhancedTokenColumn
                  column="migrated"
                  title="Migrated"
                  onTokenClick={handleTokenClick}
                />
              </div>
            </ErrorBoundary>
          </div>
        </main>

        {/* Token Detail Modal */}
        <TokenDetailModal
          tokenId={selectedTokenId}
          open={modalOpen}
          onClose={handleModalClose}
        />
      </div>
    </ErrorBoundary>
  );
});
