import { create } from "zustand";
import { CartService } from "../api/cartService";
import { CartState } from "./types/CartState";

export const useCartStore = create<CartState>((set, get) => ({
    cart: null,
    loading: false,

    fetchCart: async () => {
        set({ loading: true });
        try {
            const { data } = await CartService.getCart();
            set({ cart: data });
        } finally {
            set({ loading: false });
        }
    },

    addItem: async (productId, quantity) => {
        await CartService.addItem(productId, quantity);
        await get().fetchCart();
    },

    updateItem: async (itemId, quantity) => {
        await CartService.updateItem(itemId, quantity);
        await get().fetchCart();
    },

    removeItem: async (itemId) => {
        await CartService.removeItem(itemId);
        await get().fetchCart();
    },

    clearCart: async () => {
        await CartService.clearCart();
        set({ cart: { items: [], total: 0 } });
    },
}));
