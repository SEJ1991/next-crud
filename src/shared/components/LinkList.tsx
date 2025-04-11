'use client';
import { NextLink } from '@/shared';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';

interface Props extends ComponentPropsWithoutRef<'ul'> {
  items?: { href: string; label: React.ReactNode }[];
  Indicator?: React.ReactNode;
}
export function LinkList({ items = [], Indicator, ...props }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul {...props}>
      {items.map(({ href, label }) => {
        const isActive = pathname && (pathname === href || pathname.startsWith(href + '/'));

        return (
          <li key={href} className='relative'>
            <NextLink href={href} className='font-semibold'>
              {label}
            </NextLink>
            {mounted && isActive && Indicator}
          </li>
        );
      })}
    </ul>
  );
}
