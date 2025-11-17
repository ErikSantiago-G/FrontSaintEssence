import { useEffect, useState } from "react";
import { FilterSidebarProps, PriceRange } from "./interfaces/FiltersSidebar";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { Check, Filter } from "lucide-react";
import "./FiltersSidebar.scss";

export const FiltersSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 0 });
  const [onlyInactive, setOnlyInactive] = useState(false);

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const emitFilters = (
    newCategory?: string | null,
    newPriceRange?: PriceRange,
    newInactive?: boolean
  ) => {
    onFilterChange({
      categoryId: newCategory || undefined,
      minPrice: newPriceRange?.min && newPriceRange.min > 0 ? newPriceRange.min : undefined,
      maxPrice: newPriceRange?.max && newPriceRange.max > 0 ? newPriceRange.max : undefined,
      isActive: newInactive === undefined ? undefined : !newInactive,
    });
  };
  const handleCategoryClick = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);

    emitFilters(newCategory, priceRange, onlyInactive);
  };
  const handlePriceChange = (field: "min" | "max", value: number) => {
    const newRange = { ...priceRange, [field]: value };
    setPriceRange(newRange);
    emitFilters(undefined, newRange);
  };

  const handleInactiveToggle = () => {
    const newInactive = !onlyInactive;
    setOnlyInactive(newInactive);
    emitFilters(undefined, undefined, newInactive);
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
              className={`filter-item ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => handleCategoryClick(category.id!)}
            >
              <span>{category.name}</span>
              {selectedCategory === category.id && <Check className="icon-check" size={16} />}
            </li>
          ))}
        </ul>
      </div>

      <section className="filter-group">
        <h4>Precio</h4>
        <article className="price-range">
          <input
            type="number"
            placeholder="Mín"
            value={priceRange.min || ""}
            onChange={(e) => handlePriceChange("min", Number(e.target.value))}
          />
          <span className="price-range__divider">—</span>
          <input
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
