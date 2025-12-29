import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setTokens, setLoading, setError } from "@/store/tokenSlice";
import { fetchTokens } from "@/services/tokenApi";
import type { TokenColumn } from "@/types/token";

/**
 * Hook for fetching tokens using React Query
 * Automatically syncs with Redux store
 */
export function useTokenQuery(column: TokenColumn) {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ["tokens", column],
    queryFn: () => fetchTokens(column),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
    retry: 3,
  });

  // Sync query state with Redux
  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading({ column, isLoading: true }));
    } else if (query.isError) {
      dispatch(
        setError({
          column,
          error: query.error?.message || "Failed to fetch tokens",
        })
      );
    } else if (query.data) {
      dispatch(setTokens({ column, tokens: query.data }));
    }
  }, [
    query.isLoading,
    query.isError,
    query.data,
    query.error,
    column,
    dispatch,
  ]);

  return query;
}
