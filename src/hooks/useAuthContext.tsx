import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthContext = () => {
  const { token, setToken, isAuthenticated, userId, username, logout } = useContext(AuthContext);

  return {
    token,
    setToken,
    isAuthenticated,
    userId,
    username, 
    logout
  };
};

export default useAuthContext;