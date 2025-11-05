import type { CartProduct } from "./interfaces/CartProduct";
import { useEffect, useState } from "react";
import { CartItem } from "../../components/Cart/CartItem/CartItem";
import { CartTotals } from "../../components/Cart/CartTotals/CartTotals";
import { useCartStore } from "../../store/useCartStore";
import { CheckoutService } from "../../store/checkoutService";
import { useToast } from "../../hooks/useToast";
import { ToastMessage } from "../../components/Shared/ToastMessage/ToastMessage";
import FullScreenSpinner from "../../components/FullScreenSpinner/FullScreenSpinner";
import "./Cart.scss";
import CartEmpty from "../../components/Cart/CartEmpty/CartEmpty";

const Cart: React.FC = () => {
  const { cart: cartItems, fetchCart, loading: loadingCart, clearCart, removeItem, updateItem } = useCartStore();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (cartItems?.items) {
      const flatProducts = cartItems.items.map((item) => ({
        id: item.id,
        name: item.product?.name ?? "Sin nombre",
        stock: item.product?.stock ?? 0,
        price: item.product?.price ?? 0,
        image: item.product?.images?.[0] ?? "",
        quantity: item.quantity ?? 1,
        color: item.product?.color ?? "N/A",
      }));
      setProducts(flatProducts);
    }
  }, [cartItems]);

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      await updateItem(id, newQuantity);
      await fetchCart();
      showToast("Cantidad actualizada", "success");
    } catch (err) {
      console.error(err);
      showToast("No se pudo actualizar la cantidad", "error");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeItem(id);
      showToast("Producto eliminado del carrito", "success");
    } catch {
      showToast("Error al eliminar el producto", "error");
    }
  };

  const handleCheckout = async () => {
    if (!address.trim()) {
      showToast("Por favor ingresa tu dirección de envío", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await CheckoutService.createSession({
        shippingAddress: address,
        successUrl: window.location.origin + "/checkout/success",
        cancelUrl: window.location.origin + "/checkout/cancel",
      });

      const { url } = response.data;
      if (url) window.location.href = url;
      else showToast("No se pudo iniciar el proceso de pago", "error");
    } catch (error) {
      console.error(error);
      showToast("Error al iniciar el pago", "error");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + 20;

  if (loadingCart) return <FullScreenSpinner />;
  if (products.length === 0) return <CartEmpty />;

  return (
    <section className="cart">
      <div className="cart__content">
        <div className="cart__table-wrapper">
          <table className="cart__table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </tbody>
          </table>

          <section className="cart__actions">
            <button
              type="button"
              className="cart__btn"
              onClick={() => {
                clearCart();
                showToast("Carrito vaciado", "success");
              }}
              disabled={loading}
            >
              Vaciar carrito
            </button>
          </section>
        </div>

        <section className="cart__sidebar">
          <CartTotals
            subtotal={subtotal}
            total={total}
            onCheckout={handleCheckout}
            address={address}
            setAddress={setAddress}
            loading={loading}
          />
        </section>
      </div>

      {toast.text && (
        <ToastMessage
          text={toast.text}
          type={toast.type as "success" | "error"}
          onClose={hideToast}
        />
      )}
    </section>
  );
};

export default Cart;
