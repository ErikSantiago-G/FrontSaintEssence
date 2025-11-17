import { Product } from "./types/product";
import api from "./axiosInstance";

export interface ProductFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  search?: string;
}

export const ProductService = {
  getAll: (filters: ProductFilters = {}) =>
    api.get<{
      data: Product[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>("/products", { params: filters }),

  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getBySlug: (slug: string) => api.get<Product>(`/products/slug/${slug}`),
  create: (data: Partial<Product>) => api.post("/admin/products", data),
  update: (id: string, data: Partial<Product>) => api.patch(`/admin/products/${id}`, data),
  remove: (id: string) => api.delete(`/admin/products/${id}`),
};
