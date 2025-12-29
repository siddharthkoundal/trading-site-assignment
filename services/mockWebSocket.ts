/**
 * Mock WebSocket service for real-time price updates
 * Simulates WebSocket behavior with EventEmitter pattern
 */

type PriceUpdateCallback = (data: {
  tokenId: string;
  price: string;
  change: number;
  timestamp: number;
}) => void;

class MockWebSocketService {
  private subscribers: Map<string, PriceUpdateCallback[]> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private isConnected = false;

  /**
   * Connect to mock WebSocket
   */
  connect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        console.log("[WebSocket] Connected");
        resolve();
      }, 100);
    });
  }

  /**
   * Disconnect from mock WebSocket
   */
  disconnect(): void {
    this.isConnected = false;
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
    console.log("[WebSocket] Disconnected");
  }

  /**
   * Subscribe to price updates for a specific token
   */
  subscribe(tokenId: string, callback: PriceUpdateCallback): () => void {
    if (!this.subscribers.has(tokenId)) {
      this.subscribers.set(tokenId, []);
    }

    this.subscribers.get(tokenId)!.push(callback);

    // Start price update simulation for this token
    if (!this.intervals.has(tokenId)) {
      this.startPriceUpdates(tokenId);
    }

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(tokenId);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }

        // Stop updates if no more subscribers
        if (callbacks.length === 0) {
          this.stopPriceUpdates(tokenId);
        }
      }
    };
  }

  /**
   * Start simulated price updates for a token
   */
  private startPriceUpdates(tokenId: string): void {
    const interval = setInterval(() => {
      if (!this.isConnected) return;

      const callbacks = this.subscribers.get(tokenId);
      if (!callbacks || callbacks.length === 0) {
        this.stopPriceUpdates(tokenId);
        return;
      }

      // Generate random price change (-5% to +5%)
      const changePercent = (Math.random() - 0.5) * 10;
      const basePrice = Math.random() * 10 + 0.1;
      const newPrice = basePrice * (1 + changePercent / 100);

      const update = {
        tokenId,
        price: newPrice.toFixed(6),
        change: changePercent,
        timestamp: Date.now(),
      };

      // Notify all subscribers
      callbacks.forEach((callback) => callback(update));
    }, 3000 + Math.random() * 2000); // Random interval 3-5 seconds

    this.intervals.set(tokenId, interval);
  }

  /**
   * Stop price updates for a token
   */
  private stopPriceUpdates(tokenId: string): void {
    const interval = this.intervals.get(tokenId);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(tokenId);
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const mockWebSocketService = new MockWebSocketService();
