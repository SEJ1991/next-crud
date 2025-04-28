'use client';
import { HamburgerIcon, HomeButton, Modal, ThemeButton } from '@/shared';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function ProductHeader(props: ComponentPropsWithoutRef<'header'>) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleClickOpen = () => {
    setIsNavOpen(true);
  };

  const handleClickClose = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const initOpenMenu = (e: MediaQueryListEvent | MediaQueryList) => {
      handleClickClose();
    };

    initOpenMenu(mediaQuery);
    mediaQuery.addEventListener('change', initOpenMenu);
    return () => {
      mediaQuery.removeEventListener('change', initOpenMenu);
    };
  }, []);

  useEffect(() => {
    handleClickClose();
  }, [pathname]);
  return (
    <>
      <header
        {...props}
        className={twMerge(
          'fixed top-0 left-0 w-full h-[var(--size-header-height)] flex justify-between items-center px-[var(--size-page-frame-padding-x)] shadow-secondary bg-theme-primary z-20 md:hidden',
          props.className
        )}
      >
        <div className='flex items-center gap-2'>
          <button className='size-6' onClick={handleClickOpen}>
            <HamburgerIcon className='size-full' />
          </button>
          <HomeButton className='size-7.5' />
        </div>
        <ThemeButton />
      </header>
      <AnimatePresence>
        {isNavOpen && (
          <Modal onClickClose={handleClickClose}>
            <Modal.Dim />
            <Modal.Contens
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className='w-56 px-8 py-12 rounded-md'
            >
              <Modal.CloseButton className='top-2 right-2' />
              <div className='max-h-100 overflow-y-scroll'>{props.children}</div>
            </Modal.Contens>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
