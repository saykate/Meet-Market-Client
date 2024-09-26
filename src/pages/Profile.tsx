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
  SimpleGrid,
  Image,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useCategoryModal from "../hooks/useCategoryModal";
import useGetUser from "../hooks/useGetUser";
import useGetUserCategories from "../hooks/useGetUserCategories";
import useFollowUser from "../hooks/useFollowUser";
import MessageForm from "../modals/MessageForm";
import ProfileForm from "../modals/ProfileForm";

const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams<{ userId: string }>();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { user, loading, error, refetch } = useGetUser(userId as string);
  const { categories } = useGetUserCategories(userId as string);
  const { followUser } = useFollowUser(userId as string);
  const currentUser = currentUserId === userId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openModal } = useCategoryModal();

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

  const handleFollow = () => {
    followUser();
  };

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
                  <Flex gap="3em">
                    <Button onClick={handleFollow} bg="gray.300">
                      Follow {user.username}
                    </Button>
                    <Button onClick={onOpen} bg="gray.300">
                      Send a Message
                    </Button>
                  </Flex>
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
              textAlign="center"
              border="solid"
              borderColor="gray.300"
              mx="2rem"
            >
              <Heading size="md" as="u">
                Bio:
              </Heading>
              <Text mt=".5rem">{user.bio}</Text>
            </Box>
            <Box p={{ base: "3em", sm: "5em" }}>
              <Heading size={{ base: "lg", sm: "xl" }}>
                {user.username} is interested in shopping for:
              </Heading>
              <hr
                style={{
                  height: "1px",
                  backgroundColor: "#c4cfdb",
                  marginBottom: "1rem",
                }}
              />
              <SimpleGrid minChildWidth="70px" spacing="10px" w="full">
                {categories.map((category) => (
                  <Box
                    key={category._id}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="space-between"
                    h="auto"
                    w="100%"
                    p="5px"
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                    bg="#F7F5E8"
                    onClick={() => openModal(category)}
                  >
                    <Text fontSize="xs">{category.title}</Text>
                    <Image
                      w="60px"
                      objectFit="cover"
                      src={category.photo}
                      alt={category.title}
                      mb="5px"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default Profile;
