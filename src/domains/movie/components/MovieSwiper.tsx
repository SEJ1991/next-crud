'use client';
import { getTMDBImgPath, Movie, MovieStatus } from '@/domains/movie';
import { ImageWithSkeleton } from '@/shared';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  movies: Movie[];
  status: MovieStatus;
  initPerView: number;
}
export function MovieSwiper({ movies, status, initPerView }: Props) {
  return (
    <div className='relative w-full'>
      <Swiper
        modules={[Navigation]}
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
        navigation
        className='!overflow-visible'
      >
        {movies.map(({ id, poster_path, title }, index) => (
          <SwiperSlide
            key={`${status}-swiper-${id}-${index}`}
            className='aspect-[2/3] hover:scale-105 hover:z-10 transition-transform duration-300'
          >
            <div className='size-full relative rounded-md overflow-hidden'>
              <ImageWithSkeleton
                src={poster_path ? getTMDBImgPath({ path: poster_path }) : ''}
                alt={`${title}'s poster image`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
