'use client';
import { MovieNav } from '@/domains/movie';
import clsx from 'clsx';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

export function MovieHeader() {
  const ref = useRef<HTMLHeadElement>(null);
  const { scrollY } = useScroll();
  const [isAnimated, setIsAnimated] = useState(false);

  useMotionValueEvent(scrollY, 'change', latest => {
    const headerHeight = ref.current?.offsetHeight ?? 0;
    const isWillBeAnimated = latest >= headerHeight;

    if (isWillBeAnimated === isAnimated) return;
    setIsAnimated(isWillBeAnimated);
  });

  return (
    <header
      ref={ref}
      className='fixed top-0 w-full max-w-[var(--size-max-contents-width)] h-[var(--size-header-height)] flex items-center mx-auto px-[var(--size-page-frame-padding-x)] z-30'
    >
      <div
        className={clsx(
          'absolute left-0 size-full transition-opacity duration-300 bg-gradient-to-b from-black-primary to-[rgba(0,0,0,0)]',
          isAnimated ? 'opacity-0' : 'opacity-100'
        )}
      />
      <MovieNav className='z-1' />
    </header>
  );
}
