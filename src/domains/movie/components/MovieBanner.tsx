'use client';
import { getTMDBImgPath, Movie } from '@/domains/movie';
import { getShortFormatNumber, PeopleIcon, StarIcon, TrophyIcon } from '@/shared';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  movie: Movie;
  onClickMore: (id: number) => () => void;
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
  onClickMore,
}: Props) {
  const Scores = () => {
    const trophy = {
      name: 'trophy',
      icon: <TrophyIcon />,
      score: Math.floor(vote_average * 10) / 10,
    };
    const star = {
      name: 'star',
      icon: <StarIcon />,
      score: getShortFormatNumber(popularity),
    };
    const people = {
      name: 'people',
      icon: <PeopleIcon />,
      score: getShortFormatNumber(vote_count),
    };

    return (
      <ul className='flex items-center gap-2'>
        {[trophy, star, people].map(({ name, icon, score }) => (
          <li key={name} className='flex justify-center items-center gap-1 text-sm md:text-lg'>
            {icon}
            {score}
          </li>
        ))}
      </ul>
    );
  };
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
            className='absolute inset-0 flex flex-col gap-2 w-full justify-center text-white-primary px-4 py-1 mt-[var(--size-header-height)]'
          >
            <h2 className='font-semibold text-lg sm:text-xl md:text-5xl lg:text-7xl'>
              {title}

              {adult && (
                <strong className='bg-red-500 font-semibold rounded-md self-end ml-2 text-sm p-0.5 sm:text-base sm:p-1 md:text-lg lg:text-xl'>
                  19
                </strong>
              )}
            </h2>
            <p className='w-full line-clamp-1 text-sm sm:text-base sm:line-clamp-2 md:text-lg md:line-clamp-3 lg:max-w-[80%]'>
              {overview}
            </p>
            <p className='hidden font-semibold md:block lg:text-xl'>Release date: {release_date}</p>
            <div className='flex gap-2 md:flex-col'>
              <Scores />
              <motion.button
                className='self-start font-semibold bg-gray-800 rounded-sm text-sm px-1 py-0.5 md:text-base md:px-2 md:py-1.5 md:rounded-md'
                whileHover={{ scale: 1.05 }}
                whileTap={{ y: -2 }}
                onClick={onClickMore(id)}
              >
                More
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
