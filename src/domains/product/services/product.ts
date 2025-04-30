import {
  ProductCategory,
  ProductFormRequest,
  ProductFormResponse,
  ProductInfo,
  ProductsRequest,
  ProductsResponse,
  ProductUpdateRequest,
} from '@/domains/product';
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

export async function createProduct(data: ProductFormRequest): Promise<ProductFormResponse> {
  const response = await productAxios.post('/products/add', data);
  return response.data;
}

export async function updateProduct(
  id: string,
  data: ProductUpdateRequest
): Promise<ProductFormResponse> {
  const response = await productAxios.patch(`/products/${id}`, data);
  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await productAxios.delete(`/products/${id}`);
  return response.data;
}
