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
  const [success, setSuccess] = useState<boolean | null>(null)

  const followUser = async () => {
    if (!token || !targetUserId || !userId) {
      setLoading(false)
      setError({ message: "Authentication token or target user ID not found" })
      return
    }

    try {
      setLoading(true)
      setSuccess(null)
      await api.followUser({ userId, targetUserId, token });
      setError(null)
      setSuccess(true)
    } catch (error) {
      console.error("Failed to follow user", error)
      setError({
        message: (error as Error).message || "An unknown error occurred",
      })
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }
  
  return { followUser, loading, error, success }

}
export default useFollowUser;
