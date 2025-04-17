import { NextLink, ThemeButton } from '@/shared';

export default function HomePage() {
  return (
    <>
      <ThemeButton iconClassName='size-6 md:size-8' />
      <h1 className='text-accent-primary text-2xl sm:text-3xl md:text-4xl'>
        Next.js CRUD reference website.
      </h1>
      <h2 className='text-lg sm:text-xl md:text-2xl'>Domain structure.</h2>
      <NextLink
        href='https://github.com/SEJ1991/next-crud'
        className='animate-bounce transition-opacity duration-300 hover:opacity-75 text-sm md:text-base'
      >
        Github ↗️
      </NextLink>
    </>
  );
}
