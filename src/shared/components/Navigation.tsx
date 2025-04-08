'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const Indicator = motion.div;

interface Props extends ComponentPropsWithoutRef<'nav'> {
  items?: { href: string; label: string }[];
}
export function Navigation({ items = [], ...props }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav {...props} className={twMerge('flex-center gap-2', props.className)}>
      {items.map(({ href, label }) => {
        const isActive = pathname && (pathname === href || pathname.startsWith(href + '/'));

        return (
          <Link key={label} href={href} className='relative font-semibold'>
            {label}
            {mounted && isActive && (
              <Indicator
                layoutId='nav-indicator'
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className='absolute left-1/2 w-2 h-2 rounded-full bg-accent-primary -translate-x-1/2'
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
