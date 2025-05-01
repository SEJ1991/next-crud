import { getTMDBImgPath, MovieDetail } from '@/domains/movie';
import {
  getShortFormatNumber,
  Modal,
  ImageWithSkeleton,
  PeopleIcon,
  SpinnerIcon,
  StarIcon,
  TrophyIcon,
} from '@/shared';

interface Props {
  movie?: MovieDetail;
  isLoading: boolean;
  onClickClose: () => void;
}
export function MovieModal({ movie, isLoading, onClickClose }: Props) {
  const Contents = () => {
    if (!movie || isLoading) {
      return (
        <div className='w-full relative aspect-[16/9]'>
          <SpinnerIcon className='absolute top-1/2 left-1/2 tanslate-1/2 animate-spin' />
        </div>
      );
    }

    const {
      title,
      popularity,
      vote_average,
      vote_count,
      adult,
      overview,
      release_date,
      runtime,
      status,
      genres,
      backdrop_path,
    } = movie;

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
      <div>
        <div className='w-full relative aspect-[16/9]'>
          <ImageWithSkeleton
            className='bg-neutral-800'
            src={backdrop_path ? getTMDBImgPath({ path: backdrop_path, size: 'original' }) : ''}
            alt={`${title}'s poster image`}
          />
          <div className='w-full absolute aspect-[16/9] bg-gradient-to-b from-[rgba(0,0,0,0)] to-black-primary z-30' />
          <div className='absolute flex flex-col justify-end w-full h-1/2 p-4 bottom-0 text-white z-31'>
            <h2 className='font-semibold mb-4 text-4xl s:text-5xl md:text-6xl lg:text-7xl'>
              {title}

              {adult && (
                <strong className='bg-red-500 font-semibold rounded-md self-end ml-2 text-sm p-1 s:text-lg s:p-2'>
                  19
                </strong>
              )}
            </h2>
            <Scores />
          </div>
        </div>
        <article className='p-4'>
          <dl className='flex flex-col'>
            <div className='mb-4'>
              <dt className='text-3xl'>Overview</dt>
              <dd>{overview}</dd>
            </div>
            <div className='flex gap-2'>
              <dt>Genre: </dt>
              <dd>{genres.map(({ name }) => name).join(' / ')}</dd>
            </div>
            <div className='flex gap-2'>
              <dt>Runtime: </dt>
              <dd>{runtime}mins</dd>
            </div>
          </dl>
          <p>
            {release_date} <strong>({status})</strong>
          </p>
        </article>
      </div>
    );
  };

  return (
    <Modal onClickClose={onClickClose}>
      <Modal.Dim />
      <Modal.Contens
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        className='w-[95%] max-w-[62.5rem] max-h-[100%] overflow-y-auto md:w-[80%] bg-black-primary text-white-primary'
      >
        <Modal.CloseButton className='flex justify-center items-center bg-gray-700 text-white-primary z-45' />
        <Contents />
      </Modal.Contens>
    </Modal>
  );
}
