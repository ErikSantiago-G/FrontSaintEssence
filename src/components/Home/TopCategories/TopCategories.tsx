import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { TopCategoriesProps } from './interfaces/TopCategoriesProps';
import CategoryCard from '../../Category/CategoryCard/CategoryCard';
import "swiper/css";
import "swiper/css/pagination";
import './TopCategories.scss';

const TopCategories: React.FC<TopCategoriesProps> = ({ categories, onViewShop }) => {
  return (
    <section className="top-categories">
      <h2 className="top-categories__title">Top Categories</h2>

      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="top-categories__slider"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard
              category={category}
              onViewShop={onViewShop}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopCategories;
