import { FC, useState } from "react";
import { useToast } from "@chakra-ui/react";
import FormComponent from "../components/FormComponent";
import useAuthContext from "../hooks/useAuthContext";
import { createMessage } from "../api/messages";

export type MessageFormProps = {
  recipient: string;
  onClose: () => void;
};

type ErrorType = {
  message: string;
};

const MessageForm: FC<MessageFormProps> = ({ recipient, onClose }) => {
  const { token, userId } = useAuthContext();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const initState = {
    text: "",
  };

  const inputs = [
    {
      colSpan: 2,
      label: "Text",
      type: "text",
      name: "text",
      id: "text",
      placeholder: "compose your message here",
      isRequired: true,
    },
  ];

  const handleCreateMessage = async ({ text }: { text: string }) => {
    setLoading(true);
    if (!token || !userId) {
      return null;
    }
    try {
      const newMessage = await createMessage(token, userId, recipient, text);
      console.log("NewMessage", newMessage);
      onClose();
      toast({
        title: "Message Sent",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      console.error("Failed to Send Message", error);
      setError({
        message: (error as Error).message || "An unknown error occurred",
      });
      setLoading(false);
    }
  };

  return (
    <FormComponent
      title="Message Form"
      inputs={inputs}
      submit={handleCreateMessage}
      cta="Send Message"
      initState={initState}
      loading={loading}
      error={error}
    />
  );
};

export default MessageForm;
