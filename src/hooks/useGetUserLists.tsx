import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/user";

type Category = {
  _id: string; 
  title: string
}

type List = {
  _id: string;
  listName: string;
  creator: string;
  categories: Category[];
};

const useGetUserLists = () => {
  const { token, userId } = useAuthContext();
  const [lists, setLists] = useState<List[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserLists = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError("Authentication token or user ID not found");
        return;
      }
      try {
        setLoading(true);
        const fetchedLists = await api.getUserLists({ userId, token });
        setLists(fetchedLists)
        setError(null);
      } catch (error: any) {
        console.error("Failed to get message", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    getUserLists();
  }, [token, userId]);
  return { lists, loading, error };
};

export default useGetUserLists;
