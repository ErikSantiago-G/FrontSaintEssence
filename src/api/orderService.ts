import api from "./axiosInstance";
import { Order, OrderStatus } from "./types/order";

export const OrderService = {
  getOrders: (status?: OrderStatus | "ALL") => {
    const params = status && status !== "ALL" ? { status } : {};
    return api.get<Order[]>("/orders", { params });
  },
  getOrderById: (id: string) => api.get<Order>(`/orders/${id}`),

  getAdminOrders: (status?: OrderStatus | "ALL") => {
    const params = status && status !== "ALL" ? { status } : {};
    return api.get<Order[]>("/admin/orders", { params });
  },

  getAdminOrderById: (id: string) => api.get<Order>(`/admin/orders/${id}`),

  updateOrderStatus: (id: string, status: OrderStatus) =>
    api.patch(`/admin/orders/${id}/status`, { status }),
};

