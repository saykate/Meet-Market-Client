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

  const toggleFollowUser = async () => {
    if (!token || !targetUserId || !userId) {
      setLoading(false)
      setError({ message: "Authentication token or target user ID not found" })
      return
    }

    try {
      setLoading(true)
      await api.toggleFollowUser({ userId, targetUserId, token });
      setError(null)
    } catch (error) {
      console.error("Failed to update follow status", error)
      setError({
        message: (error as Error).message || "An unknown error occurred",
      })
    } finally {
      setLoading(false)
    }
  }
  
  return { toggleFollowUser, loading, error }

}
export default useFollowUser;
