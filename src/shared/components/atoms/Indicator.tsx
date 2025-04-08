'use client';
import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function Indicator(props: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      {...props}
      className={twMerge('absolute', props.className)}
    />
  );
}
