import {
  getAllMovies,
  getMovies,
  MOVIE_STATUSES,
  MovieBannerContainer,
  MovieDetailContainer,
  MovieInfiniteGridListContainer,
} from '@/domains/movie';
import { MovieSwiperContainer } from '@/domains/movie/containers/MovieSwiperContainer';
import { SectionFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export const revalidate = 60;
export const metadata = {
  title: 'All movies | NEXT-CRUD',
  description: 'Browse movies by status like Now Playing, Popular, Top Rated, and more.',
  openGraph: {
    title: 'All movies | NEXT-CRUD',
    description: 'Browse movies by status like Now Playing, Popular, Top Rated, and more.',
    type: 'website',
    // url: 'https://yourdomain.com/movies',
    // siteName: 'MyMovieApp',
    // images: [
    //   {
    //     url: 'https://yourdomain.com/og-image/movies.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'All movies | NEXT-CRUD',
    //   },
    // ],
  },
  twitter: {
    title: 'All movies | NEXT-CRUD',
    description: 'Browse movies by status like Now Playing, Popular, Top Rated, and more.',
    // images: ['https://yourdomain.com/og-image/movies.png'],
    // card: 'summary_large_image',
  },
};

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
        <section>
          <MovieBannerContainer />
        </section>
        <div className='relative flex flex-col gap-5 px-[var(--size-page-frame-padding-x)] pb-[var(--size-page-frame-padding-y)] z-15 sm:gap-6 md:gap-8 lg:gap-10'>
          {MOVIE_STATUSES.filter(status => status !== 'all').map(status => (
            <SectionFrame
              key={`swiper-${status}`}
              title={status.replaceAll('_', '-').toUpperCase()}
              href={`/movies/${status.replaceAll('_', '-')}`}
            >
              <MovieSwiperContainer status={status} />
            </SectionFrame>
          ))}
          <SectionFrame title='ALL' headingElement='h1'>
            <MovieInfiniteGridListContainer />
          </SectionFrame>
        </div>
      </HydrationBoundary>
      <MovieDetailContainer />
    </>
  );
}
