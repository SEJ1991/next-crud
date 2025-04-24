'use client';
import { MovieMenu, MovieNav } from '@/domains/movie';
import { ArrowDownIcon, HomeIcon, useClickOutside } from '@/shared';
import clsx from 'clsx';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function MovieHeader() {
  const router = useRouter();
  const ref = useRef<HTMLHeadElement>(null);
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpenMenu(false));
  const { scrollY } = useScroll();

  const [isScroll, setIsScroll] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClickHome = () => {
    router.push('/');
  };

  const handleClickMenu = () => {
    setIsOpenMenu(prev => !prev);
  };

  useMotionValueEvent(scrollY, 'change', latest => {
    const headerHeight = ref.current?.offsetHeight ?? 0;
    const isWillBeScroll = latest >= headerHeight;

    if (isWillBeScroll === isScroll) return;
    setIsScroll(isWillBeScroll);
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 479px)');
    const initOpenMenu = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsOpenMenu(false);
    };

    initOpenMenu(mediaQuery);
    mediaQuery.addEventListener('change', initOpenMenu);
    return () => {
      mediaQuery.removeEventListener('change', initOpenMenu);
    };
  }, []);

  return (
    <header
      ref={ref}
      className='fixed top-0 w-full max-w-[var(--size-max-contents-width)] h-[var(--size-header-height)] flex items-center gap-4 mx-auto px-[var(--size-page-frame-padding-x)] z-30'
    >
      <div
        className={clsx(
          'absolute left-0 size-full transition-colors duration-200 bg-gradient-to-b from-black-primary',
          isScroll ? 'to-black-primary' : 'to-[rgba(0,0,0,0)]'
        )}
      />
      <button className='z-1' onClick={handleClickHome}>
        <HomeIcon className='size-6' />
      </button>
      <div ref={menuRef} className='relative z-1 sm:hidden'>
        <button className='flex gap-1 items-center text-sm' onClick={handleClickMenu}>
          Menu
          <ArrowDownIcon
            className={clsx(
              'size-6 mt-1 transition-transform duration-300',
              isOpenMenu ? 'rotate-180' : 'rotate-0'
            )}
          />
        </button>
        <AnimatePresence>
          {isOpenMenu && (
            <MovieMenu
              initial={{ opacity: 0, translateY: -5 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20, duration: 0.5 }}
              onClick={handleClickMenu}
            />
          )}
        </AnimatePresence>
      </div>
      <MovieNav className='hidden z-1 sm:flex' />
    </header>
  );
}
