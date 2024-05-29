import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { CategoryData } from "../api/shopping";

type List = {
  _id: string;
  listName: string;
  creator: string;
  categories: CategoryData[];
};

type ErrorType = {
  message: string;
};

const useGetUserLists = (userId: string) => {
  const { token } = useAuthContext();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const getUserLists = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError({ message: "Authentication token or user ID not found" });
        return;
      }
      try {
        setLoading(true);
        const fetchedLists = await api.getUserLists({ userId, token });
        setLists(fetchedLists);
        setError(null);
      } catch (error) {
        console.error("Failed to get lists", error);
        setError({
          message: (error as Error).message || "An unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };
    getUserLists();
  }, [token, userId]);
  return { lists, loading, error };
};

export default useGetUserLists;
