import { SkeletonCardWithContents } from '@/shared';

export function MovieBannerSkeleton() {
  return (
    <SkeletonCardWithContents className='flex flex-col gap-2 justify-center w-full aspect-[16/9] space-y-0 bg-black-primary'>
      <div className='h-8 w-1/4 mb-4 rounded-md bg-neutral-800' />
      <div className='h-4 w-1/2 rounded-md bg-neutral-800' />
      <div className='h-4 w-1/3 rounded-md bg-neutral-800' />
      <div className='h-4 w-1/4 mb-2 rounded-md bg-neutral-800' />
      <div className='h-8 w-10 rounded-md bg-neutral-800' />
    </SkeletonCardWithContents>
  );
}
