import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthContext = () => {
  const { token, setToken, isAuthenticated, userId } = useContext(AuthContext);

  return {
    token,
    setToken,
    isAuthenticated,
    userId,
  };
};

export default useAuthContext;