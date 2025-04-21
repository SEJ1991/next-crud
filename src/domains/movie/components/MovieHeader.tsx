'use client';
import { MovieNav } from '@/domains/movie';
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
      className='fixed top-0 w-full max-contents-width h-[var(--size-header-height)] flex items-center mx-auto px-[var(--size-page-frame-padding-x)] z-30'
    >
      <div
        className={`absolute left-0 size-full transition-opacity duration-300 ${
          isAnimated ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))' }}
      />
      <MovieNav className='z-1' />
    </header>
  );
}
