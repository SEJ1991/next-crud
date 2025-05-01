import { NextLink } from '@/shared';

export default function NotFound() {
  return (
    <section className='w-full h-dvh flex flex-col justify-center items-center gap-4 bg-black-primary text-white-primary'>
      <h1 className='text-2xl sm:text-4xl md:text-6xl'>
        NOT FOUND{' '}
        <strong className='text-accent-primary text-lg sm:text-2xl md:text-5xl'>404</strong>
      </h1>
      <nav className='flex gap-2'>
        <NextLink
          className='px-1 py-0.5 rounded-md transition-opacity hover:opacity-50 text-sm text-black-primary bg-white-primary md:text-base md:px-2 md:py-1'
          href='/'
          replace
        >
          HOME
        </NextLink>
        <NextLink
          className='px-1 py-0.5 border border-white-primary rounded-md transition-opacity hover:opacity-50 text-sm md:text-base md:px-2 md:py-1'
          href='/movies'
          replace
        >
          ALL MOVIES
        </NextLink>
      </nav>
    </section>
  );
}
