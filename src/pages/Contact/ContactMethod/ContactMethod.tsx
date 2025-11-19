import './ContactMethod.scss';
import { ContactItem } from './interfaces/ContactItem';

const contactMethods: ContactItem[] = [
  { iconColor: '#5C33F6', title: 'Tel: 877-67-88-99', description: 'E-Mail: shop@store.com' },
  { iconColor: '#FF2F84', title: 'Support Forum', description: 'For over 24hr' },
  { iconColor: '#FFA500', title: '20 Margaret st, London', description: 'Great britain, 3NM98-LK' },
  { iconColor: '#00D17C', title: 'Free standard shipping', description: 'on all orders.' },
];

const ContactMethod: React.FC = () => {
  return (
    <section className="contact-methods-container">
      {contactMethods.map((item, index) => (
        <article className="contact-item" key={index}>
          <span className="icon" style={{ backgroundColor: item.iconColor }}></span>
          <span className="text">
            <p className="title">{item.title}</p>
            <p className="description">{item.description}</p>
          </span>
        </article>
      ))}
    </section>
  );
};

export default ContactMethod;
