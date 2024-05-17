import { FC, useState } from "react";
import { FormControl, FormLabel, Input, GridItem, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

export type InputProps = {
  colSpan: number;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isRequired: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox: FC<InputProps> = ({
  colSpan,
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  isRequired,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show); 

  return (
    <GridItem colSpan={colSpan}>
      <FormControl>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <InputGroup>
          <Input
            type={type !== "password" ? type: (show ? "text" : "password")}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isRequired={isRequired}
          />
            {type === 'password' && (
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    </GridItem>
  );
};

export default InputBox;
