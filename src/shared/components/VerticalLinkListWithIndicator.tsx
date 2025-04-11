'use client';
import { NextLink } from '@/shared';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'ul'> {
  links?: { href: string; label: React.ReactNode }[];
}
export function VerticalLinkListWithIndicator({ links = [], ...props }: Props) {
  const pathname = usePathname();

  return (
    <ul {...props} className={twMerge('flex flex-col gap-2', props.className)}>
      {links.map(({ href, label }) => (
        <li key={href} className='flex items-center gap-2'>
          <div
            className={`size-1.5 transition-colors duration-400 ${
              pathname === href ? 'bg-accent-primary' : 'bg-gray-400'
            }`}
          />
          <NextLink href={href} className='font-semibold'>
            {label}
          </NextLink>
        </li>
      ))}
    </ul>
  );
}
