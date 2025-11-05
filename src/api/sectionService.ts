import api from "./axiosInstance";
import { Section } from "./types/news";

export const SectionService = {
  getAll: () => api.get<Section[]>("/sections"),
  getById: (id: string) => api.get<Section>(`/sections/${id}`),
  create: (data: Partial<Section>) => api.post("/admin/sections", data),
  update: (id: string, data: Partial<Section>) => api.patch(`/admin/sections/${id}`, data),
  delete: (id: string) => api.delete(`/admin/sections/${id}`),
};
