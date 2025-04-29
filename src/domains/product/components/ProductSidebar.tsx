'use client';
import { HomeIcon, NextLink, ThemeButton } from '@/shared';
import { useRouter } from 'next/navigation';

export function ProductSidebar() {
  const router = useRouter();

  const handleClickHome = () => {
    router.push('/');
  };

  return (
    <aside className='hidden flex-col gap-4 w-[var(--size-left-sidebar-width)] h-dvh px-[var(--size-page-frame-padding-x)] py-[var(--size-page-frame-padding-y)] border-r border-border-primary md:flex'>
      <ul className='flex items-center gap-4'>
        <li>
          <button onClick={handleClickHome}>
            <HomeIcon className='size-8' />
          </button>
        </li>
        <li>
          <ThemeButton />
        </li>
      </ul>
      <section>
        <h2 className='mb-4 font-semibold text-2xl'>Categories</h2>
        <nav>
          <ul className='flex flex-col gap-2'>
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <NextLink href={href}>{label}</NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </aside>
  );
}

const LINKS = [
  { href: '/1', label: 'phones' },
  { href: '/2', label: 'funiefea' },
  { href: '/3', label: '3' },
  { href: '/4', label: '4' },
  { href: '/5', label: '5' },
  { href: '/6', label: '6' },
];
