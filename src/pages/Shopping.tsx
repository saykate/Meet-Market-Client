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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import useGetDepartments from "../hooks/useGetDepartments";
import useAuthContext from "../hooks/useAuthContext";
import useGetUserLists from "../hooks/useGetUserLists";
import { addDeptToList } from "../api/lists";
import { getDepartmentCategories, CategoryData } from "../api/shopping";

const Shopping = () => {
  const { departments, loading, error } = useGetDepartments();
  const { isAuthenticated, token, userId } = useAuthContext();
  const { lists } = useGetUserLists(userId as string);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
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

  const handleAddToList = (deptId: string) => {
    setSelectedDept(deptId);
    onListOpen();
  };

  const addToList = async (listId: string) => {
    if (!selectedDept || !token) return;
    try {
      await addDeptToList({ listId, deptId: selectedDept, token });
      onListClose();
      toast({
        title: "Department added to your List",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      console.error("Failed to add department to list", error);
    }
  };

  const handleOpenDeptModal = async (deptId: string) => {
    setSelectedDept(deptId);
    try {
      const fetchedCategories = await getDepartmentCategories(deptId);
      console.log(fetchedCategories)
      setCategories(fetchedCategories)
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
        {!isAuthenticated ? (
          <Text>With an account, you can add Departments to your List!</Text>
        ) : (
          <Text>Add Departments to your List!</Text>
        )}
        <Popover>
          <PopoverTrigger>
            <Button p="0">More info +</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              By adding departemnts to your list, other users can see if you are
              a compatible shopping partner!
            </PopoverBody>
          </PopoverContent>
        </Popover>
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
              {isAuthenticated && (
                <Button
                  size="sm"
                  onClick={() => handleAddToList(department._id)}
                >
                  + to List
                </Button>
              )}
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
            {categories.map((category) => (
              <Button key={category._id}>
                {category.title}
              </Button>
            ))}
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
