import { Order } from "../../../../api/types/order";

export interface ProfileOrdersProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const STATUS_CLASSES: Record<string, string> = {
  PENDING: "pending",
  PAID: "paid",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const STATUS_LABELS_ES: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  PROCESSING: "Procesando",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};
