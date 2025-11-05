import { Product } from '../../../api/types/product';
import productsData from './featuredProducts.json';
import ProductCard from '../ProductCard';
import './FeaturedProducts.scss';

const Products: React.FC = () => {
  const products: Product[] = productsData;

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
