import { getCategories, ProductCategory, ProductFormCreateContainer } from '@/domains/product';
import { PageFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'New product | NEXT-CRUD',
  description: 'Register new products with detailed information and keep your catalog up to date.',
  openGraph: {
    title: 'New product | NEXT-CRUD',
    description:
      'Register new products with detailed information and keep your catalog up to date.',
    type: 'website',
    // url: 'https://yourdomain.com/products',
    // siteName: 'MyMovieApp',
    // images: [
    //   {
    //     url: 'https://yourdomain.com/og-image/products.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'New product | NEXT-CRUD',
    //   },
    // ],
  },
  twitter: {
    title: 'New product | NEXT-CRUD',
    description:
      'Register new products with detailed information and keep your catalog up to date.',
    // images: ['https://yourdomain.com/og-image/products.png'],
    // card: 'summary_large_image',
  },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function ProductNewPage({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const returnCategory = awaitedSearchParams.returnCategory ?? 'all';
  const returnPage = awaitedSearchParams.returnPage ?? '1';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const categories = queryClient.getQueryData<ProductCategory[]>(['categories']);
  if (!categories) {
    notFound();
  }
  const isExistReturnCategory = categories.some(category => category.slug === returnCategory);

  return (
    <PageFrame className='flex flex-col gap-8 pt-page-frame-with-header-height md:!pt-[var(--size-page-frame-padding-y)]'>
      <section className='flex flex-col gap-6'>
        <h1 className='text-4xl font-semibold'>New product</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductFormCreateContainer
            returnCategory={isExistReturnCategory ? returnCategory : 'all'}
            returnPage={returnPage}
          />
        </HydrationBoundary>
      </section>
    </PageFrame>
  );
}
