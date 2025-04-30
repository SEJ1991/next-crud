import React from 'react';

interface Props {
  movieWidget: React.ReactNode;
  productWidget: React.ReactNode;
  children: React.ReactNode;
}
export default function HomeLayout({ movieWidget, productWidget, children }: Readonly<Props>) {
  return (
    <main className='flex flex-col justify-center items-center gap-4 w-full min-h-dvh px-[var(--size-page-frame-padding-x)] py-[var(--size-page-frame-padding-y)]'>
      {children}
      <span className='mt-4'>⬇️ Click card to see more pages ⬇️</span>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] place-items-center w-[80%] max-w-[450px] mt-4 gap-8'>
        {movieWidget}
        {productWidget}
      </div>
    </main>
  );
}
