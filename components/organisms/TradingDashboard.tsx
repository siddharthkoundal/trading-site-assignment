import React, { useState, useCallback } from "react";
import { Header } from "../Header";
import { PulseControls } from "../PulseControls";
import { TokenColumn } from "./TokenColumn";
import { TokenDetailModal } from "./TokenDetailModal";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setTokens, setSorting } from "@/store/tokenSlice";
import { toast } from "sonner";
import type {
  Token,
  TokenColumn as TokenColumnType,
  SortOption,
} from "@/types/token";
import imgImage1 from "figma:asset/39945d1289c636f2c1e077037b226d7ce9a8bf40.png";

/**
 * Main trading dashboard organism
 * Coordinates all columns and global state
 */
export const TradingDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Connect to WebSocket for real-time updates
  const { isConnected } = useWebSocket(true);

  // Get state from Redux
  const { newPairs, finalStretch, migrated } = useAppSelector(
    (state) => state.tokens
  );

  // Mock data initialization
  React.useEffect(() => {
    const mockNewPairs: Token[] = [
      {
        id: "1",
        image:
          "https://images.unsplash.com/photo-1659010878130-ae8b703bd3ee?w=100&h=100&fit=crop",
        name: "UTCC Utopian Contributor Coin",
        ticker: "8x",
        marketCap: "$3.64K",
        price: "$3K",
        timeframe: "2w",
        accentColor: "bg-green-500",
        verified: true,
        badges: [
          { icon: <span>🔒</span>, value: "0/0" },
          { icon: <span>📝</span>, value: "0" },
        ],
        stats: [
          { label: "1%", value: "0%" },
          { label: "24h", value: "3.5m", isPositive: true },
          { label: "Vol", value: "0%" },
        ],
      },
      {
        id: "2",
        image:
          "https://images.unsplash.com/photo-1649274496773-c40eacd66e2d?w=100&h=100&fit=crop",
        name: "Suitcoiners",
        ticker: "77s",
        marketCap: "$4.93K",
        price: "$12",
        timeframe: "1d",
        accentColor: "bg-blue-400",
        verified: true,
        stats: [
          { label: "10%", value: "10%" },
          { label: "DB", value: "3h", isPositive: false },
        ],
      },
      {
        id: "3",
        image: imgImage1,
        name: "JUSTICE ElonBolledInTar",
        ticker: "38s",
        marketCap: "$3.46K",
        price: "$43",
        timeframe: "3h",
        accentColor: "bg-purple-600",
        verified: false,
        stats: [
          { label: "0%", value: "0%" },
          { label: "DE", value: "6d", isPositive: false },
        ],
      },
    ];

    const mockFinalStretch: Token[] = [
      {
        id: "4",
        image:
          "https://images.unsplash.com/photo-1666816943035-15c29931e975?w=100&h=100&fit=crop",
        name: "Velo",
        ticker: "20h",
        marketCap: "$25.1K",
        price: "$10K",
        timeframe: "1d",
        accentColor: "bg-pink-500",
        verified: true,
        stats: [
          { label: "1%", value: "0%", isPositive: false },
          { label: "1%", value: "43m", isPositive: false },
        ],
      },
      {
        id: "5",
        image:
          "https://images.unsplash.com/photo-1608603742375-4ec9f53da578?w=100&h=100&fit=crop",
        name: "SPHR SPHERE",
        ticker: "4d",
        marketCap: "$2.66M",
        price: "$2",
        timeframe: "2w",
        accentColor: "bg-blue-600",
        verified: false,
        stats: [
          { label: "1%", value: "1%", isPositive: false },
          { label: "0%", value: "16d", isPositive: true },
        ],
      },
    ];

    const mockMigrated: Token[] = [
      {
        id: "6",
        image: imgImage1,
        name: "OP One Piece",
        ticker: "11s",
        marketCap: "$45.6K",
        price: "$10K",
        timeframe: "2w",
        accentColor: "bg-orange-500",
        verified: true,
        stats: [
          { label: "76%", value: "76%", isPositive: true },
          { label: "78%", value: "1h", isPositive: true },
        ],
      },
      {
        id: "7",
        image:
          "https://images.unsplash.com/photo-1666816943035-15c29931e975?w=100&h=100&fit=crop",
        name: "COCACOLA Coca-Cola",
        ticker: "1d",
        marketCap: "$52.5K",
        price: "$0",
        timeframe: "3d",
        accentColor: "bg-red-600",
        verified: false,
        stats: [
          { label: "76%", value: "76%", isPositive: true },
          { label: "74%", value: "1h", isPositive: false },
        ],
      },
    ];

    dispatch(setTokens({ column: "newPairs", tokens: mockNewPairs }));
    dispatch(setTokens({ column: "finalStretch", tokens: mockFinalStretch }));
    dispatch(setTokens({ column: "migrated", tokens: mockMigrated }));
  }, [dispatch]);

  const handleTokenClick = useCallback((token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
    toast.info(`Viewing ${token.name}`);
  }, []);

  const handleSortChange = useCallback(
    (column: TokenColumnType, sortBy: SortOption) => {
      dispatch(setSorting({ column, sortBy }));
      toast.success(`Sorted by ${sortBy}`);
    },
    [dispatch]
  );

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <PulseControls />

      <div className="flex-1 grid grid-cols-3 overflow-hidden">
        <TokenColumn
          title="New Pairs"
          count={newPairs.tokens.length}
          tokens={newPairs.tokens}
          isLoading={newPairs.isLoading}
          filters={["P1", "P2", "P3"]}
          sortBy={newPairs.sortBy}
          onTokenClick={handleTokenClick}
          onSortChange={(sortBy) => handleSortChange("newPairs", sortBy)}
        />

        <TokenColumn
          title="Final Stretch"
          count={finalStretch.tokens.length}
          tokens={finalStretch.tokens}
          isLoading={finalStretch.isLoading}
          filters={["P1", "P2", "P3"]}
          sortBy={finalStretch.sortBy}
          onTokenClick={handleTokenClick}
          onSortChange={(sortBy) => handleSortChange("finalStretch", sortBy)}
        />

        <TokenColumn
          title="Migrated"
          count={migrated.tokens.length}
          tokens={migrated.tokens}
          isLoading={migrated.isLoading}
          filters={["P1", "P2", "P3"]}
          sortBy={migrated.sortBy}
          onTokenClick={handleTokenClick}
          onSortChange={(sortBy) => handleSortChange("migrated", sortBy)}
        />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-2 flex items-center justify-between bg-black text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span
              className={`${isConnected ? "text-green-400" : "text-red-400"}`}
            >
              ●
            </span>
            {isConnected ? "Connection is stable" : "Reconnecting..."}
          </span>
          <span>GLOBAL</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-white transition-colors">
            $162379
          </button>
        </div>
      </div>

      {/* Token Detail Modal */}
      {selectedToken && (
        <TokenDetailModal
          token={selectedToken}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedToken(null);
          }}
        />
      )}
    </div>
  );
};
