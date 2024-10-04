import { useParams, Link } from "react-router-dom";
import {
  useDisclosure,
  useToast,
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
import useGetUserFollowers from "../hooks/useGetUserFollowers";
import useGetUserFollowing from "../hooks/useGetUserFollowing";

const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams<{ userId: string }>();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { user, loading, error, refetch } = useGetUser(userId as string);
  const { categories } = useGetUserCategories(userId as string);
  const toast = useToast();
  const { toggleFollowUser } = useFollowUser(userId as string);
  const {
    getUserFollowers,
    followers,
    loading: followersLoading,
    error: followersError,
  } = useGetUserFollowers(userId as string);

  // const {
  //   getUserFollowing: getProfileFollowing,
  //   following,
  // } = useGetUserFollowing(userId as string);

  const {
    getUserFollowing: getCurrentUserFollowing,
    following: currentUserFollowing,
    setFollowing: setCurrentUserFollowing,
    loading: followingLoading,
    error: followingError,
  } = useGetUserFollowing(currentUserId as string);

  console.log("inside profile", currentUserFollowing)

  const currentUser = currentUserId === userId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openModal } = useCategoryModal();

  const {
    isOpen: isFollowingOpen,
    onOpen: onFollowingOpen,
    onClose: onFollowingClose,
  } = useDisclosure();

  const {
    isOpen: isFollowersOpen,
    onOpen: onFollowersOpen,
    onClose: onFollowersClose,
  } = useDisclosure();

  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();

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


  useEffect(() => {
    getUserFollowers();
    getCurrentUserFollowing();
    // getProfileFollowing();
  }, [userId, currentUserId]);

  const isFollowing = (userId: string) => {
    if (!userId) return false
    // console.log("inside isFollowing", currentUserFollowing)
    // console.log("userId", userId)
    // console.log("list id's", currentUserFollowing.map(user => user._id))
    // console.log("isFollowing?", currentUserFollowing.some((user) => user._id === userId)) 
    return currentUserFollowing.some((user) => user._id === userId);
  };

  const handleToggleFollow = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Invalid user.",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      await toggleFollowUser();

      const newUser = {
        _id: userId, 
        username: user?.username || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        bio: user?.bio || "",
        birthdate: user?.birthdate ? new Date(user.birthdate) : new Date(),
        profilePhoto: user?.profilePhoto || "",
        coverPhoto: user?.coverPhoto || "",
      }

      if (isFollowing(userId)) {
        setCurrentUserFollowing(currentUserFollowing.filter((u) => u._id !== userId)); 
      } else {
        setCurrentUserFollowing([...currentUserFollowing, newUser]);
      }
      toast({
        title: "Success!",
        description: "Follow status updated",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Could not update follow state for ${user?.username}. Please try again later.`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
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
                  <Flex gap="1em">
                    <Button onClick={onFollowingOpen} bg="gray.300">
                      Following
                    </Button>
                    <Modal isOpen={isFollowingOpen} onClose={onFollowingClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>You are following: </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {followingLoading ? (
                            <Spinner />
                          ) : followingError ? (
                            <Alert status="error">
                              {followingError.message}
                            </Alert>
                          ) : (
                            <Flex flexDirection="column" gap="10px">
                              {currentUserFollowing.map((user) => (
                                <Flex
                                  flexDirection="column"
                                  alignItems="center"
                                  key={user._id}
                                >
                                  <Link
                                    to={`/profile/${user._id}`}
                                    onClick={onFollowingClose}
                                  >
                                    <Avatar src={user.profilePhoto} />
                                  </Link>
                                  <Link
                                    to={`/profile/${user._id}`}
                                    onClick={onFollowingClose}
                                  >
                                    {user.username.length > 9
                                      ? `${user.username.slice(0, 9)}...`
                                      : user.username}
                                  </Link>
                                </Flex>
                              ))}
                            </Flex>
                          )}
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <Button onClick={onFollowersOpen} bg="gray.300">
                      Followers
                    </Button>
                    <Modal isOpen={isFollowersOpen} onClose={onFollowersClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Following you: </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {followersLoading ? (
                            <Spinner />
                          ) : followersError ? (
                            <Alert status="error">
                              {followersError.message}
                            </Alert>
                          ) : (
                            <Flex flexDirection="column" gap="10px">
                              {followers.map((user) => (
                                <Flex
                                  flexDirection="column"
                                  alignItems="center"
                                  key={user._id}
                                >
                                  <Link
                                    to={`/profile/${user._id}`}
                                    onClick={onFollowersClose}
                                  >
                                    <Avatar src={user.profilePhoto} />
                                  </Link>
                                  <Link
                                    to={`/profile/${user._id}`}
                                    onClick={onFollowersClose}
                                  >
                                    {user.username.length > 9
                                      ? `${user.username.slice(0, 9)}...`
                                      : user.username}
                                  </Link>
                                </Flex>
                              ))}
                            </Flex>
                          )}
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <Button onClick={onProfileOpen} bg="gray.300">
                      Edit Profile
                    </Button>
                    <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Update Your Profile</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <ProfileForm
                            initialState={initialState}
                            onUpdateSuccess={handleUpdateSuccess}
                            onProfileClose={onProfileClose}
                          />
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </Flex>
                </>
              ) : (
                <>
                  <Flex gap="3em">
                    <Button onClick={handleToggleFollow} bg="gray.300">
                      {isFollowing(user?._id)
                        ? `Unfollow ${user.username}`
                        : `Follow ${user.username}`}
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
