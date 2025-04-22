'use client';
import { getAllMovies, MovieBanner } from '@/domains/movie';
import { MovieStatus } from '@/domains/movie/types';
import { SkeletonCardWithContents } from '@/shared';
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
    return (
      <SkeletonCardWithContents className='flex flex-col gap-2 justify-center w-full aspect-[16/9] space-y-0 bg-black-primary'>
        <div className='h-8 w-1/4 mb-4 rounded-md bg-neutral-800' />
        <div className='h-4 w-1/2 rounded-md bg-neutral-800' />
        <div className='h-4 w-1/3 rounded-md bg-neutral-800' />
        <div className='h-4 w-1/4 mb-2 rounded-md bg-neutral-800' />
        <div className='h-8 w-10 rounded-md bg-neutral-800' />
      </SkeletonCardWithContents>
    );
  }
  return <MovieBanner movie={movie} onClickMore={onClickMore} />;
}

function getMovies(status: MovieStatus) {
  if (status === 'all') {
    return getAllMovies({ page: 1 });
  }
}
