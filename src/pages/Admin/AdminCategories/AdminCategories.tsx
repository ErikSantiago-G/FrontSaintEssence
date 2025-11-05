import { useState, useEffect } from "react";
import { Edit, Trash2, Search } from "lucide-react";
import { CategoryService } from "../../../api/categoryService";
import { Category } from "../../../api/types/category";
import { Spinner } from "../../../components/Shared/Spinner/Spinner";
import { AdminHeader } from "../../../components/Admin/AdminHeader/AdminHeader";
import { AdminModal } from "../../../components/Admin/Shared/AdminModal";
import { FormGroup } from "../../../components/Admin/Shared/FormGroup";
import { TextInput } from "../../../components/Admin/Shared/TextInput";
import { Textarea } from "../../../components/Admin/Shared/Textarea";
import { CheckboxField } from "../../../components/Admin/Shared/CheckboxField";
import { ModalActions } from "../../../components/Admin/Shared/ModalActions";
import { useCategoryStore } from "../../../store/useCategoryStore";
import '../AdminStyles.scss';

export default function AdminCategories() {
  const { loading, fetchCategories, categories } = useCategoryStore();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await CategoryService.update(editingCategory.id, formData);
      } else {
        await CategoryService.create(formData);
      }
      fetchCategories();
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await CategoryService.delete(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        imageUrl: category.imageUrl!,
        isActive: category.isActive,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        imageUrl: "",
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <section className="admin-section">
      <AdminHeader title="Gestión de Categorías" textButton="Categoría" onAdd={() => openModal()} />

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Imágen</th>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>
                  <img src={category.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s'} alt={category.slug} className="table-image"/>
                </td>
                <td><strong>{category.name}</strong></td>
                <td>{category.slug}</td>
                <td>{category.description || "-"}</td>
                <td>
                  <span className={`badge ${category.isActive ? "active" : "inactive"}`}>
                    {category.isActive ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => openModal(category)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(category.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal
        show={showModal}
        onClose={closeModal}
        title={editingCategory ? 'Editar Categoría' : 'Añadir Categoría'}
      >
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
            />
          </FormGroup>

          <FormGroup label="Images (URLS)">
            <TextInput
              type="url"
              value={formData.imageUrl}
              onChange={(e) => {
                setFormData({ ...formData, imageUrl: e.target.value });
              }}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>

            <CheckboxField
              checked={formData.isActive}
              onChange={(checked) => setFormData({ ...formData, isActive: checked })}
              label="Activo"
            />

            <ModalActions onCancel={closeModal} submitLabel={editingCategory ? 'Actualizar' : 'Crear'} />
        </form>
      </AdminModal>
    </section>
  );
}
