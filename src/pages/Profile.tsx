import { useParams } from "react-router-dom";
import {
  useDisclosure,
  Box,
  Heading,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useGetUser from "../hooks/useGetUser";
import useGetUserLists from "../hooks/useGetUserLists";
import MessageForm from "../modals/MessageForm";
import ProfileForm from "../modals/ProfileForm";

const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams<{ userId: string }>();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { user, loading, error, refetch } = useGetUser(userId as string);
  const { lists } = useGetUserLists(userId as string);
  const currentUser = currentUserId === userId;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateSuccess = useCallback(() => {
    setShouldRefetch(true);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch]);

  const [initialState, setInitialState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    birthdate: "",
    profilePhoto: "",
    coverPhoto: "",
  });

  useEffect(() => {
    if (user) {
      setInitialState({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        birthdate: user.birthdate
          ? new Date(user.birthdate).toISOString().split("T")[0]
          : "",
        profilePhoto: user.profilePhoto || "",
        coverPhoto: user.coverPhoto || "",
      });
    }
  }, [user]);

  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      flexDir="column"
      bg="gray.100"
      overflow="auto"
    >
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
        user &&
        userId && (
          <Box>
            <Box
              p="8rem"
              display="flex"
              alignItems="center"
              gap="2rem"
              position="relative"
              bgImage={user.coverPhoto}
              bgPosition="center"
              bgSize="cover"
            >
              <Avatar
                size={["xl", "xl", "2xl"]}
                position="absolute"
                top="80%"
                left="5"
                src={user.profilePhoto}
              />
            </Box>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              px="3%"
              pt={["2rem", "3rem", "6rem"]}
              pb="2rem"
              flexDir={{ base: "column", sm: "row" }}
              gap="2rem"
            >
              <Flex flexDir="column" justifyContent="center">
                <Heading size="xl">{user.username}</Heading>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
              </Flex>
              {currentUser ? (
                <>
                  <Button onClick={onOpen} bg="gray.300">
                    Edit Profile
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Update Your Profile</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <ProfileForm
                          initialState={initialState}
                          onClose={onClose}
                          onUpdateSuccess={handleUpdateSuccess}
                        />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                <>
                  <Button onClick={onOpen} bg="gray.300">
                    Send a Message
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Message</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <MessageForm recipient={userId} onClose={onClose} />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </Flex>
            <Box
              p="2em"
              textAlign="left"
              border="solid"
              borderColor="gray.300"
              mx="2rem"
            >
              <Heading size="md">Bio:</Heading>
              <Text>{user.bio}</Text>
            </Box>
            <Box p="5em">
              <Heading size="lg">
                {user.username} is interested in shopping for:
              </Heading>
              <hr style={{ height: "1px", backgroundColor: "#c4cfdb" }} />
              <ul>
                {lists.map((list) => (
                  <li key={list._id}>
                    {list.categories.map((cat) => (
                      <Box fontSize="1.5rem" key={cat._id}>
                        {cat.title}
                      </Box>
                    ))}
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default Profile;
