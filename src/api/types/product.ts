import { Category } from "./category";

export interface Product {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  price: number;
  stock?: number;
  images: string[];
  isActive?: boolean;
  categoryId?: string;
  category?: Category
  active?: boolean;
  isFeatured?: boolean;
}

export interface ProductQuery {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
}
