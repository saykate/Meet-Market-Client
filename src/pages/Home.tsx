import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Heading,
  SimpleGrid,
  Image,
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useGetDepartments from "../hooks/useGetDepartments";
import { DepartmentData } from "../api/shopping";
import useListOfUsers from "../hooks/useListOfUsers";
import { UserData } from "../api/users";
import useAuthContext from "../hooks/useAuthContext";

const shuffleArray = <T,>(arr: T[]): T[] => {
  return arr.sort(() => Math.random() - 0.5);
};

const Home = () => {
  const { users, loading: usersLoading, error: usersError } = useListOfUsers();
  const { isAuthenticated } = useAuthContext();
  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
  } = useGetDepartments();
  const [displayedDepartments, setDisplayedDepartments] = useState<
    DepartmentData[]
  >([]);
  const [displayedUsers, setDisplayedUsers] = useState<UserData[]>([]);

  useEffect(() => {
    if (departments && departments.length) {
      const shuffledDepartments = shuffleArray(departments);
      setDisplayedDepartments(shuffledDepartments.slice(0, 4));
    }
  }, [departments]);

  useEffect(() => {
    if (users && users.length) {
      const shuffledUsers = shuffleArray(users);
      setDisplayedUsers(shuffledUsers.slice(0, 6));
    }
  }, [users]);

  return (
    <Box w="full" h="100vh" display="flex" flexDir="column" bg="gray.100" overflow="auto">
      <Box
        h="30%"
        bgImage="https://photos-for-meet-market.s3.amazonaws.com/GroceryBag.jpg"
        bgPosition="center"
        bgSize="cover"
        p="1rem"
      >
        <Flex
          flexDir="column"
          alignItems="center"
          w={{ md: "40%" }}
          gap=".25rem"
          p=".5rem"
          bgColor="rgba(247, 245, 232, 100)"
          borderRadius="3xl"
        >
          <Text fontSize={{ base: "sm", md: "lg", lg: "xl" }}>
            Get the benefits of BULK without the BURDEN of food waste and
            freezer space.
          </Text>
          <Text fontSize={{ base: "sm", md: "lg", lg: "xl" }}>
            Find friends in your area to share Costco groceries and SAVINGS
            with!
          </Text>
          <Text fontSize={{ base: "lg", md: "2xl", lg: "3xl" }} as="b">
            Welcome to
          </Text>
          <Text fontSize={{ base: "lg", md: "2xl", lg: "3xl" }} as="b">
            MEET-MARKET
          </Text>
        </Flex>
      </Box>
      <Box p="2rem">
        <Heading size="xl" p="1rem">
          Shop Departments:
        </Heading>
        {departmentsLoading ? (
          <Flex justify="center" align="center" w="full" h="100%">
            <Spinner size="xl" />
          </Flex>
        ) : departmentsError ? (
          <Alert status="error">
            <AlertIcon />
            {departmentsError.message}
          </Alert>
        ) : (
          <SimpleGrid minChildWidth="140px" spacing="10px" w="full" row="1">
            {displayedDepartments.map((department) => (
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
              >
                <Text fontSize="md" fontWeight="bold">
                  {department.title}
                </Text>
                <Image
                  w="100px"
                  objectFit="cover"
                  src={department.photo}
                  alt={department.title}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
      {isAuthenticated && (
        <Box p="2rem">
          <Heading size="xl" p="1rem">
            Meet other Users:
          </Heading>
          {usersLoading ? (
            <Flex justify="center" align="center" w="full" h="100%">
              <Spinner size="xl" />
            </Flex>
          ) : usersError ? (
            <Alert status="error">
              <AlertIcon />
              {usersError.message}
            </Alert>
          ) : (
            <SimpleGrid minChildWidth="80px" spacing="10px" w="full">
              {displayedUsers.map((user) => (
                <Flex flexDirection="column" alignItems="center" key={user._id}>
                  <Avatar src={user.profilePhoto} />
                  <Link to={`/profile/${user._id}`}>{user.username}</Link>
                </Flex>
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
