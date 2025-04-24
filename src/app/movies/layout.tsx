import 'swiper/css';
import 'swiper/css/navigation';
import { MovieHeader } from '@/domains/movie';
import { FixedToTopButton, LayoutFrame } from '@/shared';

interface Props {
  children: React.ReactNode;
}
export default function MovieLayout({ children }: Props) {
  return (
    <div className='bg-black-primary text-white-primary'>
      <LayoutFrame className='overflow-hidden'>
        <MovieHeader />
        <main>{children}</main>
        <FixedToTopButton className='bg-black-primary text-white-primary' />
      </LayoutFrame>
    </div>
  );
}
