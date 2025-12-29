import { useEffect, useCallback, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTokenPrice } from "@/store/tokenSlice";
import type { TokenColumn } from "@/types/token";

interface WebSocketMessage {
  type: "price_update";
  tokenId: string;
  price: string;
  column: TokenColumn;
}

/**
 * Custom hook for WebSocket connection with automatic reconnection
 * Simulates real-time price updates
 */
export function useWebSocket(enabled: boolean = true) {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const simulatePriceUpdates = () => {
    // Mock real-time price updates
    const interval = setInterval(() => {
      const mockMessage: WebSocketMessage = {
        type: "price_update",
        tokenId: `token-${Math.floor(Math.random() * 10)}`,
        price: `$${(Math.random() * 1000).toFixed(2)}`,
        column: ["newPairs", "finalStretch", "migrated"][
          Math.floor(Math.random() * 3)
        ] as TokenColumn,
      };

      dispatch(updateTokenPrice(mockMessage));
    }, 2000);

    // Store cleanup function
    ws.current = {
      close: () => clearInterval(interval),
    } as any;
  };

  const connect = useCallback(() => {
    if (!enabled) return;

    // Mock WebSocket connection for demo purposes
    // Replace with real WebSocket URL in production
    const mockWsUrl = "ws://localhost:8080/prices";

    try {
      // Simulate WebSocket - in production, use: new WebSocket(mockWsUrl)
      simulatePriceUpdates();
    } catch (error) {
      console.error("WebSocket connection error:", error);
      scheduleReconnect();
    }
  }, [enabled]);

  const scheduleReconnect = () => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    const delay = Math.min(
      1000 * Math.pow(2, reconnectAttempts.current),
      30000
    );
    reconnectAttempts.current += 1;

    reconnectTimeout.current = setTimeout(() => {
      console.log(`Reconnecting... (attempt ${reconnectAttempts.current})`);
      connect();
    }, delay);
  };

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [connect]);

  return {
    isConnected: !!ws.current,
    reconnect: connect,
  };
}
