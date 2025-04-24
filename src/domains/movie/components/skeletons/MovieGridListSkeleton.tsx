import { Skeleton } from '@/shared';

interface Props {
  length?: number;
}
export function MovieGridListSkeleton({ length = 20 }: Props) {
  return (
    <ul className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
      {Array.from({ length }).map((_, index) => (
        <li key={`movie-grid-skeleton-${index}`} className='relative aspect-[2/3] cursor-pointer'>
          <Skeleton className='size-full rounded-md bg-neutral-800' />
        </li>
      ))}
    </ul>
  );
}
