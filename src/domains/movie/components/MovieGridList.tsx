import { Movie, MovieCard, MovieStatus } from '@/domains/movie';
import { motion } from 'framer-motion';

interface Props {
  movies: Movie[];
  status: MovieStatus;
  onClickCard: (id: number) => () => void;
}
export function MovieGridList({ movies, onClickCard, status }: Props) {
  return (
    <ul className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
      {movies.map((movie, index) => (
        <motion.li
          key={`${status}-grid-${movie.id}-${index}`}
          className='aspect-[2/3] rounded-md overflow-hidden cursor-pointer'
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
        >
          <MovieCard
            movie={movie}
            onClick={onClickCard(movie.id)}
            imageSizes={`
              (min-width: 1024px) 15vw,
              (min-width: 768px) 18vw,
              (min-width: 480px) 23vw,
              30vw
          `}
          />
        </motion.li>
      ))}
    </ul>
  );
}
