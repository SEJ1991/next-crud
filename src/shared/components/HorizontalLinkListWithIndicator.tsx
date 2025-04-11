'use client';
import { NextLink } from '@/shared';
import { HTMLMotionProps, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'ul'> {
  links?: { href: string; label: React.ReactNode }[];
  layoutId: string;
  indicatorProps?: HTMLMotionProps<'div'>;
}
export function HorizontalLinkListWithIndicator({
  links = [],
  layoutId,
  indicatorProps,
  ...props
}: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul {...props} className={twMerge('flex-center gap-2 h-full', props.className)}>
      {links.map(({ href, label }) => {
        const isActive = pathname && (pathname === href || pathname.startsWith(href + '/'));

        return (
          <li key={href} className='relative'>
            <NextLink href={href} className='font-semibold'>
              {label}
            </NextLink>

            {mounted && isActive && (
              <motion.div
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ originY: '0px' }}
                {...indicatorProps}
                layoutId={layoutId}
                className={twMerge(
                  'absolute left-1/2 -translate-x-1/2 bg-accent-primary w-2 h-2 rounded-full',
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
