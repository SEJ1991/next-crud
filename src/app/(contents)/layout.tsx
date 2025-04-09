import { ContentsNav, SideBar } from '@/shared';

interface Props {
  children: React.ReactNode;
}
export default function ContentsLayout({ children }: Readonly<Props>) {
  return (
    <div className='grid grid-cols-[15.625rem_repeat(auto-fit,_minmax(0,1fr))]'>
      <SideBar className='flex flex-col gap-4 max-w-dvh px-page-frame-x pb-page-frame-y overflow-y-auto'>
        <h2 className='text-2xl text-accent-primary'>Contents</h2>
        <hr className='text-border-primary' />
        <ContentsNav />
      </SideBar>
      {children}
    </div>
  );
}
