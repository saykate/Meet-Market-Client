import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Heading,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
import useGetUserMessages from "../hooks/useGetUserMessages";
import { UserData } from "../api/users";

export type Message = {
  _id: string;
  author: UserData;
  recipient: UserData;
  text: string;
  createdDate: Date;
};

const Messages = () => {
  const { isAuthenticated } = useAuthContext();
  const { receivedMessages, sentMessages, loading, error } = useGetUserMessages();
  console.log("sent", sentMessages)
  console.log("received", receivedMessages)

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
            <Box mt="2rem" p="2rem">
              <Heading as="h2">Inbox</Heading>
              <Box>
                {receivedMessages.map((message: Message) => (
                  <SimpleGrid key={message._id} w="full" columns={3} gap=".25rem" p=".25rem">
                    <GridItem border="solid" p="1rem" colSpan={1}>{message.author.username} said:</GridItem>
                    <GridItem border="solid" p="1rem" colSpan={2}>'{message.text}'</GridItem>
                  </SimpleGrid>
                ))}
              </Box>
            </Box>
            <Box mt="3rem" p="2rem">
              <Heading as="h2">Sent Messages</Heading>
              <Box>
                {sentMessages.map((message: Message) => (
                  <SimpleGrid key={message._id} w="full" columns={3} gap=".25rem" p=".25rem">
                    <GridItem border="solid" p="1rem" colSpan={1}>To: {message.recipient.username}</GridItem>
                    <GridItem border="solid" p="1rem" colSpan={2}>'{message.text}'</GridItem>
                  </SimpleGrid>
                ))}
              </Box>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default Messages;

// get messages where author is 'me' or the recipient is 'me'

//  get me all where I am author
// get all where I am recipient

// const sentMessages = [
//   {
//     author: 'me',
//     recipient: 'you',
//   },
// ];

// const receivedMessages = [
//   {
//     author: 'you',
//     recipient: 'me',
//   },
// ];

// const conversation = {
//   name: 'you',
//   messages: [],
// }

// const conversations = {
//   'you': conversation,
//   'christian': conversation,
//   'michael': conversation,
//   'jacob': conversation,
// }

// const buildConversation = (messages) => {
//   // Check if author is not me, or if recipient is not me
//   const isAuthor = messages.author === 'me';
//   const target = isAuthor ? messages.recipient : messages.author;
//   if (!conversations[target]) {
//     conversations[target] = {
//       name: target,
//       messages: [],
//     }
//   }
//   conversations[target].messages.push(messages);
// };