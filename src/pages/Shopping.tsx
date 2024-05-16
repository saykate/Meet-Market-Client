import { SimpleGrid, GridItem, VStack, Heading, Text, Image, Button } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid";
import useGetDepartments from "../hooks/useGetDepartments"
import useAuthContext from "../hooks/useAuthContext";
import useGetUserLists from "../hooks/useGetUserLists";

const Shopping = () => {
  const departments = useGetDepartments();
  const { isAuthenticated } = useAuthContext()
  console.log("Departments",departments)

  return (
  <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
    <VStack spacing={3} alignItems="flex-start">
      <Heading size="xl">Departments</Heading>
      <Text>With an account, you can add Departments to your List!</Text>
    </VStack>
    <SimpleGrid columns={4} columnGap={3} rowGap={3} w="full">
      {departments.departments.map(department => (
        <GridItem colSpan={1} key={uuidv4()}>
          {department.title}
          <Image
            boxSize={40}
            objectFit='cover'
            src={department.photo}
            alt={department.title}
          />
          { isAuthenticated && <Button>+ to List</Button>}
        </GridItem>
      ))}
    </SimpleGrid>
  </VStack>
  )
}

export default Shopping