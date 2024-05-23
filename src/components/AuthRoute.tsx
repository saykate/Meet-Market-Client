import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { FC, ReactNode } from "react";

type AuthRouteProps = {
  children?: ReactNode;
};

const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
export default AuthRoute;
