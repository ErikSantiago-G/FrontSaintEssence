import { useEffect, useState } from "react";
import { Filters, FilterSidebarProps, PriceRange } from "./interfaces/FiltersSidebar";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { Check, Filter } from "lucide-react";
import type { Product } from "../../../api/types/product";
import "./FiltersSidebar.scss";

export const FiltersSidebar: React.FC<FilterSidebarProps> = ({ products, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 0 });
  const [onlyInactive, setOnlyInactive] = useState(false);
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const applyFilters = (filters: Filters = {
    category: selectedCategory,
    priceRange,
    onlyInactive,
  }) => {
    const { category, priceRange: range, onlyInactive: inactive } = filters;
    let filtered = [...products];

    const filterRules = {
      category: (product: Product): boolean =>
        !category ||
        product.category?.name?.toLowerCase() === category.toLowerCase(),

      price: (product: Product): boolean => {
        const price = product.price ?? 0;
        const meetsMin = range.min > 0 ? price >= range.min : true;
        const meetsMax = range.max > 0 ? price <= range.max : true;
        return meetsMin && meetsMax;
      },

      inactive: (product: Product): boolean =>
        !inactive || product.active === false,
    };

    filtered = filtered.filter(
      (product) =>
        filterRules.category(product) &&
        filterRules.price(product) &&
        filterRules.inactive(product)
    );

    onFilterChange(filtered);
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    const newFilters: Filters = { category: newCategory, priceRange, onlyInactive };
    setSelectedCategory(newCategory);
    applyFilters(newFilters);
  };

  const handlePriceChange = (field: "min" | "max", value: number) => {
    const updatedRange: PriceRange = { ...priceRange, [field]: value };
    const newFilters: Filters = { category: selectedCategory, priceRange: updatedRange, onlyInactive };
    setPriceRange(updatedRange);
    applyFilters(newFilters);
  };

  const handleInactiveToggle = () => {
    const newInactive = !onlyInactive;
    const newFilters: Filters = { category: selectedCategory, priceRange, onlyInactive: newInactive };
    setOnlyInactive(newInactive);
    applyFilters(newFilters);
  };

  return (
    <aside className="filter-sidebar">
      <header className="filter-sidebar__header">
        <Filter size={18} />
        <h3>Filtrar productos</h3>
      </header>

      <div className="filter-group">
        <h4>Categoría</h4>
        <ul className="filter-list">
          {categories.map((category) => (
            <li
              key={category.id ?? category.name}
              className={`filter-item ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span>{category.name}</span>
              {selectedCategory === category.name && (
                <Check className="icon-check" size={16} />
              )}
            </li>
          ))}
        </ul>
      </div>

      <section className="filter-group">
        <h4>Precio</h4>
        <article className="price-range">
          <input
            name="min"
            type="number"
            placeholder="Mín"
            value={priceRange.min || ""}
            onChange={(e) => handlePriceChange("min", Number(e.target.value))}
          />
          <span className="price-range__divider">—</span>
          <input
            name="max"
            type="number"
            placeholder="Máx"
            value={priceRange.max || ""}
            onChange={(e) => handlePriceChange("max", Number(e.target.value))}
          />
        </article>
      </section>

      <section className="filter-group">
        <h4>Estado</h4>
        <label className="switch">
          <input type="checkbox" checked={onlyInactive} onChange={handleInactiveToggle} />
          <span className="slider"></span>
          <span className="switch-label">Mostrar solo inactivos</span>
        </label>
      </section>
    </aside>
  );
};
