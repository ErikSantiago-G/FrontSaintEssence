import { Order } from "../../../../api/types/order";

export interface ProfileOrderItemProps {
    order: Order;
    onSelectOrder: (order: Order) => void;
}