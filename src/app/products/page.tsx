import { getAllProducts, ProductsContainer } from '@/domains/product';
import { PageFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function ProductsPage({ searchParams }: Props) {
  const skip = getSkip((await searchParams).skip);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', 'all', skip],
    queryFn: () => getAllProducts({ skip }),
  });

  return (
    <PageFrame className='flex flex-col gap-2'>
      <h1 className='text-4xl font-semibold'>All products</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <section>
          <ProductsContainer skip={skip} />
        </section>
      </HydrationBoundary>
    </PageFrame>
  );
}

function getSkip(skipParam?: string) {
  if (!skipParam || isNaN(Number(skipParam))) return 1;
  return Number(skipParam);
}
