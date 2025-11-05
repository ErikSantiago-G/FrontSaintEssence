import { create } from "zustand";
import { BannerService } from "../api/bannerService";
import { BannerState } from "./types/BannerState";

export const useBannerStore = create<BannerState>((set) => ({
  banners: [],
  banner: null,
  loading: false,

  fetchBanners: async () => {
    set({ loading: true });
    try {
      const { data } = await BannerService.getAll();
      set({ banners: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchBannerById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await BannerService.getById(id);
      set({ banner: data });
    } finally {
      set({ loading: false });
    }
  },
}));
