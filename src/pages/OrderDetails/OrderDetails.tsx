import React from 'react';
import { useParams } from 'react-router-dom';
import './OrderDetails.scss';

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div className="order-details">
      <div className="order-details__container">
        <h1 className="order-details__title">Detalles de la Orden</h1>
        <p className="order-details__description">
          Mostrando detalles de la orden {id}. Esta página será implementada pronto.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;