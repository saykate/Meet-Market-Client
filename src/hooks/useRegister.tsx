import { useEffect, useState } from "react";
import * as api from "../api/auth";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

export type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

type ErrorType = {
  message: string;
};

const useRegister = (onClose: () => void) => {
  const { setToken, userId } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const register = async ({
    username,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    setLoading(true);
    try {
      const res = await api.register({ username, password, confirmPassword });
      setToken(res.JWT);
      setLoading(false);
    } catch (error) {
      console.error("Failed to register", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || loading) {
      return;
    }
    navigate(`/profile/${userId}`);
    onClose();
  }, [userId, loading]);

  return { loading, error, register };
};

export default useRegister;
