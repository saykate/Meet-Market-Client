import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = () => {
    try {
      setLoading(true);
      setToken(null);
      navigate("/");
    } catch (error: any) {
      console.error("Failed to logout", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logout };
};

export default useLogout;

