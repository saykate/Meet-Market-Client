import { useState } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { UserData } from "../api/users";

type ErrorType = {
  message: string;
};

const useGetUserFollowing = (userId: string) => {
  const { token } = useAuthContext();
  const [following, setFollowing] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const getUserFollowing = async () => {
    if (!token || !userId) {
      setLoading(false);
      setError({ message: "Authentication token or user ID not found" });
      return;
    }
    try {
      setLoading(true);
      const fetchedFollowing = await api.getUserFollowing({ userId, token });
      setFollowing(fetchedFollowing)
      setError(null);
    } catch (error) {
      console.error("Failed to get following", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };
  return { getUserFollowing, following, loading, error };
};

export default useGetUserFollowing;

