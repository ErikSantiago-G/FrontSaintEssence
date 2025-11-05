import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

//TODO: EXP: Interceptor para añadir el token de autenticación en cada petición
// Se consume desde el local storage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

//TODO: EXP: Interceptor para manejar errores de autenticación globalmente
// Si se recibe un 401, redirige al usuario a la página de login
// y elimina los tokens del local storage
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
)


export default api;