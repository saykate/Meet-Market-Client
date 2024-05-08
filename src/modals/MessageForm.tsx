import { FC } from "react";
import Form from "../components/Form";

export type MessageFormProps = {
  author: string;
  recipient: string;
};

const MessageForm: FC<MessageFormProps> = ({ author, recipient }) => {
  const initState = {
    text: "",
  };

  const inputs = [
    {
      type: "hidden",
      name: "author",
      label: "Author",
      value: author,
      isRequired: true, 
    },
    {
      type: "hidden",
      name: "recipient",
      label: "Recipient",
      value: recipient,
      isRequired: true, 
    },
    {
      type: "text",
      name: "text",
      label: "Text",
      isRequired: true,
    },
  ];

  const handleCreateMessage = (FormData) => {};

  return (
    <Form
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
