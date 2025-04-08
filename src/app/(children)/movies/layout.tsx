import { SideBar } from '@/shared';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
export default function MovieLayout({ children }: Readonly<Props>) {
  return (
    <div className='grid grid-cols-[18.75rem_repeat(auto-fit,minmax(0,1fr))]'>
      <SideBar>1231241254124</SideBar>
      {children}
    </div>
  );
}
