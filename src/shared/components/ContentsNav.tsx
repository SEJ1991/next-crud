'use client';

import { Indicator } from '@/shared/components/atoms/Indicator';
import { LinkList } from '@/shared/components/LinkList';
import { usePathname } from 'next/navigation';

export function ContentsNav() {
  const pathname = usePathname();
  const links = getLinks(pathname);

  return (
    <nav>
      <LinkList
        className='flex flex-col gap-2 ml-2'
        items={links}
        Indicator={
          <Indicator
            layoutId='content-nav-indicator'
            className='top-1/2 -translate-y-1/2 -translate-x-2 bg-accent-primary w-1 h-full'
          />
        }
      />
    </nav>
  );
}

function getLinks(pathname: string) {
  if (pathname.startsWith('/posts')) {
    return [
      {
        href: '/posts',
        label: 'Posts',
      },
    ];
  }

  return [
    {
      href: '/movies',
      label: 'All',
    },
    {
      href: '/movies/now-playing',
      label: 'Now-playing',
    },
    {
      href: '/movies/popular',
      label: 'Popular',
    },
    {
      href: '/movies/top-rated',
      label: 'Top-rated',
    },
    {
      href: '/movies/upcoming',
      label: 'Upcoming',
    },
  ];
}
