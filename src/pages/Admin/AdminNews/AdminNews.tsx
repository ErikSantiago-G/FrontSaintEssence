import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { News } from '../../../api/types/section';
import { NewsService } from '../../../api/newsService';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader';
import { SearchBar } from '../../../components/Admin/SearchBar/SearchBar';
import { useNewsStore } from '../../../store/useNewsStore';
import '../AdminStyles.scss';

export default function AdminNews() {
  const { fetchNews, loading, newsList } = useNewsStore();

  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    imageUrl: '',
    isActive: true,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await NewsService.update(editingNews.id, formData);
      } else {
        await NewsService.create(formData);
      }
      fetchNews();
      closeModal();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await NewsService.delete(id);
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const openModal = (news?: News) => {
    if (news) {
      setEditingNews(news);
      setFormData({
        title: news.title,
        slug: news.slug,
        content: news.content,
        excerpt: news.excerpt || '',
        imageUrl: news.imageUrl || '',
        isActive: news.isActive,
      });
    } else {
      setEditingNews(null);
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        imageUrl: '',
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
  };

  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <section className="admin-section">
      <AdminHeader title="Gestión de Noticias" textButton="Noticias" onAdd={() => openModal()}/>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar Noticias..." />

      <section className="table-container">
        <table>
          <thead>
            <tr>
              <th>Imágen</th>
              <th>Titulo</th>
              <th>Slug</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map((news) => (
              <tr key={news.id}>
                <td>
                  {news.imageUrl && (
                    <img src={news.imageUrl} alt={news.title} className="table-image" />
                  )}
                </td>
                <td><strong>{news.title}</strong></td>
                <td>{news.slug}</td>
                <td>
                  <span className={`badge ${news.isActive ? 'active' : 'inactive'}`}>
                    {news.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                {/* <td>{new Date(news.createdAt).toLocaleDateString()}</td> */}
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => openModal(news)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(news.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <h2>{editingNews ? 'Edit News' : 'Add News'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingNews ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
