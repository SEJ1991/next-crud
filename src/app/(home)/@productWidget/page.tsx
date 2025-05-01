import { getAllProducts, ProductWidgetContainer } from '@/domains/product';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export const revalidate = 60 * 60;

export default async function ProductWidgetPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', 'all', 1],
    queryFn: () => getAllProducts({ skip: 0 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductWidgetContainer />
    </HydrationBoundary>
  );
}
