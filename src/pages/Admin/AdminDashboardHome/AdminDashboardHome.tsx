import { useEffect } from 'react';
import { useSectionStore } from '../../../store/useSectionStore';
import { useNewsStore } from '../../../store/useNewsStore';
import { useBannerStore } from '../../../store/useBannerStore';
import { useOrderStore } from '../../../store/useOrderStore';
import { useCategoryStore } from '../../../store/useCategoryStore';
import { useProductStore } from '../../../store/useProductStore';
import { getDashboardCards } from './AdminDashboardCards';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import './AdminDashboardHome.scss';
import { useNavigate } from 'react-router-dom';

export const AdminDashboardHome = () => {
  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { orders, fetchOrders } = useOrderStore();
  const { banners, fetchBanners } = useBannerStore();
  const { newsList, fetchNews } = useNewsStore();
  const { sections, fetchSections } = useSectionStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchOrders();
    fetchBanners();
    fetchNews();
    fetchSections();
  }, [fetchProducts, fetchCategories, fetchOrders, fetchBanners, fetchNews, fetchSections]);

  const stats = {
    products: products.length,
    categories: categories.length,
    orders: orders.length,
    banners: banners.length,
    news: newsList.length,
    sections: sections.length,
  };

  const cards = getDashboardCards(stats);
  const loading = !products.length && !categories.length && !orders.length;

  const handleClickCard = (link: string) => {
    navigate(link)
  }

  if (loading) return <Spinner />;

  return (
    <section className="dashboard">
      <h2 className="dashboard__title">Panel Admin</h2>
      <p>Bienvenido al panel de administración</p>
      <div className="dashboard__grid">
        {cards.map(card => (
          <section key={card.title} className="dashboard-card" onClick={() => handleClickCard(card.link)}>
            <article className="dashboard-card__icon" style={{ backgroundColor: card.color }}>
              <card.icon size={24} />
            </article>
            <article className="dashboard-card__content">
              <p className="dashboard-card__title">{card.title}</p>
              <h2 className="dashboard-card__value">{card.value}</h2>
            </article>
          </section>
        ))}
      </div>
    </section>
  );
};
