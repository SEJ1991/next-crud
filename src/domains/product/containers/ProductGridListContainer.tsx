'use client';
import { ProductGridList, ProductPagination, getAllProducts, getSkip } from '@/domains/product';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  category?: string;
  page: number;
}
export function ProductGridListContainer({ category = 'all', page }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category, page],
    queryFn: () => getAllProducts({ skip: getSkip(page) }),
  });

  const handleClickPage = (page: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading || isError || !data) return <div>로딩</div>;
  const { products, skip, total } = data;

  return (
    <>
      <ProductGridList products={products} />
      <ProductPagination skip={skip} total={total} onClickPage={handleClickPage} />
    </>
  );
}
