import { useState, useEffect } from 'react';
import { Edit, Trash2, } from 'lucide-react';
import { Product } from '../../../api/types/product';
import { ProductService } from '../../../api/productService';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader';
import { SearchBar } from '../../../components/Admin/SearchBar/SearchBar';
import { FormGroup } from '../../../components/Admin/Shared/FormGroup';
import { TextInput } from '../../../components/Admin/Shared/TextInput';
import { Textarea } from '../../../components/Admin/Shared/Textarea';
import { NumberInput } from '../../../components/Admin/Shared/NumberInput';
import { CheckboxField } from '../../../components/Admin/Shared/CheckboxField';
import { useProductStore } from '../../../store/useProductStore';
import { useCategoryStore } from '../../../store/useCategoryStore';
import '../AdminStyles.scss';
import { Pagination } from '../../../components/Shared/Pagination/Pagination';

export default function AdminProducts() {
  const { products, fetchProducts, loading: productsLoading, meta } = useProductStore();
  const { categories, fetchCategories, loading: categoriesLoading } = useCategoryStore();

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    stock: 0,
    images: [''],
    categoryId: '',
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchProducts(page);
    fetchCategories();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        images: formData.images.filter((img) => img.trim() !== ''),
      };

      if (editingProduct) {
        await ProductService.update(editingProduct.id!, payload);
      } else {
        await ProductService.create(payload);
      }

      fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await ProductService.remove(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name!,
        slug: product.slug!,
        description: product.description!,
        price: product.price,
        stock: product.stock!,
        images: product.images.length > 0 ? product.images : [''],
        categoryId: product.categoryId!,
        isActive: product.isActive!,
        isFeatured: product.isFeatured || false,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: 0,
        stock: 0,
        images: [''],
        categoryId: '',
        isActive: true,
        isFeatured: false,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name!.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (categoriesLoading || productsLoading) return <Spinner />;

  return (
    <section className="admin-section">
      <AdminHeader title="Gestión de Productos" textButton="Producto" onAdd={() => openModal()} />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar productos..." />

      <article className="table-container">
        <table>
          <thead>
            <tr>
              <th>Imágen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.images[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s'}
                    alt={product.name}
                    className="table-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`badge ${product.isActive ? 'active' : 'inactive'}`}>
                    {product.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => openModal(product)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(product.id!)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? 'Editar Producto' : 'Añadir producto'}</h2>
            <form onSubmit={handleSubmit}>
              <FormGroup label="Nombre">
                <TextInput
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup label="Slug">
                <TextInput
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup label="Descripción">
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </FormGroup>

              <section className="form-row">
                <FormGroup label="Precio">
                  <NumberInput
                    value={formData.price.toString()}
                    step="0.01"
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </FormGroup>

                <FormGroup label="Stock">
                  <NumberInput
                    value={formData.stock.toString()}
                    onChange={(e) => setFormData({ ...formData, stock: parseFloat(e.target.value) })}
                    required
                  />
                </FormGroup>
              </section>

              <FormGroup label="Categoría">
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Images (URLS)">
                {formData.images.map((image, index) => (
                  <TextInput
                    key={index}
                    type="url"
                    value={image}
                    onChange={(e) => {
                      const newImages = [...formData.images];
                      newImages[index] = e.target.value;
                      setFormData({ ...formData, images: newImages });
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                ))}

                <button
                  type="button"
                  className="btn-secondary mt-5"
                  onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
                >
                  Añadir imágen
                </button>
              </FormGroup>

              <CheckboxField
                checked={formData.isActive}
                onChange={(checked) => setFormData({ ...formData, isActive: checked })}
                label="Activo"
              />

              <CheckboxField
                checked={formData.isFeatured}
                onChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                label="Featured"
              />

              <section className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Actualizar' : 'Crear'}
                </button>
              </section>
            </form>
          </div>
        </div>
      )}

        <Pagination totalPages={meta.totalPages} onPageChange={setPage} currentPage={page} />
    </section>
  );
}
