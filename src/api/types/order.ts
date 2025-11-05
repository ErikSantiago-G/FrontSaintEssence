import { User } from "./auth";
import { Product } from "./product";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  shippingAddress?: string;
  items?: OrderItem[];
  user?: User;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}