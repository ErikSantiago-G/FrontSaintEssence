import { Section } from "../../api/types/news";

export interface SectionState {
  sections: Section[];
  section: Section | null;
  loading: boolean;
  fetchSections: () => Promise<void>;
  fetchSectionById: (id: string) => Promise<void>;
}