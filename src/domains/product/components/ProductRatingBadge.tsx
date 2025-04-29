import { StarIcon } from '@/shared';
import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ComponentPropsWithoutRef<'div'> {
  rating: number;
}
export function ProductRatingBadge({ rating, ...props }: Props) {
  return (
    <div
      {...props}
      className={twMerge(
        'absolute top-0 right-0 flex justify-center items-center gap-1 px-2 py-0.5 bg-gray-800/80 text-white-primary rounded-md z-1',
        props.className
      )}
    >
      <StarIcon className='size-4 text-amber-200' />
      {rating}
    </div>
  );
}
