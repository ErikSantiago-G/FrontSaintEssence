// src/constants/menuItems.ts
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Image,
  Newspaper,
  FileText,
} from "lucide-react";

export interface MenuItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

export const menuItems: MenuItem[] = [
  { path: "", label: "Panel", icon: LayoutDashboard },
  { path: "products", label: "Productos", icon: Package },
  { path: "categories", label: "Categorías", icon: FolderTree },
  { path: "orders", label: "Ordenes", icon: ShoppingCart },
  { path: "banners", label: "Baners", icon: Image },
  { path: "news", label: "Noticias", icon: Newspaper },
  { path: "sections", label: "Secciones", icon: FileText },
];
