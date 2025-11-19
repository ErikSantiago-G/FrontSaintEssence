import { XCircle } from "lucide-react";
import "./CheckoutCancel.scss";

const CheckoutCancel: React.FC = () => {
  return (
    <div className="checkout-cancel">
      <div className="checkout-cancel__card">
        <div className="checkout-cancel__icon">
          <XCircle size={72} />
        </div>
        <h1 className="checkout-cancel__title">Compra Cancelada</h1>
        <p className="checkout-cancel__description">
          Tu proceso de compra ha sido cancelado. Si crees que fue un error, puedes intentar nuevamente
          o comunicarte con nuestro equipo de soporte.
        </p>
        <a href="/" className="checkout-cancel__button">
          Volver a la tienda
        </a>
      </div>
    </div>
  );
};

export default CheckoutCancel;
