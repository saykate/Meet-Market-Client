import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

type ErrorType = {
  message: string;
};

const useLogout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const handleLogout = () => {
    try {
      setLoading(true);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logout: handleLogout };
};

export default useLogout;
