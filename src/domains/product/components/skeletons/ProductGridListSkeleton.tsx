import { SkeletonCardWithContents } from '@/shared';

interface Props {
  length?: number;
}
export function ProductGridListSkeleton({ length = 20 }: Props) {
  return (
    <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6'>
      {Array.from({ length }).map((_, index) => (
        <li key={`grid-products-skeleton-${index}`}>
          <SkeletonCardWithContents className='p-2 rounded-md cursor-pointer shadow-secondary overflow-hidden' />
        </li>
      ))}
    </ul>
  );
}
