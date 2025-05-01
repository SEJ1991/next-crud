import { ProductCategory, ProductInfo, ProductsRequest, ProductsResponse } from '@/domains/product';
import { productAxios } from '@/shared';

export async function getCategories(): Promise<ProductCategory[]> {
  const response = await productAxios.get('/products/categories');
  return response.data;
}

export async function getAllProducts(params: ProductsRequest): Promise<ProductsResponse> {
  const response = await productAxios.get('/products', { params });
  return response.data;
}

export async function getProductsByCategory(params: ProductsRequest, category: string) {
  const response = await productAxios.get(`/products/category/${category}`, { params });
  return response.data;
}

export async function getProduct(id: string): Promise<ProductInfo> {
  const response = await productAxios.get(`/products/${id}`);
  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await productAxios.delete(`/products/${id}`);
  return response.data;
}
