'use client';
import { NextLink, Indicator } from '@/shared';
import { HTMLMotionProps } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'ul'> {
  items?: { href: string; label: React.ReactNode }[];
  indicatorProps?: HTMLMotionProps<'div'>;
}
export function HorizontalLinkListWithIndicator({ items = [], indicatorProps, ...props }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul {...props} className={twMerge('flex-center gap-2 h-full', props.className)}>
      {items.map(({ href, label }) => {
        const isActive = pathname && (pathname === href || pathname.startsWith(href + '/'));

        return (
          <li key={href} className='relative'>
            <NextLink href={href} className='font-semibold'>
              {label}
            </NextLink>
            {mounted && isActive && (
              <Indicator
                {...indicatorProps}
                style={{ originY: '0px' }}
                className={twMerge(
                  'left-1/2 -translate-x-1/2 bg-accent-primary w-2 h-2 rounded-full',
                  indicatorProps?.className
                )}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
