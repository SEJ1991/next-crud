'use client';
import { getInfinitQueryOptionsForMovie, MovieStatus } from '@/domains/movie';
import { GridList } from '@/shared';
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
  });

  return (
    <GridList>
      {movies?.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </GridList>
  );
}
