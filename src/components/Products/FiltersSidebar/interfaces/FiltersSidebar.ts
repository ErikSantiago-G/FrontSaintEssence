import { Product } from "../../../../api/types/product";

export interface BackendFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
}

export interface FilterSidebarProps {
  products?: Product[];
   onFilterChange: (filters: BackendFilters) => void;
   externalSelectedCategory?: string | null;
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