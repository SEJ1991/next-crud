'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import React from 'react';

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
      gcTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
