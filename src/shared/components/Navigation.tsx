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
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <nav {...props} className={twMerge('flex-center gap-2', props.className)}>
      {items.map(({ href, label }) => {
        const isActive = pathname && (pathname === href || pathname.startsWith(href + '/'));

        return (
          <Link
            key={label}
            href={href}
            className={`relative ${isActive ? 'text-red-300' : 'text-white'}`}
          >
            {label}
            {isMount && isActive && (
              <Indicator
                layoutId='nav-indicator'
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className='absolute left-1/2 w-2 h-2 rounded-full bg-amber-400 -translate-x-1/2'
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
