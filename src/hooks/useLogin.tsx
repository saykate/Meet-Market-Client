import { useState, useEffect } from "react";
import * as api from "../api/auth";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

export type LoginFormData = {
  username: string;
  password: string;
};

type ErrorType = {
  message: string;
};

const useLogin = (onClose: () => void) => {
  const { setToken, userId } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const login = async ({ username, password }: LoginFormData) => {
    setLoading(true);
    try {
      const res = await api.login({ username, password });
      setToken(res.JWT);
      setLoading(false)
    } catch (error) {
      console.error("Failed to Login", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
      setLoading(false)
    } 
  };

  useEffect(() => {
    if(!userId || loading) {
      return 
    } 
    navigate(`/profile/${userId}`);
    onClose()
  }, [userId, loading]
)

  return { loading, error, login };
};

export default useLogin;
