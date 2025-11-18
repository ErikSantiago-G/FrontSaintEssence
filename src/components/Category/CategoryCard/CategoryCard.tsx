import { CategoryCardProps } from "./interfaces/CategoryCardProps";
import "./CategoryCard.scss";

const CategoryCard: React.FC<CategoryCardProps> = ({category, onViewShop, variant = "default"}) => {
  const { id, name, imageUrl } = category;

  const handleClick = () => {
    if (onViewShop) onViewShop(id);
  };

  return (
    <section
      className={`category-card ${variant === "minimal" ? "category-card--minimal" : ""}`}
      onClick={variant === "minimal" ? handleClick : undefined}
    >
      <figure className="category-card__image">
        <img src={imageUrl} alt={name} />

        {variant === "default" && (
          <button
            className="category-card__button"
            onClick={(e) => {
              e.stopPropagation();
              onViewShop?.(id);
            }}
          >
            Ver
          </button>
        )}
      </figure>

      {variant === "default" && (
        <section className="category-card__info">
          <h4 className="category-card__name">{name}</h4>
        </section>
      )}
    </section>
  );
};

export default CategoryCard;
