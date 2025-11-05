import { Product } from "./types/product";
import api from "./axiosInstance";

export const ProductService = {
  getAll: () => api.get<{ data: Product[] }>("/products"),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getBySlug: (slug: string) => api.get<Product>(`/products/slug/${slug}`),
  create: (data: Partial<Product>) => api.post("/admin/products", data),
  update: (id: string, data: Partial<Product>) => api.patch(`/admin/products/${id}`, data),
  remove: (id: string) => api.delete(`/admin/products/${id}`),
};
