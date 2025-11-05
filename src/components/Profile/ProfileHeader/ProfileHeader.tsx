import { ProfileHeaderProps } from "./interfaces/ProfileHeaderProps";
import './ProfileHeader.scss';

export default function ProfileHeader({ user, onLogout }: ProfileHeaderProps) {
  return (
    <header className="profile-header">
      <h1>Bienvenido, {user.firstName || user.email}</h1>
      <button onClick={onLogout} className="btn-logout">
        Cerrar sesión
      </button>
    </header>
  );
}
