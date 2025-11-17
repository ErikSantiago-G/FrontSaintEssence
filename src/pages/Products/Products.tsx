import { useEffect, useState } from "react";
import { Pagination } from "../../components/Shared/Pagination/Pagination";
import { ProductCard } from "../../components";
import { useProductStore } from "../../store/useProductStore";
import { FiltersSidebar } from "../../components/Products/FiltersSidebar/FiltersSidebar";
import { useCategoryStore } from "../../store/useCategoryStore";
import FullScreenSpinner from "../../components/FullScreenSpinner/FullScreenSpinner";
import { ToastMessage } from "../../components/Shared/ToastMessage/ToastMessage";
import { useToast } from "../../hooks/useToast";
import type { Product } from "../../api/types/product";
import "./Products.scss";

interface BackendFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
}

const Products: React.FC = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [filters, setFilters] = useState<BackendFilters>({});
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading: loadingProducts, fetchProducts, meta } = useProductStore();
  const { loading: loadingCategories } = useCategoryStore();
  const { toast, showToast, hideToast } = useToast();

  const handleAddToCart = (product: Product) => {
    if (cartItems.includes(product.id!)) return;
    setCartItems((prev) => [...prev, product.id!]);
    showToast(`${product.name} agregado al carrito`, "success");
  };

  useEffect(() => {
    fetchProducts(currentPage, filters);
  }, [currentPage, fetchProducts, filters]);

  const handleFilterChange = (newFilters: BackendFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (loadingProducts && loadingCategories) return <FullScreenSpinner />;

  return (
    <section className="products-page">
      <aside className="filters">
        <FiltersSidebar onFilterChange={handleFilterChange} />
      </aside>

      <section className="products-grid">
        <h1 className="products-grid__title">Nuestros productos</h1>
        {products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              key={item.id}
              onAddToCart={() => handleAddToCart(item)}
              addedToCart={cartItems.includes(item.id!)}
              product={item}
            />
          ))
        ) : (
          <p className="no-results">No se encontraron productos</p>
        )}

        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
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
