export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image: string;
    stock: number;
    images: string[];
    color: string;
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
}
