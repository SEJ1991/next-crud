import { ProductNavContainer, getCategories } from '@/domains/product';
import { HomeIcon, LayoutFrame, ThemeButton } from '@/shared';
import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export const revalidate = 60;

interface Props {
  children: React.ReactNode;
}
export default async function ProductLayout({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  return (
    <LayoutFrame className='flex'>
      <aside className='hidden flex-col gap-4 w-[var(--size-left-sidebar-width)] h-dvh px-[var(--size-page-frame-padding-x)] py-[var(--size-page-frame-padding-y)] border-r border-border-primary md:flex'>
        <ul className='flex items-center gap-4'>
          <li>
            <HomeIcon className='size-8' />
          </li>
          <li>
            <ThemeButton />
          </li>
        </ul>
        <section>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductNavContainer />
          </HydrationBoundary>
        </section>
      </aside>

      <main>{children}</main>
    </LayoutFrame>
  );
}
