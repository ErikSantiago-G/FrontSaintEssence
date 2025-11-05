import { ProfileInfoRowProps } from './interfaces/ProfileInfoRowProps';
import './ProfileInfoRow.scss';

const ProfileInfoRow = ({ icon, label, value, last = false }: ProfileInfoRowProps) => {
    return (
        <section className={`info-row ${last ? "last" : ""}`} role="group" aria-label={label}>
            <div className="icon">{icon}</div>
            <div className="content">
                <dt>{label}</dt>
                <dd>{value}</dd>
            </div>
        </section>
    )
}

export default ProfileInfoRow