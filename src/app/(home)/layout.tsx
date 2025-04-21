import React from 'react';

interface Props {
  movieWidget: React.ReactNode;
  children: React.ReactNode;
}
export default function HomeLayout({ movieWidget, children }: Readonly<Props>) {
  return (
    <main className='flex flex-col justify-center items-center gap-4 w-full h-dvh'>
      {children}
      <span className='mt-4'>⬇️ Click card to see more pages ⬇️</span>
      <div className='flex mt-4 gap-2'>{movieWidget}</div>
    </main>
  );
}
