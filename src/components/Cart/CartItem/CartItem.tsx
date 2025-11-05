import { Minus, Plus, X } from "lucide-react";
import type { CartItemProps } from "./interfaces/CartItemProps";
import './CartItem.scss';

export const CartItem: React.FC<CartItemProps> = ({
  product,
  onQuantityChange,
  onRemove,
}) => {
  const handleIncrease = () =>
    onQuantityChange(product.id, product.quantity + 1);

  const handleDecrease = () =>
    product.quantity > 1 &&
    onQuantityChange(product.id, product.quantity - 1);

  return (
    <tr className="cart-item">
      <td className="cart-item__product">
        <button
          aria-label="Remove item"
          className="cart-item__remove"
          onClick={() => onRemove(product.id)}
        >
          <X size={14} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="cart-item__image"
        />
        <section className="cart-item__details">
          <h3>{product.name}</h3>
          <p>Stock: {product.stock}</p>
        </section>
      </td>

      <td className="cart-item__price">${product.price?.toFixed(2)}</td>

      <td className="cart-item__quantity">
        <section className="cart-item__qty-control">
          <button onClick={handleDecrease} aria-label="Decrease quantity">
            <Minus size={14} />
          </button>
          <span>{product.quantity}</span>
          <button onClick={handleIncrease} aria-label="Increase quantity">
            <Plus size={14} />
          </button>
        </section>
      </td>
    </tr>
  );
};