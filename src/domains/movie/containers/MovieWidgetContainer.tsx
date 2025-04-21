'use client';
import { getAllMovies, MovieWidget } from '@/domains/movie';
import { Skeleton } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function MovieWidgetContainer() {
  const router = useRouter();

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', 'all'],
    queryFn: () => getAllMovies({ page: 1 }),
    select: data => data.results.slice(0, 9),
  });

  const handleClick = () => {
    router.push('/movies');
  };

  if (isLoading || isError || !movies || movies.length === 0) {
    return (
      <Skeleton
        className='w-50 aspect-[2/3] rounded-md shadow-primary cursor-pointer'
        onClick={handleClick}
      />
    );
  }
  return <MovieWidget movies={movies} onClick={handleClick} />;
}
