import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  Avatar,
  Flex,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
import useGetConversation from "../hooks/useGetConversation";
import useGetUser from "../hooks/useGetUser";
import { createMessage } from "../api/messages";
import { Message } from "../hooks/useGetUserConversations";

const Conversation = () => {
  const { userId, token } = useAuthContext();
  const { recipientId = "" } = useParams<{ recipientId?: string }>();
  const recipient = useGetUser(recipientId)

  console.log("recipient", recipient)

  const { messages, loading, error, refetch } = useGetConversation(recipientId);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !token || !userId || !recipientId) return;

    await createMessage(token, userId, recipientId, newMessage);
    setNewMessage("");
    refetch(); 
  };

  return (
    <Box w="full" h="100vh" p="1rem" bg="gray.100" overflow="auto">
      <Heading size={{base: "med", sm: "lg"}} pb="2rem">
        Conversation with {recipient.user?.username}
        <hr style={{margin: "1rem", height: "2px", backgroundColor: "#CBD5E0"}} />
      </Heading>
      {loading ? (
        <Flex justify="center" align="center" w="full" h="100%">
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : (
        <Box>
          <Box mb="1rem">
            {messages.map((message: Message) => (
              <Flex key={message._id} mb="1rem">
                <Avatar src={message.author.profilePhoto} mr="1rem" />
                <Box>
                  <Heading size="sm">{message.author.username}</Heading>
                  <Box>{message.text}</Box>
                </Box>
              </Flex>
            ))}
          </Box>
          <Flex>
            <Input
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage} ml="1rem">
              Send
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Conversation;
