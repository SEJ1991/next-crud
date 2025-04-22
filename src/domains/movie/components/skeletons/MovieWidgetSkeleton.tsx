import { Skeleton } from '@/shared';
import React from 'react';

interface Props {
  onClick: () => void;
}
export function MovieWidgetSkeleton({ onClick }: Props) {
  return (
    <Skeleton
      className='w-50 aspect-[2/3] rounded-md shadow-primary cursor-pointer'
      whileTap={{ scale: 0.95, zIndex: 1 }}
      whileHover={{ scale: 1.2, zIndex: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.8 }}
      onClick={onClick}
    />
  );
}
