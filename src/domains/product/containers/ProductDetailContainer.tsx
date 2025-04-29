'use client';
import { getProduct, ProductDetail } from '@/domains/product';
import { getProduct, ProductDetail } from '@/domains/product';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
  returnCategory: string;
  returnPage: string;
}
export function ProductDetailContainer({ id, returnCategory, returnPage }: Props) {
  const router = useRouter();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    gcTime: 0,
    staleTime: 1000 * 60,
  });

  const handleClickBack = () => {
    if (returnCategory === 'all') {
      router.push(`/products?page=${returnPage}`);
      return;
    }
    router.push(`/products/${returnCategory}?page=${returnPage}`);
  };

  const handleClickEdit = (id: number, category: string) => () => {
    router.push(`/products/${category}/${id}/edit`);
  };

  const handleClickDelete = (id: number) => () => {};

  if (isLoading || isError || !product) return <div>로딩</div>;
  return (
    <ProductDetail
      product={product}
      onClickBack={handleClickBack}
      onClickEdit={handleClickEdit}
      onClickDelete={handleClickDelete}
    />
  );
}
