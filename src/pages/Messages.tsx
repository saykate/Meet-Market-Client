import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Heading,
} from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
import useGetUserMessages from "../hooks/useGetUserMessages";
import { UserData } from "../api/users";

export type Message = {
  _id: string;
  author: UserData;
  recipient: string;
  text: string;
  createdDate: Date;
};

const Messages = () => {
  const { isAuthenticated } = useAuthContext();
  const { messages, loading, error } = useGetUserMessages();

  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      flexDir="column"
      bg="gray.100"
      overflow="auto"
    >
      <Heading size="xl" p="1rem">
        Messages:
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
        isAuthenticated && (
          <Box>
            <Heading as="h2">Inbox</Heading>
            <ul>
              {messages.map((message: Message) => (
                <li key={message._id}>
                  <div>{message.author.username} said:</div>
                  <div>'{message.text}'</div>
                </li>
              ))}
            </ul>
          </Box>
        )
      )}
    </Box>
  );
};

export default Messages;
