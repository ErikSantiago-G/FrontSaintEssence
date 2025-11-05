import type { CartProduct } from "../../../../pages/Cart/interfaces/CartProduct";

export interface CartItemProps {
  product: CartProduct;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}