import { MovieHeader } from '@/domains/movie';
import { LayoutFrame } from '@/shared';

interface Props {
  children: React.ReactNode;
}
export default function MovieLayout({ children }: Props) {
  return (
    <div className='bg-black-primary text-white-primary'>
      <LayoutFrame>
        <MovieHeader />
        <main>{children}</main>
      </LayoutFrame>
    </div>
  );
}
