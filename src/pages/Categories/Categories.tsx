import { useEffect, useState } from 'react';
import { useCategoryStore } from '../../store/useCategoryStore';
import { Category } from '../../api/types/category';
import CategoryCard from '../../components/Category/CategoryCard/CategoryCard';
import './Categories.scss';

const Categories: React.FC = () => {
  const { categories: categoriesResponse, fetchCategories } = useCategoryStore();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    setCategories(categoriesResponse)
  }, [categoriesResponse])

  return (
    <section className="categories">
      <h3>Nuestras categorías</h3>
      <article className="categories__container">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </article>

    </section>
  );
};

export default Categories;