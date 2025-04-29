'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { ComponentProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/shared';

interface Props extends ComponentProps<typeof Image> {
  blockSkeleton?: boolean;
}
export function ImageWithSkeleton({ blockSkeleton = false, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(() => (blockSkeleton ? false : true));

  const handleLoad = () => {
    if (!isLoading) return;
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {!blockSkeleton && (!props.src || isLoading) && (
          <Skeleton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={twMerge('absolute size-full inset-0', props.className)}
          />
        )}
      </AnimatePresence>
      <Image
        {...props}
        className={twMerge(
          clsx(
            'absolute size-full inset-0 object-cover transition-opacity duration-800',
            isLoading ? 'opacity-0' : 'opacity-100'
          ),
          props.className
        )}
        fill
        onLoad={handleLoad}
      />
    </>
  );
}
