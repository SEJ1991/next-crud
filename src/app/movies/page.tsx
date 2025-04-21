import { getAllMovies, MovieBannerContainer } from '@/domains/movie';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { data } from 'framer-motion/client';

export default function MoviesPage() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['movies', 'all'],
    queryFn: () => getAllMovies({ page: 1 }),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieBannerContainer />
      </HydrationBoundary>
    </div>
  );
}
