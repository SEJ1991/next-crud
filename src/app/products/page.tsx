import { getAllProducts, getSkip, ProductGridListContainer } from '@/domains/product';
import { PageFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function ProductsPage({ searchParams }: Props) {
  const page = getPageParam((await searchParams).page);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', 'all', page],
    queryFn: () => getAllProducts({ skip: getSkip(page) }),
  });

  return (
    <PageFrame className='flex flex-col gap-8'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section className='flex flex-col gap-6'>
          <h1 className='text-4xl font-semibold'>All products</h1>
          <ProductGridListContainer page={page} />
        </section>
      </HydrationBoundary>
    </PageFrame>
  );
}

function getPageParam(pageParam?: string) {
  if (!pageParam || isNaN(Number(pageParam))) return 1;
  return Number(pageParam);
}
