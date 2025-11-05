import { create } from "zustand";
import { Order, OrderStatus } from "../api/types/order";
import { OrderService } from "../api/orderService";

interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  fetchOrders: (status?: OrderStatus) => Promise<void>;
  fetchOrdersAdmin: (status?: OrderStatus) => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  order: null,
  loading: false,

  fetchOrders: async (status) => {
    set({ loading: true });
    try {
      const { data } = await OrderService.getOrders(status);
      set({ orders: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchOrdersAdmin: async (status) => {
    set({ loading: true });
    try {
      const { data } = await OrderService.getAdminOrders(status);
      set({ orders: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchOrderById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await OrderService.getOrderById(id);
      set({ order: data });
    } finally {
      set({ loading: false });
    }
  },
}));
