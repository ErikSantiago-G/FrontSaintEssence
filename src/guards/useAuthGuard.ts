import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

export const useAuthGuard = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const fetchUser = useAuthStore((state) => state.fetchUser);

    useEffect(() => {
        checkAuth();
    }, [user, fetchUser, navigate])

    const checkAuth = async () => {
        if (!user) {
            try {
                await fetchUser();
            } catch {
                navigate('login');
            }
        }
    }

    return !!user;
}