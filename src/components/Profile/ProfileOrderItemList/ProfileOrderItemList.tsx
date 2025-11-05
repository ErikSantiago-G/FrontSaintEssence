import { STATUS_CLASSES, STATUS_LABELS_ES } from "../ProfileOrders/interfaces/ProfileOrdersProps";
import { ProfileOrderItemProps } from "./interfaces/ProfileOrderItem";

export default function ProfileOrderItemList({ order, onSelectOrder }: ProfileOrderItemProps) {
    return (
        <section className="order-item">
            <section className="order-header">
                <article>
                    <span className="order-id">#{order.id.slice(0, 8)}</span>
                    <span className={`status-badge ${STATUS_CLASSES[order.status]}`}>
                        {STATUS_LABELS_ES[order.status]}
                    </span>
                </article>
                <span className="order-total">${order.totalAmount.toFixed(2)}</span>
            </section>
            <section className="order-details">
                <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                <button className="btn-view-order" onClick={() => onSelectOrder(order)}>
                    Ver detalles
                </button>
            </section>
        </section>
    );
}
