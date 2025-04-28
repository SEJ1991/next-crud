'use client';
import {
  ProductGridList,
  ProductGridListSkeleton,
  ProductPagination,
  getAllProducts,
  getSkip,
} from '@/domains/product';
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

  return (
    <>
      {isLoading || isError || !data ? (
        <ProductGridListSkeleton />
      ) : (
        <ProductGridList products={data.products} />
      )}
      <ProductPagination
        skip={data?.skip ?? 0}
        total={data?.total ?? 0}
        onClickPage={handleClickPage}
      />
    </>
  );
}
