import React from 'react';
import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Página no encontrada</h2>
        <p className="not-found__description">
          Lo sentimos, la página que estás buscando no existe.
        </p>
      </div>
    </div>
  );
};

export default NotFound;