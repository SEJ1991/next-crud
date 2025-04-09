import { LinkList, SideBar } from '@/shared';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
export default function ContentsLayout({ children }: Readonly<Props>) {
  // const Links = () => {
  //   let navs = [
  //     {
  //       href: '/posts',
  //       label: 'posts',
  //     },
  //   ];

  //   if (pathname.startsWith('/movies')) {
  //     navs = [
  //       {
  //         href: '/movies',
  //         label: 'Now-playing',
  //       },
  //       {
  //         href: '/movies/popular',
  //         label: 'popular',
  //       },
  //       {
  //         href: '/movies/top-rated',
  //         label: 'Top-rated',
  //       },
  //       {
  //         href: '/movies/upcoming',
  //         label: 'Upcoming',
  //       },
  //     ];
  //   }
  //   return <LinkList items={navs} />;
  // };

  return (
    <div className='grid grid-cols-[18.75rem_repeat(auto-fit,minmax(0,1fr))]'>
      <SideBar>{/* {Links()} */}</SideBar>
      {children}
    </div>
  );
}
