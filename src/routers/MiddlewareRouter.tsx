import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface MiddlewareProps {
  page: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ page }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{page}</>;
};

export default Middleware;
