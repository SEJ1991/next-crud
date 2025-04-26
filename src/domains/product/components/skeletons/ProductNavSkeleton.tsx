import { getRandomInt, RefreshIcon, Skeleton } from '@/shared';

interface Props {
  length?: number;
  onClickRefresh: () => void;
}
export function ProductNavSkeleton({ length = 25, onClickRefresh }: Props) {
  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-semibold text-2xl'>Categories</h2>
        <button
          className='size-6 p-1 border border-border-primary rounded-md'
          onClick={onClickRefresh}
        >
          <RefreshIcon className='size-full' />
        </button>
      </div>
      <nav>
        <ul className='flex flex-col gap-2'>
          {Array.from({ length }).map((_, index) => {
            const width = `${getRandomInt(40, 80)}%`;
            return (
              <li key={`product-nav-skeleton-${index}`} className='py-1' style={{ width }}>
                <Skeleton className='h-4 rounded-md' />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
