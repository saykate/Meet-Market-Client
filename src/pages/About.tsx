import {
  Box,
  Heading,

} from "@chakra-ui/react";

const About = () => {

  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      flexDir="column"
      bg="gray.100"
      overflow="auto"
    >
      <Heading size="xl" p="1rem">
        Welcome to Meet Market:
      </Heading>
    </Box>
  );
};

export default About;

