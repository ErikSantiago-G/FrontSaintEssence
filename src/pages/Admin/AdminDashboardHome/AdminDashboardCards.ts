import { LucideIcon, Package, FolderTree, ShoppingCart, Image, Newspaper, Layers } from "lucide-react";

export interface CardItem {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  link: string;
}

export const getDashboardCards = (stats: {
  products: number;
  categories: number;
  orders: number;
  banners: number;
  news: number;
  sections: number;
}): CardItem[] => [
  { title: 'Productos', link: 'products', value: stats.products, icon: Package, color: '#3b82f6' },
  { title: 'Categorías', link: 'categories', value: stats.categories, icon: FolderTree, color: '#8b5cf6' },
  { title: 'Órdenes', link: 'orders', value: stats.orders, icon: ShoppingCart, color: '#10b981' },
  { title: 'Banners', link: 'banners', value: stats.banners, icon: Image, color: '#f59e0b' },
  { title: 'Noticias', link: 'news', value: stats.news, icon: Newspaper, color: '#ef4444' },
  { title: 'Secciones', link: 'sections', value: stats.sections, icon: Layers, color: '#06b6d4' },
];
