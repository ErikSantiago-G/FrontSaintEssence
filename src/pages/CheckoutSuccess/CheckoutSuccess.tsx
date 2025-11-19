import React from "react";
import "./CheckoutSuccess.scss";
import { BadgeCheck } from "lucide-react";

const CheckoutSuccess: React.FC = () => {
  return (
    <section className="checkout-success">
      <article className="checkout-success__card">
        <div className="checkout-success__icon">
          <BadgeCheck size={72} />
        </div>
        <h1 className="checkout-success__title">¡Su pedido se ha completado!</h1>
        <p className="checkout-success__description">
          ¡Gracias por su pedido! Su pedido se está procesando y estará listo en un plazo de 3 a 6 horas.
          Recibirá una confirmación por correo electrónico cuando su pedido esté listo.
        </p>
        <a href="/products" className="checkout-success__button">
          Continuar comprando
        </a>
      </article>
    </section>
  );
};

export default CheckoutSuccess;
