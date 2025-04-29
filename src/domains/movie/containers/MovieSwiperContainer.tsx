'use client';
import { getMovies, MovieStatus, MovieSwiper, MovieSwiperSkeleton } from '@/domains/movie';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface Props {
  status?: MovieStatus;
}
export function MovieSwiperContainer({ status = 'all' }: Props) {
  const [mounted, setMounted] = useState(false);
  const [initPerView, setInitPerView] = useState(0);
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', status],
    queryFn: () => getMovies(status),
    select: data => data.results,
  });

  const handleClickCard = (id: number) => () => {
    window.location.hash = encodeURIComponent(`id=${id};`);
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    const { offsetWidth } = document.documentElement;
    let perView = 3;
    if (offsetWidth >= 1024) {
      perView = 8;
    } else if (offsetWidth >= 768) {
      perView = 6;
    } else if (offsetWidth >= 480) {
      perView = 4;
    }

    setInitPerView(perView);
  }, [mounted]);

  if (isLoading || isError || !movies || initPerView === 0) return <MovieSwiperSkeleton />;
  return (
    <MovieSwiper
      movies={movies}
      status={status}
      initPerView={initPerView}
      onClickCard={handleClickCard}
    />
  );
}
