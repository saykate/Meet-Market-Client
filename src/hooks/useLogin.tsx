import { useState } from "react";
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

const useLogin = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const login = async ({ username, password }: LoginFormData) => {
    try {
      setLoading(true);
      const res = await api.login({ username, password });
      setToken(res.JWT);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to Login", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};

export default useLogin;
