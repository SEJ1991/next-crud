'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
}
export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={CLIENT}>
      <ThemeProvider attribute='class'>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

const CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});
