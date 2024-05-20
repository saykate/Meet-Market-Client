import { FC } from "react";
import { Box } from "@chakra-ui/react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box
      bg="red"
      w="80%"
      color="white"
      borderWidth="1px"
      borderRadius="lg"
      fontWeight="semibold"
      textAlign="center"
    >
      {message}
    </Box>
  );
};

export default ErrorMessage;
