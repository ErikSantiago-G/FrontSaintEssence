import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Section } from '../../../api/types/news';
import { SectionService } from '../../../api/sectionService';
import { Spinner } from '../../../components/Shared/Spinner/Spinner';
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader';
import { ModalActions } from '../../../components/Admin/Shared/ModalActions';
import { AdminModal } from '../../../components/Admin/Shared/AdminModal';
import { CheckboxField } from '../../../components/Admin/Shared/CheckboxField';
import { TextInput } from '../../../components/Admin/Shared/TextInput';
import { FormGroup } from '../../../components/Admin/Shared/FormGroup';
import { Textarea } from '../../../components/Admin/Shared/Textarea';
import { useSectionStore } from '../../../store/useSectionStore';
import '../AdminStyles.scss';

export default function AdminSections() {
  const {sections, fetchSections, loading: sectionsLoading } = useSectionStore()
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchSections();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSection) {
        await SectionService.update(editingSection.id, formData);
      } else {
        await SectionService.create(formData);
      }
      fetchSections();
      closeModal();
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await SectionService.delete(id);
      fetchSections();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const openModal = (section?: Section) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        title: section.title,
        content: section.content,
        isActive: section.isActive,
        order: section.order || 0,
      });
    } else {
      setEditingSection(null);
      setFormData({
        title: '',
        content: '',
        isActive: true,
        order: 0,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSection(null);
  };

  if (sectionsLoading) return <Spinner />;

  return (
    <section className="admin-section">
      <AdminHeader title="Gestión de Secciones" textButton="Sección" onAdd={() => openModal()} />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Vista previa</th>
              <th>Orden</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section.id}>
                <td><strong>{section.title}</strong></td>
                <td>{section.content.substring(0, 100)}...</td>
                <td>{section.order}</td>
                <td>
                  <span className={`badge ${section.isActive ? 'active' : 'inactive'}`}>
                    {section.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => openModal(section)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(section.id)}>
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
        title={editingSection ? 'Editar sección' : 'Añadir sección'}
      >
        <form onSubmit={handleSubmit}>
          <FormGroup label="Nombre">
            <TextInput
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup label="Contenido">
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              required
            />
          </FormGroup>

          <FormGroup label="Orden">
            <TextInput
              type="number"
              value={formData.order.toString()}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            />
          </FormGroup>

          <CheckboxField
            checked={formData.isActive}
            onChange={(checked) => setFormData({ ...formData, isActive: checked })}
            label="Activo"
          />

          <ModalActions
            onCancel={closeModal}
            submitLabel={editingSection ? 'Actualizar' : 'Crear'}
          />
        </form>
      </AdminModal>
    </section>
  );
}
