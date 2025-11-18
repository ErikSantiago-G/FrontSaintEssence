import { useEffect, useState } from 'react';
import { useCategoryStore } from '../../store/useCategoryStore';
import { Category } from '../../api/types/category';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import CategoryCard from '../../components/Category/CategoryCard/CategoryCard';
import './Categories.scss';

const Categories: React.FC = () => {
  const { categories: categoriesResponse, fetchCategories } = useCategoryStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const { setSelectedCategory } = useProductStore();

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    setCategories(categoriesResponse)
  }, [categoriesResponse])

  const handleViewCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate("/products");
  };

  return (
    <section className="categories">
      <h3>Nuestras categorías</h3>
      <article className="categories__container">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onViewShop={handleViewCategory}
          />
        ))}
      </article>

    </section>
  );
};

export default Categories;