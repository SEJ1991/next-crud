import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function Skeleton(props: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      {...props}
      className={twMerge('animate-pulse bg-[var(--color-skeleton-primary)]', props.className)}
    />
  );
}
