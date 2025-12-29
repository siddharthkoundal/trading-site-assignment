# HFT WebSocket Integration

## Overview
The Axiom Trade dashboard now features **High-Frequency Trading (HFT) style live updates** via WebSocket, providing real-time updates for all token metrics with smooth visual transitions.

## Features

### ✅ Real-Time Updates
- **Update Frequency**: 500-1500ms intervals (HFT-style rapid updates)
- **Updated Metrics**:
  - Market Cap (MC) - with color-coded flash animations
  - Volume (V) - live trading volume
  - Fee (F) - transaction fees in SOL
  - Transaction Count (TX) - number of transactions

### ✅ Visual Feedback
- **Price Flash Animations**: 
  - Green flash for price increases
  - Red flash for price decreases
  - 800ms animation duration
  - Smooth color transitions

### ✅ Connection Status
- **Live Status Indicator**: Bottom-right corner shows connection status
  - Green pulsing dot = Connected (LIVE)
  - Red dot = Disconnected (OFFLINE)

## Architecture

### WebSocket Service (`services/mockWebSocket.ts`)
- Enhanced mock WebSocket service for HFT-style updates
- Maintains base values for each token
- Generates realistic market movements (-3% to +3%)
- Updates every 500-1500ms per token

### Redux Integration (`store/tokenSlice.ts`)
- New `updateTokenData` action for comprehensive updates
- Stores live market cap, volume, fee, and tx count
- Maintains update timestamps

### Custom Hook (`hooks/useTokenWebSocket.ts`)
- `useTokenWebSocket` hook for subscribing to token updates
- Automatically dispatches updates to Redux
- Tracks price change direction for flash animations
- Handles connection lifecycle

### Component Integration
- `AxiomTokenRow` subscribes to WebSocket updates via hook
- Displays live data from Redux state
- Shows color-coded price changes
- Connection status affects time indicator color

## Usage

### Automatic Connection
The WebSocket connection is automatically established when the app loads via `WebSocketProvider` in the root layout.

### Per-Token Subscriptions
Each `AxiomTokenRow` component automatically:
1. Subscribes to WebSocket updates on mount
2. Receives live updates every 500-1500ms
3. Updates Redux state with new values
4. Displays updated values with flash animations
5. Unsubscribes on unmount

### Update Flow
```
WebSocket Service → useTokenWebSocket Hook → Redux Store → AxiomTokenRow Component
```

## Performance

- **Efficient Updates**: Only subscribed tokens receive updates
- **Memoized Components**: Prevents unnecessary re-renders
- **Smooth Animations**: CSS transitions for visual feedback
- **Automatic Cleanup**: Unsubscribes when components unmount

## Visual Indicators

1. **Market Cap Color**:
   - Blue (`#52c5ff`) - Normal
   - Green (`#22c55e`) - Price increase (flash)
   - Red (`#ef4444`) - Price decrease (flash)

2. **Time Indicator**:
   - Green - WebSocket connected
   - Gray - WebSocket disconnected

3. **Connection Status Badge**:
   - Bottom-right corner
   - Shows "LIVE" when connected
   - Shows "OFFLINE" when disconnected

## Configuration

### Update Frequency
Modify in `services/mockWebSocket.ts`:
```typescript
}, 500 + Math.random() * 1000); // 500-1500ms
```

### Price Change Range
Modify in `services/mockWebSocket.ts`:
```typescript
const changePercent = (Math.random() - 0.5) * 6; // -3% to +3%
```

## Future Enhancements

1. **Real WebSocket Integration**: Replace mock service with actual WebSocket
2. **Batch Updates**: Group multiple token updates for efficiency
3. **Update History**: Track price history for charts
4. **Custom Intervals**: Allow users to configure update frequency
5. **Reconnection Logic**: Automatic reconnection on connection loss

