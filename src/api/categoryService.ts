import api from "./axiosInstance";
import { Category } from "./types/category";

export const CategoryService = {
    getAll: () => api.get<Category[]>("/categories"),
    getById: (id: string) => api.get<Category>(`/categories/${id}`),
    getBySlug: (slug: string) => api.get<Category>(`/categories/slug/${slug}`),
    create: (data: Partial<Category>) => api.post("/admin/categories", data),
    update: (id: string, data: Partial<Category>) => api.patch(`/admin/categories/${id}`, data),
    delete: (id: string) => api.delete(`/admin/categories/${id}`),
};
