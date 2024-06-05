import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { Message } from "./useGetUserConversations";

type ErrorType = {
  message: string;
};

const useGetConversation = (recipientId: string) => {
  const { token, userId } = useAuthContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const fetchMessages = async () => {
    if (!token || !userId) {
      setLoading(false);
      setError({ message: "Authentication token or user ID not found" });
      return;
    }
    try {
      setLoading(true);
      const allMessages = await api.getUserMessages({ userId, token });
      console.log("Received messages Convo:", allMessages);

      const conversationMessages = allMessages.filter(
        (message: Message) =>
          (message.author._id === userId &&
            message.recipient._id === recipientId) ||
          (message.author._id === recipientId &&
            message.recipient._id === userId)
      );

      setMessages(conversationMessages);
      setError(null);
    } catch (error) {
      console.error("Failed to get messages", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token, userId, recipientId]);

  return { messages, loading, error, refetch: fetchMessages };
};

export default useGetConversation;
