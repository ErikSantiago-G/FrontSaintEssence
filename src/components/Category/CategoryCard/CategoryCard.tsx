import { CategoryCardProps } from './interfaces/CategoryCardProps';
import './CategoryCard.scss';

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onViewShop }) => {
    const { id, name, imageUrl } = category;
    return (
        <section className="category-card">
            <figure className="category-card__image">
                <img src={imageUrl} alt={name} />
                    <button
                        className="category-card__button"
                        onClick={() => onViewShop?.(id)}
                    >
                        View Shop
                    </button>
            </figure>
            <section className="category-card__info">
                <h4 className="category-card__name">{name}</h4>
            </section>
        </section>
    );
};

export default CategoryCard;
