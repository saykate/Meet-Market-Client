import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/messages";
import { Message } from "./useGetUserMessages";

type ErrorType = {
  message: string;
};

const useGetMessage = (_id: string) => {
  const { token } = useAuthContext();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const getMessage = async () => {
      if (!token) {
        setLoading(false);
        setError({ message: "Authentication token not found" });
        return;
      }
      try {
        setLoading(true);
        const fetchedMessage = await api.getMessage(token, _id);
        setMessage(fetchedMessage);
        setError(null);
      } catch (error) {
        console.error("Failed to get message", error);
        setError({
          message: (error as Error).message || "An unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };
    getMessage();
  }, [token, _id]);
  return { message, loading, error };
};

export default useGetMessage;
