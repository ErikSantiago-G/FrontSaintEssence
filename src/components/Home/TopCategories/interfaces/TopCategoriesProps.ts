import { Category } from "../../../../api/types/category";

export interface TopCategoriesProps {
  categories: Category[];
  onViewShop?: (id: string) => void;
}