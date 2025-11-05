import { News } from "../../api/types/section";

export interface NewsState {
  newsList: News[];
  newsItem: News | null;
  loading: boolean;
  fetchNews: () => Promise<void>;
  fetchNewsById: (id: string) => Promise<void>;
  fetchNewsBySlug: (slug: string) => Promise<void>;
}