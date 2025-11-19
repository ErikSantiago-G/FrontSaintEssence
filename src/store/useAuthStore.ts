import { create } from "zustand";
import { AuthState } from "./types/AuthState";
import { AuthService } from "../api/authService";

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    loading: false,

    login: async (email, password) => {
        set({ loading: true });
        try {
            const { data } = await AuthService.login({ email, password });
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            const userResponse = await AuthService.me();
            set({ user: userResponse.data });
        } catch (error: unknown) {
            console.error("Error en login:", error);
            set({ user: null });

            let message = "Error al iniciar sesión";

            if (typeof error === "object" && error !== null && "response" in error) {
                const err = error as {
                    response?: { data?: { message?: unknown } };
                };

                if (typeof err.response?.data?.message === "string") {
                    message = err.response.data.message;
                }

                if (Array.isArray(err.response?.data?.message)) {
                    message = err.response.data.message.join(", ");
                }
            }

            throw new Error(message);
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.warn("Error cerrando sesión:", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            set({ user: null });
        }
    },

    fetchUser: async () => {
        try {
            const { data } = await AuthService.me();
            set({ user: data });
        } catch {
            set({ user: null });
        }
    },

    isAuthenticated: () => !!get().user,
}));