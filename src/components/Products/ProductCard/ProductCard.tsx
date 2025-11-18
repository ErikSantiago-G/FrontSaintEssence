import type { ProductCardPropsExtends } from "./interfaces/ProductCard";
import { useState } from "react";
import { ImageOff, ShoppingCart, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";

const ProductCard: React.FC<ProductCardPropsExtends> = ({ product, onAddToCart, addedToCart, noIcons }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  if (!product.isActive) return null;

  return (
    <article
      onClick={() => navigate(`/products/${product.id}`)}
      className={`product-card ${!loaded && !error ? "loading" : ""}`}
    >
      {!noIcons && 
      <header className="product-card__icons" onClick={(e) => e.stopPropagation()}>
        <button
          className={`icon-btn ${addedToCart ? "added" : ""}`}
          aria-label="add-to-cart"
          onClick={onAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? <Check /> : <ShoppingCart />}
        </button>
        {/* <button className="icon-btn" aria-label="favorite">
          <Heart />
        </button>
        <button className="icon-btn" aria-label="zoom">
          <ZoomIn />
        </button> */}
      </header>}

      <figure className="product-card__image">
        {!error ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <section className="placeholder">
            <ImageOff className="placeholder__icon" />
          </section>
        )}
      </figure>

      <section className="product-card__info">
        <h5 className="product-card__title heading--5">{product.name}</h5>
        <p className="product-card__category">{product.category?.name}</p>
        <p className="product-card__stock">Disponibles: {product.stock}</p>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </section>
    </article>
  );
};

export default ProductCard;
