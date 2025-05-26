import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
