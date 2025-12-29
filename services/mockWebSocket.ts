/**
 * Enhanced Mock WebSocket service for HFT-style real-time updates
 * Simulates high-frequency trading dashboard with rapid updates
 */

export type TokenUpdateCallback = (data: {
  tokenId: string;
  marketCap: string;
  volume: string;
  fee: string;
  txCount: string;
  change: number;
  timestamp: number;
}) => void;

class MockWebSocketService {
  private subscribers: Map<string, TokenUpdateCallback[]> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private isConnected = false;
  private baseValues: Map<string, {
    marketCap: number;
    volume: number;
    fee: number;
    txCount: number;
  }> = new Map();

  /**
   * Connect to mock WebSocket
   */
  connect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        console.log("[WebSocket] Connected - HFT mode active");
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
    this.baseValues.clear();
    console.log("[WebSocket] Disconnected");
  }

  /**
   * Subscribe to comprehensive token updates for a specific token
   * HFT-style: Updates every 500-1500ms
   */
  subscribe(tokenId: string, callback: TokenUpdateCallback): () => void {
    if (!this.subscribers.has(tokenId)) {
      this.subscribers.set(tokenId, []);
    }

    this.subscribers.get(tokenId)!.push(callback);

    // Initialize base values if not set
    if (!this.baseValues.has(tokenId)) {
      this.baseValues.set(tokenId, {
        marketCap: Math.random() * 10000 + 1000, // $1K - $11K
        volume: Math.random() * 5000 + 100, // $100 - $5.1K
        fee: Math.random() * 0.5 + 0.01, // 0.01 - 0.51 SOL
        txCount: Math.floor(Math.random() * 50) + 1, // 1-50
      });
    }

    // Start HFT-style price update simulation for this token
    if (!this.intervals.has(tokenId)) {
      this.startTokenUpdates(tokenId);
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
          this.stopTokenUpdates(tokenId);
        }
      }
    };
  }

  /**
   * Start HFT-style token updates (500-1500ms intervals)
   */
  private startTokenUpdates(tokenId: string): void {
    const base = this.baseValues.get(tokenId)!;
    
    const interval = setInterval(() => {
      if (!this.isConnected) return;

      const callbacks = this.subscribers.get(tokenId);
      if (!callbacks || callbacks.length === 0) {
        this.stopTokenUpdates(tokenId);
        return;
      }

      // Generate realistic market movements (-3% to +3% for HFT)
      const changePercent = (Math.random() - 0.5) * 6; // Smaller range for HFT
      
      // Update market cap
      const marketCapChange = base.marketCap * (changePercent / 100);
      const newMarketCap = Math.max(100, base.marketCap + marketCapChange);
      base.marketCap = newMarketCap;

      // Update volume (can change more dramatically)
      const volumeChange = base.volume * ((Math.random() - 0.5) * 20 / 100);
      const newVolume = Math.max(10, base.volume + volumeChange);
      base.volume = newVolume;

      // Update fee (smaller changes)
      const feeChange = base.fee * ((Math.random() - 0.5) * 5 / 100);
      const newFee = Math.max(0.001, base.fee + feeChange);
      base.fee = newFee;

      // Update transaction count (increment occasionally)
      if (Math.random() > 0.7) {
        base.txCount = Math.max(1, base.txCount + (Math.random() > 0.5 ? 1 : -1));
      }

      // Format values
      const marketCapFormatted = newMarketCap >= 1000 
        ? `$${(newMarketCap / 1000).toFixed(2)}K`
        : `$${newMarketCap.toFixed(0)}`;
      
      const volumeFormatted = newVolume >= 1000
        ? `$${(newVolume / 1000).toFixed(1)}K`
        : `$${newVolume.toFixed(0)}`;

      const update = {
        tokenId,
        marketCap: marketCapFormatted,
        volume: volumeFormatted,
        fee: newFee.toFixed(3),
        txCount: base.txCount.toString(),
        change: changePercent,
        timestamp: Date.now(),
      };

      // Notify all subscribers
      callbacks.forEach((callback) => callback(update));
    }, 4000 + Math.random() * 1000); // HFT: 500-1500ms intervals

    this.intervals.set(tokenId, interval);
  }

  /**
   * Stop token updates for a token
   */
  private stopTokenUpdates(tokenId: string): void {
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
