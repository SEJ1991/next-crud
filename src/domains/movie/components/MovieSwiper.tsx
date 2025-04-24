'use client';
import { Movie, MovieCard, MovieStatus } from '@/domains/movie';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  movies: Movie[];
  status: MovieStatus;
  initPerView: number;
  onClickCard: (id: number) => () => void;
}
export function MovieSwiper({ movies, status, initPerView, onClickCard }: Props) {
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
        {movies.map((movie, index) => (
          <SwiperSlide
            key={`${status}-swiper-${movie.id}-${index}`}
            className='aspect-[2/3] hover:scale-105 hover:z-10 transition-transform duration-300 rounded-md overflow-hidden cursor-pointer'
          >
            <MovieCard
              movie={movie}
              onClick={onClickCard(movie.id)}
              imageSizes={`
                (min-width: 1024px) 11vw,
                (min-width: 768px) 15vw,
                (min-width: 480px) 23vw,
                45vw
            `}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
