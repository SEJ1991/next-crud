'use client';
import { MovieGridList } from '@/domains/movie/components/MovieGridList';
import { getAllMovies } from '@/domains/movie/services/movie';
import { MovieStatus } from '@/domains/movie/types';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Props {
  status?: MovieStatus;
  limitPages?: number;
}
export function MovieInfiniteGridListContainer({ status = 'all', limitPages = 10 }: Props) {
  const { data, isLoading, isError } = useInfiniteQuery({
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

  const movies = data?.pages.map(page => page.results).flat() ?? [];
  if (isLoading || isError || movies.length === 0) return <div>로딩</div>;
  return <MovieGridList movies={movies} status={status} onClickCard={handleClickCard} />;
}

function getMovies(status: MovieStatus, page: number) {
  return getAllMovies({ page });
}
