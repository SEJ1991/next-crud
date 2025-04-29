import { getLastPage, getNowPage, getPages } from '@/domains/product/utils/pagination';
import { Pagination } from '@/shared';

interface Props {
  skip: number;
  total: number;
  onClickPage: (page: number) => () => void;
}
export function ProductPagination({ skip, total, onClickPage }: Props) {
  return (
    <div className='sticky right-0 bottom-4 flex justify-center items-center z-5'>
      <Pagination
        className='inline-flex bg-theme-primary p-5 rounded-lg shadow-secondary'
        nowPage={getNowPage(skip)}
        pages={getPages(skip, total)}
        lastPage={getLastPage(total)}
        onClickPage={onClickPage}
      />
    </div>
  );
}
