import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {
  getMoviesByStatus,
  MOVIE_STATUSES,
  MovieDetailContainer,
  MovieInfiniteGridListContainer,
  MovieStatusWithoutAll,
} from '@/domains/movie';
import { SectionFrame } from '@/shared';

export const revalidate = 60;

interface Props {
  params: Promise<{ status: string }>;
}
export default async function MoviesByStatusPage({ params }: Props) {
  const paramStatus = (await params).status.replaceAll('-', '_');
  if (
    !MOVIE_STATUSES.filter(status => status !== 'all').includes(
      paramStatus as MovieStatusWithoutAll
    )
  ) {
    notFound();
  }

  const status = paramStatus as MovieStatusWithoutAll;
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['infinite', 'movies', status],
    queryFn: ({ pageParam }) => getMoviesByStatus({ page: pageParam }, status),
    initialPageParam: 1,
  });

  return (
    <SectionFrame
      className='px-[var(--size-page-frame-padding-x)] pb-[var(--size-page-frame-padding-y)] pt-page-frame-with-header-height'
      title={status.replaceAll('_', '-').toUpperCase()}
      headingElement='h1'
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieInfiniteGridListContainer status={status} />
      </HydrationBoundary>
      <MovieDetailContainer />
    </SectionFrame>
  );
}

export async function generateMetadata({ params }: Props) {
  const status = (await params).status.replaceAll('-', '_');
  const pageTitle = status.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = `${pageTitle} movies | NEXT-CRUD`;
  const description = `${pageTitle} movies list from TMDB`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // url: '',
    },
    twitter: {
      title,
      description,
      // card: ''
    },
  };
}
