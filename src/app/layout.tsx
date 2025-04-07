import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Navigation, Providers } from '@/shared';
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header className='flex justify-between p-2'>
          <Navigation className='h-full' items={NAVS} />
        </Header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

const NAVS = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Post' },
  { href: '/movies', label: 'Movie' },
];
