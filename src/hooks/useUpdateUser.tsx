import { useState } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/user";

const useUpdateUser = () => {
  const { token, userId } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (userData: any) => {
    if (!token || !userId) {
      setError("Authentication token or user ID not found");
      return;
    }
    try {
      setLoading(true);
      await api.updateUser({ userId, token }, userData);
      setError(null);
    } catch (error: any) {
      console.error("Failed to update user", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  return { updateUser, loading, error };
};

export default useUpdateUser;
