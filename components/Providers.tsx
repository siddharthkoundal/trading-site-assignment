"use client";

import { useEffect } from "react";
import { mockWebSocketService } from "@/services/mockWebSocket";

/**
 * Global WebSocket connection manager
 * Defers connection to avoid blocking initial render
 */
export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Defer WebSocket connection to avoid blocking initial render
    // Use requestIdleCallback if available, otherwise setTimeout
    const connectWebSocket = () => {
      mockWebSocketService.connect().catch((error) => {
        console.error("[WebSocketProvider] Failed to connect:", error);
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      // Wait for browser idle to connect WebSocket (non-blocking)
      const idleCallbackId = window.requestIdleCallback(connectWebSocket, {
        timeout: 2000, // Connect within 2s even if browser isn't idle
      });
      return () => {
        window.cancelIdleCallback(idleCallbackId);
        mockWebSocketService.disconnect();
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(connectWebSocket, 100);
      return () => {
        clearTimeout(timeoutId);
        mockWebSocketService.disconnect();
      };
    }
  }, []);

  return <>{children}</>;
}
