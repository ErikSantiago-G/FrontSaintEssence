import React from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.scss';

const CategoryProducts: React.FC = () => {
  const { id, slug } = useParams();
  
  return (
    <div className="category-products">
      <div className="category-products__container">
        <h1 className="category-products__title">Productos por Categoría</h1>
        <p className="category-products__description">
          Mostrando productos de la categoría {id || slug}. Esta página será implementada pronto.
        </p>
      </div>
    </div>
  );
};

export default CategoryProducts;