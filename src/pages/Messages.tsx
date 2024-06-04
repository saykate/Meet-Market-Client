import { Link } from "react-router-dom";
import {
  Box,
  Spinner,
  Alert,
  AlertIcon,
  Avatar,
  Flex,
  Heading,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
// import useGetUserMessages from "../hooks/useGetUserMessages";
import useGetUserConversations from "../hooks/useGetUserMessages";
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
  // const { receivedMessages, sentMessages, loading, error } =
  //   useGetUserMessages();
  const { conversations, loading, error } = useGetUserConversations();

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
            <Box mt="1rem" p={{ base: "0", sm: "1rem", md: "2rem" }}>
              <Heading as="h2" pb="1rem">
                Inbox
              </Heading>
              <Box p={{ base: "0", sm: "1rem", md: "2rem" }}>
                {conversations.length
                  ? conversations.map((conversation) => (
                      <SimpleGrid
                        key={conversation.lastMessage._id}
                        w="full"
                        columns={3}
                        mt="1rem"
                        bg="gray.200"
                        borderRadius="25"
                        p=".5rem"
                      >
                        <GridItem colSpan={1}>
                          <Flex alignItems="center" gap={{ base: ".25rem", sm: "2rem" }}>
                            <Link to={`/profile/${conversation.user._id}`}>
                              <Avatar src={conversation.user.profilePhoto} />
                            </Link>
                            <Link to={`/profile/${conversation.user._id}`}>
                              {conversation.user.username.length > 8
                                ? `${conversation.user.username.slice(0, 8)}...`
                                : conversation.user.username}
                            </Link>
                          </Flex>
                        </GridItem>
                        <GridItem colSpan={2} alignContent="center">
                          {conversation.lastMessage.text.length > 50
                            ? `${conversation.lastMessage.text.slice(0, 50)}...`
                            : conversation.lastMessage.text}
                        </GridItem>
                      </SimpleGrid>
                    ))
                  : "You have no messages"}
              </Box>
            </Box>
          </Box>
          // <Box >
          //   <Box mt="1rem" p={{base: "0", sm: "1rem", md: "2rem" }} >
          //     <Heading as="h2" pb="1rem">
          //       Inbox
          //     </Heading>
          //     <Box p={{base: "0", sm: "1rem", md: "2rem" }} >
          //       {receivedMessages.length
          //         ? receivedMessages.map((message: Message) => (
          //             <SimpleGrid
          //               key={message._id}
          //               w="full"
          //               columns={3}
          //               mt="1rem"
          //               bg="gray.200"
          //               borderRadius="25"
          //             >
          //               <GridItem p=".5rem" colSpan={1}>
          //                 <Flex
          //                   alignItems="center"
          //                   gap={{ base: ".25rem", sm: "2rem" }}
          //                 >
          //                   <Link to={`/profile/${message.author._id}`}>
          //                     <Avatar src={message.author.profilePhoto} />
          //                   </Link>
          //                   <Link to={`/profile/${message.author._id}`}>
          //                     {message.author.username.length > 8
          //                       ? `${message.author.username.slice(0, 8)}...`
          //                       : message.author.username}
          //                   </Link>
          //                 </Flex>
          //               </GridItem>
          //               <GridItem p=".5rem" colSpan={2} alignContent="center">
          //                 {message.text}
          //               </GridItem>
          //             </SimpleGrid>
          //           ))
          //         : "You have no messages"}
          //     </Box>
          //   </Box>
          //   <Box  mt="1rem" p={{base: "0", sm: "1rem", md: "2rem" }}>
          //     <Heading as="h2" pb="1rem">
          //       Sent Messages
          //     </Heading>
          //     <Box p={{base: "0", sm: "1rem", md: "2rem" }}>
          //       {sentMessages.length
          //         ? sentMessages.map((message: Message) => (
          //             <SimpleGrid
          //               key={message._id}
          //               w="full"
          //               columns={3}
          //               mt="1rem"
          //               bg="gray.200"
          //               borderRadius="25"
          //             >
          //               <GridItem p=".5rem" colSpan={1}>
          //                 <Flex
          //                   alignItems="center"
          //                   gap={{ base: ".25rem", sm: "2rem" }}
          //                 >
          //                   <Link to={`/profile/${message.recipient._id}`}>
          //                     <Avatar src={message.recipient.profilePhoto} />
          //                   </Link>
          //                   <Link to={`/profile/${message.recipient._id}`}>
          //                     {message.recipient.username.length > 8
          //                       ? `${message.recipient.username.slice(0, 8)}...`
          //                       : message.recipient.username}
          //                   </Link>
          //                 </Flex>
          //               </GridItem>
          //               <GridItem p=".5rem" colSpan={2} alignContent="center">
          //                 {message.text}
          //               </GridItem>
          //             </SimpleGrid>
          //           ))
          //         : "You have sent no messages"}
          //     </Box>
          //   </Box>
          // </Box>
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
