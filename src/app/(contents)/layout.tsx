import { ContentsNav, SideBar } from '@/shared';

interface Props {
  children: React.ReactNode;
}
export default function ContentsLayout({ children }: Readonly<Props>) {
  return (
    <div className='grid grid-cols-[18.75rem_repeat(auto-fit,minmax(0,1fr))]'>
      <SideBar>
        <ContentsNav />
      </SideBar>
      {children}
    </div>
  );
}
