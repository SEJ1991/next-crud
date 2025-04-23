'use client';

import { getMovies, MovieStatus } from '@/domains/movie';
import { useQuery } from '@tanstack/react-query';

interface Props {
  status?: MovieStatus;
}
export function MovieSwiperContainer({ status = 'all' }: Props) {
  const { data: movie } = useQuery({
    queryKey: ['movies', status],
    queryFn: () => getMovies(status),
  });
  return <div>MovieSwiperContainer</div>;
}
