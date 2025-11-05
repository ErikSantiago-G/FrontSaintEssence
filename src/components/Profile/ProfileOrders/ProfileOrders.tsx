import { ShoppingBag } from "lucide-react";
import { ProfileOrdersProps } from "./interfaces/ProfileOrdersProps";
import ProfileOrderItemList from "../ProfileOrderItemList/ProfileOrderItemList";
import "./ProfileOrders.scss";

export default function ProfileOrders({ orders, onSelectOrder }: ProfileOrdersProps) {

  return (
    <section className="orders-card" aria-labelledby="orders-heading">
      <header className="card-header">
        <ShoppingBag size={24} aria-hidden="true" />
        <h2 id="orders-heading">Mis pedidos</h2>
      </header>

      <article className="card-body">
        {orders.length === 0 ? (
          <div className="empty-state" role="status" aria-live="polite">
            <ShoppingBag size={48} aria-hidden="true" />
            <p>No tienes pedidos todavía</p>
          </div>
        ) : (
          <article className="orders-list">
            {orders.map((order) => (
              <ProfileOrderItemList key={order.id} order={order} onSelectOrder={onSelectOrder}/>
            ))}
          </article>
        )}
      </article>
    </section>
  );
}
