import { Product } from "../../../../api/types/product";

export interface FilterSidebarProps {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Filters {
  category: string | null;
  priceRange: PriceRange;
  onlyInactive: boolean;
}