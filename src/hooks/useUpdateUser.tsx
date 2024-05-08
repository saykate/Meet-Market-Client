import { useState } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { UserData } from "../api/users";

type ErrorType = {
  message: string;
}

const useUpdateUser = () => {
  const { token, userId } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const updateUser = async (userData: UserData) => {
    if (!token || !userId) {
      setError({ message: "Authentication token or user ID not found" });
      return;
    }
    try {
      setLoading(true);
      await api.updateUser({ userId, token }, userData);
      setError(null);
    } catch (error) {
      console.error("Failed to update user", error);
      if (error instanceof Error) {
        setError({ message: error.message })
      } else {
      setError({ message: "An unknown error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };
  return { updateUser, loading, error };
};

export default useUpdateUser;
