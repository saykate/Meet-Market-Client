import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { CategoryData } from "../api/shopping";

type ErrorType = {
  message: string;
};

const useGetUserCategories = (userId: string) => {
  const { token } = useAuthContext();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const getUserCategories = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError({ message: "Authentication token or user ID not found" });
        return;
      }
      try {
        setLoading(true);
        const fetchedCategories = await api.getUserCategories({ userId, token });
        setCategories(fetchedCategories);
        setError(null);
      } catch (error) {
        console.error("Failed to get categories", error);
        setError({
          message: (error as Error).message || "An unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };
    getUserCategories();
  }, [token, userId]);
  return { categories, loading, error };
};

export default useGetUserCategories;
