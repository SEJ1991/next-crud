'use client';
import {
  ProductGridList,
  getAllProducts,
  getLastPage,
  getNowPage,
  getPages,
  getSkip,
} from '@/domains/product';
import { Pagination } from '@/shared';
import { useQuery } from '@tanstack/react-query';

interface Props {
  category?: string;
  page: number;
}
export function ProductGridListContainer({ category = 'all', page }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category, page],
    queryFn: () => getAllProducts({ skip: getSkip(page) }),
  });

  const handleClickPage = (id: number) => () => {
    console.log(id);
  };

  if (isLoading || isError || !data) return <div>로딩</div>;
  const { products, skip, total } = data;

  return (
    <>
      <ProductGridList products={products} />
      <Pagination
        nowPage={getNowPage(skip)}
        pages={getPages(skip, total)}
        lastPage={getLastPage(total)}
        onClickPage={handleClickPage}
      />
    </>
  );
}
