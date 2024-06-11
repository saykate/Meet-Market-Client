import { Box, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box
      w="full"
      h="100vh"
      display="flex"
      flexDir="column"
      bg="gray.100"
      overflow="auto"
      p={{ base: "1rem", sm: "2rem", md: "3rem" }}
    >
      <Heading size="lg" p="1rem">
        About Meet-Market
      </Heading>

      <Text>
        Welcome to Meet-Market, your solution to maximizing the benefits of bulk
        shopping without the burden of excess or waste. In a world where living
        expenses continue to rise, Meet-Market aims to revolutionize the way
        individuals approach shopping.
      </Text>

      <Heading size="lg" p="1rem">
        Our Mission
      </Heading>

      <Text>
        At Meet-Market, we understand the challenges that come with living in a
        world where costs are high and resources are limited. Our mission is
        simple: to empower individuals to make the most of their shopping
        experience by connecting them with like-minded individuals who share
        similar shopping habits and preferences.
      </Text>

      <Heading size="lg" p="1rem">
        How It Works
      </Heading>

      <Text>
        Meet-Market operates on the principle of community collaboration.
        Through our user-friendly app, individuals can create profiles and
        indicate their shopping needs and preferences. Whether it's household
        essentials, pantry staples, or everyday items, users can browse through
        a variety of categories and add them to their list.
      </Text>

      <Text>
        Once users have compiled their list of interests, Meet-Market utilizes
        advanced algorithms to match them with other users in their area who are
        seeking similar items. Users can then connect with one another, chat,
        and coordinate plans to share their shopping trips.
      </Text>

      <Heading size="lg" p="1rem">
        Why Meet-Market?
      </Heading>

      <Text>
        Meet-Market offers a unique opportunity for individuals to not only save
        money but also foster connections within their community. By sharing the
        cost and quantity of bulk items, users can enjoy significant savings
        while minimizing food waste and optimizing storage space.
      </Text>

      <Text>
        Additionally, Meet-Market goes beyond just shopping together. With the
        option to meet up at Costco, users have the opportunity to socialize,
        make new friends, and build meaningful relationships based on shared
        interests.
      </Text>

      <Heading size="lg" p="1rem">
        Join the Meet-Market Community
      </Heading>

      <Text>
        Whether you're a single individual or a small family looking for
        cost-effective shopping solutions, Meet-Market welcomes you to join our
        community. Together, let's embrace the benefits of bulk shopping without
        the burden, and make meaningful connections along the way.
      </Text>

      <Text>
        Join Meet-Market today and start enjoying the savings and camaraderie
        that come with shared shopping experiences!
      </Text>
    </Box>
  );
};

export default About;
