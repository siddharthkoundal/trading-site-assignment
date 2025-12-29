import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTokenPrice } from "@/store/tokenSlice";
import { mockWebSocketService } from "@/services/mockWebSocket";
import type { TokenColumn } from "@/types/token";

/**
 * Hook for real-time price updates via WebSocket
 * Handles connection, subscription, and cleanup
 */
export function useRealTimePrice(tokenId: string, column: TokenColumn) {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupWebSocket = async () => {
      try {
        // Connect to WebSocket
        await mockWebSocketService.connect();
        setIsConnected(true);

        // Subscribe to price updates
        unsubscribe = mockWebSocketService.subscribe(tokenId, (data) => {
          dispatch(
            updateTokenPrice({
              tokenId: data.tokenId,
              price: `$${data.price}`,
              column,
            })
          );
        });
      } catch (error) {
        console.error("[useRealTimePrice] Connection error:", error);
        setIsConnected(false);
      }
    };

    setupWebSocket();

    // Cleanup on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [tokenId, column, dispatch]);

  return { isConnected };
}
