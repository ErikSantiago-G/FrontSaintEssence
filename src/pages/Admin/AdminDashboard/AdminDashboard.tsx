import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuItems } from "../menuItems";
import { useAuthStore } from "../../../store/useAuthStore";
import { Menu, X } from "lucide-react"; // iconos para toggle
import "./AdminDashboard.scss";

export default function AdminDashboard() {
  const { user, logout, fetchUser } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <section className="admin-dashboard">
      {/* Sidebar Overlay para mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <header className="sidebar-header">
          <h2>Panel Admin</h2>
          <p>{user?.email}</p>
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </header>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === ""}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="admin-content">
        {/* Botón toggle visible solo en mobile */}
        <button className="mobile-toggle-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Outlet />
      </main>
    </section>
  );
}
