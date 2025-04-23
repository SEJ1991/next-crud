import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { getTMDBImgPath, Movie } from '@/domains/movie';
import { ImageWithSkeleton } from '@/shared';

interface Props extends HTMLMotionProps<'div'> {
  movie: Movie;
  imageSizes?: string;
}
function MovieCardComponent({ movie: { poster_path, title }, imageSizes, ...props }: Props) {
  return (
    <motion.div {...props} className='relative size-full'>
      {poster_path ? (
        <ImageWithSkeleton
          className='bg-neutral-800'
          src={getTMDBImgPath({ path: poster_path })}
          alt={`${title}'s poster image`}
          sizes={imageSizes}
        />
      ) : (
        <div className='absolute inset-0 flex justify-center items-center bg-black/40 p-4'>
          <span className='text-white text-3xl font-semibold truncate'>{title}</span>
        </div>
      )}
    </motion.div>
  );
}

function isEqual(prev: Props, next: Props) {
  return prev.movie.id === next.movie.id;
}

export const MovieCard = React.memo(MovieCardComponent, isEqual);
