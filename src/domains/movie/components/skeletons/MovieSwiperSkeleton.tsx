import { Skeleton } from '@/shared';
import { motion } from 'framer-motion';

interface Props {
  length?: number;
}
export function MovieSwiperSkeleton({ length = 10 }: Props) {
  return (
    <div className='max-w-full overflow-x-hidden'>
      <ul className='flex gap-4'>
        {Array.from({ length }).map((_, index) => (
          <motion.li
            key={`movie-swiper-skeleton-${index}`}
            className='w-[47.5%] aspect-[2/3] rounded-md overflow-hidden sm:w-[22.5%] md:w-[15%] lg:w-[11.25%] shrink-0'
          >
            <Skeleton className='bg-neutral-800' />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
