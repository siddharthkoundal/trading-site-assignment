import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTokenData } from "@/store/tokenSlice";
import { mockWebSocketService } from "@/services/mockWebSocket";
import type { TokenColumn } from "@/types/token";

/**
 * Enhanced hook for HFT-style real-time token updates via WebSocket
 * Updates market cap, volume, fee, tx count with smooth transitions
 */
export function useTokenWebSocket(
  tokenId: string,
  column: TokenColumn,
  initialMarketCap?: string
) {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const [priceChange, setPriceChange] = useState<"up" | "down" | null>(null);
  const prevMarketCapRef = useRef<string>(initialMarketCap || "0");

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let connectionCheckInterval: NodeJS.Timeout | null = null;

    const setupWebSocket = () => {
      try {
        // Check connection status (connection is managed by WebSocketProvider)
        setIsConnected(mockWebSocketService.getConnectionStatus());

        // Subscribe to comprehensive token updates
        unsubscribe = mockWebSocketService.subscribe(tokenId, (data) => {
          // Determine price change direction
          const prevValue = parseFloat(prevMarketCapRef.current.replace(/[^0-9.]/g, ""));
          const newValue = parseFloat(data.marketCap.replace(/[^0-9.]/g, ""));
          
          if (prevValue > 0) {
            if (newValue > prevValue) {
              setPriceChange("up");
            } else if (newValue < prevValue) {
              setPriceChange("down");
            }
            
            // Clear flash after animation
            setTimeout(() => setPriceChange(null), 800);
          }
          
          prevMarketCapRef.current = data.marketCap;

          // Dispatch comprehensive update to Redux
          dispatch(
            updateTokenData({
              tokenId: data.tokenId,
              column,
              marketCap: data.marketCap,
              volume: data.volume,
              fee: data.fee,
              txCount: data.txCount,
              change: data.change,
            })
          );
        });

        // Periodically check connection status (in case it connects later)
        connectionCheckInterval = setInterval(() => {
          setIsConnected(mockWebSocketService.getConnectionStatus());
        }, 1000);
      } catch (error) {
        console.error("[useTokenWebSocket] Subscription error:", error);
        setIsConnected(false);
      }
    };

    setupWebSocket();

    // Cleanup on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (connectionCheckInterval) {
        clearInterval(connectionCheckInterval);
      }
    };
  }, [tokenId, column, dispatch]);

  return { isConnected, priceChange };
}

