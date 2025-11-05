import type { Order } from "../../../api/types/order";
import { formatCurrency, formatDate } from "../../../utils/formaters";
import { STATUS_CLASSES, STATUS_LABELS_ES } from "../ProfileOrders/interfaces/ProfileOrdersProps";

export function OrderInfo({ order }: { order: Order }) {
  const statusClass = STATUS_CLASSES[order.status] || "pending";
  const statusClasss = STATUS_LABELS_ES[order.status] || "pendiente";

  return (
    <section className="order-info">
      <section className="info-group">
        <label>ID del pedido</label>
        <span>
          <code>{order.id}</code>
        </span>
      </section>

      <section className="info-group">
        <label>Estado</label>
        <span className={`status-badge ${statusClass}`}>{statusClasss}</span>
      </section>

      <section className="info-group">
        <label>Dirección de envío</label>
        <span>{order.shippingAddress}</span>
      </section>

      <section className="info-group">
        <label>Fecha</label>
        <time dateTime={order.createdAt}>{formatDate(order.createdAt)}</time>
      </section>

      <section className="info-group">
        <label>Total</label>
        <span className="total">{formatCurrency(order.totalAmount)}</span>
      </section>
    </section>
  );
}
