import { FC } from "react";
import FormComponent from "../components/FormComponent";
import useAuthContext from "../hooks/useAuthContext";
import { createMessage } from "../api/messages";

export type MessageFormProps = {
  recipient: string;
};

const MessageForm: FC<MessageFormProps> = ({ recipient }) => {
  const { token, userId } = useAuthContext();
  const initState = {
    text: "",
  };

  const inputs = [
    {
      colSpan: 2,
      label: "Text",
      type: "text",
      name: "text",
      placeholder: "compose your message here",
      isRequired: true,
    },
  ];

  const handleCreateMessage = async (text: string) => {
    if (!token || !userId) {
      return null;
    }
    const newMessage = await createMessage(token, userId, recipient, text);
    console.log(newMessage);
  };

  return (
    <FormComponent
      title="Message Form"
      subTitle="Compose a message:"
      inputs={inputs}
      submit={handleCreateMessage}
      cta="Send Message"
      initState={initState}
      loading={false}
    />
  );
};

export default MessageForm;
