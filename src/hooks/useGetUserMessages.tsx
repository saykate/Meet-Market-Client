import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";

type Message = {
  _id: string;
  author: string;
  recipient: string;
  text: string;
  createdDate: Date;
};

const useGetUserMessages = () => {
  const { token, userId } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserMessages = async () => {
      if (!token || !userId) {
        setLoading(false);
        setError("Authentication token or user ID not found");
        return;
      }
      try {
        setLoading(true);
        const fetchedMessages = await api.getUserMessages({ userId, token });
        setMessages(fetchedMessages);
        setError(null);
      } catch (error: any) {
        console.error("Failed to get message", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    getUserMessages();
  }, [token, userId]);
  return { messages, loading, error };
};

export default useGetUserMessages;
