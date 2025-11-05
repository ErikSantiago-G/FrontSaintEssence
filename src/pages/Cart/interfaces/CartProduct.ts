export interface CartProduct {
  id: string;
  name: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  stock?: number;
  image: string;
}
