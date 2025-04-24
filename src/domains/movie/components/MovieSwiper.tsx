'use client';
import { Movie, MovieCard, MovieStatus } from '@/domains/movie';
import { ArrowBackIcon, ArrowForwardIcon } from '@/shared';
import { useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

interface Props {
  movies: Movie[];
  status: MovieStatus;
  initPerView: number;
  onClickCard: (id: number) => () => void;
}
export function MovieSwiper({ movies, status, initPerView, onClickCard }: Props) {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <Swiper
      className='relative w-full !overflow-visible'
      modules={[Navigation, Pagination]}
      onBeforeInit={swiper => {
        if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.params.navigation.nextEl = nextButtonRef.current;
        }
      }}
      onSwiper={({ isBeginning, isEnd }) => {
        setIsBeginning(isBeginning);
        setIsEnd(isEnd);
      }}
      onSlideChange={({ isBeginning, isEnd }) => {
        setIsBeginning(isBeginning);
        setIsEnd(isEnd);
      }}
      navigation={{
        prevEl: prevButtonRef.current,
        nextEl: nextButtonRef.current,
      }}
      pagination={{
        el: paginationRef.current,
        type: 'custom',
        renderCustom: (_, current, total) => {
          const pages = Array.from({ length: total }).map(
            (_, index) =>
              `<div class="hidden w-3.5 h-0.5 ${
                current - 1 === index ? 'bg-gray-300' : 'bg-gray-300/30'
              } sm:block"></div>`
          );
          return pages.join('');
        },
      }}
      spaceBetween={16}
      slidesPerView={initPerView}
      slidesPerGroup={initPerView}
      breakpoints={{
        360: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        480: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        768: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
        1024: {
          slidesPerView: 8,
          slidesPerGroup: 8,
        },
      }}
    >
      <div ref={paginationRef} className='absolute -top-8 right-0 flex gap-1 mt-4' />
      <motion.button
        ref={prevButtonRef}
        custom={isBeginning}
        variants={BUTTON_VARIANTES}
        initial='initial'
        animate='initial'
        whileHover='whileHover'
        whileTap='whileHover'
        className='absolute top-1/2 left-2 -translate-y-1/2 size-10 flex justify-center items-center rounded-full bg-black/60 z-1'
      >
        <ArrowBackIcon className='size-10 mr-1 text-gray-200' />
      </motion.button>
      <motion.button
        ref={nextButtonRef}
        custom={isEnd}
        variants={BUTTON_VARIANTES}
        initial='initial'
        animate='initial'
        whileHover='whileHover'
        whileTap='whileTap'
        className='absolute top-1/2 right-2 -translate-y-1/2 size-10 flex justify-center items-center rounded-full bg-black/60 z-1'
      >
        <ArrowForwardIcon className='size-10 ml-1 text-gray-200' />
      </motion.button>

      {movies.map((movie, index) => (
        <SwiperSlide key={`${status}-swiper-${movie.id}-${index}`} className='aspect-[2/3]'>
          <MovieCard
            className='cursor-pointer rounded-md'
            movie={movie}
            onClick={onClickCard(movie.id)}
            imageSizes={`
                (min-width: 1024px) 11vw,
                (min-width: 768px) 15vw,
                (min-width: 480px) 23vw,
                45vw
            `}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: ((index % 20) + 1) * 0.03,
              },
            }}
            whileHover={{
              scale: 1.01,
              transition: {
                type: 'spring',
                duration: 0.2,
                stiffness: 200,
              },
            }}
            whileTap={{
              scale: 0.99,
              transition: {
                type: 'spring',
                duration: 0.2,
                stiffness: 200,
              },
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const BUTTON_VARIANTES = {
  initial: (isDisabled: boolean) => ({
    opacity: isDisabled ? 0 : 1,
    scale: isDisabled ? 0.8 : 1,
    zIndex: isDisabled ? 0 : 1,
  }),
  whileHover: {
    y: -2,
  },
  whileTap: {
    y: 2,
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    dampbing: 20,
    duration: 0.5,
  },
};
