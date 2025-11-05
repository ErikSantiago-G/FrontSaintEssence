import { Order, OrderStatus } from "../../api/types/order";

export interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  fetchOrders: (status?: OrderStatus) => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
}