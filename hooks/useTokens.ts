import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Token, TokenColumn } from "@/types/token";

// Mock API functions - replace with real API calls
const fetchTokens = async (column: TokenColumn): Promise<Token[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data based on column
  return generateMockTokens(column);
};

const generateMockTokens = (column: TokenColumn): Token[] => {
  // Mock data generation logic
  const mockData: Record<TokenColumn, Token[]> = {
    newPairs: [],
    finalStretch: [],
    migrated: [],
  };

  return mockData[column];
};

export function useTokens(column: TokenColumn) {
  return useQuery({
    queryKey: ["tokens", column],
    queryFn: () => fetchTokens(column),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}

export function useTokenMutation(column: TokenColumn) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: Token) => {
      // Mock mutation
      await new Promise((resolve) => setTimeout(resolve, 100));
      return token;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokens", column] });
    },
  });
}
