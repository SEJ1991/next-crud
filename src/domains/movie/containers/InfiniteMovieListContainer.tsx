'use client';
import { getInfinitQueryOptionsForMovie, MovieGridList, MovieStatus } from '@/domains/movie';
import { IntersectionPointer } from '@/shared';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Props {
  status: MovieStatus;
  initialPageParam: number;
  limitPages: number;
}
export function InfiniteMovieListContainer({
  status = 'all',
  initialPageParam,
  limitPages,
}: Props) {
  const {
    data: movies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: queryStatus,
  } = useInfiniteQuery({
    ...getInfinitQueryOptionsForMovie({ status, initialPageParam, limitPages }),
    select: data => data?.pages.map(response => response.results).flat(),
  });
  const ref = useIntersectionObserver<HTMLDivElement>({
    isAvailable: hasNextPage,
    onIntersect: fetchNextPage,
    options: {
      rootMargin: '0px 0px -100px 0px',
    },
  });

  if (queryStatus !== 'success') return <div>loading</div>;

  return (
    <>
      <MovieGridList movies={movies} onClick={(id: number) => () => console.log(id)} />
      <IntersectionPointer ref={ref} isVisible={hasNextPage} isLoading={isFetchingNextPage} />
    </>
  );
}
