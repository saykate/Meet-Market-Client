import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { UserData } from "../api/users";

export type Message = {
  _id: string;
  author: UserData;
  recipient: string;
  text: string;
  createdDate: Date;
};

type ErrorType = {
  message: string;
};

const useGetUserMessages = () => {
  const { token, userId } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const getUserMessages = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError({ message: "Authentication token or user ID not found" });
        return;
      }
      try {
        setLoading(true);
        const fetchedMessages = await api.getUserMessages({ userId, token });
        setMessages(fetchedMessages);
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
    getUserMessages();
  }, [token, userId]);
  return { messages, loading, error };
};

export default useGetUserMessages;
