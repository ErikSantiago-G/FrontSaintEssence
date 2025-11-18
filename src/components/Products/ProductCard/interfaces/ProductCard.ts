import type { Product } from '../../../../api/types/product';

export interface ProductCardProps {
  product: Product;
}

export interface ProductCardPropsExtends extends ProductCardProps {
  onAddToCart?: () => void;
  addedToCart?: boolean;
  noIcons?: boolean;
}