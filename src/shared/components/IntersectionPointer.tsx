'use client';
import { Spinner } from '@/shared';
import { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface Props extends ComponentPropsWithRef<'div'> {
  isVisible: boolean;
  isLoading: boolean;
}
export function IntersectionPointer({ isVisible, isLoading, ...props }: Props) {
  const Contents = () => {
    if (isLoading) return <Spinner className='text-gray-400' />;

    return (
      <div className='flex-center flex-col size-full gap-1'>
        {Array.from({ length: 3 }, (_, index) => (
          <motion.div
            key={`circle-${index}`}
            className='size-2 rounded-full bg-gray-400'
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    );
  };

  if (!isVisible) return null;
  return (
    <div {...props} className={twMerge('flex-center h-[10dvh]', props.className)}>
      <Contents />
    </div>
  );
}
