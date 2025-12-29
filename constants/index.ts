/**
 * Application-wide constants
 */

/**
 * WebSocket configuration
 */
export const WEBSOCKET_CONFIG = {
  RECONNECT_DELAY: 3000,
  MAX_RECONNECT_ATTEMPTS: 5,
  PING_INTERVAL: 30000,
  UPDATE_INTERVAL: 3000,
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "https://api.example.com",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

/**
 * Cache configuration
 */
export const CACHE_CONFIG = {
  STALE_TIME: 30000, // 30 seconds
  CACHE_TIME: 300000, // 5 minutes
  REFETCH_INTERVAL: 60000, // 1 minute
} as const;

/**
 * UI constants
 */
export const UI_CONFIG = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  THROTTLE_DELAY: 1000,
  SKELETON_COUNT: 5,
} as const;

/**
 * Performance thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  SLOW_RENDER_MS: 16, // 60fps threshold
  SLOW_API_MS: 1000,
  MAX_LIST_SIZE: 100,
  VIRTUAL_SCROLL_THRESHOLD: 50,
} as const;

/**
 * Token columns
 */
export const TOKEN_COLUMNS = {
  NEW_PAIRS: "newPairs",
  FINAL_STRETCH: "finalStretch",
  MIGRATED: "migrated",
} as const;

/**
 * Column titles
 */
export const COLUMN_TITLES = {
  [TOKEN_COLUMNS.NEW_PAIRS]: "New Pairs",
  [TOKEN_COLUMNS.FINAL_STRETCH]: "Final Stretch",
  [TOKEN_COLUMNS.MIGRATED]: "Migrated",
} as const;

/**
 * Sort options
 */
export const SORT_OPTIONS = {
  TIME: "time",
  MARKET_CAP: "marketCap",
  PRICE: "price",
  CHANGE: "change",
} as const;

/**
 * Breakpoints (matches Tailwind defaults)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Color scheme
 */
export const COLORS = {
  positive: "#10b981", // green-500
  negative: "#ef4444", // red-500
  neutral: "#6b7280", // gray-500
  accent: "#3b82f6", // blue-500
  warning: "#f59e0b", // amber-500
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: "app-theme",
  SETTINGS: "app-settings",
  FAVORITES: "user-favorites",
  SORT_PREFERENCES: "sort-preferences",
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  FETCH_FAILED: "Failed to fetch data. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT: "Request timed out. Please try again.",
  UNKNOWN: "An unexpected error occurred.",
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  COPIED: "Copied to clipboard!",
  SAVED: "Settings saved successfully!",
  UPDATED: "Data updated!",
} as const;
