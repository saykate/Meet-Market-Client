import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";

type User = {
  _id: string;
  username: string;
};

type ErrorType = {
  message: string;
};

const useGetUser = (userId: string | undefined) => {
  const { token } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError({ message: "Authentication token or user ID not found" });
        return;
      }
      try {
        setLoading(true);
        const user = await api.getUser({ userId, token });
        setUser(user);
        setError(null);
      } catch (error) {
        console.error("Failed to get message", error);
        setError({
          message: (error as Error).message || "An unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [token, userId]);
  return { user, loading, error };
};

export default useGetUser;
