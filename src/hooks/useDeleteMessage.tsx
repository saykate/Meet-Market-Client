import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/messages";

export type MessageType = {
  token: string, 
  _id: string;
};

type ErrorType = {
  message: string;
}

const useDeleteMessage = (_id: string) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const deleteMessage = async () => {
      if (!token) {
        setLoading(false);
        setError({ message: "Authentication token not found" });
        return;
      }
      try {
        setLoading(true);
        await api.deleteMessage(token, _id);
        setError(null);
      } catch (error) {
        console.error("Failed to delete message", error);
        if (error instanceof Error) {
          setError({ message: error.message })
        } else {
        setError({ message: "An unknown error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };
    deleteMessage();
  }, [token, _id]);
  return { loading, error };
};

export default useDeleteMessage;
