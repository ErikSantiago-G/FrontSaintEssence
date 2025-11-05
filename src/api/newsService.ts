import api from "./axiosInstance";
import { News } from "./types/section";

export const NewsService = {
  getAll: () => api.get<News[]>("/news"),
  getById: (id: string) => api.get<News>(`/news/${id}`),
  getBySlug: (slug: string) => api.get<News>(`/news/slug/${slug}`),
  create: (data: Partial<News>) => api.post("/admin/news", data),
  update: (id: string, data: Partial<News>) => api.patch(`/admin/news/${id}`, data),
  delete: (id: string) => api.delete(`/admin/news/${id}`),
};
