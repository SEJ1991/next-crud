import {
  getAllMovies,
  MovieBannerContainer,
  MovieDetailContainer,
  MovieInfiniteGridListContainer,
} from '@/domains/movie';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export const revalidate = 60;

export default async function MoviesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['movies', 'all'],
    queryFn: () => getAllMovies({ page: 1 }),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['infinite', 'movies', 'all'],
    queryFn: ({ pageParam }) => getAllMovies({ page: pageParam }),
    initialPageParam: 1,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieBannerContainer />
        <MovieInfiniteGridListContainer />
      </HydrationBoundary>
      <MovieDetailContainer />
    </div>
  );
}
