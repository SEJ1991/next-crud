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
          key={`${id}_${index}`}
          className='relative aspect-[2/3] rounded-md opacity-0 cursor-pointer'
          onClick={onClick(id)}
          initial='initial'
          animate='animate'
          whileHover={{
            scale: 1.01,
            transition: {
              type: 'spring',
              duration: 0.2,
              stiffness: 200,
              delay: 0,
            },
          }}
          whileTap={{
            scale: 0.99,
            transition: {
              type: 'spring',
              duration: 0.2,
              stiffness: 200,
              delay: 0,
            },
          }}
          variants={ITEM_VARIANTS}
          custom={index}
        >
          <Image
            className='object-cover rounded-md'
            src={poster_path ? getTMDBImgPath(poster_path) : '/images/default-poster.jpg'}
            alt={`${title}'s poster image`}
            sizes={getImageSizes()}
            fill
            placeholder='blur'
            blurDataURL='/images/default-poster.jpg'
          />
          {!poster_path && (
            <div className='absolute inset-0 flex-center bg-black/40 p-4'>
              <span className='text-white text-3xl font-semibold truncate'>{title}</span>
            </div>
          )}
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
      delay: ((index % 20) + 1) * 0.03,
    },
  }),
};

function getImageSizes() {
  const sidebarWidth = '15.625rem'; // 좌측 사이드바 width
  const paddingX = '2rem'; // GridList의 padding 좌(1rem), 우(1rem) 합산
  const gap = '1rem'; // GridList의 gap

  return `
    (min-width: 64rem) calc((100vw - ${paddingX} - ${sidebarWidth} - ${gap}) / 4), 
    (min-width: 48rem) calc((100vw - ${paddingX} - ${sidebarWidth} - ${gap}) / 3), 
    (min-width: 26.563rem) calc((100vw - ${paddingX} - ${gap}) / 2), 
    calc(100vw - ${paddingX} - ${sidebarWidth} - ${gap}), 
  `;
}
