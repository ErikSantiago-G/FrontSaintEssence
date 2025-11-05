export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  image?: string;
  colors?: string[];
}