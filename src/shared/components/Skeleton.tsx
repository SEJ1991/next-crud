'use client';
import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function Skeleton(props: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      {...props}
      className={twMerge(
        'size-full animate-pulse bg-[var(--color-skeleton-primary)]',
        props.className
      )}
    />
  );
}
