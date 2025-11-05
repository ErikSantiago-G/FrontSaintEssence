import { User, Mail, Package } from "lucide-react";
import { ProfileInfoProps } from "./interfaces/ProfileInfoProps";
import InfoRow from "../ProfileInfoRow/ProfileInfoRow";
import "./ProfileInfo.scss";

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <section className="profile-card" aria-labelledby="profile-heading">
      <header className="card-header">
        <User size={24} aria-hidden="true" />
        <h2 id="profile-heading">Información personal</h2>
      </header>

      <article className="card-body">
        <dl>
          <InfoRow
            icon={<Mail size={18} aria-hidden="true" />}
            label="Correo"
            value={user.email}
          />

          {user.firstName && (
            <InfoRow
              icon={<User size={18} aria-hidden="true" />}
              label="Nombre"
              value={`${user.firstName} ${user.lastName ?? ""}`}
            />
          )}

          <InfoRow
            icon={<Package size={18} aria-hidden="true" />}
            label="Rol"
            value={
              <span className={`role-badge ${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            }
            last
          />
        </dl>
      </article>
    </section>
  );
}
