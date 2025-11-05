import { Category } from "../../api/types/category";

export interface CategoryState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;
  fetchCategoryBySlug: (slug: string) => Promise<void>;
}