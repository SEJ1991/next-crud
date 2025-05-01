'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}
export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={CLIENT}>
      <ThemeProvider attribute='class'>
        <LowLevelProviders>{children}</LowLevelProviders>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function LowLevelProviders({ children }: Props) {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    toast.dismiss();
  }, [pathname]);

  return (
    <>
      <Toaster position='top-center' theme={(theme as 'dark' | 'light' | undefined) ?? 'system'} />
      {children}
    </>
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
