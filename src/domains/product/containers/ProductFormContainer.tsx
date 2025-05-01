'use client';
import {
  getCategories,
  getProduct,
  ProductForm,
  ProductFormRequest,
  ProductFormType,
  ProductInfo,
  ProductUpdateRequest,
  useProductFormMutationOptions,
} from '@/domains/product';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface Props {
  id?: string;
  mode?: 'new' | 'edit';
  category?: string;
  returnCategory: string;
  returnPage: string;
}
export function ProductFormContainer({
  id,
  mode = 'new',
  category,
  returnCategory,
  returnPage,
}: Props) {
  const router = useRouter();
  const mutationOptions = useProductFormMutationOptions({
    id,
    mode,
    category,
    returnCategory,
    returnPage,
  });

  const { mutate } = useMutation(mutationOptions);
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id as string),
    gcTime: 0,
    staleTime: 1000 * 60,
    enabled: mode === 'edit' && !!id,
  });
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const handleClickBack = () => {
    if (mode === 'new') {
      let replacePathname = `/products`;
      if (returnCategory !== 'all') {
        replacePathname += `/${returnCategory}`;
      }
      router.replace(`${replacePathname}?page=${returnPage}`);
      return;
    }

    router.replace(
      `/products/${category}/${id}?returnCategory=${returnCategory}&returnPage=${returnPage}`
    );
  };

  const handleSubmit = (formData: ProductFormType) => {
    mutate(formData as ProductFormRequest);
  };

  if (
    (mode === 'edit' && (!product || isLoading || isError)) ||
    !categories ||
    isCategoryLoading ||
    isCategoryError
  ) {
    return <div>로딩</div>;
  }
  return (
    <ProductForm
      mode={mode}
      categories={categories}
      onClcikBack={handleClickBack}
      onSubmit={handleSubmit}
      defaultValues={getDefaultValues(product)}
    />
  );
}

function getDefaultValues(product?: ProductInfo) {
  if (!product) return undefined;
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = product;

  return {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  };
}
