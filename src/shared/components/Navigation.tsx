'use client';
import { NextLink } from '@/shared';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'nav'> {
  items?: { href: string; label: string }[];
  Indicator?: React.ReactNode;
}
export function Navigation({ items = [], Indicator, ...props }: Props) {
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
          <NextLink key={label} href={href} className='relative font-semibold'>
            {label}
            {mounted && isActive && Indicator}
          </NextLink>
        );
      })}
    </nav>
  );
}
