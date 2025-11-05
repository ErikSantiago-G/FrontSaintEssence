import React from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.scss';

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <div className="admin-layout__sidebar">
        <h2 className="admin-layout__title">Panel Admin</h2>
        <nav className="admin-layout__nav">
          <p>Navegación del admin será implementada pronto</p>
        </nav>
      </div>
      <div className="admin-layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;