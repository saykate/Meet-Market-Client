import {
  SimpleGrid,
  GridItem,
  VStack,
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
import { addDeptToList } from "../api/lists"

const Shopping = () => {
  const { departments } = useGetDepartments();
  const { isAuthenticated, token } = useAuthContext();
  const { lists } = useGetUserLists();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedDept, setSelectedDept] = useState<string | null>(null)

  const handleAddToList = (deptId: string) => {
    setSelectedDept(deptId)
    onOpen()
  }

  const addToList = async (listId: string) => {
    if(!selectedDept || !token) return; 
    try {
      await addDeptToList({ listId, deptId: selectedDept, token });
      onClose();
      toast({
        title: "Department added to your List",
        duration: 2000,
        position: "top"
      })
    } catch (error) {
      console.error("Failed to add department to list", error);
    }
  }
  
  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="xl">Departments</Heading>
        <Text>With an account, you can add Departments to your List!</Text>
      </VStack>
      <SimpleGrid columns={4} columnGap={3} rowGap={3} w="full">
        {departments.map((department) => (
          <GridItem colSpan={1} key={uuidv4()}>
            {department.title}
            <Image
              boxSize={40}
              objectFit="cover"
              src={department.photo}
              alt={department.title}
            />
            {isAuthenticated && <Button onClick={() => handleAddToList(department._id)}>+ to List</Button>}
          </GridItem>
        ))}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Choose your List</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {lists.map(list => (
                      <div key={list._id} onClick={() => addToList(list._id)} >{list.listName}</div>
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
    </VStack>
  );
};

export default Shopping;
