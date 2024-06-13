import { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  Flex,
  Spinner,
  Text,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
import useCategoryModal from "../hooks/useCategoryModal";
import { UserData } from "../api/users";
import {
  deleteUserCategory,
  addUserCategory,
  findUsersByCategory,
} from "../api/lists";
import useGetUserCategories from "../hooks/useGetUserCategories";

type CategoryModalProps = {
  onClose: () => void;
}

const CategoryModal: FC<CategoryModalProps> = ({ onClose }) => {
  const { selectedCategory, isModalOpen, closeModal } = useCategoryModal();
  const { token, userId } = useAuthContext();
  const [usersInCat, setUsersInCat] = useState<UserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const { categories: userCategories } = useGetUserCategories(userId as string);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedCategory && token) {
        setLoadingUsers(true);
        try {
          const fetchedUsers = await findUsersByCategory({
            catId: selectedCategory._id,
            token,
          });
          setUsersInCat(fetchedUsers);
        } catch (error) {
          console.error("Failed to fetch users", error);
          toast({
            title: "Failed to fetch users",
            status: "error",
            duration: 2000,
            position: "top",
          });
        } finally {
          setLoadingUsers(false);
        }
      }
    };

    fetchUsers();
  }, [selectedCategory, token, toast]);

  const isCategoryInList = (catId: string) => {
    return userCategories.some((category) => category._id === catId);
  };

  const addToList = async () => {
    if (!selectedCategory || !token || !userId) return;
    try {
      await addUserCategory({ userId, catId: selectedCategory._id, token });
      toast({
        title: "Category added to your List",
        duration: 2000,
        position: "top",
      });
      closeModal();
      onClose();
    } catch (error) {
      console.error("Failed to add category to list", error);
      toast({
        title: "Failed to add category to list",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const deleteFromList = async () => {
    if (!selectedCategory || !token || !userId) return;
    try {
      await deleteUserCategory({ userId, catId: selectedCategory._id, token });
      toast({
        title: "Category removed from your List",
        duration: 2000,
        position: "top",
      });
      closeModal();
      onClose();
    } catch (error) {
      console.error("Failed to remove category from list", error);
      toast({
        title: "Failed to remove category from list",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedCategory?.title}:</ModalHeader>
        <ModalCloseButton border="solid" />
        <ModalBody>
          <Flex flexDir="column" alignItems="center">
            {isCategoryInList(selectedCategory?._id ?? "") ? (
              ""
            ) : (
              <Text mb="1rem">
                By adding items to your list, other users can see if you are a
                compatible shopping partner!
              </Text>
            )}
            <Button
              size="xs"
              bg="gray.200"
              mb="1.5rem"
              border="solid"
              onClick={() => {
                isCategoryInList(selectedCategory?._id ?? "")
                  ? deleteFromList()
                  : addToList();
              }}
            >
              {isCategoryInList(selectedCategory?._id ?? "")
                ? "Remove from List"
                : "Add to List"}
            </Button>
            <hr
              style={{
                height: "1px",
                width: "80%",
                backgroundColor: "black",
                marginBottom: "1rem",
              }}
            />
            <Text size="med" mb="2rem" as="u">
              Who's Shopping for this:
            </Text>
            <SimpleGrid minChildWidth="80px" spacing="10px" w="full">
              {loadingUsers ? (
                <Flex justify="center" align="center" w="full" h="100%">
                  <Spinner size="xl" />
                </Flex>
              ) : (
                usersInCat.map((user) => (
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    key={user._id}
                  >
                    <Link to={`/profile/${user._id}`}>
                      <Avatar src={user.profilePhoto} />
                    </Link>
                    <Link to={`/profile/${user._id}`}>
                      {user.username.length > 9
                        ? `${user.username.slice(0, 9)}...`
                        : user.username}
                    </Link>
                  </Flex>
                ))
              )}
            </SimpleGrid>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
