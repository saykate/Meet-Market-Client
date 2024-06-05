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
import useGetUserConversations from "../hooks/useGetUserConversations";
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
              <Box p={{ base: "0", sm: "1rem", md: "2rem" }}>
                {conversations.length
                  ? conversations.map((conversation) => (
                      <Link
                        to={`/messages/${conversation.user._id}`}
                        key={conversation.lastMessage._id}
                      >
                        <SimpleGrid
                          w="full"
                          columns={3}
                          mt="1rem"
                          bg="gray.200"
                          borderRadius="25"
                          p=".5rem"
                        >
                          <GridItem colSpan={1}>
                            <Flex
                              alignItems="center"
                              gap={{ base: ".25rem", sm: "2rem" }}
                            >
                              <Avatar src={conversation.user.profilePhoto} />
                              <Box>
                                {conversation.user.username.length > 8
                                  ? `${conversation.user.username.slice(
                                      0,
                                      8
                                    )}...`
                                  : conversation.user.username}
                              </Box>
                            </Flex>
                          </GridItem>
                          <GridItem colSpan={2} alignContent="center">
                            {conversation.lastMessage.text.length > 40
                              ? `${conversation.lastMessage.text.slice(
                                  0,
                                  40
                                )}...`
                              : conversation.lastMessage.text}
                          </GridItem>
                        </SimpleGrid>
                      </Link>
                    ))
                  : "You have no messages"}
              </Box>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default Messages;
