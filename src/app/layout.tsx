import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Providers, ThemeButton, HorizontalLinkListWithIndicator } from '@/shared';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'N-CRUD | HOME',
  description: 'Next.js CRUD reference website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-content-width mx-auto bg-theme-primary`}
      >
        <Providers>
          <Header className='flex justify-between p-2'>
            <nav>
              <HorizontalLinkListWithIndicator
                items={LINKS}
                indicatorProps={{
                  layoutId: 'header-indicator',
                }}
              />
            </nav>
            <ThemeButton />
          </Header>
          {children}
        </Providers>
      </body>
    </html>
  );
}

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Post' },
  { href: '/movies', label: 'Movie' },
];
