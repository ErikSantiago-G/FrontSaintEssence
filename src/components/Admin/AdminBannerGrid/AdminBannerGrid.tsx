import { Edit, Trash2 } from "lucide-react"
import { AdminBannerGridProps } from "./interfaces/AdminBannerGridProps"

const AdminBannerGrid = ({banner, openModal, handleDelete} : AdminBannerGridProps) => {
    return (
        <section key={banner.id} className="banner-card">
            <img src={banner.imageUrl} alt={banner.title} />
            <article className="banner-info">
                <h3>{banner.title}</h3>
                <p>{banner.linkUrl || "No link"}</p>
                <span className={`badge ${banner.isActive ? "active" : "inactive"}`}>
                    {banner.isActive ? "Active" : "Inactive"}
                </span>
                <section className="action-buttons">
                    <button className="btn-edit" onClick={() => openModal(banner)}>
                        <Edit size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(banner.id)}>
                        <Trash2 size={16} />
                    </button>
                </section>
            </article>
        </section>
    )
}

export default AdminBannerGrid