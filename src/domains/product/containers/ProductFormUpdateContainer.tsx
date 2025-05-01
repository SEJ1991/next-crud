'use client';
import {
  fakeUploadImagesToLikeS3,
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

  const { data: product } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    gcTime: 0,
    staleTime: 1000 * 60,
  });

  const { data: categories } = useQuery({
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

  const handleSubmit = async (formData: ProductFormType) => {
    if (!product) return;

    const { category: productCategory, thumbnail, images } = product;
    const data: ProductUpdateRequest = {
      ...formData,
      thumbnail,
      images,
    };

    const formCategory = formData.category ?? productCategory;
    if (formData.thumbnail) {
      const dataThumbnail = await fakeUploadImagesToLikeS3([formData.thumbnail], formCategory);

      // return; 업로드 에러 발생시

      if (dataThumbnail[0]) {
        data.thumbnail = dataThumbnail[0];
      }
    }
    if (formData.images) {
      const dataImages = await fakeUploadImagesToLikeS3(formData.images, formCategory);

      // return; 업로드 에러 발생시

      data.images = dataImages
        .map((img, index) => {
          if (img === null) {
            // 이미지가 삭제되었을 경우
            return '';
          }

          if (img === undefined) {
            // 변경사항이 없는 경우
            if (product.images[index]) {
              // 변경된 사항이 없으면서 기존에 있던 사진이 있을 경우 해당 사진을 리턴
              return product.images[index];
            }
            return '';
          }

          return img;
        })
        .filter(img => img);
    }

    mutate(data);
  };

  return (
    <ProductForm
      mode='edit'
      categories={categories ?? []}
      product={product}
      onClcikBack={handleClickBack}
      onSubmit={handleSubmit}
    />
  );
}
