import { Cart } from "../../api/types/cart";

export interface CartState {
    cart: Cart | null;
    loading: boolean;
    fetchCart: () => Promise<void>;
    addItem: (productId: string, quantity: number) => Promise<void>;
    updateItem: (itemId: string, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}