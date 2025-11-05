import { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { useCartStore } from '../../../store/useCartStore';
import { ToastMessage } from '../../Shared/ToastMessage/ToastMessage';
import type { ProductDetailsProps } from '../interfaces/ProductDetailsProps';
import './ProductInfo.scss';

const ProductInfo: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { toast, showToast, hideToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleClick = async (id: string) => {
    try {
      setLoading(true);
      await addItem(id, 1);
      showToast("Producto agregado al carrito", "success");
    } catch {
      showToast("No se pudo agregar el producto", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="product-info">
      <h1 className="product-info__title">{product.name}</h1>

      <section className="product-info__price">
        <span className="product-info__price--new">${product.price.toFixed(2)}</span>
      </section>

      <section className="product-info__color">
        <h4>Stock: {product.stock}</h4>
        <p>{product.description}</p>
      </section>

      <button
        className="product-info__add"
        onClick={() => handleClick(product.id!)}
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : "Añadir al carrito"}
      </button>

      <footer>
        <p>
          <strong>Categoría:</strong> {product.category?.name}
        </p>
        <p>
          <strong>Tags:</strong> {product.category?.slug}
        </p>
      </footer>

      {toast.text && (
        <ToastMessage
          text={toast.text}
          type={toast.type as "success" | "error"}
          onClose={hideToast}
        />
      )}
    </article>
  );
};

export default ProductInfo;
