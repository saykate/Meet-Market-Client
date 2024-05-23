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
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([])
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
        const allMessages = await api.getUserMessages({ userId, token });
        const sentMessages = allMessages.filter((message: Message) => message.author._id === userId);
        const receivedMessages = allMessages.filter((message: Message) => message.recipient !== userId);
        
        setReceivedMessages(receivedMessages);
        setSentMessages(sentMessages);
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
  return { receivedMessages, sentMessages, loading, error };
};

export default useGetUserMessages;
