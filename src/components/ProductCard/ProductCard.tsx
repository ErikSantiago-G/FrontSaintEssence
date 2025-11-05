import type { ProductCardProps } from './interfaces/ProductCard';
import { useState } from 'react';
import { Heart, ImageOff, ShoppingCart, ZoomIn } from 'lucide-react';
import './ProductCard.scss';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <article className={`product-card ${!loaded && !error ? 'loading' : ''}`}>
      <header className="product-card__icons">
        {[ShoppingCart, Heart, ZoomIn].map((Icon, index) => (
          <button key={index} className="icon-btn" aria-label={`action-${index}`}>
            <Icon />
          </button>
        ))}
      </header>

      <figure className="product-card__image">
        {!error ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <div className="placeholder">
            <ImageOff className="placeholder__icon" />
          </div>
        )}
      </figure>

      <section className="product-card__info">
        <h5 className="product-card__title heading--5">{product.name}</h5>

        <ul className="product-card__colors">
          {product.colors.map((color, index) => (
            <li
              key={index}
              className="color"
              style={{ backgroundColor: color }}
              aria-label={`color-${color}`}
            />
          ))}
        </ul>

        <p className="product-card__code">Code - Y523201</p>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </section>
    </article>
  );
};

export default ProductCard;
