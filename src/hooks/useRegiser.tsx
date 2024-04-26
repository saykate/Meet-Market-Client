import { useState } from "react";
import * as api from "../api/auth";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const useRegister = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async ({
    username,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    try {
      setLoading(true);
      const res = await api.register({ username, password, confirmPassword });
      setToken(res.JWT);
      navigate("/profile");
    } catch (error: any) {
      console.error("Failed to register", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register };
};

export default useRegister;
