import { create } from "zustand";
import { ProductService } from "../api/productService";
import { ProductState } from "./types/ProductState";
import { ProductFilters } from "../api/types/ProductFilters";

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  product: null,
  loading: false,
  meta: { total: 0, page: 1, limit: 12, totalPages: 1 },
  selectedCategory: null,

  setSelectedCategory: (id) => set({ selectedCategory: id }),

  fetchProducts: async (page: number = 1, filters: ProductFilters = {}) => {
    set({ loading: true });
    try {
      const { data } = await ProductService.getAll({ ...filters, page });
      set({ products: data.data, meta: data.meta });
    } finally {
      set({ loading: false });
    }
  },

  fetchFeatured: async () => {
    set({ loading: true });
    try {
      const { data } = await ProductService.getFeatured();

      const featured = Array.isArray(data.data) ? data.data : [];

      set({ products: featured });
    } finally {
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await ProductService.getById(id);
      set({ product: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchProductBySlug: async (slug) => {
    set({ loading: true });
    try {
      const { data } = await ProductService.getBySlug(slug);
      set({ product: data });
    } finally {
      set({ loading: false });
    }
  },
}));
