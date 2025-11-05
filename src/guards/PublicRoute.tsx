import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { PublicRouteProps } from "./interfaces/PublicRouteProps";

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuthenticated, fetchUser, user } = useAuthStore();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (token && !user) fetchUser();
    }, [token, user, fetchUser])

    if (isAuthenticated()) return <Navigate to="/profile" replace />;

    return children;
};
