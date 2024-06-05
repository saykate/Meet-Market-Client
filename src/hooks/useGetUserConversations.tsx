import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import * as api from "../api/users";
import { UserData } from "../api/users";

export type Message = {
  _id: string;
  author: UserData;
  recipient: UserData;
  text: string;
  createdDate: Date;
};

type ErrorType = {
  message: string;
};

type Conversation = {
  user: UserData;
  lastMessage: Message;
};

const useGetUserConversations = () => {
  const { token, userId } = useAuthContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);
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

        const userConversations: { [key: string]: Conversation } = {};

        allMessages.forEach((message: Message) => {
          if (!message.author || !message.recipient) {
            console.error("Message is missing author or recipient:", message);
            return;
          }
          const otherUser =
            message.author._id === userId ? message.recipient : message.author;

          if (
            !userConversations[otherUser._id] ||
            new Date(message.createdDate) >
              new Date(userConversations[otherUser._id].lastMessage.createdDate)
          ) {
            userConversations[otherUser._id] = {
              user: otherUser,
              lastMessage: message,
            };
          }
        });

        setConversations(Object.values(userConversations));
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
  return { conversations, loading, error };
};

export default useGetUserConversations;
