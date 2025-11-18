import { useEffect, useState } from "react";
import { Category } from "../../../api/types/category";
import { CategoryService } from "../../../api/categoryService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../Category/CategoryCard/CategoryCard";

import "swiper/css";
import "swiper/css/pagination";
import "./TopCategories.scss";

const TopCategories: React.FC<{ onViewShop: (catId: string) => void }> = ({ onViewShop }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await CategoryService.getAll();
    console.log(data)
    setCategories(data);
  };

  const handleSectionClick = () => {
    navigate('/products');
  }
  return (
    <section className="top-categories" onClick={handleSectionClick}>
      <h2 className="top-categories__title">Categorías Top</h2>

      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        loop
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {categories?.map((cat) => (
          <SwiperSlide key={cat.id}>
            <CategoryCard
              category={cat}
              onViewShop={onViewShop}
              variant="minimal"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopCategories;
