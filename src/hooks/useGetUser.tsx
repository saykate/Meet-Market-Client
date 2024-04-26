import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/user";

type User = {
  _id: string;
  username: string;
};

const useGetUser = () => {
  const { token, userId } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError("Authentication token or user ID not found");
        return;
      }
      try {
        setLoading(true);
        const user = await api.getUser({ userId, token });
        setUser(user);
        setError(null);
      } catch (error: any) {
        console.error("Failed to get message", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [token, userId]);
  return { user, loading, error };
};

export default useGetUser;
