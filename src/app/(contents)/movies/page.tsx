import { InfiniteMovieListContainer, getInfinitQueryOptionsForMovie } from '@/domains/movie';
import { PageFrame } from '@/shared';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  searchParams: { page: string };
}
export default async function MoviesPage({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const page = Number((await searchParams).page ?? '1');

  await queryClient.prefetchInfiniteQuery(
    getInfinitQueryOptionsForMovie({
      status: STATAUS,
      initialPageParam: page,
      limitPages: LIMIT_PAGES,
    })
  );

  return (
    <PageFrame>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InfiniteMovieListContainer
          status={STATAUS}
          initialPageParam={page}
          limitPages={LIMIT_PAGES}
        />
      </HydrationBoundary>
    </PageFrame>
  );
}

const STATAUS = 'all';
const LIMIT_PAGES = 10;
