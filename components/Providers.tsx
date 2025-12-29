"use client";

import { useEffect } from "react";
import { mockWebSocketService } from "@/services/mockWebSocket";

/**
 * Global WebSocket connection manager
 * Establishes connection on app mount for HFT dashboard
 */
export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Establish WebSocket connection on mount
    mockWebSocketService.connect().catch((error) => {
      console.error("[WebSocketProvider] Failed to connect:", error);
    });

    // Cleanup on unmount
    return () => {
      mockWebSocketService.disconnect();
    };
  }, []);

  return <>{children}</>;
}
