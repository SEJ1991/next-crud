'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LinkInterface, NextLink } from '@/shared';

interface Props {
  links: LinkInterface[];
  onClickRefresh: () => void;
}
export function ProductNav({ links, onClickRefresh }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='mb-4 font-semibold text-2xl'>Categories</h2>
        <button
          className='px-2 py-1 border border-border-primary rounded-md'
          onClick={onClickRefresh}
        >
          Refresh
        </button>
      </div>
      <nav>
        <ul className='flex flex-col gap-2'>
          {links.map(({ href, label }) => {
            const isActive = label === 'All' ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <NextLink
                  href={href}
                  className={clsx(
                    'transition-colors duration-500',
                    isActive && 'text-accent-primary'
                  )}
                >
                  {label}
                </NextLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
