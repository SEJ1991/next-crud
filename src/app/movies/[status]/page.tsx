import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {
  getMoviesByStatus,
  MovieInfiniteGridListContainer,
  MovieStatusWithoutAll,
} from '@/domains/movie';

export const revalidate = 60;

interface Props {
  params: Promise<{ status: string }>;
}
export default async function MoviesByStatusPage({ params }: Props) {
  const paramStatus = (await params).status.replaceAll('-', '_');
  if (!VALID_STATUSES.includes(paramStatus as MovieStatusWithoutAll)) {
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
    <section className='px-[var(--size-page-frame-padding-x)] pb-[var(--size-page-frame-padding-y)] pt-page-frame-with-header-height'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6'>
        {status.replaceAll('_', '-').toUpperCase()}
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieInfiniteGridListContainer status={status} />
      </HydrationBoundary>
    </section>
  );
}

const VALID_STATUSES = ['now_playing', 'popular', 'top_rated', 'upcoming'];
