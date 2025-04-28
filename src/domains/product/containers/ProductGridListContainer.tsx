'use client';
import {
  ProductGridList,
  ProductPagination,
  getAllProducts,
  getLastPage,
  getNowPage,
  getPages,
  getSkip,
} from '@/domains/product';
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

  const handleClickPage = (page: number) => () => {};

  if (isLoading || isError || !data) return <div>로딩</div>;
  const { products, skip, total } = data;

  return (
    <>
      <ProductGridList products={products} />
      <ProductPagination skip={skip} total={total} onClickPage={handleClickPage} />
    </>
  );
}
