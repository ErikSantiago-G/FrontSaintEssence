import { create } from "zustand";
import { SectionState } from "./types/SectionState";
import { SectionService } from "../api/sectionService";

export const useSectionStore = create<SectionState>((set) => ({
  sections: [],
  section: null,
  loading: false,

  fetchSections: async () => {
    set({ loading: true });
    try {
      const { data } = await SectionService.getAll();
      set({ sections: data });
    } finally {
      set({ loading: false });
    }
  },

  fetchSectionById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await SectionService.getById(id);
      set({ section: data });
    } finally {
      set({ loading: false });
    }
  },
}));
