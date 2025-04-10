'use client';
import { getTMDBImgPath, Movie } from '@/domains/movie';
import { GridList } from '@/shared';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  movies?: Movie[];
  onClick: (id: number) => () => void;
}
export function MovieGridList({ movies = [], onClick }: Props) {
  return (
    <GridList>
      {movies.map(({ id, title, poster_path }, index) => (
        <motion.li
          key={id}
          className='relative aspect-[2/3] rounded-md opacity-0 cursor-pointer'
          onClick={onClick(id)}
          initial='initial'
          animate='animate'
          whileHover='whileHover'
          whileTap='whileTap'
          variants={ITEM_VARIANTS}
          custom={index}
        >
          <Image
            className='object-cover rounded-md'
            src={getTMDBImgPath(poster_path)}
            alt={`${title}'s poster image`}
            fill
          />
        </motion.li>
      ))}
    </GridList>
  );
}

const ITEM_VARIANTS = {
  initial: { opacity: 0, y: 10 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.03,
    },
  }),
  whileHover: {
    y: -3,
    transition: {
      type: 'spring',
      duration: 0.3,
      stiffness: 200,
    },
  },
  whileTap: {
    y: -2,
    transition: {
      type: 'spring',
      duration: 0.3,
      stiffness: 200,
    },
  },
};
