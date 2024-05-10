import { useState } from "react";
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

const useRegister = () => {
  const { setToken, userId } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const register = async ({
    username,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    try {
      setLoading(true);
      const res = await api.register({ username, password, confirmPassword });
      setToken(res.JWT);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Failed to register", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register };
};

export default useRegister;
