import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Image,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import useGetDepartments from "../hooks/useGetDepartments";
import useAuthContext from "../hooks/useAuthContext";
import useGetUserLists from "../hooks/useGetUserLists";
import { useState } from "react";
import { addDeptToList } from "../api/lists";

const Shopping = () => {
  const { departments } = useGetDepartments();
  const { isAuthenticated, token, userId } = useAuthContext();
  const { lists } = useGetUserLists(userId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const handleAddToList = (deptId: string) => {
    setSelectedDept(deptId);
    onOpen();
  };

  const addToList = async (listId: string) => {
    if (!selectedDept || !token) return;
    try {
      await addDeptToList({ listId, deptId: selectedDept, token });
      onClose();
      toast({
        title: "Department added to your List",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      console.error("Failed to add department to list", error);
    }
  };

  return (
    <Box
      w="full"
      h="full"
      display="flex"
      flexDir="column"
      alignItems="flex-start"
    >
      <Box
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        mt="1em"
        mb="1em"
        alignContent="flex-start"
      >
        <Heading size="xl">Departments</Heading>
        {!isAuthenticated ? (
          <Text>With an account, you can add Departments to your List!</Text>
        ) : (
          <Text>Add Departments to your List!</Text>
        )}
      </Box>
      <SimpleGrid minChildWidth="180px" spacing="10px" w="full">
        {departments.map((department) => (
          <Box
            key={uuidv4()}
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
              <Button size="sm" onClick={() => handleAddToList(department._id)}>
                + to List
              </Button>
            )}
          </Box>
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
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
