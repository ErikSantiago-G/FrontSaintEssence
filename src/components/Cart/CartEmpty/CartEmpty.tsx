import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartEmpty.scss";

const CartEmpty: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="cart-empty">
      <div className="cart-empty__content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="Carrito vacío"
          className="cart-empty__icon"
        />
        <h2 className="cart-empty__title">Tu carrito está vacío</h2>
        <p className="cart-empty__text">
          Aún no tienes productos en tu carrito. ¡Explora nuestras categorías y
          encuentra algo que te encante!
        </p>
        <button
          className="cart-empty__btn"
          onClick={() => navigate("/products")}
        >
          Ver productos
        </button>
      </div>
    </section>
  );
};

export default CartEmpty;
