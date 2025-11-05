import { create } from "zustand";
import { CategoryService } from "../api/categoryService";
import { CategoryState } from "./types/CategoryState";

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  category: null,
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const { data } = await CategoryService.getAll();
      set({ categories: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategoryById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await CategoryService.getById(id);
      set({ category: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategoryBySlug: async (slug) => {
    set({ loading: true });
    try {
      const { data } = await CategoryService.getBySlug(slug);
      set({ category: data });
    } finally {
      set({ loading: false });
    }
  },
}));
