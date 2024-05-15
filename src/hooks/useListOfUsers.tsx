import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { UserData } from "../api/users"

type ErrorType = {
  message: string;
};

const useListOfUsers = () => {
  const { token, userId } = useAuthContext();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError({ message: "Authentication token or user ID not found" });
        return;
      }
      try {
        setLoading(true);
        const fetchedUsers = await api.listOfUsers({ token });
        console.log("FetchedUsers", fetchedUsers)
        setUsers(fetchedUsers);
        setError(null);
      } catch (error) {
        console.error("Failed to get users", error);
        setError({
          message: (error as Error).message || "An unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token, userId]);
  return { users, loading, error };
};

export default useListOfUsers;
