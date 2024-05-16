import { Link, useLocation } from "react-router-dom"
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
import LoginForm from "../modals/LoginForm";
import RegisterForm from "../modals/RegisterForm";
import useLogout from "../hooks/useLogout"
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const location = useLocation();
  const { isAuthenticated, userId } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoginModal, setIsLoginModal] = useState(true)

  return (
    <nav>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                { isLoginModal ? <LoginForm onRegisterOpen={() => setIsLoginModal(false)} onClose={onClose} /> : <RegisterForm />}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      { !isAuthenticated && <button onClick={onOpen}>Login</button> }
      { location.pathname !== "/" &&
        <Link to="/">Home</Link>
      }
      <Link to="shopping">Shopping</Link>
      { isAuthenticated &&
        <div className="nav">
          <Link to={`profile/${userId}`}>Profile</Link>
          <Link to="messages">Messages</Link>
          <Link onClick={logout} to="/">Logout</Link>
        </div>
      }
    </nav>
  )
}

export default Navbar