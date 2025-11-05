export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  images: string[];
  colors?: string[];
  categories?: string[];
  tags?: string[];
}