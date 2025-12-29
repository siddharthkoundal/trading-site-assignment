import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  Token,
  TokenColumn,
  SortOption,
  ColumnState,
} from "@/types/token";

interface TokenState {
  newPairs: ColumnState;
  finalStretch: ColumnState;
  migrated: ColumnState;
  priceUpdateQueue: Map<string, number>;
}

const initialColumnState: ColumnState = {
  tokens: [],
  sortBy: "time",
  filters: [],
  isLoading: false,
  error: null,
};

const initialState: TokenState = {
  newPairs: { ...initialColumnState },
  finalStretch: { ...initialColumnState },
  migrated: { ...initialColumnState },
  priceUpdateQueue: new Map(),
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ column: TokenColumn; tokens: Token[] }>
    ) => {
      state[action.payload.column].tokens = action.payload.tokens;
      state[action.payload.column].isLoading = false;
    },

    updateTokenPrice: (
      state,
      action: PayloadAction<{
        tokenId: string;
        price: string;
        column: TokenColumn;
      }>
    ) => {
      const token = state[action.payload.column].tokens.find(
        (t) => t.id === action.payload.tokenId
      );
      if (token) {
        token.price = action.payload.price;
        token.lastUpdate = Date.now();
      }
    },

    updateTokenData: (
      state,
      action: PayloadAction<{
        tokenId: string;
        column: TokenColumn;
        marketCap?: string;
        volume?: string;
        fee?: string;
        txCount?: string;
        change?: number;
      }>
    ) => {
      const token = state[action.payload.column].tokens.find(
        (t) => t.id === action.payload.tokenId
      );
      if (token) {
        if (action.payload.marketCap !== undefined) {
          token.marketCap = action.payload.marketCap;
        }
        if (action.payload.volume !== undefined) {
          // Store additional fields on token object
          (token as any).volume = action.payload.volume;
        }
        if (action.payload.fee !== undefined) {
          (token as any).fee = action.payload.fee;
        }
        if (action.payload.txCount !== undefined) {
          (token as any).txCount = action.payload.txCount;
        }
        token.lastUpdate = Date.now();
      }
    },

    setSorting: (
      state,
      action: PayloadAction<{ column: TokenColumn; sortBy: SortOption }>
    ) => {
      state[action.payload.column].sortBy = action.payload.sortBy;
    },

    setFilters: (
      state,
      action: PayloadAction<{ column: TokenColumn; filters: string[] }>
    ) => {
      state[action.payload.column].filters = action.payload.filters;
    },

    setLoading: (
      state,
      action: PayloadAction<{ column: TokenColumn; isLoading: boolean }>
    ) => {
      state[action.payload.column].isLoading = action.payload.isLoading;
    },

    setError: (
      state,
      action: PayloadAction<{ column: TokenColumn; error: string | null }>
    ) => {
      state[action.payload.column].error = action.payload.error;
      state[action.payload.column].isLoading = false;
    },
  },
});

export const {
  setTokens,
  updateTokenPrice,
  updateTokenData,
  setSorting,
  setFilters,
  setLoading,
  setError,
} = tokenSlice.actions;

export default tokenSlice.reducer;
