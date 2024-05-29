import { useState } from "react";
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
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
import useGetUserLists from "../hooks/useGetUserLists";
import { addCatToList } from "../api/lists";
import { getDepartmentCategories, CategoryData } from "../api/shopping";

const Shopping = () => {
  const { departments, loading, error } = useGetDepartments();
  const { isAuthenticated, token, userId } = useAuthContext();
  const { lists } = useGetUserLists(userId as string);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const toast = useToast();
  const {
    isOpen: isListOpen,
    onOpen: onListOpen,
    onClose: onListClose,
  } = useDisclosure();
  const {
    isOpen: isDeptOpen,
    onOpen: onDeptOpen,
    onClose: onDeptClose,
  } = useDisclosure();


  // categories.map((category) => console.log("Category", category))

  const handleAddToList = (catId: string) => {
    setSelectedCategory(catId);
    onListOpen();
  };

  const addToList = async (listId: string) => {
    if (!selectedCategory || !token) return;
    try {
      await addCatToList({ listId, catId: selectedCategory, token });
      toast({
        title: "Category added to your List",
        duration: 2000,
        position: "top",
      });
      onListClose();
      onDeptClose();
    } catch (error) {
      console.error("Failed to add category to list", error);
    }
  };

  const handleOpenDeptModal = async (deptId: string) => {
    setSelectedDept(deptId);
    console.log("Selected Dept", selectedDept);
    try {
      const fetchedCategories = await getDepartmentCategories(deptId);
      setCategories(fetchedCategories);
      onDeptOpen();
    } catch (error) {
      console.error("Failed to fetch categories, error");
    }
  };

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
            {isAuthenticated ? (
              <Text mb="1rem">
                By adding items to your list, other users can see if you are a
                compatible shopping partner!
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
                      onClick={() => handleAddToList(category._id)}
                    >
                      + to List
                    </Button>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isListOpen} onClose={onListClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose your List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {lists.map((list) => (
              <Button key={list._id} onClick={() => addToList(list._id)}>
                {list.listName}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Shopping;
