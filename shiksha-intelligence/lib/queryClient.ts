import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 minutes before refetch
      retry: 2,
      refetchOnWindowFocus: false,    // mobile apps don't "focus" like web
    },
    mutations: {
      retry: 1,
    },
  },
});
