'use client';
import { NextLink } from '@/shared';
import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function MovieMenu(props: HTMLMotionProps<'nav'>) {
  const pathname = usePathname();
  return (
    <motion.nav
      {...props}
      className='absolute left-1/2 -bottom-52 -translate-x-1/2 w-auto flex flex-col justify-center items-center bg-black-secondary shadow-gray-600 shadow-2xl rounded-md'
    >
      {LINKS.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <NextLink
            key={href}
            className={clsx(
              'w-full text-sm text-center py-2 px-4 whitespace-nowrap border-b-black last:border-b-0 transition-opacity duration-300 hover:opacity-70 first:pt-4 last:pb-4',
              isActive && 'text-accent-primary'
            )}
            href={href}
          >
            {label}
          </NextLink>
        );
      })}
    </motion.nav>
  );
}

const LINKS = [
  { href: '/movies', label: 'All' },
  { href: '/movies/now-playing', label: 'Now-playing' },
  { href: '/movies/popular', label: 'Popular' },
  { href: '/movies/top-rated', label: 'Top-rated' },
  { href: '/movies/upcoming', label: 'Upcoming' },
];
