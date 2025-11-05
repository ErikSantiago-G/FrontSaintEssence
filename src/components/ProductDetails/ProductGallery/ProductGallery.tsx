import { useState } from "react";
import type { ProductDetailsGalleryProps } from "../interfaces/ProductDetailsGallery";
import './ProductGallery.scss';

const ProductGallery: React.FC<ProductDetailsGalleryProps> = ({ images = [] }) => {
  const [selected, setSelected] = useState(images[0] ?? '');
  const thumbnails = images.slice(1);
  
  return (
    <aside className="product-gallery" aria-label="Galería de producto">
      <section className="product-gallery__thumbnails">
        {thumbnails.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img)}
            className={`product-gallery__thumb ${
              selected === img ? "active" : ""
            }`}
            aria-label={`Imagen ${i + 2}`}
          >
            <img src={img} alt={`Vista ${i + 2} del producto`} />
          </button>
        ))}
      </section>
      <figure className="product-gallery__main">
        <img src={selected} alt="Imagen principal del producto" />
      </figure>
    </aside>
  );
};

export default ProductGallery;
