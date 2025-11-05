import type { CartTotalsProps } from "./interfaces/CartTotalsProps";
import { Check } from "lucide-react";
import "./CartTotals.scss";

interface ExtendedCartTotalsProps extends CartTotalsProps {
  onCheckout: () => void;
  address: string;
  setAddress: (value: string) => void;
  loading?: boolean;
}

export const CartTotals: React.FC<ExtendedCartTotalsProps> = ({
  subtotal,
  total,
  onCheckout,
  address,
  setAddress,
  loading,
}) => {
  return (
    <>
      <h4 id="cart-totals-title" className="cart-totals__title">
        Totales del carrito
      </h4>
      <section className="cart-totals" aria-labelledby="cart-totals-title">
        <article className="cart-totals__row">
          <span>Subtotal:</span>
          <span>${subtotal?.toFixed(2)}</span>
        </article>
        <hr />
        <article className="cart-totals__row">
          <span>Total:</span>
          <span>${total?.toFixed(2)}</span>
        </article>
        <hr />
        <div className="cart-totals__address">
          <label htmlFor="address">Dirección de envío</label>
          <input
            id="address"
            type="text"
            placeholder="Ej: Calle 123 #45-67, Medellín"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <p className="cart-totals__note">
          <Check />
          Los gastos de envío e impuestos se calculan al finalizar la compra.
        </p>
        <button
          className="cart-totals__button"
          onClick={onCheckout}
          disabled={loading}
        >
          {loading ? <span>Cargando<span className="spinner" /></span> : "Proceder al pago"}
        </button>
      </section>
    </>
  );
};
