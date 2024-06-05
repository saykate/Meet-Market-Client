import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Avatar,
  Image,
  useDisclosure,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useGetDepartments from "../hooks/useGetDepartments";
import useAuthContext from "../hooks/useAuthContext";
import useGetUserCategories from "../hooks/useGetUserCategories";
import { UserData } from "../api/users";
import {
  addUserCategory,
  deleteUserCategory,
  findUsersByCategory,
} from "../api/lists";
import { getDepartmentCategories, CategoryData } from "../api/shopping";

const Shopping = () => {
  const { departments, loading, error } = useGetDepartments();
  const { isAuthenticated, token, userId } = useAuthContext();
  const { categories: userCategories } = useGetUserCategories(userId as string);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null
  );
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [usersInCat, setUsersInCat] = useState<UserData[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const toast = useToast();
  // const {
  //   isOpen: isListOpen,
  //   onOpen: onListOpen,
  //   onClose: onListClose,
  // } = useDisclosure();
  const {
    isOpen: isDeptOpen,
    onOpen: onDeptOpen,
    onClose: onDeptClose,
  } = useDisclosure();
  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: onCatClose,
  } = useDisclosure();

  // const handleListChoice = () => {
  //   onListOpen();
  // };

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
      // onListClose();
      onCatClose();
      onDeptClose();
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
      // onListClose();
      onCatClose();
      onDeptClose();
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

  const handleOpenDeptModal = async (deptId: string) => {
    setSelectedDept(deptId);
    setLoadingCategories(true);
    try {
      const fetchedCategories = await getDepartmentCategories(deptId);
      setCategories(fetchedCategories);
      onDeptOpen();
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast({
        title: "Failed to fetch categories",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } finally {
      setLoadingCategories(false);
    }
  };
  console.log("Selected Dept", selectedDept);

  const handleOpenCatModal = async (category: CategoryData) => {
    setSelectedCategory(category);
    setLoadingUsers(true);
    try {
      if (!token) throw new Error("Unauthorized");
      const fetchedUsers = await findUsersByCategory({ catId: category._id, token });
      setUsersInCat(fetchedUsers);
      onCatOpen();
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
  };
  console.log("Selected Category", selectedCategory);

  return (
    <Box
      w="full"
      h="100vh"
      p="1rem"
      display="flex"
      flexDir="column"
      alignItems="flex-start"
      bg="gray.100"
      overflow="auto"
    >
      <Box
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        gap="1rem"
        mt="1rem"
        mb="1rem"
        alignContent="flex-start"
      >
        <Heading size="xl">Departments</Heading>
        <Text as="b">Click Departments to see more.</Text>
      </Box>
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
        <SimpleGrid minChildWidth="180px" spacing="10px" w="full">
          {departments.map((department) => (
            <Box
              key={department._id}
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="space-between"
              h="auto"
              w="100%"
              p="10px"
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              bg="#F7F5E8"
              onClick={() => handleOpenDeptModal(department._id)}
            >
              <Text fontSize="xl" fontWeight="bold">
                {department.title}
              </Text>
              <Image
                w="160px"
                objectFit="cover"
                src={department.photo}
                alt={department.title}
                mb="10px"
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
      <Modal isOpen={isDeptOpen} onClose={onDeptClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categories:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingCategories ? (
              <Flex justify="center" align="center" w="full" h="100%">
                <Spinner size="xl" />
              </Flex>
            ) : isAuthenticated ? (
              <Text mb="1rem">
                Open a Category to add it to your list and see others who have
                added this category!
              </Text>
            ) : (
              <Text mb="1rem">
                By logging in, you can add items to your list and find others
                with similar shopping interests!
              </Text>
            )}
            <SimpleGrid minChildWidth="120px" spacing="10px" w="full">
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
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {category.title}
                  </Text>
                  <Image
                    w="100px"
                    objectFit="cover"
                    src={category.photo}
                    alt={category.title}
                    mb="5px"
                  />
                  {isAuthenticated && (
                    <Button
                      size="xs"
                      bg="gray.200"
                      onClick={() => handleOpenCatModal(category)}
                    >
                      Open
                    </Button>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isCatOpen} onClose={onCatClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCategory?.title}:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              size="xs"
              bg="gray.200"
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
            <Text mb="1rem">
              By adding items to your list, other users can see if you are a
              compatible shopping partner!
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
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Modal isOpen={isListOpen} onClose={onListClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {lists.map((list) => (
              <Button
                key={list._id}
                onClick={() => {
                  isCategoryInList(selectedCategory?._id ?? "")
                    ? deleteFromList(list._id)
                    : addToList(list._id);
                }}
              >
                {list.listName}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default Shopping;
