import { MovieHeader } from '@/domains/movie';

interface Props {
  children: React.ReactNode;
}
export default function MovieLayout({ children }: Props) {
  return (
    <div className='bg-black-primary text-white-primary'>
      <MovieHeader />
      <main>{children}</main>
    </div>
  );
}
