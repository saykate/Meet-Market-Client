import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { GetUserRequest, UserData } from "../api/users";

type ErrorType = {
  message: string;
};

const useCurrentUser = (_id: string) => {
  const { token } = useAuthContext();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        setLoading(false);
        setError({ message: "Authentication token not found" });
        return;
      }
      try {
        setLoading(true);
        const user = await api.getUser({
          userId: _id,
          token,
        } as GetUserRequest);
        setCurrentUser(user);
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
    getUser();
  }, [token, _id]);
  return { currentUser, loading, error };
};

export default useCurrentUser;
