import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { useBannerStore } from "../../../store/useBannerStore";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroCarousel.scss";
import { useNavigate } from "react-router-dom";

export const HeroCarousel: React.FC = () => {
  const { banners, loading, fetchBanners } = useBannerStore();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const sortedBanners = [...banners].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Autoplay, Pagination, A11y]}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="hero-carousel"
    >
      {loading && (
        <SwiperSlide>
          <div className="hero-carousel__skeleton" />
        </SwiperSlide>
      )}

      {!loading &&
        sortedBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <figure
              className="hero-carousel__slide"
              onClick={() => navigate(banner.linkUrl!)}
              style={{ cursor: banner.linkUrl ? "pointer" : "default" }}
            >
              {!loadedImages[banner.id] && (
                <div className="hero-carousel__skeleton" />
              )}

              <img
                src={banner.imageUrl}
                alt={banner.title}
                loading="lazy"
                onLoad={() => handleImageLoad(banner.id)}
                className={
                  loadedImages[banner.id]
                    ? "hero-carousel__img loaded"
                    : "hero-carousel__img"
                }
              />
            </figure>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default HeroCarousel;
