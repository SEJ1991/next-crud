import { ProductCategory, ProductsRequest, ProductsResponse } from '@/domains/product';
import { productAxios } from '@/shared';

export async function getCategories(): Promise<ProductCategory[]> {
  const response = await productAxios.get('/products/categories');
  return response.data;
}

export async function getAllProducts(params: ProductsRequest): Promise<ProductsResponse> {
  const response = await productAxios.get('/products', { params });
  return response.data;
}
