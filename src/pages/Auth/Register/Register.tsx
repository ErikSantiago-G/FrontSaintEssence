import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../../api/authService";
import "./Register.scss";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(["Las contraseñas no coinciden"]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await AuthService.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.name,
      });

      const loginResponse = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("accessToken", loginResponse.data.accessToken);
      localStorage.setItem("refreshToken", loginResponse.data.refreshToken);

      const userResponse = await AuthService.me();
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      navigate("/profile");
    } catch (error: unknown) {
      console.error("Error en registro o login:", error);
      // @ts-ignore: para ignorar error de TS al acceder a response
      setError(error.response?.data?.message || "Error registrando el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register" aria-labelledby="register-title">
      <div className="register__container">
        <h1 id="register-title" className="register__title">Registro</h1>
        <p className="register__subtitle">Por favor, llena los campos.</p>

        <form className="register__form" onSubmit={handleSubmit}>
          <section className="register__field">
            <label htmlFor="name" className="sr-only">Nombres</label>
            <input id="name" name="name" type="text" placeholder="Nombres completo" value={formData.name} onChange={handleChange} required />
          </section>

          <section className="register__field">
            <label htmlFor="lastName" className="sr-only">Apellidos</label>
            <input id="lastName" name="lastName" type="text" placeholder="Apellidos completo" value={formData.lastName} onChange={handleChange} required />
          </section>

          <section className="register__field">
            <label htmlFor="email" className="sr-only">Correo electrónico</label>
            <input id="email" name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
          </section>

          <section className="register__field">
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input id="password" name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
          </section>

          <section className="register__field">
            <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleChange} required />
          </section>

          {error && (
            <p className="register__error">
              {error.map((err) => (
                <span key={err}>{err}</span>
              ))}
            </p>
          )}

          <button type="submit" className="register__button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>

          <p className="register__login">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="register__login-link">
              Inicia sesión.
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
