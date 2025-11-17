import { Product, ProductQuery } from "../../api/types/product";

export interface ProductMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  meta: ProductMeta;
  fetchProducts: (page?: number, filters?: ProductQuery) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
}