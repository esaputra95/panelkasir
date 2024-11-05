import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { Token } from "../utils/useAccess";
import { useDispatch } from "react-redux";
import { setUserSlice } from "../redux/userSlice";

interface MiddlewareProps {
  page: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ page }) => {
  const dispatch = useDispatch()
  const [tokenCookie] = useCookies(['token'])
  const location = useLocation();
  const token = tokenCookie.token ?? '';
  if(token){
    const tokens = jwtDecode<Token>(token);
      dispatch(setUserSlice({
        ...tokens
    }))
  }
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{page}</>;
};

export default Middleware;
