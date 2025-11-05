import { Product, ProductQuery } from "../../api/types/product";

export interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  fetchProducts: (params?: ProductQuery) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
}