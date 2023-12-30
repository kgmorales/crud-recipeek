import { QueryClient } from '@tanstack/react-query';

const oneDayTime = 24 * 60 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: oneDayTime,
      gcTime: oneDayTime,
    },
  },
});
