import { Order } from "../../../../api/types/order";

export interface OrderModalProps {
  order: Order;
  onClose: () => void;
}