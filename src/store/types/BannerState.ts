import { Banner } from "../../api/types/banner";

export interface BannerState {
  banners: Banner[];
  banner: Banner | null;
  loading: boolean;
  fetchBanners: () => Promise<void>;
  fetchBannerById: (id: string) => Promise<void>;
}