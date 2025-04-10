'use client';
import { getInfinitQueryOptionsForMovie, MovieStatus } from '@/domains/movie';
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
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: queryStatus,
  } = useInfiniteQuery(getInfinitQueryOptionsForMovie({ status, initialPageParam, limitPages }));

  return 1;
}
