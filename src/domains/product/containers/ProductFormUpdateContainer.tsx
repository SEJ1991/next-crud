'use client';
import {
  getCategories,
  getProduct,
  ProductForm,
  ProductFormType,
  ProductUpdateRequest,
  updateProduct,
} from '@/domains/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props {
  id: string;
  category: string;
  returnCategory: string;
  returnPage: string;
}
export function ProductFormUpdateContainer({ id, category, returnCategory, returnPage }: Props) {
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

  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const { mutate } = useMutation({
    mutationFn: (data: ProductUpdateRequest) => updateProduct(id, data),
    onMutate: () => {
      const loadingId = toast.loading('Updating product...');
      return { loadingId };
    },
    onSettled: (
      _: unknown,
      error: unknown,
      __: unknown,
      context?: { loadingId?: string | number }
    ) => {
      toast.dismiss(context?.loadingId);

      if (error) {
        toast.error('Failed to update product.');
        return;
      }

      toast.success('Product updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['products'] });

      router.replace(
        `/products/${category}/${id}?returnCategory=${returnCategory}&returnPage=${returnPage}`
      );
    },
  });

  const handleClickBack = () => {
    router.replace(
      `/products/${category}/${id}?returnCategory=${returnCategory}&returnPage=${returnPage}`
    );
  };

  const handleSubmit = (formData: ProductFormType) => {
    mutate(formData as ProductUpdateRequest);
  };

  if (!product || !categories || isLoading || isError || isCategoryLoading || isCategoryError) {
    return <div>로딩</div>;
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category: productCategory,
    thumbnail,
    images,
  } = product;
  return (
    <ProductForm
      mode='edit'
      categories={categories}
      onClcikBack={handleClickBack}
      onSubmit={handleSubmit}
      defaultValues={{
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category: productCategory,
        thumbnail,
        images,
      }}
    />
  );
}
