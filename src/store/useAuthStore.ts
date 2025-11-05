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
        } catch (error) {
            console.error("Error en login:", error);
            set({ user: null });
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