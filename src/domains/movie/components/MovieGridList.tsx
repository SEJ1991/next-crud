import { getTMDBImgPath, Movie, MovieStatus } from '@/domains/movie';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  movies: Movie[];
  status: MovieStatus;
  onClickCard: (id: number) => () => void;
}
export function MovieGridList({ movies, onClickCard, status }: Props) {
  return (
    <ul className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
      {movies.map(({ id, title, poster_path }, index) => {
        const Contents = () => {
          if (!poster_path) {
            return (
              <div className='absolute inset-0 flex justify-center items-center bg-black/40 p-4'>
                <span className='text-white text-3xl font-semibold truncate'>{title}</span>
              </div>
            );
          }

          return (
            <Image
              className='rounded-md bg-neutral-800'
              src={getTMDBImgPath({ path: poster_path })}
              alt={`${title}'s poster image`}
              sizes={`
                (min-width: 1024px) 15vw,
                (min-width: 768px)  18vw,
                (min-width: 480px)  23vw
                30vw, 
            `}
              fill
            />
          );
        };

        return (
          <motion.li
            key={`${status}-grid-${id}-${index}`}
            className='relative aspect-[2/3] rounded-md cursor-pointer'
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
            onClick={onClickCard(id)}
          >
            <Contents />
          </motion.li>
        );
      })}
    </ul>
  );
}
