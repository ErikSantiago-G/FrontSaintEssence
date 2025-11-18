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
import { BackendFilters } from "./interfaces/BackendFilters";
import { useCartStore } from "../../store/useCartStore";
import "./Products.scss";

const Products: React.FC = () => {
  const [filters, setFilters] = useState<BackendFilters>({});
  const [currentPage, setCurrentPage] = useState(1);

  const {
    products,
    loading: loadingProducts,
    fetchProducts,
    meta,
    selectedCategory,
    setSelectedCategory
  } = useProductStore();

  const { loading: loadingCategories } = useCategoryStore();
  const { toast, showToast, hideToast } = useToast();
  const { cart, addItem } = useCartStore();

  const handleAddToCart = async (product: Product) => {

    if (cart?.items?.some((i) => i.productId === product.id)) {
      showToast("El producto ya está en el carrito", "error");
      return;
    }

    await addItem(product.id!, 1);

    showToast(`${product.name} agregado al carrito`, "success");
  };

  useEffect(() => {
    fetchProducts(currentPage, filters);
  }, [currentPage, filters]);

  useEffect(() => {
    if (selectedCategory) {
      setFilters((prev) => ({
        ...prev,
        categoryId: selectedCategory,
      }));

      setCurrentPage(1);
      setSelectedCategory(null);
    }
  }, [selectedCategory]);

  const handleFilterChange = (newFilters: BackendFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (loadingProducts && loadingCategories) return <FullScreenSpinner />;

  return (
    <section className="products-page">
      <aside className="filters">
        <FiltersSidebar onFilterChange={handleFilterChange} externalSelectedCategory={filters.categoryId} />
      </aside>

      <section className="products-grid">
        <h1 className="products-grid__title">Nuestros productos</h1>

        {products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              key={item.id}
              onAddToCart={() => handleAddToCart(item)}
              addedToCart={cart?.items?.some((i) => i.productId === item.id) || false}
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
