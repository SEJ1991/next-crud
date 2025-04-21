'use client';
import { getAllMovies } from '@/domains/movie/services/movie';
import { MovieStatus } from '@/domains/movie/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface Props {
  status?: MovieStatus;
}
export function MovieBannerContainer({ status = 'all' }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', status],
    queryFn: () => getMovies(status),
    select: data => data?.results.slice(0, 5),
  });

  useEffect(() => {
    const inerval = setInterval(() => {
      setSelectedIndex(prev => (prev === 4 ? 0 : prev + 1));
    }, 10000);

    return () => {
      clearInterval(inerval);
    };
  }, []);

  const movie = movies?.[selectedIndex];
  if (isLoading || isError || !movie) return null;
  return <div>MovieBannerContainer</div>;
}

function getMovies(status: MovieStatus) {
  if (status === 'all') {
    return getAllMovies({ page: 1 });
  }
}
