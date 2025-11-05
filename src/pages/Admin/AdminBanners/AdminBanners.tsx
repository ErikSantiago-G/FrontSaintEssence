import { useState, useEffect } from "react";
import { useBannerStore } from "../../../store/useBannerStore";
import { BannerService } from "../../../api/bannerService";
import { Spinner } from "../../../components/Shared/Spinner/Spinner";
import { AdminHeader } from "../../../components/Admin/AdminHeader/AdminHeader";
import { FormGroup } from "../../../components/Admin/Shared/FormGroup";
import { TextInput } from "../../../components/Admin/Shared/TextInput";
import { CheckboxField } from "../../../components/Admin/Shared/CheckboxField";
import { ModalActions } from "../../../components/Admin/Shared/ModalActions";
import { AdminModal } from "../../../components/Admin/Shared/AdminModal";
import { NumberInput } from "../../../components/Admin/Shared/NumberInput";
import AdminBannerGrid from "../../../components/Admin/AdminBannerGrid/AdminBannerGrid";
import '../AdminStyles.scss';

export default function AdminBanners() {
  const { banners, loading, fetchBanners } = useBannerStore();
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const openModal = (banner?: any) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        imageUrl: banner.imageUrl,
        linkUrl: banner.linkUrl || "",
        isActive: banner.isActive,
        order: banner.order || 0,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: "",
        imageUrl: "",
        linkUrl: "",
        isActive: true,
        order: 0,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBanner(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await BannerService.update(editingBanner.id, formData);
      } else {
        await BannerService.create(formData);
      }
      await fetchBanners();
      closeModal();
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await BannerService.delete(id);
      await fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  if (loading) return <Spinner />;

  return (
    <section className="admin-section">
      <AdminHeader title="Gestión de Banners" textButton="Banner" onAdd={() => openModal()} />

      <section className="banner-grid">
        {banners.map((banner) => (
          <AdminBannerGrid banner={banner} handleDelete={handleDelete} openModal={openModal} />
        ))}
      </section>

      <AdminModal
        show={showModal}
        onClose={closeModal}
        title={editingBanner ? 'Editar banner' : 'Añadir banner'}
      >
        <form onSubmit={handleSubmit}>
          <FormGroup label="Titulo">
            <TextInput
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup label="URL Imágen">
            <TextInput
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup label="Link (opcional)">
            <TextInput
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
            />
          </FormGroup>

          <FormGroup label="Orden">
            <NumberInput
              value={formData.order.toString()}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
              required
            />
          </FormGroup>

          <CheckboxField
            checked={formData.isActive}
            onChange={(checked) => setFormData({ ...formData, isActive: checked })}
            label="Activo"
          />

          <ModalActions
            onCancel={closeModal}
            submitLabel={editingBanner ? 'Actualizar' : 'Crear'}
          />
        </form>

      </AdminModal>
    </section>
  );
}
