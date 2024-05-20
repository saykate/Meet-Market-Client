import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useDisclosure,
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
import useGetUser from "../hooks/useGetUser";
import useGetUserLists from "../hooks/useGetUserLists";
import MessageForm from "../modals/MessageForm";
import ProfileForm from "../modals/ProfileForm";


const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams();
  const { user, loading } = useGetUser(userId);
  const currentUser = currentUserId === userId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { lists } = useGetUserLists();

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
    profilePhoto: "https://photos-for-meet-market.s3.amazonaws.com/profile.png",
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
        profilePhoto: user.profilePhoto || "https://photos-for-meet-market.s3.amazonaws.com/profile.png",
        coverPhoto: user.coverPhoto || "",
      });
      console.log("lastName in setState", user.lastName)
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
      <Box
      w="full"
      h="full"
      display="flex"
      flexDir="column"
      p="1em" 
      border="solid"
      >
        {currentUser ? (
          <Box p="1em" border="solid">
            <Box p="1em" border="solid">
              <Heading size="xl">Welcome {user.username}</Heading>
              <Button onClick={onOpen}>Edit Profile</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update Your Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <ProfileForm initialState={initialState} onClose={onClose}/>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
            <Box p="1em" border="solid">
              <Heading size="lg">Your Lists</Heading>
              <ul>
                {lists.map(list => (
                  <li key={list._id}>
                    <div style={{fontSize: "1.25em"}}>{list.listName}:</div>
                    {list.departments.map((dept) => (
                      <div key={dept._id}>{dept.title}</div>
                    ))}
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        ) : (
          <Box p="1em" border="solid">
            <h1>{user.username}</h1>
            <Button onClick={onOpen}>Send a Message</Button>
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
          </Box>
        )}
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
