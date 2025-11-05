import api from "./axiosInstance";
import { Cart } from "./types/cart";

export const CartService = {
    getCart: () => api.get<Cart>("/cart"),
    addItem: (productId: string, quantity: number) =>
        api.post("/cart", { productId, quantity }),
    updateItem: (itemId: string, quantity: number) =>
        api.patch(`/cart/${itemId}`, { quantity }),
    removeItem: (itemId: string) => api.delete(`/cart/${itemId}`),
    clearCart: () => api.delete("/cart"),
};
