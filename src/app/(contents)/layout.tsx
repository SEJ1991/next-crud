import { ContentsNav, ContentsRow, SideBar } from '@/shared';

interface Props {
  children: React.ReactNode;
}
export default function ContentsLayout({ children }: Readonly<Props>) {
  return (
    <div className='grid grid-cols-[15.625rem_repeat(auto-fit,_minmax(0,1fr))]'>
      <SideBar className='flex flex-col gap-4 max-w-dvh px-page-frame-x pb-page-frame-y overflow-y-auto'>
        <ContentsRow title='Contents'>
          <ContentsNav />
        </ContentsRow>
      </SideBar>
      {children}
    </div>
  );
}
