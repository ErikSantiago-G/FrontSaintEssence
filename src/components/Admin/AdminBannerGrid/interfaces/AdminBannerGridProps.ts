import { Banner } from "../../../../api/types/banner";

export interface AdminBannerGridProps {
  banner: Banner;
  openModal: (banner?: Banner) => void;
  handleDelete: (id: string) => void;
}