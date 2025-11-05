import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ProtectedRouteProps } from "./interfaces/ProtectedRouteProps";
import FullScreenSpinner from "../components/FullScreenSpinner/FullScreenSpinner";

interface ExtendedProtectedRouteProps extends ProtectedRouteProps {
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ExtendedProtectedRouteProps) => {
  const { isAuthenticated, fetchUser, user } = useAuthStore();
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, [token]);

  const verifyUser = async () => {
    if (token && !user) await fetchUser();
    setLoading(false);
  };

  if (loading) return <FullScreenSpinner />;

  if (!loading && !isAuthenticated()) return <Navigate to="/login" replace />;

  if (requireAdmin && user?.role !== "ADMIN")
    return <Navigate to="/" replace />;

  return children;
};
