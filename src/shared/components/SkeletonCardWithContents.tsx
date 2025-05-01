import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function SkeletonCardWithContents(props: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      {...props}
      className={twMerge(
        'animate-pulse space-y-3 rounded-md p-4 bg-theme-primary',
        props.className
      )}
    >
      {props.children ?? (
        <>
          <div className='h-40 w-full rounded-md bg-skeleton-primary' />
          <div className='h-4 w-1/4 rounded-md bg-skeleton-primary' />
          <div className='h-4 w-3/4 rounded-md bg-skeleton-primary' />
        </>
      )}
    </motion.div>
  );
}
