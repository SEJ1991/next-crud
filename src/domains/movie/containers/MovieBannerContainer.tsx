'use client';
import { getMovies, MovieBanner, MovieBannerSkeleton } from '@/domains/movie';
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

  const onClickMore = (id: number) => () => {
    window.location.hash = encodeURIComponent(`id=${id};`);
  };

  useEffect(() => {
    const inerval = setInterval(() => {
      setSelectedIndex(prev => (prev === 4 ? 0 : prev + 1));
    }, 10000);

    return () => {
      clearInterval(inerval);
    };
  }, []);

  const movie = movies?.[selectedIndex];
  if (isLoading || isError || !movie) {
    return <MovieBannerSkeleton />;
  }
  return <MovieBanner movie={movie} onClickMore={onClickMore} />;
}
