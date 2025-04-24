import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { getTMDBImgPath, Movie } from '@/domains/movie';
import Image from 'next/image';

interface Props extends HTMLMotionProps<'li'> {
  movie: Movie;
}
function MovieCardComponent({ movie: { poster_path, title }, ...props }: Props) {
  return (
    <motion.li {...props} className='relative aspect-[2/3] rounded-md cursor-pointer'>
      {poster_path ? (
        <Image
          className='rounded-md bg-neutral-800'
          src={getTMDBImgPath({ path: poster_path })}
          alt={`${title}'s poster image`}
          fill
          sizes={`
            (min-width: 1024px) 15vw,
            (min-width: 768px) 18vw,
            (min-width: 480px) 23vw,
            30vw
          `}
        />
      ) : (
        <div className='absolute inset-0 flex justify-center items-center bg-black/40 p-4'>
          <span className='text-white text-3xl font-semibold truncate'>{title}</span>
        </div>
      )}
    </motion.li>
  );
}

function isEqual(prev: Props, next: Props) {
  return prev.movie.id === next.movie.id;
}

export const MovieCard = React.memo(MovieCardComponent, isEqual);
