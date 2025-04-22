'use client';
import { SpinnerIcon } from '@/shared';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { ComponentPropsWithRef } from 'react';

interface Props extends ComponentPropsWithRef<'div'> {
  isVisible: boolean;
  isLoading: boolean;
}
export function IntersectionPointer({ isVisible, isLoading, ...props }: Props) {
  if (!isVisible) return null;
  return (
    <div
      {...props}
      className={twMerge('flex justify-center items-center h-[10dvh]', props.className)}
    >
      {isLoading ? (
        <SpinnerIcon className='size-8 text-gray-400 animate-spin' />
      ) : (
        <div className='flex justify-center items-center flex-col size-full gap-1'>
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
      )}
    </div>
  );
}
