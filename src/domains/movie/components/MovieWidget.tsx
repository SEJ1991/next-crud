'use client';
import { getTMDBImgPath, Movie } from '@/domains/movie';
import { ImageWithSkeleton, OverlayCard } from '@/shared';
import { motion } from 'framer-motion';

interface Props {
  movies: Movie[];
  onClick: () => void;
}
export function MovieWidget({ movies, onClick }: Props) {
  return (
    <OverlayCard
      className='relative w-50 aspect-[2/3] rounded-md shadow-primary bg-black-primary'
      whileTap={{ scale: 0.95, zIndex: 1 }}
      whileHover={{ scale: 1.2, zIndex: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 800 }}
      onClick={onClick}
    >
      <ul className='grid grid-cols-3 items-center size-full gap-4 p-4'>
        {movies.map(({ id, title, poster_path }, index) => (
          <motion.li
            key={id}
            className='relative aspect-[2/3] rounded-md'
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 50,
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <ImageWithSkeleton
              className='size-full rounded-md'
              src={getTMDBImgPath({ path: poster_path ?? '', size: 'w500' })}
              alt={`${title}'s poster image`}
              sizes='5vw'
              fill
            />
          </motion.li>
        ))}
      </ul>

      <OverlayCard.HoverContents className='absolute bottom-0 w-full p-2 bg-gradient-to-t from-black-primary/80 to-transparent backdrop-blur-md rounded-b-md text-white-primary'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-semibold'>Movies</h2>
          <p className='text-sm'>Discover the latest movies.</p>
        </div>
      </OverlayCard.HoverContents>
    </OverlayCard>
  );
}
