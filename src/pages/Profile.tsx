import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
import useGetUser from "../hooks/useGetUser";
import useGetUserMessages from "../hooks/useGetUserMessages";
import MessageForm from "../modals/MessageForm";
import ProfileForm from "../modals/ProfileForm";

const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams();
  const { user, loading } = useGetUser(userId);
  const currentUser = currentUserId === userId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { messages } = useGetUserMessages();

  console.log("UserId", userId);
  console.log("currentUserId", currentUserId);
  console.log("currentUser", currentUser);
  console.log("user", user);

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

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (user && userId) {
    return (
      <div>
        {currentUser ? (
          <div>
            <div>
              <h1>Welcome {user.username}</h1>
              <Button onClick={onOpen}>Edit Profile</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update Your Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <ProfileForm initialState={initialState} />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
            <div>
              <h2>Your Messages:</h2>
              <ul>
                {messages.map(message => (
                  <li key={message._id}>
                    <div>{message.author}</div>
                    <div>{message.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h1>{user.username}</h1>
            <Button onClick={onOpen}>Send a Message</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Message</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <MessageForm recipient={userId} />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        )}
      </div>
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
