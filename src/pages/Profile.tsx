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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useGetUser from "../hooks/useGetUser";
import useGetUserLists from "../hooks/useGetUserLists";
import MessageForm from "../modals/MessageForm";
import ProfileForm from "../modals/ProfileForm";

const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams<{ userId: string }>();
  const { user, loading } = useGetUser(userId as string);
  const { lists } = useGetUserLists(userId as string);
  const currentUser = currentUserId === userId;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log("UserId", userId);
  // console.log("currentUserId", currentUserId);
  // console.log("currentUser", currentUser);
  // console.log("user", user);
  // console.log("messages", messages);
  // console.log("lists", lists);

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
      console.log("lastName in setState", user.lastName);
    }
  }, [user]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (user && userId) {
    return (
      <Box w="full" h="100vh" display="flex" flexDir="column" bg="gray.100" overflow="auto">
        <Box
          p="1em"
          h="25%"
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
          <Heading size="md" >Bio:</Heading>
          <Text>{user.bio}</Text>   
        </Box>
        <Box p="5em">
          <Heading size="xl">{user.username}'s Lists</Heading>
          <hr style={{height: "1px", backgroundColor: "#c4cfdb" }}/>
          <ul>
            {lists.map((list) => (
              <li key={list._id}>
                <Text fontSize="2xl" as="b">
                  {list.listName}:
                </Text>
                {list.departments.map((dept) => (
                  <div key={dept._id}>{dept.title}</div>
                ))}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    );
  } else {
    return (
      <div>
        <h1>User not found</h1>
      </div>
    );
  }
};

export default Profile;
