import { ProductHeader, ProductNavContainer, getCategories } from '@/domains/product';
import { FixedToTopButton, LayoutFrame, ThemeButton } from '@/shared';
import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { HomeButton } from '@/shared/components/HomeButton';

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
    <LayoutFrame className='md:pl-[var(--size-left-sidebar-width)]'>
      <ProductHeader>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductNavContainer />
        </HydrationBoundary>
      </ProductHeader>

      <aside
        className='fixed top-0 left-0 hidden flex-col shrink-0 gap-4 w-[var(--size-left-sidebar-width)] h-dvh 
        px-[var(--size-page-frame-padding-x)] py-[var(--size-page-frame-padding-y)] border-r border-border-primary overflow-y-auto md:flex'
      >
        <div className='flex items-center gap-4'>
          <HomeButton className='size-7.5' />
          <ThemeButton />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductNavContainer />
        </HydrationBoundary>
      </aside>

      <FixedToTopButton className='size-10 bottom-40 md:bottom-25' />
      <main>{children}</main>
    </LayoutFrame>
  );
}
