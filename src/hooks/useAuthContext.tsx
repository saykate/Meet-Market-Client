import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthContext = () => {
  const { token, setToken, isAuthenticated, userId, username } = useContext(AuthContext);

  return {
    token,
    setToken,
    isAuthenticated,
    userId,
    username
  };
};

export default useAuthContext;