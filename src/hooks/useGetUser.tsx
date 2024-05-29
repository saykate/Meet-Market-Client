import { useState, useEffect, useCallback } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { UserData } from "../api/users";


type ErrorType = {
  message: string;
};

const useGetUser = (userId: string | undefined) => {
  const { token } = useAuthContext();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const fetchUser = useCallback(async () => {
    if (!token || !userId) {
      setLoading(false);
      setError({ message: "Authentication token or user ID not found" });
      return;
    }
    try {
      setLoading(true);
      const fetchedUser = await api.getUser({ userId, token });
      setUser(fetchedUser);
      setError(null);
    } catch (error) {
      console.error("Failed to get user", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [fetchUser, userId]);

  return { user, loading, error, refetch: fetchUser };
};

export default useGetUser;
