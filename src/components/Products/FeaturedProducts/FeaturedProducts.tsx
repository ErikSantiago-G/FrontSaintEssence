import ProductCard from '../ProductCard';
import { useEffect } from 'react';
import { useProductStore } from '../../../store/useProductStore';
import './FeaturedProducts.scss';

const Products: React.FC = () => {
  const { products, fetchFeatured } = useProductStore();

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <section className="featured-products__grid">
      <h3>Productos destacados</h3>
      <ul className='featured-products__container'>
        {products.map((item) => (
          <ProductCard noIcons key={item.id} product={item} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
