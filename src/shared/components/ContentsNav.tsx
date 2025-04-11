'use client';

import { VerticalLinkListWithIndicator } from '@/shared';
import { usePathname } from 'next/navigation';

export function ContentsNav() {
  const pathname = usePathname();
  const links = getLinks(pathname);

  return (
    <nav>
      <VerticalLinkListWithIndicator links={links} />
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
