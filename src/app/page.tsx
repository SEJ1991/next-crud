import { PageFrame } from '@/shared/components/atoms/PageFrame';
import Link from 'next/link';

export default function Home() {
  return (
    <PageFrame className='flex-center flex-col gap-4'>
      <div className='flex-center flex-col'>
        <h1 className='text-4xl text-accent-primary'>Next.js CRUD reference website.</h1>
        <h2 className='text-2xl'>Domain structure.</h2>
      </div>
      <Link
        href='https://github.com/SEJ1991/next-crud'
        target='_blank'
        rel='noopener noreferrer'
        className='animate-bounce transition-opacity duration-300 hover:opacity-75'
      >
        Github ↗️
      </Link>
    </PageFrame>
  );
}
