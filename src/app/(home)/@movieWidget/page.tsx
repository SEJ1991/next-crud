import { MovieWidgetContainer, getAllMovies } from '@/domains/movie';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export const revalidate = 3600;

export default async function MovieWidgetPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['movies', 'all'],
    queryFn: () => getAllMovies({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieWidgetContainer />
    </HydrationBoundary>
  );
}
