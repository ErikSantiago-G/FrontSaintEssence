import { LoginResponse, User } from "./types/auth";
import api from "./axiosInstance";

export const AuthService = {
    login: (data: { email: string; password: string }) =>
        api.post<LoginResponse>("/auth/login", data),

    me: () => api.get<User>("/auth/me"),

    logout: () => api.post("/auth/logout"),

    register: (data: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        role?: "CUSTOMER";
    }) => api.post("/auth/register", data)
}