'use client';
import { deleteProduct, getProduct, ProductDetail } from '@/domains/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
  id: string;
  returnCategory: string;
  returnPage: string;
}
export function ProductDetailContainer({ id, returnCategory, returnPage }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const { mutate } = useMutation({
    mutationFn: () => deleteProduct(id),
    onMutate: () => {
      const loadingId = toast.loading('Deleting...');
      return { loadingId };
    },
    onSettled: (_, error, __, context) => {
      toast.dismiss(context?.loadingId);

      if (error) {
        toast.error('Failed to delete the product.');
        return;
      }

      toast.success('Product deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['products', returnCategory, returnPage] });

      let replacePathname = `/products`;
      if (returnCategory !== 'all') {
        replacePathname += `/${returnCategory}`;
      }
      router.replace(`${replacePathname}?page=${returnPage}`);
    },
  });

  const handleClickBack = () => {
    let replacePathname = `/products`;
    if (returnCategory !== 'all') {
      replacePathname += `/${returnCategory}`;
    }
    router.push(`${replacePathname}?page=${returnPage}`);
  };

  const handleClickEdit = (id: number, category: string) => () => {
    router.push(`/products/${category}/${id}/edit`);
  };

  const handleClickDelete = () => {
    mutate();
  };

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
