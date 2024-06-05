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
  const { isAuthenticated, userId } = useAuthContext();
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
                  ? conversations.map((conversation) => {
                      const lastMessage = conversation.lastMessage;
                      const isCurrentUserSender =
                        lastMessage.author._id === userId;

                      const truncatedMessageText =
                        lastMessage.text.length > 40
                          ? `${lastMessage.text.slice(0, 40)}...`
                          : lastMessage.text;
                          
                      return (
                        <Link
                          to={`/messages/${conversation.user._id}`}
                          key={lastMessage._id}
                        >
                          <SimpleGrid
                            w="full"
                            columns={3}
                            mt="1rem"
                            bg="gray.200"
                            borderRadius="25"
                            gap="3rem"
                            p=".5rem"
                          >
                            <GridItem colSpan={1}>
                              <Flex
                                alignItems="center"
                                gap={{ base: ".25rem", custom: "2rem" }}
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
                              <Box
                                fontWeight={
                                  isCurrentUserSender ? "bold" : "normal"
                                }
                                color={
                                  isCurrentUserSender ? "blue.600" : "black"
                                }
                              >
                                {isCurrentUserSender
                                  ? `You: ${truncatedMessageText}`
                                  : `${lastMessage.author.username}: ${truncatedMessageText}`}
                              </Box>
                            </GridItem>
                          </SimpleGrid>
                        </Link>
                      );
                    })
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
