import { useState, useEffect } from "react";
import * as api from "../api/shopping";
import { DepartmentData } from "../api/shopping";

type ErrorType = {
  message: string;
};

const useGetDepartments = () => {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const fetchedDepartments = await api.getDepartments();
        console.log("FetchedDepartments", fetchedDepartments)
        setDepartments(fetchedDepartments);
        setError(null);
      } catch (error) {
        console.error("Failed to get departments", error);
        setError({
          message: (error as Error).message || "An unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);
  return { departments, loading, error };
};

export default useGetDepartments
;
