import { footerLinkGroups } from "./FooterData";
import FooterColumn from "./FooterColumn/FooterColumn";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <section className="footer__top">

        <article className="footer__brand">
          <h2 className="footer__logo">Saint</h2>

          <address className="footer__address">
            <p className="footer__address-title">Información de contacto</p>
            <p>Unilasallista Corporación Universitaria</p>
          </address>
        </article>

        {footerLinkGroups.map((group) => (
          <FooterColumn key={group.title} title={group.title} links={group.links} />
        ))}
      </section>

      <section className="footer__bottom">
        <p>Sanz - Todos los derechos reservados.</p>
      </section>
    </footer>
  );
};

export default Footer;
