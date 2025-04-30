export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string; // ISO 8601 포맷 (ex: "2024-05-23T08:56:21.620Z")
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string; // ISO 8601 포맷
  updatedAt: string; // ISO 8601 포맷
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface ProductInfo extends Product {
  brand: string;
}

// api interface
export interface ProductsRequest {
  skip: number;
}

export interface ProductsResponse {
  limit: number;
  total: number;
  skip: number;
  products: Product[];
}

export interface ProductFormRequest {
  title: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

export type ProductUpdateRequest = Partial<ProductFormRequest>;

export interface ProductFormResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
