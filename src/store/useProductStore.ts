import { create } from "zustand";
import { ProductService } from "../api/productService";
import { ProductState } from "./types/ProductState";

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  product: null,
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await ProductService.getAll();
      set({ products: data.data });
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
