import { useEffect } from "react";
import { OrderInfo } from "../ProfileOrderInfo/ProfileOrderInfo";
import { OrderModalProps } from "./interfaces/OrderModalProps";
import { ProfileOrderModalItemsList } from "../ProfileOrderModalItemsList/ProfileOrderModalItemsList";
import './ProfileOrderModal.scss';

export default function ProfileOrderModal({ order, onClose }: OrderModalProps) {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  
  return (
    <section className="modal-overlay" onClick={onClose}>
      <dialog className="modal" open onClick={(e) => e.stopPropagation()}>
        <header>
          <h2>Order Details</h2>
        </header>

        <OrderInfo order={order} />

        <h3>Items</h3>
        <ProfileOrderModalItemsList items={order.items!} />

        <footer className="modal-actions">
          <button className="btn-close" onClick={onClose}>Cerrar</button>
        </footer>
      </dialog>
    </section>
  );
}
