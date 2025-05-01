'use client';
import { getMovie, MovieModal } from '@/domains/movie';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function MovieDetailContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const debounce = useRef(false);
  const [id, setId] = useState('');

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => getMovie(id),
    enabled: !!id,
  });

  const handleClickClose = () => {
    if (debounce.current) return;
    debounce.current = true;
    router.back();
  };

  useEffect(() => {
    const handleHashChange = () => {
      const match = window.location.hash.match(/id=(\d+);/);
      setId(match?.[1] ?? '');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  useEffect(() => {
    if (id) return;

    setTimeout(() => {
      debounce.current = false;
    }, 1000);
  }, [id]);

  return (
    <AnimatePresence>
      {id && <MovieModal movie={movie} isLoading={isLoading} onClickClose={handleClickClose} />}
    </AnimatePresence>
  );
}
