import { create } from "zustand";
import { NewsService } from "../api/newsService";
import { NewsState } from "./types/NewsState";

export const useNewsStore = create<NewsState>((set) => ({
  newsList: [],
  newsItem: null,
  loading: false,

  fetchNews: async () => {
    set({ loading: true });
    try {
      const { data } = await NewsService.getAll();
      set({ newsList: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchNewsById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await NewsService.getById(id);
      set({ newsItem: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchNewsBySlug: async (slug) => {
    set({ loading: true });
    try {
      const { data } = await NewsService.getBySlug(slug);
      set({ newsItem: data });
    } finally {
      set({ loading: false });
    }
  },
}));
