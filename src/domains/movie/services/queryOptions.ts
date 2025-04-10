import {
  getAllMovies,
  GetInfinitQueryOptionsForMovieParams,
  getMoviesByStatus,
  PageInfo,
} from '@/domains/movie';

export function getInfinitQueryOptionsForMovie({
  status,
  initialPageParam = 1,
  limitPages,
}: GetInfinitQueryOptionsForMovieParams) {
  const queryKey = ['movies', status];

  const queryFn = ({ pageParam }: { pageParam: number }) => {
    if (status === 'all') {
      return getAllMovies({ page: pageParam });
    }

    return getMoviesByStatus({ page: pageParam }, status);
  };

  const getNextPageParam = (
    { page, total_pages }: PageInfo,
    allPages: Awaited<ReturnType<typeof queryFn>>[]
  ) => {
    if (limitPages && limitPages < allPages.length) return undefined;

    const nextPage = page + 1;
    return nextPage <= total_pages ? nextPage : undefined;
  };

  return {
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam,
  };
}
