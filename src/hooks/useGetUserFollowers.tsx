import { useState } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { UserData } from "../api/users";

type ErrorType = {
  message: string;
};

const useGetUserFollowers = (userId: string) => {
  const { token } = useAuthContext();
  const [followers, setFollowers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const getUserFollowers = async () => {
    if (!token || !userId) {
      setLoading(false);
      setError({ message: "Authentication token or user ID not found" });
      return;
    }
    try {
      setLoading(true);
      const fetchedFollowers = await api.getUserFollowers({ userId, token });
      setFollowers(fetchedFollowers)
      setError(null);
    } catch (error) {
      console.error("Failed to get followers", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };
  return { getUserFollowers, followers, loading, error };
};

export default useGetUserFollowers;
