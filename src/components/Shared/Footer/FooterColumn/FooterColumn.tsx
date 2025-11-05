import './FooterColumn.scss'
import { FooterColumnProps } from './interfaces/FooterColumn';

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <nav aria-label={title} className="footer__column">
      <h3 className="footer__heading">{title}</h3>
      <ul className="footer__list">
        {links.map((link) => (
          <li key={link.label} className="footer__item">
            <a href={link.url} className="footer__link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterColumn;
