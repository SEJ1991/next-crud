'use client';
import { NextLink } from '@/shared';
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
      className='fixed top-0 w-full max-contents-width h-[var(--size-header-height)] flex justify-between items-center mx-auto px-[var(--size-page-frame-padding-x)] z-30'
    >
      <div
        className={`absolute left-0 size-full transition-opacity duration-300 ${
          isAnimated ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))' }}
      />
      <nav className='z-1'>
        {LINKS.map(({ href, label }) => (
          <NextLink key={href} href={href}>
            {label}
          </NextLink>
        ))}
      </nav>
    </header>
  );
}

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'All' },
  { href: '/movies/now-playing', label: 'Now-playing' },
  { href: '/movies/popular', label: 'Popular' },
  { href: '/movies/top_rated', label: 'Top-rated' },
  { href: '/movies/upcoming', label: 'Upcoming' },
];
