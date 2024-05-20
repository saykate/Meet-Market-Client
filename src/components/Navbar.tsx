import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  useDisclosure,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  VStack, 
  HStack
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import LoginForm from "../modals/LoginForm";
import RegisterForm from "../modals/RegisterForm";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const location = useLocation();
  const { isAuthenticated, userId } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoginModal, setIsLoginModal] = useState(true);
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box w="full" p={4} borderBottom="1px solid" borderColor="gray.200">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isLoginModal ? 'Login' : 'Register'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoginModal ? (
              <LoginForm
                onRegisterOpen={() => setIsLoginModal(false)}
                onClose={onClose}
              />
            ) : (
              <RegisterForm
                onReturnToLogin={() => setIsLoginModal(true)}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex justifyContent="space-between" alignItems="center">
        {!isMobile && (
          <HStack spacing="2em" fontSize="1.5rem">
            {!isAuthenticated && <button onClick={onOpen}>Login</button>}
            {location.pathname !== "/" && <Link to="/">Home</Link>}
            <Link to="shopping">Shopping</Link>
            {isAuthenticated && (
              <HStack spacing="2rem">
                <Link to={`profile/${userId}`}>Profile</Link>
                <Link to="messages">Messages</Link>
                <Link onClick={logout} to="/">
                  Logout
                </Link>
              </HStack>
            )}
          </HStack>
        )}
        {isMobile && (
          <>
          {!isAuthenticated && <button onClick={onOpen}>Login</button>}
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onMenuOpen}
            aria-label="Open menu"
          />
          </>
        )}
      </Flex>

      <Modal isOpen={isMenuOpen} onClose={onMenuClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="1rem" alignItems="flex-start">
              {location.pathname !== "/" && <Link to="/" onClick={onMenuClose}>Home</Link>}
              <Link to="shopping" onClick={onMenuClose}>Shopping</Link>
              {isAuthenticated && (
                <>
                  <Link to={`profile/${userId}`} onClick={onMenuClose}>Profile</Link>
                  <Link to="messages" onClick={onMenuClose}>Messages</Link>
                  <Link onClick={() => {logout(); onMenuClose();}} to="/">
                    Logout
                  </Link>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;
