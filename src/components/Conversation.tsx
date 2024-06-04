// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Spinner,
//   Alert,
//   AlertIcon,
//   Avatar,
//   Flex,
//   Heading,
//   Input,
//   Button,
// } from "@chakra-ui/react";
// import useAuthContext from "../hooks/useAuthContext";
// import useGetConversation from "../hooks/useGetConversation";
// import { createMessage } from "../api/messages";
// import { Message } from "../hooks/useGetUserMessages";

// const Conversation = () => {
//   const { userId, token } = useAuthContext();
//   const { recipientId } = useParams<{ recipientId: string }>();
//   const { messages, loading, error, refetch } = useGetConversation(recipientId);
//   const [newMessage, setNewMessage] = useState("");

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "" || !token || !userId || !recipientId) return;

//     await createMessage(token, userId, recipientId, newMessage);
//     setNewMessage("");
//     refetch(); // Refresh the conversation
//   };

//   return (
//     <Box w="full" h="100vh" p="1rem" bg="gray.100" overflow="auto">
//       <Heading size="lg" pb="1rem">
//         Conversation
//       </Heading>
//       {loading ? (
//         <Flex justify="center" align="center" w="full" h="100%">
//           <Spinner size="xl" />
//         </Flex>
//       ) : error ? (
//         <Alert status="error">
//           <AlertIcon />
//           {error.message}
//         </Alert>
//       ) : (
//         <Box>
//           <Box mb="1rem">
//             {messages.map((message: Message) => (
//               <Flex key={message._id} mb="1rem">
//                 <Avatar src={message.author.profilePhoto} mr="1rem" />
//                 <Box>
//                   <Heading size="sm">{message.author.username}</Heading>
//                   <Box>{message.text}</Box>
//                 </Box>
//               </Flex>
//             ))}
//           </Box>
//           <Flex>
//             <Input
//               placeholder="Type a message"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <Button onClick={handleSendMessage} ml="1rem">
//               Send
//             </Button>
//           </Flex>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Conversation;
