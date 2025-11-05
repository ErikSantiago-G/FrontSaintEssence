import { Category } from "../../../../api/types/category";

export interface CategoryCardProps {
    category: Category;
    onViewShop?: (id: string) => void;
}