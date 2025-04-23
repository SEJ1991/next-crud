import {
  getAllMovies,
  getMovies,
  MOVIE_STATUSES,
  MovieBannerContainer,
  MovieDetailContainer,
  MovieInfiniteGridListContainer,
} from '@/domains/movie';
import { MovieSwiperContainer } from '@/domains/movie/containers/MovieSwiperContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export const revalidate = 60;

export default async function MoviesPage() {
  const queryClient = new QueryClient();

  await Promise.allSettled(
    MOVIE_STATUSES.map(status =>
      queryClient.prefetchQuery({
        queryKey: ['movies', status],
        queryFn: () => getMovies(status),
      })
    )
  );

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['infinite', 'movies', 'all'],
    queryFn: ({ pageParam }) => getAllMovies({ page: pageParam }),
    initialPageParam: 1,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieBannerContainer />
        <div className='relative px-[var(--size-page-frame-padding-x)] pb-[var(--size-page-frame-padding-y)] z-15'>
          {MOVIE_STATUSES.filter(status => status !== 'all').map(status => (
            <section key={`swiper-${status}`} className='flex flex-col gap-2'>
              <h2 className='text-4xl'>{status.toUpperCase()}</h2>
              <MovieSwiperContainer status={status} />
            </section>
          ))}
          <MovieInfiniteGridListContainer />
        </div>
      </HydrationBoundary>
      <MovieDetailContainer />
    </>
  );
}
