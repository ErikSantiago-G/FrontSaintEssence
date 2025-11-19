import { useState } from 'react';
import ContactFormSuccess from '../ContactFormSuccess/ContactFormSuccess';
import { ErrorsForm, FormData } from './interfaces/ContactForm';
import './ContactForm.scss';

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<ErrorsForm>({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getLabel = (field: keyof FormData) => {
        const labels: Record<keyof FormData, string> = {
            name: 'Nombre completo',
            email: 'Correo electrónico',
            subject: 'Asunto',
            message: 'Mensaje',
        };
        return labels[field];
    };

    const getPlaceholder = (field: keyof FormData) => {
        const placeholders: Record<keyof FormData, string> = {
            name: 'Tu nombre',
            email: 'tu@correo.com',
            subject: 'Asunto de tu mensaje',
            message: 'Tu mensaje aquí...',
        };
        return placeholders[field];
    };

    const validateForm = (): boolean => {
        const newErrors: ErrorsForm = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Por favor ingresa un correo válido';
        }
        if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido';
        if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ErrorsForm]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const endpoint = 'https://formspree.io/f/mgvdoqrg';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    setSubmitted(false);
                }, 3000);
            } else {
                console.error('Error enviando formulario');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) return <ContactFormSuccess />;

    return (
        <section className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <header className="contact-form-header">
                    <h1>Ponte en contacto</h1>
                    <p>Envíanos tu mensaje y nos pondremos en contacto contigo.</p>
                </header>

                {(['name', 'email', 'subject', 'message'] as const).map(field => (
                    <div className="form-group" key={field}>
                        <label htmlFor={field}>{getLabel(field)}</label>
                        {field === 'message' ? (
                            <textarea
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                rows={6}
                                placeholder={getPlaceholder(field)}
                            />
                        ) : (
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={getPlaceholder(field)}
                            />
                        )}
                        {errors[field] && <span className="error">{errors[field]}</span>}
                    </div>
                ))}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </form>
        </section>
    );
}
