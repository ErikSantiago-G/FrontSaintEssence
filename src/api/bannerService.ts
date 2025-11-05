import api from "./axiosInstance";
import { Banner } from "./types/banner";

export const BannerService = {
    getAll: () => api.get<Banner[]>("/banners"),
    getById: (id: string) => api.get<Banner>(`/banners/${id}`),
    create: (data: Partial<Banner>) => api.post("/admin/banners", data),
    update: (id: string, data: Partial<Banner>) => api.patch(`/admin/banners/${id}`, data),
    delete: (id: string) => api.delete(`/admin/banners/${id}`),
};
