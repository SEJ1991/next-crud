'use client';
import { OverlayCard } from '@/shared';

export function MovieWidget() {
  return (
    <OverlayCard
      whileTap={{ scale: 0.95, zIndex: 1 }}
      whileHover={{ scale: 1.2, zIndex: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 800 }}
    >
      <div className='w-50 aspect-[2/3] bg-white rounded-md' />
      <OverlayCard.HoverContents className='absolute bottom-0 w-full p-2 text-white bg-gradient-to-t from-black/80 to-transparent backdrop-blur-md rounded-b-md'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-semibold'>Movies</h2>
          <p className='text-sm'>Discover the latest movies.</p>
        </div>
      </OverlayCard.HoverContents>
    </OverlayCard>
  );
}
