'use client';
import { MovieNav } from '@/domains/movie';
import { HomeIcon } from '@/shared';
import clsx from 'clsx';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export function MovieHeader() {
  const ref = useRef<HTMLHeadElement>(null);
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isAnimated, setIsAnimated] = useState(false);

  const handleClickHome = () => {
    router.push('/');
  };

  useMotionValueEvent(scrollY, 'change', latest => {
    const headerHeight = ref.current?.offsetHeight ?? 0;
    const isWillBeAnimated = latest >= headerHeight;

    if (isWillBeAnimated === isAnimated) return;
    setIsAnimated(isWillBeAnimated);
  });

  return (
    <header
      ref={ref}
      className='fixed top-0 w-full max-w-[var(--size-max-contents-width)] h-[var(--size-header-height)] flex items-center gap-4 mx-auto px-[var(--size-page-frame-padding-x)] z-30'
    >
      <div
        className={clsx(
          'absolute left-0 size-full transition-opacity duration-300 bg-gradient-to-b from-black-primary to-[rgba(0,0,0,0)]',
          isAnimated ? 'opacity-0' : 'opacity-100'
        )}
      />
      <button className='z-1' onClick={handleClickHome}>
        <HomeIcon className='size-6' />
      </button>
      <MovieNav className='z-1' />
    </header>
  );
}
