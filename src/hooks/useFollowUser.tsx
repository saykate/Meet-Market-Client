import { useState } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";

type ErrorType = {
  message: string;
};

const useFollowUser = (targetUserId: string) => {
  const { token, userId } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const followUser = async () => {
    if (!token || !targetUserId || !userId) {
      setLoading(false)
      setError({ message: "Authentication token or target user ID not found" })
      return
    }

    console.log(targetUserId)

    try {
      setLoading(true)
      await api.followUser({ userId, targetUserId, token });
      setError(null)
    } catch (error) {
      console.error("Failed to follow user", error)
      setError({
        message: (error as Error).message || "An unknown error occurred",
      })
    } finally {
      setLoading(false)
    }
  }
  
  return { followUser, loading, error }

}
export default useFollowUser;
