'use client';
import { getTMDBImgPath, Movie } from '@/domains/movie';
import { getShortFormatNumber, PeopleIcon, StarIcon, TrophyIcon } from '@/shared';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  movie: Movie;
}
export function MovieBanner({
  movie: {
    id,
    title,
    backdrop_path,
    adult,
    overview,
    vote_average,
    vote_count,
    popularity,
    release_date,
  },
}: Props) {
  return (
    <>
      <section className='relative'>
        <AnimatePresence>
          <motion.div
            key={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            className='absolute inset-0 aspect-[16/9]'
          >
            <Image
              className='object-cover'
              src={getTMDBImgPath({ path: backdrop_path ?? '', size: 'original' })}
              alt={`${title}'s backdrop image`}
              fill
              sizes='100vw'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black-primary/50 to-black-primary/50 z-10' />
          </motion.div>
        </AnimatePresence>
      </section>
      <section className='relative pb-[50%] z-10'>
        <AnimatePresence>
          <motion.div
            key={`banner-info-${id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: 'absolute' }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
            className='absolute inset-0 flex flex-col gap-2 w-fulltext-white p-4 pt-top-with-header-h sm:gap-4 md:justify-center z-10 md:pt-[10%]'
          >
            <h2 className='font-semibold text-xl mb-4 xs:text-2xl s:text-5xl md:text-6xl lg:text-7xl'>
              {title}

              {adult && (
                <strong className='text-white bg-red-500 font-semibold rounded-md self-end ml-2 text-sm p-1 s:text-lg s:p-2'>
                  19
                </strong>
              )}
            </h2>
            <p className='max-w-[80%] line-clamp-2 text-sm s:text-lg sm:line-clamp-3 sm:max-w-[40%] md:text-xl lg:text-2xl '>
              {overview}
            </p>
            <p className='hidden font-semibold md:block'>Release date: {release_date}</p>
            <ul className='hidden items-center gap-4 md:flex'>
              <li className='flex justify-center items-center gap-2'>
                <PeopleIcon className='size-6' />
                {getShortFormatNumber(vote_count)}
              </li>
              <li className='flex justify-center items-center gap-1'>
                <TrophyIcon className='size-6' />
                {Math.floor(vote_average * 10) / 10}
              </li>
              <li className='flex justify-center items-center gap-1'>
                <StarIcon className='size-6' />
                {getShortFormatNumber(popularity)}
              </li>
            </ul>
            <motion.button
              className='font-semibold bg-gray-800 rounded-md py-2 px-3 self-start'
              whileTap={{ y: -2 }}
              // onClick={onClickMore(id)}
            >
              More
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
