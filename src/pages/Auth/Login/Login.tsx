import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import "./Login.scss";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
    } catch (error){
      console.error(error);
    }
  };

  return (
    <section className="login" aria-labelledby="login-title">
      <div className="login__container">
        <h1 id="login-title" className="login__title">
          Login
        </h1>
        <p className="login__subtitle">Porfavor, inicie sesión</p>

        <form className="login__form">
          <section className="login__field">
            <label htmlFor="email" className="sr-only">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </section>

          <section className="login__field login__password-field">
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </section>

          <Link to="/forgot-password" className="login__forgot">¿Olvidaste tu contraseña?</Link>

          <button type="button" onClick={handleSubmit} className="login__button">Iniciar sesión</button>

          <p className="login__register">
            ¿No tienes una cuenta?
            <Link to="/register" className="login__register-link">
              Crea una cuenta.
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
