import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Data is immediately stale, allowing refetches
      refetchOnWindowFocus: true, // Refetch when window regains focus
      refetchOnMount: true, // Always refetch on component mount
      retry: 3, // Retry failed queries 3 times
    },
    mutations: {
      retry: 1, // Retry failed mutations once
    },
  },
});
