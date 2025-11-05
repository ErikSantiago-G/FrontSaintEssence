import React from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetails.scss';

const NewsDetails: React.FC = () => {
  const { id, slug } = useParams();
  
  return (
    <div className="news-details">
      <div className="news-details__container">
        <h1 className="news-details__title">Detalles de la Noticia</h1>
        <p className="news-details__description">
          Mostrando detalles de la noticia {id || slug}. Esta página será implementada pronto.
        </p>
      </div>
    </div>
  );
};

export default NewsDetails;