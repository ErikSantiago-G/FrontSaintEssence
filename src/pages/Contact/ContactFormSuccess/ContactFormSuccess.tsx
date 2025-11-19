import './ContactFormSuccess.scss';

const ContactFormSuccess = () => {
    return (
        <section className="success-container">
            <div className="success-content">
                <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2>¡Mensaje Recibido!</h2>
                <p>Gracias por contactarnos. Te responderemos pronto.</p>
            </div>
        </section>
    )
}

export default ContactFormSuccess