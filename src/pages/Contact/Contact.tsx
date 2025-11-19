import './Contact.scss';
import ContactForm from './ContactForm/ContactForm';
import ContactMethod from './ContactMethod/ContactMethod';

const Contact: React.FC = () => {
  return (
    <section className="contact">
      <ContactForm />
      <section className='contact-container-method'>
        <h2>Información de contacto</h2>
        <ContactMethod />
        <img src="https://res.cloudinary.com/dxspvj1rj/image/upload/v1763518429/Group_124_zh8cal.svg" alt="" />
      </section>
    </section>
  );
};

export default Contact;