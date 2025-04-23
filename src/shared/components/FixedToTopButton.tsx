'use client';
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  motion,
  HTMLMotionProps,
} from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends HTMLMotionProps<'div'> {
  isVisibleTop?: number;
}
export function FixedToTopButton({ isVisibleTop = 500, ...props }: Props) {
  const { scrollY } = useScroll();
  const [isScroll, setIsScroll] = useState(false);

  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (props.onClick) {
      props.onClick(e);
      return;
    }

    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useMotionValueEvent(scrollY, 'change', latest => {
    const newIsScroll = latest >= isVisibleTop;
    if (newIsScroll === isScroll) return;
    setIsScroll(newIsScroll);
  });

  return (
    <AnimatePresence>
      {isScroll && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 100 }}
          whileTap={{ scale: 1.1, y: -5 }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: 0.3,
          }}
          {...props}
          className={twMerge(
            'fixed bottom-10 right-5 flex justify-center items-center size-10 rounded-full bg-theme-primary shadow-primary text-sm font-semibold cursor-pointer z-35 md:size-12 md:text-lg',
            props.className
          )}
          onClick={handleClick}
        >
          {props.children ?? 'TOP'}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
