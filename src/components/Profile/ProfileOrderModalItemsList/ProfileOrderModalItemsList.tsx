import type { OrderItem } from "../../../api/types/order";
import { formatCurrency } from "../../../utils/formaters";
import './ProfileOrderModalItemsList.scss';

export function ProfileOrderModalItemsList({ items }: { items: OrderItem[] }) {
  if (items.length === 0) return <p>No hay productos en este pedido.</p>;

  return (
    <ul className="order-items">
      {items.map((item) => (
        <li key={item.id} className="item">
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            loading="lazy"
          />
          <div className="item-details">
            <h4>{item.product.name}</h4>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: {formatCurrency(item.price)}</p>
            <p className="subtotal">
              Subtotal: {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
