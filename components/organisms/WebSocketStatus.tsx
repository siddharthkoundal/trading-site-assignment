"use client";

import { memo } from "react";
import { mockWebSocketService } from "@/services/mockWebSocket";
import { cn } from "@/utils/cn";

/**
 * WebSocket connection status indicator
 * Shows live connection status for HFT dashboard
 */
export const WebSocketStatus = memo(function WebSocketStatus() {
  const isConnected = mockWebSocketService.getConnectionStatus();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-[rgba(255,255,255,0.1)] backdrop-blur-sm">
      <div
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-300",
          isConnected
            ? "bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse"
            : "bg-[#ef4444]"
        )}
      />
      <span className="text-[10px] text-white font-medium">
        {isConnected ? "LIVE" : "OFFLINE"}
      </span>
    </div>
  );
});

