import type { Product } from '../../api/types/product';
import { useEffect, useState } from 'react';
import { Pagination } from '../../components/Shared/Pagination/Pagination';
import { ProductCard } from '../../components';
import { useProductStore } from '../../store/useProductStore';
import { FiltersSidebar } from '../../components/Products/FiltersSidebar/FiltersSidebar';
import { useCategoryStore } from '../../store/useCategoryStore';
import FullScreenSpinner from '../../components/FullScreenSpinner/FullScreenSpinner';
import './Products.scss';
import { ToastMessage } from '../../components/Shared/ToastMessage/ToastMessage';
import { useToast } from '../../hooks/useToast';

const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const { products, loading: loadingProducts, fetchProducts } = useProductStore();
  const { loading: loadingCategories } = useCategoryStore();
  const { toast, showToast, hideToast } = useToast();

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleFilterChange = (filtered: Product[]) => {
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleAddToCart = (product: Product) => {
    if (cartItems.includes(product.id!)) return;

    setCartItems((prev) => [...prev, product.id!]);
    showToast(`${product.name} agregado al carrito `, "success");
  };

  //TODO: Acá ya empiezo a traer los productos..
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return setFilteredProducts(products);
  }, [products]);

  if (loadingProducts && loadingCategories) return <FullScreenSpinner />;
  return (
    <section className="products-page">
      <aside className="filters">
        <FiltersSidebar products={products} onFilterChange={handleFilterChange} />
      </aside>

      <section className="products-grid">
        <h1 className='products-grid__title'>Nuestros productos</h1>
        {visibleProducts.length > 0 ? (
          visibleProducts.map((item) => (
            <ProductCard 
            key={item.id} 
            onAddToCart={() => handleAddToCart(item)}
            addedToCart={cartItems.includes(item.id!)}
            product={item} />
          ))
        ) : (
          <p className="no-results">No se encontraron productos</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {toast.text && (
          <ToastMessage
            text={toast.text}
            type={toast.type as "success" | "error"}
            onClose={hideToast}
          />
        )}
      </section>
    </section>
  );
};

export default Products;
