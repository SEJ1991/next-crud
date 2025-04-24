'use client';
import { MovieGridList, getAllMovies, getMoviesByStatus, MovieStatus } from '@/domains/movie';
import { IntersectionPointer } from '@/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Props {
  status?: MovieStatus;
  limitPages?: number;
}
export function MovieInfiniteGridListContainer({ status = 'all', limitPages = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '0px 0px -100px 0px' });
  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['infinite', 'movies', status],
      queryFn: ({ pageParam }) => getMovies(status, pageParam),
      getNextPageParam: ({ page, total_pages }, allPages) => {
        if (limitPages < allPages.length) return undefined;

        const nextPage = page + 1;
        return nextPage <= total_pages ? nextPage : undefined;
      },
      initialPageParam: 1,
    });

  const handleClickCard = (id: number) => () => {
    window.location.hash = encodeURIComponent(`id=${id};`);
  };

  useEffect(() => {
    if (!isInView) return;
    fetchNextPage();
  }, [isInView]);

  const movies = data?.pages.map(page => page.results).flat() ?? [];
  if (isLoading || isError || movies.length === 0) return <div>로딩</div>;
  return (
    <>
      <MovieGridList movies={movies} status={status} onClickCard={handleClickCard} />
      <IntersectionPointer ref={ref} isVisible={hasNextPage} isLoading={isFetchingNextPage} />
    </>
  );
}

function getMovies(status: MovieStatus, page: number) {
  if (status === 'all') {
    return getAllMovies({ page });
  }

  return getMoviesByStatus({ page }, status);
}
