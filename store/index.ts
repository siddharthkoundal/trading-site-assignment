import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["tokens/setPriceUpdateQueue"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.priceUpdateQueue"],
        // Ignore these paths in the state
        ignoredPaths: ["tokens.priceUpdateQueue"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
