import { NextLink, PageFrame } from '@/shared';

export default function Home() {
  return (
    <PageFrame className='flex-center flex-col gap-4'>
      <div className='flex-center flex-col'>
        <h1 className='text-4xl text-accent-primary'>Next.js CRUD reference website.</h1>
        <h2 className='text-2xl'>Domain structure.</h2>
      </div>
      <NextLink
        href='https://github.com/SEJ1991/next-crud'
        className='animate-bounce transition-opacity duration-300 hover:opacity-75'
      >
        Github ↗️
      </NextLink>
    </PageFrame>
  );
}
