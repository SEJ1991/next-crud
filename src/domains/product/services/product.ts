import { ProductCategory } from '@/domains/product';
import { productAxios } from '@/shared';

export async function getCategories(): Promise<ProductCategory[]> {
  const response = await productAxios.get('/products/categories');
  return response.data;
}
