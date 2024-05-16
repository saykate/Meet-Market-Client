import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";

type User = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  birthdate?: Date;
  profilePhoto?: string;
  coverPhoto?: string;
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
    };
    if (userId) {
      getUser();
    }
  }, [token, userId]);
  return { user, loading, error };
};

export default useGetUser;
