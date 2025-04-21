'use client';
import { NextLink } from '@/shared';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function MovieNav(props: ComponentPropsWithoutRef<'nav'>) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav {...props} className={twMerge('flex gap-2 sm:gap-4', props.className)}>
      {LINKS.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <div key={href} className='relative'>
            <NextLink href={href} className='text-sm sm:text-base'>
              {label}
            </NextLink>
            {mounted && isActive && (
              <motion.div
                layoutId='movie-nav-indicator'
                style={{ originY: '0px' }}
                className='absolute left-1/2 -translate-x-1/2 bg-accent-primary w-2 h-2 rounded-full'
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

const LINKS = [
  { href: '/movies', label: 'All' },
  { href: '/movies/now-playing', label: 'Now-playing' },
  { href: '/movies/popular', label: 'Popular' },
  { href: '/movies/top_rated', label: 'Top-rated' },
  { href: '/movies/upcoming', label: 'Upcoming' },
];
