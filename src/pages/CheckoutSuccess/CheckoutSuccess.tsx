import React from 'react';
import './CheckoutSuccess.scss';

const CheckoutSuccess: React.FC = () => {
  return (
    <div className="checkout-success">
      <div className="checkout-success__container">
        <h1 className="checkout-success__title">¡Compra Exitosa!</h1>
        <p className="checkout-success__description">
          Tu pago ha sido procesado exitosamente. Esta página será implementada pronto.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;